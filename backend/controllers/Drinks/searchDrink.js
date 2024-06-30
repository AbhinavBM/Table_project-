const Drink = require('../../mongodb/schemas/drinks'); // Assuming your model is in a separate file


const DrinkSearch = async (req, res) => {
    const keyword = req.params.keyword;

    try {
        const results = await Drink.find({
            foodName: {
                $regex: new RegExp(keyword, 'i'), // 'i' flag makes the search case-insensitive
            },
        });
        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = DrinkSearch; 
