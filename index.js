const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');



app.use(express.static(path.join(__dirname, 'general')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get ('/', (req, res) => {
    res.render('home')
});

app.get('/teams', (req, res) => {
    const teams = [
        { name: 'Liverpool', city: 'Liverpool' },
        { name: 'Manchester', city: 'Manchester' },
        { name: 'Chelsea', city: 'London' },
        { name: 'Arsenal', city: 'London' },
        { name: 'Tottenham', city: 'London' },
        { name: 'Barcelona', city: 'Barcelona' },
        { name: 'Real Madrid', city: 'Madrid' },
        { name: 'Bayern Munich', city: 'Munich' },
    ]
    res.render('eplteams', { teams });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { subreddit, ...data });
    } else {
        res.render('not_found', {subreddit});
    }
});





app.listen(3000, () => {
    console.log('Server is running on port 3000');
});