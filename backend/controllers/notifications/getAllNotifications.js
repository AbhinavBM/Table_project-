const { Notification } = require('../../mongodb/schemas/schemas');

const getAllNotifications = async (req, res) => {
    try {
      console.log("Before fetching notifications");
      const notifications = await Notification.find({});
      console.log("Fetched notifications:", notifications);
      
      const filteredNotifications = notifications.filter(notification => notification.stillActive === "yes");
      console.log("Filtered notifications:", filteredNotifications);
      
      

        res.status(200).json({ notifications: filteredNotifications });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notifications" });
    }
}

module.exports = getAllNotifications;
