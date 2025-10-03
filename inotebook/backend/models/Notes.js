const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const connectToMongo = require('../dbConnect');
const {Schema} = mongoose;


const NotesSchema = new mongoose.Schema({
    // user will act as a foreign key for Notes Schema to uniquely identify which notes belongs to which user 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true,
        unique: true
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Notes' , NotesSchema);