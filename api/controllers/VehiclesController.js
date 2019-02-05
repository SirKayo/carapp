/**
 * VehiclesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list:function(req,res){
        Vehicles.find({}).exec(function(err,vehicle){
            res.view('pages/vehiclePage',{Vehicles:vehicle});
        });
    },

    events:function(req,res){
        if(!req.body.dates) {
            fromDate = new Date().toISOString().slice(0,10);
            toDate = new Date("2017-12-10").toISOString().slice(0,10);
        } else {
            fromDate = req.body.dates[0];
            toDate =req.body.dates[1];
        }
        console.log(req.body.dates);
        Event.find({
            where: {
                date: {
                    '>=': fromDate,
                    '<=': toDate
                }
            }
        }).exec(function(err, list){
            res.json(list)
        })
    }
};

