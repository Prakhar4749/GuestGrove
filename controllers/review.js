const Review=require("../models/review.js");
const Listing=require("../models/listing.js")

module.exports.createReview=async(req,res)=>{
    let { id } = req.params;
   let listing= await Listing.findById(req.params.id);
   let newReviews=new Review(req.body.review);
   newReviews.author=req.user._id;
   console.log(newReviews.author);
   listing.reviews.push(newReviews);

   await newReviews.save();
   await listing.save();
   console.log("new review saved");
   req.flash("success","New review added");
   res.redirect(`/listings/${id}`);

}

module.exports.destroyReview=async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted")
    res.redirect(`/listings/${id}`);
}