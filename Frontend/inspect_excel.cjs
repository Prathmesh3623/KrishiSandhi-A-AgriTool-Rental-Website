const XLSX = require('xlsx');
const path = require('path');

try {
    const filePath = path.join(__dirname, 'public', 'farmer.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(JSON.stringify(jsonData.slice(0, 5), null, 2));
} catch (error) {
    console.error('Error reading excel:', error.message);
}
