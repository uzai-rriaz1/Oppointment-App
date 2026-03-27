import mongoose, { Schema } from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  oppointments:{
    type:Object,
    
  }
  
});
