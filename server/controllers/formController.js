const formData = require("../models/formModel");

module.exports.postFormData = async (req, res) => {
  try {
    const {
      name,
      age,
      sex,
      city,
      state,
      idType,
      id,
      email,
      emergency,
      address,
      bloodGroup,
      country,
      guardian,
      guardianName,
      martialStatus,
      mobile,
      nationality,
      occupation,
      pincode,
      religion,
    } = req.body;

    if(!name || !sex || !age) {
        return res.status(409).send('Invalid Input')
    }
    const newData = new formData ({
      name,
      age,
      sex,
      city,
      state,
      idType,
      id,
      email,
      emergency,
      address,
      bloodGroup,
      guardian,
      guardianName,
      martialStatus,
      mobile,
      nationality,
      occupation,
      pincode,
      religion,
    });
    await newData.save();
    res.status(200).json(newData);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getFormData = async(req, res) => {
  try {
    const details = await formData.find();
    res.status(200).json(details);
  } catch (error) {
    console.log(error)
  }
}