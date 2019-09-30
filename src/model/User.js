import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: String,
  email: {
    type: String, 
    unique: true
  },
  age: Number
})

const User = model('User', userSchema)

export default User;