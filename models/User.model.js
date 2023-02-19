const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    const user = this
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
    next()
})

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

const User = mongoose.model('user', userSchema)

module.exports = User