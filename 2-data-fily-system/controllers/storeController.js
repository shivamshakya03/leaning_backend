
import { console } from 'node:inspector';
import Home from '../models/homeModel.js';

// ====================  FETCH AND RENDER HOME ==========================

export const getIndex = (req,res,next) => {
    // fs.readFile(HOME_FILE_PATH, 'utf-8', (err, data) => {       //It tells Node.js to decode the file contents as a UTF-8 string instead of returning it as a Buffer.
    //     let Fetchhomes = [];
    //     if(!err && data) {
    //         try{
    //             Fetchhomes = JSON.parse(data);
    //             console.log(Fetchhomes);
    //         }catch(parseErr){
    //             console.error("Error Parsing Existing Json:" ,parseErr);
    //         }
    //     }else{
    //         console.log(err);
    //     }

    //     res.render('index', {registeredHome: Fetchhomes});
    // })
    
    Home.fetchAll(homes => {
        res.render('index', {registeredHome: homes});

    })
}


export const getAddHome = (req,res,next) => {
    res.render('add-home', {editing: false});    
}




// ======================== POST AND SAVE DATA ===============================


export const postAddHome = (req,res,next) => {
    // console.log(req.body);
    // registeredHome.push(req.body);

    // const newHOme = req.body;

    // // Read Existing File:
    // fs.readFile(HOME_FILE_PATH, (err, data) => {     
    //     let homes = [];
    //     if(!err && data) {
    //         try{
    //             homes = JSON.parse(data);
    //         }catch(parseErr){
    //             console.error("Error Parsing Existing Json:" ,parseErr);
    //         }
    //     }

    //     homes.push(newHOme); //Append new Data

    //     // Step 3: Write updated data back to file
    //     fs.writeFile(HOME_FILE_PATH, JSON.stringify(homes), (err) => {
    //     console.log("Error While Writing FIle:", err)
    //     })
    //     // console.log(registeredHome);
    //     res.redirect('/');


        
    // })

    const {housename, location, price, nights, rating, description} = req.body;
    const homeObj = new Home(housename, location, price, nights, rating, description)
    homeObj.save();
    res.redirect('/');   
    
}

// ++++++++++++++++++++++ EDIT HOME ++++++++++++++++++++++++++++++++++++++

export const editAddHome = (req,res,next) => {
    const id = req.params.homeID;
    const editing = req.query.editing == 'true';

    Home.findById(id, home => {
        if(!home) {
            return res.redirect('/');
        }
        else{
            res.render('add-home', {home: home, editing: editing});
        }
    })    
}


export const posteditAddHome = (req,res,next) => {
    const {id,housename, location, price, nights, rating, description} = req.body;
    const updatedhome = new Home(housename, location, price, nights, rating, description);
    if(id) updatedhome.id = id;

    updatedhome.save();
    res.redirect('/'); 
}



export const deleteHome = (req,res,next) => {

    const id = req.params.homeID;
    Home.deleteById(id, err=> {
        if(err) {
            console.log(err);
        }
        console.log('Susseddb Deleted')
        res.redirect('/')
    })
}


export const getHomeDetails = (req, res, next) => {
    const id = req.params.homeID;
    Home.findById(id, home => {
        if(!home) {
            return res.redirect('/');
        }
        res.render('show-real-home-details', {home : home})
        
    })
}
