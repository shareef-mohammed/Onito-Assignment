const mongoose = require('mongoose');
const connectdb = async() => {
    await mongoose.connect(process.env.MONG_URI)
        .then(() => {
            console.log('Database connected')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectdb;