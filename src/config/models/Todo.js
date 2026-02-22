const Todoapp = (sequelize, DataTypes) => {
  const Todoapp = sequelize.define('todoapp', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'image_url'
    },
    status: {
      type: DataTypes.ENUM('completed', 'half_done', 'not_started_yet'),
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: true
    }
  }, {
    underscored: true,
    tableName: 'todoapp',
    timestamps: true
  });

  return Todoapp;
};

module.exports = Todoapp;
