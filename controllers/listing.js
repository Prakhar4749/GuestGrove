const Listing=require("../models/listing");

module.exports.index=async(req,res)=>{
    let allListings=await Listing.find();
    res.render("./listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
    console.log(req.user);
    
    res.render("./listings/new.ejs")
}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for doesn't exist");
        res.redirect("/listings")
    }
    // console.log(listing);
    res.render("./listings/show",{listing});
}

module.exports.createListing=async(req,res,next)=>{
        let url=req.file.path;
        let filename=req.file.filename;
        console.log(url,"..",filename)
        const newListing=new Listing(req.body.listing);
        console.log(req.body.listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        await newListing.save();
        req.flash("success","New Listing Created");
        res.redirect("/listings");

    // const listingData = req.body.listing;

    // Agar image string hai, to object banao
    // if (listingData.image && typeof listingData.image === "string") {
    //     listingData.image = { url: listingData.image };
    // }
    // let url=req.file.path;
    // filename=req.file.filename;
    // console.log(url,"..",filename)
    // listingData.image = { url: url };
    // const newListing = new Listing(listingData);
    // newListing.owner=req.user._id;
    // await newListing.save();
    // console.log(req.body.listing);
    // req.flash("success", "New Listing Created");
    // res.redirect("/listings");
}

module.exports.editListing=async(req,res)=>{
    
    let {id}=req.params;
    const listing=await Listing.findById(id);
    let ogUrl=listing.image.url;
    ogUrl.replace("/upload","/upload/h_300,w_250");
    res.render("./listings/edit",{listing,ogUrl});
}

module.exports.updateRoute=async(req,res)=>{

//---------------------------------------------
   console.log("BODY",req.body);
   console.log("FILE",req.file)
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
    req.flash("success","listing updated!!");
    res.redirect(`/listings/${id}`)
 //-------------------------------------------------   
    // let { id } = req.params;
    
    // let existingListing = await Listing.findById(id);
    
    // if (!existingListing) {
    //     return res.status(404).send("Listing not found");
    // }
    
    // let updatedData = { ...req.body.listing };

    // // Preserve old image if no new image URL is provided
    // if (!req.body.listing.image || req.body.listing.image.url.trim()) {
    //     updatedData.image = existingListing.image; // Retain old image
    // } else {
    //     updatedData.image = { url: req.body.listing.image.url }; // Update image URL
    // }

    // await Listing.findByIdAndUpdate(id, updatedData, { new: true });

    // console.log("Updated Data:", req.body);
    // res.redirect(`/listings/${id}`);

    
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);  
    console.log(deletedListing);
    req.flash("success","listing Deleted")
    res.redirect("/listings");
}

