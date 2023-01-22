//Require
const mongoose = require('mongoose');

//Schema
const Users = new mongoose.Schema({
    Firstname :{
        type: String,
        collection: String
    },
    Lastname :{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required : true
    },
    Password:{
        type: String,
        required : true
    },
    Phone:{
        type: String,
        required : true
    },
    Mobile:{
        type: String,
        required : true
    },
    Address:{
        type: String,
        required : true
    },
    Address_2:{
        type: String,
        required : true
    },
    City:{
        type: String,
        required : true
    },
    State:{
        type: String,
        required : true
    },
    Zip:{
        type: String,
        required : true
    }
},{timestamps : true})

//Export;
module.exports = mongoose.model('Users',Users,"User_Data");

