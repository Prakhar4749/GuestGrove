const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    //passport-local-mongoose automaticaly generates the username, hashed password, salt

});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);