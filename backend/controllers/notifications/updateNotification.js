const Notification = require('../../mongodb/schemas/notifications');

const deleteNotification = async (req, res) => {
  try {
    const { notification_id } = req.params;

    if (!notification_id) {
      return res.status(400).json({ message: 'Notification ID is required.' });
    }

    const notification = await Notification.findOne({ notification_id });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    // Delete the notification
    await Notification.deleteOne({ notification_id });

    return res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = deleteNotification;
