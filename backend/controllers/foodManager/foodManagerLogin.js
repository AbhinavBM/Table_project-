const schemas = require('../../mongodb/schemas/schemas');
const { ValidationError } = require('mongoose');

const FoodManagerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const staff = await schemas.FoodManager.findOne({ email: email});

        if (!staff) {
            return res.status(404).json({
                status: 'failure',
                message: 'Email address not found',
            });
        }

        if (password ===staff.password) {
            return res.status(200).json({
                status: 'success',
                message: 'Successfully authenticated',
                staff });
        } else {
            return res.status(401).json({
                status: 'failure',
                message: 'Wrong email or password',
            });
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
                status: 'failure',
                message: 'Validation error',
                errors: error.errors,
            });
        } else {
            return res.status(500).json({
                status: 'failure',
                message: 'Internal server error',
            });
        }
    }
};

module.exports = FoodManagerLogin;
