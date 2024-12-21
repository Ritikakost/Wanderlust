const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require('../models/listing.js');
const {isLoggedIn,isOwner,ValidateListing}=require("../middleware.js");
const ListingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });




router.route("/")
.get(wrapAsync(ListingController.filterByCategory))
.post(isLoggedIn,upload.single('Listing[image]'),ValidateListing,wrapAsync(ListingController.createListing));
//.post(upload.single("Listing[image]"),(req,res)=>{
//res.send(req.file);
//})


//New Route
router.get("/new",isLoggedIn,ListingController.renderNewForm);


router.route("/:id")
.put(isLoggedIn,isOwner,upload.single('Listing[image]'),ValidateListing,wrapAsync(ListingController.updateListing))
.get(wrapAsync(ListingController.showListing))
.delete(isLoggedIn,isOwner,wrapAsync(ListingController.destroyListing));








// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditForm));

module.exports=router;