const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Artists = sequelize.define(
    "Artists",
    {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about_artist: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
);

const AuctionArchive = sequelize.define(
    "AuctionArchive",
    {
    closing_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    selling_price: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https:\/\/upload.wikimedia.org\/wikipedia\/commons\/2\/2f\/No-photo-m.png"
    },
  },
  );

  const Auctions = sequelize.define(
    "Auctions",
    {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Без названия"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    material: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    duration: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    starting_price: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    rate_step: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    bidding: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    bidding_rate: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    auto_renewal: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
  
  }, 
  );

  
const AuthorizationData = sequelize.define(
    "AuthorizationData",
    {
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  );

  const Collectors = sequelize.define(
    "Collectors",
    {
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
   
  },
  );
  
  const ExhibitedPaintings = sequelize.define(
    "ExhibitedPaintings",
    {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Без названия"
    },
   
  });

  const Exhibitions = sequelize.define(
    "Exhibitions",
    {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    additional: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  
const FeaturedArtists = sequelize.define(
    "FeaturedArtists",
    {
    collector_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }
  },
  );

  const Portfolio = sequelize.define(
    "Portfolio",
    {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }
  );

  const Rates = sequelize.define(
    "Rates",
    {
    bet_size: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
   
  });

  const Reviews = sequelize.define(
    "Reviews",
    {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
   
  });

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

  module.exports = {
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
