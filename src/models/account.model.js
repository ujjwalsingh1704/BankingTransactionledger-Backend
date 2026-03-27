const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");

const accountSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: [ true , "user is required"],
    index: true
  }, 

status: {
  type: String,
  enum: {
    values: ["active", "inactive", "suspended"],
    message: "status must be active, inactive, or suspended"
  },
  default: "active",
  required: true
} ,

currency:{
  type: String,
  required: [true , "currency is required for creating an account"],
  default: "INR"
}
 
}, {
  timestamps: true
});

accountSchema.index({user:1 , status:1}, {unique:true , partialFilterExpression: { status: "active" }})

accountSchema.methods.getBalance = async function(){
  const balanceData = await ledgerModel.aggregate([
    {
      $match: {
        account: this._id
      }
    },
    {
      $group: {
        _id: null,
        totalDebit: {
          $sum: {
            $cond: [
              { $eq: ["$type", "DEBIT"] },
              "$amount",
              0
            ]
          }
        },
        totalCredit: {
          $sum: {
            $cond: [
              { $eq: ["$type", "CREDIT"] },
              "$amount",
              0
            ]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        balance: { $subtract: [ "$totalCredit" , "$totalDebit"] }
      }
    }
  ]);

   if ( balanceData.length === 0){
    return 0;
   }
   return balanceData[0].balance;
}

  

const accountModel = mongoose.model("account", accountSchema);
module.exports = accountModel;
