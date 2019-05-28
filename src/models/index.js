const Sequelize = require("sequelize");

const db = new Sequelize({
  database: "realworlddb",
  username: "realworlduser",
  password: "realworldpass",
  dialect: "mysql"
});

const Users = db.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
});

const Articles = db.define("articles", {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  description: Sequelize.STRING(200),
  body: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Comments = db.define("comment", {
  body: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Tags = db.define("tag", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Users.belongsToMany(Articles, { as: "author", through: "favourites" });
Articles.belongsToMany(Users, { as: "author", through: "favourites" });

Articles.hasMany(Comments);
Comments.belongsTo(Articles);

Comments.belongsTo(Users, { as: "author" });

Articles.belongsToMany(Tags, { through: "article_tags" });
Tags.belongsToMany(Articles, { through: "article_tags" });

module.exports = {
  db,
  Users,
  Articles,
  Comments,
  Tags
};
