const schemas = require("../../mongodb/schemas/schemas");

const SetBills=  async(req,res)=>{
    try{
        const bills =  new schemas.Bills(req.body);
        const result = await bills.save();
        console.log(result);

        res.status(200).json({ result });
    }
    catch(error){
        console.error(error);
                res.status(400).json({ message: error.message });


    }


};
module.exports =  SetBills;