const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Tourist_activity', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificult:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        duration:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        season:{
            type:DataTypes.ENUM('Verano','Otoño','Invierno','Primavera')

        }

    });
  };

/* ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera) */