const Listing=require("../models/listing.js");
const { cloudinary } = require('../cloudconfig');


/*module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index",{allListings});
}*/

module.exports.renderNewForm=(req,res)=>{
   
    
    res.render("listings/new");

}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",
        populate:{
        path:"author",
        
    }
})
.populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show",{listing});

}
module.exports.createListing = async (req, res, next) => {
    let { title, description, price, country, location } = req.body.Listing;
    let url = req.file.path;
    let filename = req.file.filename;
    let category = req.body.Listing.category; // Extract category from req.body
    
    const newListing = new Listing({
        title,
        description,
        price,
        country,
        location,
        category, // Assign category to the new listing
        owner: req.user._id,
        image: { url, filename }
    });

    await newListing.save();
    req.flash("success", "New Listing Created!");
    
    res.redirect("/listings");
}

module.exports.filterByCategory = async (req, res) => {
    const { category, q } = req.query;
    let filter = {};
    let listings;

    if (q) {
        // Case-insensitive regex search for the title
        const regex = new RegExp(q, 'i');
        filter.title = regex;
    }

    if (category) {
        filter.category = category;
    }

    listings = await Listing.find(filter);

    res.render('listings/index', { listings, searchQuery: q });
};


   module.exports.renderEditForm=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let original_image=listing.image.url;
    original_image=original_image.replace("/upload","/upload/w_250");
    res.render("listings/edit",{listing,original_image});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    
   let listing =await Listing.findByIdAndUpdate(id,{...req.body.Listing});
  if(typeof req.file!=="undefined"){
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image={url,filename};
   await listing.save();
  }
   req.flash("success","Listing Updated");
   
   res.redirect(`/listings/${id}`);


}
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!")
    res.redirect("/listings");

}