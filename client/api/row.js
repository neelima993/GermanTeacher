const xlsx = require('xlsx');

module.exports = (req, res) => {
    const { index } = req.query;

    // Load the Excel file and the specific sheet named "Words"
    const workbook = xlsx.readFile('data.xlsx');
    const worksheet = workbook.Sheets['Words'];

    if (!worksheet) {
        return res.status(500).json({ error: "Sheet 'Words' not found in the Excel file." });
    }

    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const rowIndex = parseInt(index, 10);
    if (rowIndex > 0 && rowIndex < data.length) {
        const row = data[rowIndex];
        return res.json({
            A: row[0],
            B: row[1],
            D: row[3],
            E: row[4],
            G: row[6]
        });
    } else {
        return res.status(404).json({ error: 'Row not found' });
    }
};
