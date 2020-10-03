const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public', { index: false }));

// app.get('/uploads/*', async(req, res) => {
//     try {
//         const response = await axios.get(`http://localhost:1337${req.url}`);
//         res.send(response);
//         // console.log(response.data);
//         // res.render('bps_home', { faq: response.data })
//     } catch (error) {
//         console.error(error);
//     }
// })
app.get('/', async(req, res) => {
    try {
        const response = await axios.get('http://localhost:1337/home');
        console.log(response.data);
        res.render('bps_home', { faq: response.data })
    } catch (error) {
        console.error(error);
    }
});



app.listen(3000, () => console.log('app listening on port 3000!'));