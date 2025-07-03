import favourite from "../models/favModel.js";
import Home from "../models/homeModel.js";

export const getFav = async (req, res, next) => {
    // favourite.fetchAll_ID(ids => {
    //     Home.fetchAll(AllHomes => {
    //         const favIds = ids.map(obj => obj.favid);
    //         const favHomesFound = AllHomes.filter(home => favIds.includes(home.id));
    //         res.render('favHomes', {favHomesFound : favHomesFound});
    //     })
    // })
    try {
        // Step 1: Read favorite IDs
        const favData = await favourite.fetchAll_ID();  // Assuming this returns an array
        const favIds = favData.map(obj => obj.favid);
        
        // Step 2: Fetch all homes
        const allHomes = await Home.fetchAll();  // Also should return an array
        
        // Step 3: Filter favorite homes
        const favHomesFound = allHomes.filter(home => favIds.includes(home.id));
        
        // Step 4: Render view
        res.render('favHomes', {favHomesFound : favHomesFound});
        // res.render('favHomes', { favHomesFound });

    } catch (err) {
        console.error('Error fetching favorite homes:', err);
        res.status(500).send('Internal Server Error');
    }

   
}
export const postfavHomes = async (req, res, next) => {
    try {
        const id = req.params.homeID;
        const favHomeID = new favourite(id);
        await favHomeID.save();  // ensure save() returns a Promise
        res.redirect('/favpage');
    } catch (err) {
        console.error('Error saving favorite home:', err);
        res.status(500).send('Internal Server Error');
    }
};
export const removeFavHomes = async (req, res, next) => {
    try {
        const id = req.params.homeID;
        await favourite.deleteById(id);  // ensure deleteById() returns a Promise
        res.redirect('/favpage');
    } catch (err) {
        console.error('Error removing favorite home:', err);
        res.status(500).send('Internal Server Error');
    }
};
