const { Table } = require("../../mongodb/schemas/schemas");
//add tables
const setTables = async (req, res) => {


  const table = new Table({
    tableNo: req.body.tableNo,
    active:req.body.active,
    maxPeople:req.body.maxPeople,
 
  });

  try {
    const result = await table.save();

    console.log(result);
    res.status(200).json({ message: "Successfully Saved a Table!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = setTables;