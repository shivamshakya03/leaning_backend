
import { console } from 'node:inspector';
import Home from '../models/homeModel.js';

// ====================  FETCH AND RENDER HOME ==========================

// export const getIndex =  (req,res,next) => {
   
//     Home.fetchAll(homes => {
//         res.render('index', {registeredHome: homes});

//     })
// }


export const getIndex = async (req,res,next) => {
    
    try{
        const homes = await Home.fetchAll();
        res.render('index', {registeredHome: homes});
    }
    catch(err) {
        console.error('Error fetching HOmes:', err);
        res.status(500).send('Internal Server err');
    }
};


export const getAddHome = (req,res,next) => {
    res.render('add-home', {editing: false});    
}




// ======================== POST AND SAVE DATA ===============================


export const postAddHome = async (req,res,next) => {
    
    try {
        const {housename, location, price, nights, rating, description} = req.body;
        const homeObj = new Home(housename, location, price, nights, rating, description)
        await homeObj.save();
        res.redirect('/');
    }
    catch (err) {
        console.error('Error saving home:', err);
        res.status(500).send('Internal Server Error');
    }
       
    
}

// ++++++++++++++++++++++ EDIT HOME ++++++++++++++++++++++++++++++++++++++

export const editAddHome = async (req,res,next) => {
    const id = req.params.homeID;
    const editing = req.query.editing == 'true';

    try {
        const home = await Home.findById(id);
        if(!home) {
            return res.redirect('/');
        }
        res.render('add-home', { home:home, editing:editing });
    } catch (err) {
        console.error('Error finding home:', err);
        res.status(500).send('Internal Server Error');
    }
 
}


export const posteditAddHome = async (req,res,next) => {

    try {
        const {id,housename, location, price, nights, rating, description} = req.body;
        const updatedhome = new Home(housename, location, price, nights, rating, description);
        if(id) updatedhome.id = id;
    
        await updatedhome.save();
        res.redirect('/'); 

    } catch (err) {
        console.error('Error updating home:', err);
        res.status(500).send('Internal Server Error');
    }
}



export const deleteHome = async (req,res,next) => {
    const id = req.params.homeID;

    try {
        await Home.deleteById(id);
        console.log('Successfully deleted');
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting home:', err);
        res.status(500).send('Internal Server Error');
    }
}


export const getHomeDetails = async (req, res, next) => {
    const id = req.params.homeID;
    

     try {
        const home = await Home.findById(id);
        if (!home) {
            return res.redirect('/');
        }
        res.render('show-real-home-details', {home : home});
    } catch (err) {
        console.error('Error getting home details:', err);
        res.status(500).send('Internal Server Error');
    }
}
