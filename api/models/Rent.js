/**
 * Income.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name          :{type:'json',columnType: 'array'},
    firm          :{type:'string'},
    address       :{type:'string'},
    phone         :{type:'string'},
    car           :{type:'json',columnType: 'array'},
    kmtaken       :{type:'string'},   
    kmreturned    :{type:'string'},
    carFirm       :{type:'string'},
    from          :{type:'string'},
    fhr           :{type:'string'},
    due           :{type:'string'},
    sum           :{type:'string'},
    deposit       :{type:'string'},
    cashed        :{type:'boolean'},
  },

};

