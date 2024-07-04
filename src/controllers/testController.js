const axios = require('axios');
const Test = require('../models/testModel');

// Fetch data from external API and store in MongoDB
exports.fetchAndStoreTestProducts = async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const products = response.data;

        await Test.insertMany(products);

        res.json({ msg: 'Products fetched and stored in database' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all products
exports.getTestProducts = async (req, res) => {
    try {
        const products = await Test.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};