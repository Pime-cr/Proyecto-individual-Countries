const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{
      type:DataTypes.STRING(3),
      allowNull:false,
      primaryKey:true

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type:DataTypes.STRING,
      allowNull:false

    },
    region:{
      type:DataTypes.STRING,
      allowNull:false

    },
    capital:{
      type:DataTypes.STRING,

    },
    subregion:{
      type:DataTypes.STRING,

    },
    area:{
      type:DataTypes.STRING,
      allowNull:false


    },
    population:{
      type:DataTypes.INTEGER

    }
    
  });
};



/* País con las siguientes propiedades:
ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población */


