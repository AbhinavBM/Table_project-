const { Tax } = require("../../mongodb/schemas/schemas");

const updateTax = async (req, res) => {
    
    const { cgst, sgst, service_tax } = req.body;
    try {
        let tax = await Tax.findOne();
        if (!tax) {
            tax = new Tax({ cgst, sgst, service_tax });
        } else {
            tax.cgst = cgst;
            tax.sgst = sgst;
            tax.service_tax = service_tax;
        }
        await tax.save();
        res.json(tax);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = updateTax;