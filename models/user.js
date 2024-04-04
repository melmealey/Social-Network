const {Schema, model} = require('mongoose')
const { userSchema } = require('.')

const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trimmed: true },
    email: {type: String, required: true, unique: true},
    thoughts: ['_id'] ,
    friends: ['_id'] ,
})

const User = model('user', userSchema)

module.exports = User