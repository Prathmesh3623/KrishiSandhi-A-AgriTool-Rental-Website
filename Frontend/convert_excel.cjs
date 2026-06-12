const XLSX = require('xlsx');
const path = require('path');

const translationMap = {
    "शेतकऱ्यांची नावे": "Owner",
    "गाव / तालुका / जिल्हा": "Description",
    "पूर्वी वापरलेली शेती साधने": "Tool",
    "मोबाईल क्रमांक": "Mobile",
    "हवामानाची परिस्थिती": "Weather",
    "मातीचा प्रकार": "Soil",
    "हंगाम": "Season",
    "पिकाचा प्रकार": "Crop",
    "वय": "Age",
    "लिंग": "Gender",
    "शेतीचा अनुभव (वर्षे)": "Experience",
    "जमिनीचा आकार (एकर)": "LandSize"
};

const valueTranslation = {
    "ट्रॅक्टर": "Tractor",
    "नांगर": "Plough",
    "रोटाव्हेटर": "Rotavator",
    "कल्टिव्हेटर": "Cultivator",
    "सीडर": "Seeder",
    "पेरणी यंत्र": "Seeder",
    "स्प्रेअर": "Sprayer",
    "फवारणी यंत्र": "Sprayer",
    "वॉटर पंप": "Water Pump",
    "हार्वेस्टर": "Harvester"
};

try {
    const inputPath = path.join(__dirname, 'public', 'farmer.xlsx');
    const workbook = XLSX.readFile(inputPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const translatedData = jsonData.map(row => {
        let newRow = {};
        for (let key in row) {
            let newKey = translationMap[key] || key;
            let val = row[key];

            // Translate the value if it exists in our map
            if (typeof val === 'string') {
                for (let mrth in valueTranslation) {
                    if (val.includes(mrth)) {
                        val = valueTranslation[mrth];
                        break;
                    }
                }
            }
            newRow[newKey] = val;
        }
        // Ensure Price exists (since it wasn't in Marathi headers, maybe add a default)
        if (!newRow.Price) {
            newRow.Price = Math.floor(Math.random() * (1500 - 400 + 1)) + 400; // Mock prices
        }
        return newRow;
    });

    const newWs = XLSX.utils.json_to_sheet(translatedData);
    const newWb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWb, newWs, "Farmers");
    XLSX.writeFile(newWb, inputPath);
    console.log('Conversion successful!');
} catch (error) {
    console.error('Conversion failed:', error.message);
}
