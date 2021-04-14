const {Schema, model} = require('mongoose')
const userSchma = new Schema({
    name:String,
    email:String,
    admin: Boolean,
    department: String,
    password:String
})
const users = model('users',userSchema)
module.exports = users