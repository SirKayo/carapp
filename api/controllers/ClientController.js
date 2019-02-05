/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list:function(req,res){
        Client.find({}).exec(function(err,list){
            res.view('pages/clientPage',{Clients:list});
        });
    }
};

