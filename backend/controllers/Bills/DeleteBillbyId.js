const schemas = require("../../mongodb/schemas/schemas");

const DeleteBillById = async (req, res) => {
  const { bills_id } = req.params;

  try {
    const billToDelete = await schemas.Bills.findOne({ bills_id });

    if (!billToDelete) {
      return res.status(404).json({ message: "Bill not found." });
    }

    if (billToDelete.drinkBillpaid !== "paid" || billToDelete.foodBillpaid !== "paid") {
      return res.status(400).json({ message: "Cannot delete bill with unpaid items." });
    }

    const ordersDeleted = await schemas.Orders.deleteMany({ otp: billToDelete.otp });

    const otpVerifyData = await schemas.OtpVerify.find({ otp: billToDelete.otp });
    // const userIdsToUpdate = otpVerifyData.map((item) => item.user_id);

    // await schemas.User.updateMany(
    //   { user_id: { $in: userIdsToUpdate } },
    //   { $set: { userStatus: "2" } }
    // );
    const usersToDelete = await schemas.User.find({ user_id: billToDelete.user_id  });

    if (!usersToDelete || usersToDelete.length === 0) {
      return res.status(404).json({ message: "No users found with the specified user_id." });
    }
    const deleteResult = await schemas.User.deleteOne({ user_id: billToDelete.user_id  });
 

    await schemas.OtpVerify.deleteMany({ otp: billToDelete.otp });
    billToDelete.clear = "1";

   const bills =  await billToDelete.save();


  
    const response = {
      message: "Bill deleted successfully+Users deleted successfully..",
      ordersDeleted,
      otpVerifyEntriesDeleted: otpVerifyData.length,
     //updatedUserIds: userIdsToUpdate,
      bills,     usersDeleted: deleteResult.deletedCount,

    };
    console.log(response);  

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = DeleteBillById;
