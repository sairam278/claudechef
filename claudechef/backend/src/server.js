const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getRecipeFromMistral } = require('./ai');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/recipe', async (req, res) => {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Ingredients must be a non-empty array.' });
    }

    try {
        const recipe = await getRecipeFromMistral(ingredients);
        res.json({ recipe });
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            ingredients: ingredients
        });
        res.status(500).json({ error: error.message || 'Failed to generate recipe.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
