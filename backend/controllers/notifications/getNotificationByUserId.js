const { Notification } = require('../../mongodb/schemas/schemas');

const getNotificationsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        const notifications = await Notification.find({ user_id });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notifications" });
    }
}

module.exports = getNotificationsByUserId;
