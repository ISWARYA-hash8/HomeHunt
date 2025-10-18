import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {                     
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avata :{
    type:String,
    default : "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
