const { Tax } = require("../../mongodb/schemas/schemas");
const getTax = async (req, res) => {
    try {
        const taxDocument = await Tax.findOne({});
        res.json(taxDocument);
    } catch (error) {
        res.status(500).json({ error: "Error getting tax" });
    }
};

module.exports = getTax;