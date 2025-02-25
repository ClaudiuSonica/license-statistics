const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Baby subdocument schema
const BabySchema = new Schema({
    // Nou-născut fields:
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    weight: { type: Number, required: true },              // Greutate (in kg or grams)
    length: { type: Number, required: true },              // Lungime (in cm)
    headCircumference: { type: Number, required: true },   // Perimetru cranian (in cm)
    chestCircumference: { type: Number, required: true },  // Perimetru toracic (in cm)
    ageWeeks: { type: Number, required: true },            // Vârsta în săptămâni (după scorul Finnstrom)
    hospitalizationDays: { type: Number, required: true }, // Durata internării (în zile)
    intensiveCare: { type: Boolean, default: false },       // Dacă a fost în terapie intensivă
    complications: [{ type: String }],                     // Complicații: "hipoglicemie", "icter", "intoleranță alimentară", "detresă respiratorie"
    antibioticTreatment: { type: Boolean, required: true },  // Tratament antibiotic: da/nu
    antibioticDays: { type: Number }                       // Număr de zile cu antibiotice (opțional)
});

// Define the Mother schema with an embedded Baby document
const MotherSchema = new Schema({
    // Mama fields:
    name: { type: String, required: true },
    age: { type: Number, required: true },                 // Vârsta mamei
    weight: { type: Number, required: true },              // Greutatea mamei
    height: { type: Number, required: true },              // Înălțimea mamei (pentru calcul BMI)
    gestation: { type: Number, required: true },           // Gestatie (săptămâni)
    parity: { type: Number, required: true },              // Paritate (numărul de sarcini)
    environment: { type: String, enum: ['urban', 'rural'], required: true },  // Mediu (urban/rural)
    education: {
        type: String,
        enum: ['none', 'primary', 'middle', 'high', 'university'],
        required: true
    },  // Nivelul de instruire: fără, ciclu primar, gimnazial, liceu, facultate
    historyPrematureBirth: { type: Boolean, default: false },  // Antecedente de naștere prematură
    pregnancyComplications: {
        HTA: { type: Boolean, default: false },           // Hipertensiune arterială
        diabetes: { type: Boolean, default: false },        // Diabet
        hypothyroidism: { type: Boolean, default: false },   // Hipotiroidie
        IUGR: { type: Boolean, default: false },            // Retard de creștere intrauterină
        macrosomia: { type: Boolean, default: false }         // Macrosomie (făt voluminos)
    },
    pregnancyAgeAtAdmission: { type: Number, required: true },  // Vârsta sarcinii la internare (săptămâni)
    deliveryMode: { type: String, enum: ['vaginal', 'caesarean'], required: true },  // Modalitatea de naștere
    caesareanIndications: [{ type: String }],  // Indicatii pentru cezariană: ex. "eșecul declanșării", "suferință fetală", "metroragie", "dezlipirea prematură a placentei", etc.
    postpartumComplications: [{ type: String }],  // Complicații după naștere: ex. "hemoragie", "febra/chorioamniotită", "resturi placentare"

    // Embedded baby document:
    baby: { type: BabySchema, required: true }
});

module.exports = mongoose.model('Mother', MotherSchema);
