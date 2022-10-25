const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{                                //{id, name, summary, healthScore, steps, image, itsCreated}
      type:DataTypes.STRING,
      primaryKey:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image: {
      type: DataTypes.STRING
    },
    itsCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {timestamps:false});
};
