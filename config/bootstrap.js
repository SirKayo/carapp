/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://NEXT.sailsjs.com/config/bootstrap
 */

 /* global Client */

module.exports.bootstrap = async function(done) {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  //if (await Cliеnt.count() > 2) {
  //   return done();
  // }
  //
  //await Client.createEach([
  //   { name:'Джон Доу', firm:'Агенцията', bulstat:28365283, mol:13243546, address:'пл.Мелмак, ул.Горно Нанадолнище 5', licenseID:'12321',licenseDate:'20.20.2020',licenseMVR:'Мелмак',phone:'0886 69 69 23',email:'email@domain.com' },
  //   { name:'Джaнa Доун', firm:'Офисът', bulstat:13243546, mol:13243546, address:'пл.Мелмак, ул.Долно Нанагорнище 5', licenseID:'32123',licenseDate:'30.30.3030',licenseMVR:'Мелмак',phone:'0887 33 66 99',email:'email@domain.com' },
  // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
