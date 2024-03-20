

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
const setData = require("../data/setData");
const themeData = require("../data/themeData");

// Initialize empty array of sets
let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        var i=0; // for counting number of records
        try {
            setData.forEach(set => {
                i++;
                // finding data and if matches then assigning it
                const theme = themeData.find(theme => theme.id === set.theme_id);
                set.theme = theme ? theme.name : "Unknown Theme";
            });
            sets = setData; // Assign the updated setData array to sets
            console.log(`Successfully read ${i} records`);
            resolve(); // Resolve the promise
        } catch (err) {
            reject(err); // Reject the promise if an error occurs
        }
    });
}



// Function to get all sets
function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets.length > 0) {
            resolve(sets);
        } else {
            reject("Sets data not available.");
        }
    });
}

// Function to get a set by set number
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const set = sets.find(set => set.set_num === setNum);
        if (set) {
            resolve(set);
        } else {
            reject("Set not found.");
        }
    });
}

// function to get a set by theme name
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const filteredSets = sets.filter(set => {
            return set.theme.toLowerCase()===(theme.toLowerCase());
        });
        if (filteredSets.length > 0) {
            resolve(filteredSets);
        } else {
            reject("Sets not found for the given theme.");
        }
    });
}


// exporting the function
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };

