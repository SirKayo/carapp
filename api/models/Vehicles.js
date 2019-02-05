/**
 * Vehicles.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    brand         :{type:'string'},
    model         :{type:'string'},
    licenseNumber :{type:'string', unique: true},
    type          :{type:'string'},
    mileage       :{type:'string'},
    validityCit   :{type:'string'},
    validityAuto  :{type:'string'},
    annual        :{type:'string'},
    gravg         :{type:'string'},
    lastSw        :{type:'string'},
    chassis       :{type:'string'},
    spendNorm     :{type:'string'},
    reservoir     :{type:'string'},
    etc           :{type:'string'},
    events:       {collection: 'event', via:'vehicle'}
  }

};

