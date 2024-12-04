import mongoose from "mongoose";

const portfolioSchems= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        minLenght:3
    },
    image:{
        type:String,
        require:true
    },
    

    type:{
        type:String,
        required:true,
        enum:["Magento", "Wordpress", "Drupal"]
    },

    content: { type: String, required: true },



    projectType:{
        type:String,
        enum:["mobile", "web","desktop"]
    },

    branchType:{
        type:String,
    },
    program:{
        type:String,
    },
    

})
const Portfolio = mongoose.model('Portfolio', portfolioSchems)
export default Portfolio