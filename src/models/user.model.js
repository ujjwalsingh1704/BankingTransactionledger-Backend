 const mongoose = require("mongoose");
const bcrypt =  require("bcryptjs");

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        unique: [true,"name is already taken"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: [true,"email is already taken"],
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,"PASSWORD IS REQUIRED"],
        minlength: [6,"password should be contain more than 6 character"],
        select:false

    },
    systemUser:{
      type: Boolean,
      default: false,
      immutable: true,
      select: false

    }
} ,{
  timestamps:true
})

userschema.pre("save",async function(){
  if(!this.isModified("password")){
    return 
  }
  const hash  = await bcrypt.hash(this.password,10);
  this.password = hash;
  return 

})

userschema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

const userModel = mongoose.model("User",userschema);
module.exports = userModel;
