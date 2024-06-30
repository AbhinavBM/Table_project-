const { Notification } = require('../../mongodb/schemas/schemas');

const getNotificationsByTableNo = async (req, res) => {
    try {
        const { tableNo } = req.params;

        const notifications = await Notification.find({ tableNo });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notifications" });
    }
}

module.exports = getNotificationsByTableNo;
