/**
 * InquariesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    list:function(req,res){
        if(!req.params.dates) {
            fromDate = new Date("2017-11-20").toISOString().slice(0,10);
            toDate = new Date("2017-12-10").toISOString().slice(0,10);
        } else {
            fromDate = req.params.dates[0];
            toDate =req.params.dates[1];

        }
        Income.findOne({date:fromDate}).then(function(data){
            inc = Income.find({
                where: {
                    date: {
                        '>=': fromDate,
                        '<=': toDate
                    }
                }
            }).then(function(list){
                return list;
            })
            exp = Expense.find({
                where: { 
                    date: {
                        '>=': fromDate,
                        '<=': toDate
                    }
                }
            }).then(function(list){
                return list;
            })
            return [inc, exp]
        })
        .spread(function(inc, exp) {
            res.view('pages/inquariesPage',{Incomes:inc, Expense: exp});
        });
        //Black magic fuckery 
    }
};

