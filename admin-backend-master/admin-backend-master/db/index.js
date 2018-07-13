const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const nconf = require('nconf');

//* *** CAUTION ****** //
const destroyDatabase = false;

const sequelize = new Sequelize(
  nconf.get('database:mysql:db'),
  nconf.get('database:mysql:user'),
  nconf.get('database:mysql:password'), {
    host: nconf.get('database:mysql:host'),
    port: nconf.get('database:mysql:port'),
    dialect: 'mysql',
    omitNull: true,
    logging: nconf.get('database:mysql:logging'),
  },
);

const db = {};

fs.readdirSync(path.join(__dirname, 'models'))
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'graph'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, 'models', file));
    db[model.name] = model;
  });

// define your relatinoships here
db.config.belongsTo(db.availableConfig);
db.config.belongsTo(db.region);

if (process.env.NODE_ENV === 'development' && destroyDatabase) {
  sequelize.sync({ force: true }).then(() => {
    db.region.bulkCreate([
      { id: 1, name: 'devssc' },
      { id: 2, name: 'torontossc' },
    ]);

    db.availableConfig.bulkCreate([
      { key: 'centralDomain' },
      { key: 'siteCityArea' },
      { key: 'phoneNumber', inputType: 'phone' },
      { key: 'phoneNumberTop', inputType: 'phone' },
      { key: 'twitterUrl', inputType: 'handle' },
      { key: 'facebookFanUrl', inputType: 'url' },
      { key: 'facebookHandle', inputType: 'handle' },
      { key: 'siteGoogleAnalytics' },
      { key: 'sitePublicTransit', inputType: 'url' },
      { key: 'siteInstagramUrl', inputType: 'url' },
      { key: 'siteInstagramName' },
      { key: 'helpPhoneNumber', inputType: 'phone' },
      { key: 'helpPhone', inputType: 'phone' },
      { key: 'siteSecureAccounting' },
      { key: 'siteAllowDestroyShoppingCarts', inputType: 'pipe' },
      { key: 'siteAllowDirectRegistration', inputType: 'pipe' },
      { key: 'siteAllowTransactionSummary', inputType: 'pipe' },
      { key: 'siteDenyAssumeProfile', inputType: 'pipe' },
      { key: 'siteAllowUserList', inputType: 'comma' },
      { key: 'leagueForceCurrent', inputType: 'comma' },
      { key: 'leagueIceHockeyLeagueIDs', inputType: 'comma' },
      { key: 'leagueEnablePlayerCard', inputType: 'comma' },
      { key: 'elfBoss', inputType: 'comma' },
      { key: 'ecBoss', inputType: 'comma' },
      { key: 'ecReportEmail', inputType: 'comma' },
      { key: 'ecFinance', inputType: 'comma' },
      { key: 'ecDirector', inputType: 'comma' },
      { key: 'bugDefaultUser', inputType: 'comma' },
      { key: 'refundApprovalUserIDs_Low', inputType: 'comma' },
      { key: 'refundApprovalUserIDs_High', inputType: 'comma' },
      { key: 'creditApprovalUserIDs_Low', inputType: 'comma' },
      { key: 'creditApprovalUserIDs_High', inputType: 'comma' },
      { key: 'giftcertApprovalUserIDs_Low', inputType: 'comma' },
      { key: 'giftcertApprovalUserIDs_High', inputType: 'comma' },
      { key: 'scoreAUTOAPPROVE_USERID', inputType: 'comma' },
      { key: 'scoreLOW_SPIRIT_NOTIFICATION' },
      { key: 'agCOOKIEDOMAIN', inputType: 'url' },
      { key: 'agSUPPORTEMAIL', inputType: 'email' },
      { key: 'agMESSAGEEMAIL', inputType: 'email' },
      { key: 'agMERCHANTEMAIL', inputType: 'email' },
      { key: 'agDONOTREPLYMAIL', inputType: 'email' },
      { key: 'agPAYMENTEMAIL', inputType: 'email' },
      { key: 'agINJURYREPORTEMAIL', inputType: 'email' },
      { key: 'agINCIDENTREPORTEMAIL', inputType: 'email' },
      { key: 'agSENDPAYMENTEMAILTOADMIN', inputType: 'email' },
      { key: 'agABUSEEMAIL', inputType: 'email' },
      { key: 'agBOUNCEEMAIL', inputType: 'email' },
      { key: 'agREFERSENDEMAIL', inputType: 'email' },
      { key: 'agREFERREPLYEMAIL', inputType: 'email' },
      { key: 'agREFERRALFROMEMAIL', inputType: 'email' },
      { key: 'regPendingStatusMessage' },
      { key: 'agMONERISORDERPREFIX' },
      { key: 'agMONERISCUSTOMERPREFIX', inputType: 'prefix' },
      { key: 'GOOGLE_API_KEY' },
    ]);
  });
}

module.exports = db;
