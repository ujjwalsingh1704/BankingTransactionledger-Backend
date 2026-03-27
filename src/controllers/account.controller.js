const accountModel = require("../models/account.model");



async function createAccountController(req,res){
  try {

   
    const account = await accountModel.create({user:req.user._id})
    return res.status(201).json({message:"Account created successfully",account})
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function getUserAccountsController(req,res){
  try {
    const accounts = await accountModel.find({user:req.user._id})
    return res.status(200).json({message:"Accounts fetched successfully",accounts})
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function getAccountBalanceController(req, res) {
    const { accountId } = req.params;

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}


module.exports = {
  createAccountController,
  getUserAccountsController,
  getAccountBalanceController

}