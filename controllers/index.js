const express = require('express');
const ejs = require('ejs');

const router = express();

router.get('/listing', (req, res) => {
    res.render('listing', { title: 'Listing' });
});
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});



module.exports = router;