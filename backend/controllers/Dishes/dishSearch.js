const Food = require('../../mongodb/schemas/Food'); 


const FoodSearch = async (req, res) => {
    const keyword = req.params.keyword;

    try {
        const results = await Food.find({
            foodName: {
                $regex: new RegExp(keyword, 'i'), 
            },
        });
        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = FoodSearch; 
