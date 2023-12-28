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

  Artists.belongsToMany(Collectors, { as: 'collector_id_Collectors', through: FeaturedArtists, foreignKey: "artist_id", otherKey: "collector_id" });
  Artists.belongsToMany(Exhibitions, { as: 'exhibitions_id_Exhibitions', through: ExhibitedPaintings, foreignKey: "artist_id", otherKey: "exhibitions_id" });
  Collectors.belongsToMany(Artists, { as: 'artist_id_Artists_FeaturedArtists', through: FeaturedArtists, foreignKey: "collector_id", otherKey: "artist_id" });
  Exhibitions.belongsToMany(Artists, { as: 'artist_id_Artists', through: ExhibitedPaintings, foreignKey: "exhibitions_id", otherKey: "artist_id" });
  AuctionArchive.belongsTo(Artists, { as: "artist", foreignKey: "artist_id"});
  Artists.hasMany(AuctionArchive, { as: "AuctionArchives", foreignKey: "artist_id"});
  Auctions.belongsTo(Artists, { as: "artist", foreignKey: "artist_id"});
  Artists.hasMany(Auctions, { as: "Auctions", foreignKey: "artist_id"});
  ExhibitedPaintings.belongsTo(Artists, { as: "artist", foreignKey: "artist_id"});
  Artists.hasMany(ExhibitedPaintings, { as: "ExhibitedPaintings", foreignKey: "artist_id"});
  FeaturedArtists.belongsTo(Artists, { as: "artist", foreignKey: "artist_id"});
  Artists.hasMany(FeaturedArtists, { as: "FeaturedArtists", foreignKey: "artist_id"});
  Portfolio.belongsTo(Artists, { as: "artist", foreignKey: "artist_id"});
  Artists.hasMany(Portfolio, { as: "Portfolios", foreignKey: "artist_id"});
  Reviews.belongsTo(Artists, { as: "artist", foreignKey: "artist_id"});
  Artists.hasMany(Reviews, { as: "Reviews", foreignKey: "artist_id"});
  Rates.belongsTo(Auctions, { as: "auction", foreignKey: "auction_id"});
  Auctions.hasMany(Rates, { as: "Rates", foreignKey: "auction_id"});
  Artists.belongsTo(AuthorizationData, { as: "authorization_datum", foreignKey: "authorization_data_id"});
  AuthorizationData.hasMany(Artists, { as: "Artists", foreignKey: "authorization_data_id"});
  Collectors.belongsTo(AuthorizationData, { as: "authorization_datum", foreignKey: "authorization_data_id"});
  AuthorizationData.hasMany(Collectors, { as: "Collectors", foreignKey: "authorization_data_id"});
  FeaturedArtists.belongsTo(Collectors, { as: "collector", foreignKey: "collector_id"});
  Collectors.hasMany(FeaturedArtists, { as: "FeaturedArtists", foreignKey: "collector_id"});
  Rates.belongsTo(Collectors, { as: "collector", foreignKey: "collector_id"});
  Collectors.hasMany(Rates, { as: "Rates", foreignKey: "collector_id"});
  Reviews.belongsTo(Collectors, { as: "collector", foreignKey: "collector_id"});
  Collectors.hasMany(Reviews, { as: "Reviews", foreignKey: "collector_id"});
  ExhibitedPaintings.belongsTo(Exhibitions, { as: "exhibition", foreignKey: "exhibitions_id"});
  Exhibitions.hasMany(ExhibitedPaintings, { as: "ExhibitedPaintings", foreignKey: "exhibitions_id"});

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
