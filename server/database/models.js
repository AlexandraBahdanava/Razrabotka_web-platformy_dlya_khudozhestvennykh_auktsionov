const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("./index");

const Artist = sequelize.define(
    "Artist",
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
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
    {
      tableName: "Artists", // фактическое имя таблицы в базе данных
    }
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

  const Auction = sequelize.define(
    "Auction",
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
      type: DataTypes.INTEGER,
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
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, 
  {
    tableName: "Auctions", // фактическое имя таблицы в базе данных
  });


  const Collector = sequelize.define(
    "Collector",
    {
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: "Collectors", // фактическое имя таблицы в базе данных
  });
  
  const ExhibitedPainting = sequelize.define(
    "ExhibitedPainting",
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
   
  },
  {
    tableName: "ExhibitedPaintings", // фактическое имя таблицы в базе данных
  });

  const Exhibition = sequelize.define(
    "Exhibition",
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
  },
  {
    tableName: "Exhibitions", // фактическое имя таблицы в базе данных
  });

  
const FeaturedArtist = sequelize.define(
    "FeaturedArtist",
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
  {
    tableName: "FeaturedArtists", // фактическое имя таблицы в базе данных
  });

  const Portfolio = sequelize.define(
    "Portfolio",
    {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }
  );

  const Rate = sequelize.define(
    "Rate",
    {
    bet_size: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
   
  },
  {
    tableName: "Rates", // фактическое имя таблицы в базе данных
  });

  const Review = sequelize.define(
    "Review",
    {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
   
  },
  {
    tableName: "Reviews", // фактическое имя таблицы в базе данных
  });

  Artist.belongsToMany(Collector, { through: FeaturedArtist});
  Artist.belongsToMany(Exhibition, {through: ExhibitedPainting});
  Collector.belongsToMany(Artist, { through: FeaturedArtist});
  Exhibition.belongsToMany(Artist, {through: ExhibitedPainting});

  AuctionArchive.belongsTo(Artist);
  Artist.hasMany(AuctionArchive);

  Auction.belongsTo(Artist);
  Artist.hasMany(Auction);

  ExhibitedPainting.belongsTo(Artist);
  Artist.hasMany(ExhibitedPainting);

  FeaturedArtist.belongsTo(Artist);
  Artist.hasMany(FeaturedArtist);

  Portfolio.belongsTo(Artist);
  Artist.hasMany(Portfolio);

  Review.belongsTo(Artist);
  Artist.hasMany(Review);

  Rate.belongsTo(Auction);
  Auction.hasMany(Rate);

  FeaturedArtist.belongsTo(Collector);
  Collector.hasMany(FeaturedArtist);

  Rate.belongsTo(Collector);
  Collector.hasMany(Rate);

  Review.belongsTo(Collector);
  Collector.hasMany(Review);
  
  ExhibitedPainting.belongsTo(Exhibition);
  Exhibition.hasMany(ExhibitedPainting);

  module.exports = {
    Artist,
    AuctionArchive,
    Auction,
    Collector,
    ExhibitedPainting,
    Exhibition,
    FeaturedArtist,
    Portfolio,
    Rate,
    Review,
  };
