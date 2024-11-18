const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("./index");


const Artist = sequelize.define(
    "Artist",
    {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
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
      type: DataTypes.SMALLINT,
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
      type: DataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "#"
    },
  }, 
  {
    tableName: "Auctions", // фактическое имя таблицы в базе данных
  });


  const Collector = sequelize.define(
    "Collector",
    {
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    surname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false
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
  
  const Portfolio = sequelize.define(
    "Portfolio",
    {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    timestamps: false, // отключает автоматическую генерацию createdAt и updatedAt
    tableName: "Portfolio", // фактическое имя таблицы в базе данных
  });

  const Rate = sequelize.define(
    "Rate",
    {
    bet_size: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
   
  },
  {
    timestamps: false,
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
    timestamps: false, // отключает автоматическую генерацию createdAt и updatedAt
    tableName: "Reviews", // фактическое имя таблицы в базе данных
  });


  AuctionArchive.belongsTo(Artist);
  Artist.hasMany(AuctionArchive);

  Auction.belongsTo(Artist);
  Artist.hasMany(Auction);

  Portfolio.belongsTo(Artist);
  Artist.hasMany(Portfolio);

  Review.belongsTo(Artist);
  Artist.hasMany(Review);

  Rate.belongsTo(Auction);
  Auction.hasMany(Rate);

  Rate.belongsTo(Collector);
  Collector.hasMany(Rate);

  Review.belongsTo(Collector);
  Collector.hasMany(Review);

  module.exports = {
    Artist,
    AuctionArchive,
    Auction,
    Collector,
    Portfolio,
    Rate,
    Review,
  };
