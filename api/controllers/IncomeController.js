/**
 * IncomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list:function(req,res){
        Income.find({}).exec(function(err,list){
            res.view('pages/incomePage',{Incomes:list});
        });
    }
};

