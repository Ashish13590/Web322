//made mistake in conversion of csv to json
// i forgot to add this line at the top :set_num,name,year,theme_id,num_parts,img_url
// so i was receving data whose catefory name was replaced with the first record of csv file
// {
//     "set_num": "10323-1",
//     "name": "PAC-MAN Arcade",
//     "year": "2023",
//     "theme_id": "721",
//     "num_parts": "2651",
//     "img_url": "https://cdn.rebrickable.com/media/sets/10323-1.jpg"
// }

// Importing setData and themeData module
require('dotenv').config();
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://aasavaliya:<UDB+42c(u@cneyN>@cluster0.exfskbg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");


const themeSchema = new mongoose.Schema({
    id: String,
    name: String,
  });
  
  const setSchema = new mongoose.Schema({
    set_num: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    year: String,
    num_parts: String,
    theme_id: String,
    img_url: String,
  });
  



// Set.belongsTo(Theme, { foreignKey: "theme_id" });


 async function initialize() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        
    } catch (error) {
        console.error('Database not connected:', error);
    }
}



// Function to get all sets
async function getAllSets() {
    try {
        const sets = await Set.findAll({ include: [Theme] });
        return sets;
      } catch (error) {
        console.error("Error getting all sets:", error);
      }
}

// Function to get a set by set number
async function getSetByNum(setNumber) {
    let sets= await Set.findOne({
        where: {set_num:setNumber},
        include: [Theme]
    });
    return set;
}

async function addSet(newSetData){
    try{
        // await Set.createData(setData);
        await Set.create(newSetData);
    } catch (error) {
        throw new Error("Error encountered in function addSet: " + error.message);
    }
}

async function editSet(setNum, setData) {
    try {
        await Set.update(setData, {
            where: { set_num: setNum }
        });
    } catch (error) {
        throw new Error("Error encountered in function editSet: " + error.message);
    }
}

async function deleteSet(setNum) {
    try {
        await Set.destroy({
            where: { set_num: setNum }
        });
    } catch (error) {
            throw new Error("Error encountered in function deleteSet: " + error.message);
    }
}



// function to get a set by theme name
async function getAllTheme() {
    try {
        return await Theme.findAll();
    } catch (error) {
        throw new Error("Error encountered in function getAllThemes: " + error.message);
    }
}

async function addTheme(themeData){
    try {
        await Theme.create(themeData);
    } catch (error) {
        throw new Error("Error encountered in function getAllThemes: " + error.message);
    }
}


// exporting the function
module.exports = { initialize, getAllSets, getSetByNum, getAllSets,
                    addSet,editSet,deleteSet,addTheme };

