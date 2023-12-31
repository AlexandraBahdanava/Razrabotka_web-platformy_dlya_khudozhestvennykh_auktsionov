var DataTypes = require("sequelize").DataTypes;
var _Artists = require("./Artists");
var _AuctionArchive = require("./AuctionArchive");
var _Auctions = require("./Auctions");
var _AuthorizationData = require("./AuthorizationData");
var _Collectors = require("./Collectors");
var _ExhibitedPaintings = require("./ExhibitedPaintings");
var _Exhibitions = require("./Exhibitions");
var _FeaturedArtists = require("./FeaturedArtists");
var _Portfolio = require("./Portfolio");
var _Rates = require("./Rates");
var _Reviews = require("./Reviews");

function initModels(sequelize) {
  var Artists = _Artists(sequelize, DataTypes);
  var AuctionArchive = _AuctionArchive(sequelize, DataTypes);
  var Auctions = _Auctions(sequelize, DataTypes);
  var AuthorizationData = _AuthorizationData(sequelize, DataTypes);
  var Collectors = _Collectors(sequelize, DataTypes);
  var ExhibitedPaintings = _ExhibitedPaintings(sequelize, DataTypes);
  var Exhibitions = _Exhibitions(sequelize, DataTypes);
  var FeaturedArtists = _FeaturedArtists(sequelize, DataTypes);
  var Portfolio = _Portfolio(sequelize, DataTypes);
  var Rates = _Rates(sequelize, DataTypes);
  var Reviews = _Reviews(sequelize, DataTypes);

  Artists.belongsToMany(Collectors, { through: FeaturedArtists});
  Artists.belongsToMany(Exhibitions, {through: ExhibitedPaintings});
  Collectors.belongsToMany(Artists, { through: FeaturedArtists});
  Exhibitions.belongsToMany(Artists, {through: ExhibitedPaintings});

  AuctionArchive.belongsTo(Artists);
  Artists.hasMany(AuctionArchive);

  Auctions.belongsTo(Artists);
  Artists.hasMany(Auctions);

  ExhibitedPaintings.belongsTo(Artists);
  Artists.hasMany(ExhibitedPaintings);

  FeaturedArtists.belongsTo(Artists);
  Artists.hasMany(FeaturedArtists);

  Portfolio.belongsTo(Artists);
  Artists.hasMany(Portfolio);

  Reviews.belongsTo(Artists);
  Artists.hasMany(Reviews);

  Rates.belongsTo(Auctions);
  Auctions.hasMany(Rates);

  Artists.belongsTo(AuthorizationData);
  AuthorizationData.hasMany(Artists);

  Collectors.belongsTo(AuthorizationData);
  AuthorizationData.hasMany(Collectors);

  FeaturedArtists.belongsTo(Collectors);
  Collectors.hasMany(FeaturedArtists);

  Rates.belongsTo(Collectors);
  Collectors.hasMany(Rates);

  Reviews.belongsTo(Collectors);
  Collectors.hasMany(Reviews);
  
  ExhibitedPaintings.belongsTo(Exhibitions);
  Exhibitions.hasMany(ExhibitedPaintings);

  return {
    Artists,
    AuctionArchive,
    Auctions,
    AuthorizationData,
    Collectors,
    ExhibitedPaintings,
    Exhibitions,
    FeaturedArtists,
    Portfolio,
    Rates,
    Reviews,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
