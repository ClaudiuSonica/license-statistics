const express = require('express');
const router = express.Router();
const Mother = require('./models/Mother');

// GET all mothers with their baby data
router.get('/mothers', async (req, res) => {
    try {
        const mothers = await Mother.find();
        res.json(mothers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new mother (with baby data)
router.post('/mothers', async (req, res) => {
    try {
        const newMother = new Mother(req.body);
        const savedMother = await newMother.save();
        res.status(201).json(savedMother);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
