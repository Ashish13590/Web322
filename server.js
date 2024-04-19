            
/********************************************************************************
* WEB322 – Assignment 03
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html* 
* Name: Ashish A Savaliya Student ID: 135901221 Date: 19/03/2024
*
* Published URL: https://cloudy-fly-slacks.cyclic.app/
*
********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

legoData.initialize().then(() => {          
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}).catch((err)=> {
    console.error("Failed to initialize the port");
});



app.get("/", async (req, res) => {
    res.render("index", { page: "/" });
});



// Route to fetch LEGO sets by set number
app.get("/lego/sets", async (req, res) => {
    try {
        let sets = [];
        if (req.query.set_num) {
            sets = await legoData.getSetByNum(req.query.set_num);
        } else {
            sets = await legoData.getAllSets();
        }
        res.render("sets", { sets: sets });
    } catch (error) {
        res.status(404).render("404", { message: "Error: Sets not found for the given theme." });
    }
});

// Route to handle about page
app.get("/about", (req, res) => {
    res.render("about", { pages: "/about" });
});

// Route to handle editing a LEGO set
app.get("/lego/editSet/:num", async (req, res) => {
    try {
        const set = await legoData.getSetByNum(req.params.num);
        const themes = await legoData.getAllThemes(); // Assuming this function exists
        if (!set) {
            return res.status(404).render('404', { page: "", message: "Set not found." });
        }
        res.render("editSet", { set, themes, page: "/lego/editSet" });
    } catch (error) {
        res.status(500).render('500', { message: error.message });
    }
});

// Route to handle editing a LEGO set (POST method)
app.post("/lego/editSet", async (req, res) => {
    try {
        await legoData.editSet(req.body.num, req.body);
        res.redirect("/lego/sets");
    } catch (error) {
        res.status(500).render('500', { message: "Error encountered in editSet function/file" });  
    }
});

// Route to handle deleting a LEGO set
app.get("/lego/deleteSet/:num", async (req, res) => {
    try {
        await legoData.deleteSet(req.params.num);
        res.redirect("/lego/sets");
    } catch (error) {
        res.status(500).render('500', { message: `Error encountered: ${error.message}` });
    }
});

// Generic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error'); // Render the error view
});

// 404 Route
app.use((req, res) => {
    res.status(404).render('404', { page: "" });
});

module.exports=app;