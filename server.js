const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes.js');

const DB_URL = process.env.DB_URL || '';
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});

app.use('/', noteRoutes);

if (!DB_URL) {
    console.error('Please configure the DB_URL environment variable.');
    process.exit(1);
}

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to MongoDB:', err.message);
        process.exit(1);
    }); 