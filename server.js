const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const app = express();
const port = 5000;

app.use(cors());

// Load the Excel file and the specific sheet named "Words"
const workbook = xlsx.readFile('data.xlsx');
const worksheet = workbook.Sheets['Words'];

if (!worksheet) {
    console.error("Sheet 'Words' not found in the Excel file.");
    process.exit(1);
}

const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

app.get('/row/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index > 0 && index < data.length) {
        const row = data[index];
        res.json({
            A: row[0],
            B: row[1],
            D: row[3],
            E: row[4],
            G: row[6]
        });
    } else {
        res.status(404).send('Row not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
