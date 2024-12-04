import mongoose from "mongoose";

const aboutSchems= new mongoose.Schema({
    description:{
        type:String,
        required:true,
        unique:true,
        minLenght:3
    },
    image:{
        type:String,
        require:true
    },
    mission:{
        type:String,
        required:false,
        unique:false,
        minLenght:3
    },
    vision:{
        type:String,
        required:false,
        unique:false,
        minLenght:3
    },
})
const AboutUs = mongoose.model('About-Us', aboutSchems)
export default AboutUs