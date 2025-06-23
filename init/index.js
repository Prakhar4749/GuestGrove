const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then(()=>{
    console.log("connection established successfully");
}).catch(err=>console.log(err));

const initDB=async()=>{
    await Listing.deleteMany({});
    // initdata.data=initdata.data.map((obj)=>({...obj,owner:'67f763bb2eedbe52302e0409'}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialised");
}

initDB();