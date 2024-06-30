const schemas = require("../../mongodb/schemas/schemas");

const SetMembers=  async(req,res)=>{
    try{
        const members =  new schemas.Members(req.body);
        const result = await members.save();
        console.log(result);

        res.status(200).json({ result });
    }
    catch(error){
        console.error(error);
                res.status(400).json({ message: error.message });
    }
};
module.exports =  SetMembers;