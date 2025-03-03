const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let surveyResults = [];

// Endpoint untuk menerima data survei
app.post('/submit-survey', (req, res) => {
    surveyResults.push(req.body);
    res.send('Survey submitted successfully!');
});

// Endpoint untuk mengunduh hasil survei dalam format Excel
app.get('/download', (req, res) => {
    const worksheet = xlsx.utils.json_to_sheet(surveyResults);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Survey Results');

    const filePath = path.join(__dirname, 'survey-results.xlsx');
    xlsx.writeFile(workbook, filePath);

    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
