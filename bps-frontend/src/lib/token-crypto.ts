/**
 * Cryptographic utility functions and middleware to protect authentication
 * tokens
 *
 * Uses authenticated encryption to ensure that encrypted data has not been
 * modified. This essentially involves signing the encrypted data with a secret
 * signing key
 *
 * Encrypted tokens are stored in req.session.tokens
 * Decrypted tokens are stored in res.local.tokens
 *
 * Request flows:
 *
 * (once per session) Login > Get tokens and put in res.locals.tokens > Run encryptTokens middleware
 * Authenticated request > Run decryptTokens middleware > Access tokens from res.locals.tokens
 *
 * References:
 * 1. "Guide to Cryptography", OWASP [https://www.owasp.org/index.php/Guide_to_Cryptography]
 * 2. "Cryptographic Storage Cheat Sheet", OWASP [https://www.owasp.org/index.php/Cryptographic_Storage_Cheat_Sheet]
 * 3. "Recommendation for Key Management", NIST [http://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r4.pdf]
 * 4. The Galois/Counter Mode of Operation (GCM), McGrew, Viega [http://csrc.nist.gov/groups/ST/toolkit/BCM/documents/proposedmodes/gcm/gcm-spec.pdf]
 * 5. "Encrypt and decrypt content with Nodejs", Christoph Hartmann [http://lollyrock.com/articles/nodejs-encryption/]
 * 6. nodejs crypto - simple encrypt & decrypt using IV (Initialization Vector), yoavniran (GitHub gist) [https://gist.github.com/yoavniran/c78a0991e0152b306c25]
 */

import crypto from 'crypto';
import logger from 'lib/logger';

const ALGORITHM = 'aes-256-gcm';
const TOKEN_ENCRYPTION_COOKIE_NAMESPACE =
  process.env.TOKEN_ENCRYPTION_COOKIE_NAMESPACE; // storing this in memory because retrieving properties from process.env is slow

function decrypt(encrypted, symmetricKey, initializationVector) {
  try {
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(symmetricKey, 'hex'),
      Buffer.from(initializationVector, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));
    let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return { content: decrypted };
  } catch (error) {
    return { error };
  }
}

/**
 * Middleware to decrypt tokens stored in session data. Stores decrypted tokens
 * in res.locals.tokens
 */
function decryptTokens(req, res, next) {
  const symmetricKey = getCookie(req, 'SYMMETRIC_KEY');
  const initializationVector = getCookie(req, 'INITIALIZATION_VECTOR');
  let logout = false;
  const user = req.user;
  res.locals.tokens = {};
  for (const tokenName in req.session.tokens) {
    const encrypted = req.session.tokens[tokenName];
    const result = decrypt(encrypted, symmetricKey, initializationVector);
    if (result.error) {
      logger.error(
        `Failed to decrypt ${tokenName} for user ${req.user.username}`,
        null,
        user,
      );
      logout = true;
      break;
    } else {
      res.locals.tokens[tokenName] = JSON.parse(result.content);
    }
  }
  if (logout) {
    logger.info('logging out user', null, user);
    req.logout(); // TODO test, does this work? Probably should redirect to login? Consult with UI team
    res.clearCookie(process.env.XSRF_TOKEN_NAME);
    res.clearCookie(process.env.XSRF_TOKEN_HTTPONLY_NAME);
    res.send();
  } else {
    logger.verbose(
      'decrypted the following tokens:',
      Object.keys(res.locals.tokens).join(', '),
      user,
    );
    next();
  }
}

function encrypt(plainText, symmetricKey, initializationVector) {
  if (typeof plainText !== 'string' && plainText instanceof Buffer === false) {
    plainText = plainText.toString();
  }
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(symmetricKey, 'hex'),
    Buffer.from(initializationVector, 'hex'),
  );
  const encrypted =
    cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return { content: encrypted, tag };
}

/**
 * Middleware to encrypt tokens received after authentication. Stores encrypted
 * tokens in session data and returns the decryption key in a cookie
 */
function encryptTokens(req, res, next) {
  const { symmetricKey, initializationVector } = generateRandomEncryptionKeys();

  req.session.tokens = {};
  for (const tokenName in res.locals.tokens) {
    const token = res.locals.tokens[tokenName];
    if (token) {
      req.session.tokens[tokenName] = encrypt(
        JSON.stringify(token),
        symmetricKey,
        initializationVector,
      );
    }
  }

  setCookie(res, 'SYMMETRIC_KEY', symmetricKey);
  setCookie(res, 'INITIALIZATION_VECTOR', initializationVector);
  logger.verbose(
    'encrypted the following tokens:',
    Object.keys(req.session.tokens).join(', '),
    req.user,
  );
  next();
}

function generateRandomEncryptionKeys() {
  return {
    symmetricKey: crypto.randomBytes(32).toString('hex'), // AES-256-GCM requires a 32 byte (256 bit) key, as per the name of the algorithm
    initializationVector: crypto.randomBytes(12).toString('hex'), // a 12 byte (96 bit) vector length results in the most efficient cipher calculations, as other lengths will require additional calculations [4]
  };
}

function getCookie(req, name) {
  return req.signedCookies[`${TOKEN_ENCRYPTION_COOKIE_NAMESPACE}${name}`];
}

function setCookie(res, name, value) {
  res.cookie(`${TOKEN_ENCRYPTION_COOKIE_NAMESPACE}${name}`, value, {
    httpOnly: true,
    signed: true, // prevents an attacker from finding the decryption secrets through brute force without the cookie signing key
    // secure: true, // TODO enable once SSL is in place
  });
}

export {
  decrypt,
  decryptTokens,
  encrypt,
  encryptTokens,
  generateRandomEncryptionKeys,
};
