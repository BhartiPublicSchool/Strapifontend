export function mediaSelection (params, mediaQuality = 'large') {
  if (Array.isArray(params)) {
    console.log('array')
    params = params[0]
  }
  let mediaURL = ''
  if (params && params.formats) {
    switch (mediaQuality) {
      case 'large':
        if (params.formats.large) {
          mediaURL = params.formats.large.url
          break
        }
      case 'medium':
        if (params.formats.medium) {
          mediaURL = params.formats.medium.url
          break
        }
      case 'small':
        if (params.formats.small) {
          mediaURL = params.formats.small.url
          break
        }
      case 'thumbnail':
        if (params.formats.thumbnail) {
          mediaURL = params.formats.thumbnail.url
          break
        }
    }
  }
  return mediaURL
}

export function textSelection (param: any, defaultText: string) {
  console.log(param, defaultText)
  //TODO revisit
  return (param ? param.legend_title : null) ? param.legend_title : defaultText
}

export function urlStringSelection (param) {
  return param && param.url ? param.url : ''
}

export function isPresent (param, defaultText = '') {
  console.log(Boolean(param))
  return param ? param : defaultText
}

export function safeView (params, prop, index = null) {
  if (typeof index !== 'number') {
    return params && params[prop] ? params[prop] : ''
  } else {
    console.log(
      params && params[index] && params[index][prop] ? params[prop] : ''
    )
    return params && params[index] && params[index][prop]
      ? params[index][prop]
      : ''
  }
}

export function getalternativeText (params, prop, index = null) {
  if (typeof index !== 'number')
    return params ? params.prop.alternativeText : ''
  else return params ? params[index] && params[index][prop].alternativeText : ''
}

export function getSlides (array, index) {
  const slides = []
  const len = array.length
  for (let i = 0; i < len; i++) {
    // console.log(array[index % len]);
    slides.push(array[index % len])
    index++
  }
  return slides
}
