
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());



const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('adatbazis', 'felhasznalonev', 'jelszo', {
  host: 'localhost',
  dialect: 'mysql' 
});

const Kolcsonzok = sequelize.define('Kolcsonzok', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nev: {
    type: DataTypes.STRING
  },
  szulIdo: {
    type: DataTypes.DATE
  }
});

const Kolcsonzesek = sequelize.define('Kolcsonzesek', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  kolcsonzokId: {
    type: DataTypes.INTEGER,
    references: {
      model: Kolcsonzok,
      key: 'id'
    }
  },
  iro: {
    type: DataTypes.STRING
  },
  mufaj: {
    type: DataTypes.STRING
  },
  cim: {
    type: DataTypes.STRING
  }
});


app.use(bodyParser.json());


app.get('/kolcsonzok', async (req, res) => {
  const kolcsonzok = await Kolcsonzok.findAll();
  res.json(kolcsonzok);
});

app.get('/kolcsonzesek', async (req, res) => {
  const kolcsonzesek = await Kolcsonzesek.findAll();
  res.json(kolcsonzesek);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
