// utils/excelGenerator.js
const ExcelJS = require('exceljs');

async function generateExcel(data, res) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Mamele');

    // Define columns for both mother and baby
    worksheet.columns = [
        // Mother columns
        { header: 'Mother Name', key: 'motherName', width: 20 },
        { header: 'Mother Age', key: 'motherAge', width: 10 },
        { header: 'Mother Weight (kg)', key: 'motherWeight', width: 15 },
        { header: 'Mother Height (cm)', key: 'motherHeight', width: 15 },
        { header: 'Gestation (wks)', key: 'gestation', width: 15 },
        { header: 'Parity', key: 'parity', width: 10 },
        { header: 'Environment', key: 'environment', width: 15 },
        { header: 'Education', key: 'education', width: 15 },
        { header: 'History Premature Birth', key: 'historyPrematureBirth', width: 20 },
        { header: 'Pregnancy Complication - HTA', key: 'pregnancyHTA', width: 10 },
        { header: 'Pregnancy Complication - Diabetes', key: 'pregnancyDiabetes', width: 10 },
        { header: 'Pregnancy Complication - Hypothyroidism', key: 'pregnancyHypothyroidism', width: 15 },
        { header: 'Pregnancy Complication - IUGR', key: 'pregnancyIUGR', width: 10 },
        { header: 'Pregnancy Complication - Macrosomia', key: 'pregnancyMacrosomia', width: 15 },
        { header: 'Pregnancy Age at Admission (wks)', key: 'pregnancyAgeAtAdmission', width: 20 },
        { header: 'Delivery Mode', key: 'deliveryMode', width: 15 },
        { header: 'Caesarean Indications', key: 'caesareanIndications', width: 25 },
        { header: 'Postpartum Complications', key: 'postpartumComplications', width: 25 },

        // Baby columns
        { header: 'Baby Name', key: 'babyName', width: 20 },
        { header: 'Baby Birth Date', key: 'babyBirthDate', width: 20 },
        { header: 'Baby Weight (kg)', key: 'babyWeight', width: 15 },
        { header: 'Baby Length (cm)', key: 'babyLength', width: 15 },
        { header: 'Head Circumference (cm)', key: 'babyHeadCircumference', width: 15 },
        { header: 'Chest Circumference (cm)', key: 'babyChestCircumference', width: 15 },
        { header: 'Baby Age (wks)', key: 'babyAgeWeeks', width: 10 },
        { header: 'Hospitalization Days', key: 'hospitalizationDays', width: 15 },
        { header: 'Intensive Care', key: 'intensiveCare', width: 15 },
        { header: 'Baby Complications', key: 'babyComplications', width: 25 },
        { header: 'Antibiotic Treatment', key: 'antibioticTreatment', width: 20 },
        { header: 'Antibiotic Days', key: 'antibioticDays', width: 15 }
    ];

    // Populate worksheet rows
    data.forEach(mama => {
        worksheet.addRow({
            motherName: mama.name,
            motherAge: mama.age,
            motherWeight: mama.weight,
            motherHeight: mama.height,
            gestation: mama.gestation,
            parity: mama.parity,
            environment: mama.environment,
            education: mama.education,
            historyPrematureBirth: mama.historyPrematureBirth ? 'Yes' : 'No',
            pregnancyHTA: mama.pregnancyComplications?.HTA ? 'Yes' : 'No',
            pregnancyDiabetes: mama.pregnancyComplications?.diabetes ? 'Yes' : 'No',
            pregnancyHypothyroidism: mama.pregnancyComplications?.hypothyroidism ? 'Yes' : 'No',
            pregnancyIUGR: mama.pregnancyComplications?.IUGR ? 'Yes' : 'No',
            pregnancyMacrosomia: mama.pregnancyComplications?.macrosomia ? 'Yes' : 'No',
            pregnancyAgeAtAdmission: mama.pregnancyAgeAtAdmission,
            deliveryMode: mama.deliveryMode,
            caesareanIndications: Array.isArray(mama.caesareanIndications) ? mama.caesareanIndications.join(', ') : '',
            postpartumComplications: Array.isArray(mama.postpartumComplications) ? mama.postpartumComplications.join(', ') : '',
            babyName: mama.baby ? mama.baby.name : '',
            babyBirthDate: mama.baby ? new Date(mama.baby.birthDate).toLocaleDateString() : '',
            babyWeight: mama.baby ? mama.baby.weight : '',
            babyLength: mama.baby ? mama.baby.length : '',
            babyHeadCircumference: mama.baby ? mama.baby.headCircumference : '',
            babyChestCircumference: mama.baby ? mama.baby.chestCircumference : '',
            babyAgeWeeks: mama.baby ? mama.baby.ageWeeks : '',
            hospitalizationDays: mama.baby ? mama.baby.hospitalizationDays : '',
            intensiveCare: mama.baby?.intensiveCare ? 'Yes' : 'No',
            babyComplications: mama.baby && Array.isArray(mama.baby.complications) ? mama.baby.complications.join(', ') : '',
            antibioticTreatment: mama.baby?.antibioticTreatment ? 'Yes' : 'No',
            antibioticDays: mama.baby ? mama.baby.antibioticDays : ''
        });
    });

    // Set response headers for file download
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=mamele.xlsx');

    // Write the workbook to the response
    await workbook.xlsx.write(res);
    res.end();
}

module.exports = { generateExcel };
