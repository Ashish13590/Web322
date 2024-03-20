/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ashish Savaliya Student ID: 135901221 Date: 18/03/2024
*
********************************************************************************/

const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Lego Data
legoData.initialize()
    .then(() => {
        // Routes
        app.get("/", (req, res) => {
            // <div class="w-[150px] h-[80px] shadow-2xl bg-white rounded-lg flex justify-center items-center">
            //     <p class="text-center">shadow-2xl</p>
            // </div>
        res.sendFile(path.join(__dirname,"views/index.html"));
           
                    //res.json("Assignment 2: Your Name - Your Student ID");
        });

        // this route gets result for the getallsets function
        app.get("/lego/sets", async (req, res) => {
            // retreiving data
            const sets = await legoData.getAllSets();
            res.json(sets);
        });
        
        // this route gets result for the getSetByNum function 
        app.get("/lego/sets/:set_num", async (req, res) => {
            try {
                // getting the information of set who has 10323-1 set_number  of function getsetbynum  
                const set = await legoData.getSetByNum(req.params.set_num);
                res.json(set);
            } catch (error) {
                res.status(404).send("Error: Set not found.");
            }
        });

        app.get("/about", (req, res)=>{
            res.sendFile(path.join(__dirname, "/views/about.html"));
          })
          
         // this route gets result for the getSetByTheme function 
        app.get("/lego/sets/:name", async (req, res) => {
            try {
                // getting the information of set who has icon theme of function getsetbynum 
                const sets = await legoData.getSetsByTheme(req.params.name);
                res.json(sets);
            } catch (error) {
                res.status(404).send("Error: Sets not found for the given theme.");
            }
        });


        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
        });
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port "http://localhost:${PORT}"`);
        });
        
    })
    .catch((error) => {
        console.error("Failed to initialize Lego Data:", error);
    });

