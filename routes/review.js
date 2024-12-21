const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require('../models/review.js');
const Listing=require('../models/listing.js');
const {ValidateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const ReviewController=require("../controllers/review.js");
  


//Create Review route
router.post("/",isLoggedIn,ValidateReview,wrapAsync(ReviewController.createReview));
 //Delete  review Route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.destroyReview));

  module.exports=router;
