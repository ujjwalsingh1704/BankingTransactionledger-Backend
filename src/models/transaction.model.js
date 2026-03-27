const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({

  amount:{
    type:Number,
    required:[true,"Amount is required"]
  },
  Status:{
    type:String,
    enum:{
      values:["PENDING","COMPLETED","FAILED","REVERSED"],
      message:"Status must be PENDING, COMPLETED, FAILED, or REVERSED",
  },
 default:"PENDING"}, 

  fromAccount:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"account",
    required:[true,"Transaction must be associated with a from account"],
    index:true
  },

  toAccount:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"account",
    required:[true,"ToAccount is required"],
    index: true
  },

  idempotencyKey:{
    type:String,
    required:[true,"Idempotency key is required"],
    index: true,
    unique: true
  }
} ,{
  timestamps:"true"
})


const transactionModel = mongoose.model("transaction",transactionSchema);
module.exports = transactionModel;