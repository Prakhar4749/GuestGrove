const { ref } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const { data: sampleListings } = require("../init/data");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:String,
        filename:String,

    },
    price:{
    type:Number,
    set:(v)=>(!v?500:v),
    },

    location:String,
    country:String,

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],

    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

})

// listingSchema.post("findOneAndDelete",async(listing)=>{
//     await review.deleteMany({_id:{$in:listing.reviews}})
// })

async function insertSampleListings() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    await Listing.deleteMany({});
    await Listing.insertMany(sampleListings);
    console.log("✅ Sample listings inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting listings:", err);
  }
}

if (require.main === module) {
  insertSampleListings();
}

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;

