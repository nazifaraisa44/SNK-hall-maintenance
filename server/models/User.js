import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    room: {type: String, required: true},
    present: {type: String, required: true},
    parent: {type: String, required: true},

})

const UserModel = mongoose.model("User", UserSchema)

export {UserModel as User}