/**
 * ExpenseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list:function(req,res){
        Expense.find({}).exec(function(err,list){
            res.view('pages/expensePage',{Expense:list});
        });
        
    }

};

