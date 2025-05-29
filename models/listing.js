const mongoose = require("mongoose");
const review = require("./review");
const Schema= mongoose.Schema;
const Review=require("./review.js");
const { string } = require("joi");

const listingSchema = new Schema({
    title:{
    type:String,
    required:true,
    },
    description:String,
    // image:{
    //   type:String,
    //     default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F60306082500670850%2F&psig=AOvVaw0gH8BiPSXvs5MYP0wmlt1f&ust=1739005342384000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDnm--ZsYsDFQAAAAAdAAAAABAE",
    //   set:(v)=>v===""?" https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F60306082500670850%2F&psig=AOvVaw0gH8BiPSXvs5MYP0wmlt1f&ust=1739005342384000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDnm--ZsYsDFQAAAAAdAAAAABAE ":v,
    // },
    image: {
        url:String,
        filename:String
    },

    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete",async(Listing)=>{
    if(Listing){
        await Review.deleteMany({_id:{$in: Listing.reviews}});

    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;


