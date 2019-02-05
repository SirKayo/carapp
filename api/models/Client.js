/**
 * Client.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name        :{ type:'string'},
    firm        :{ type:'string'},
    bulstat     :{ type:'number'},
    mol         :{ type:'string'},
    address     :{ type:'string'},
    licenseID   :{ type:'string'},
    licenseDate :{ type:'string'},
    licenseMVR  :{ type:'string'},
    phone       :{ type:'string'},
    email       :{ type:'string'}
  },

};

