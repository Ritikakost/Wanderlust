const Listing=require("./models/listing");
const Review=require("./models/review");
const {ListingSchema}=require("./schema.js");
const {ReviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");



module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in!")
         return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    } next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id)
    if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this listing.");
    return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports. ValidateListing=(req,res,next)=>{


    let {error}=ListingSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}
module.exports. ValidateReview=(req,res,next)=>{
    let {error}=ReviewSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let{id}=req.params;
    let {reviewId}=req.params;
    let review=await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
    }
    next();
}