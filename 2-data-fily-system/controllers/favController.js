import favourite from "../models/favModel.js";
import Home from "../models/homeModel.js";

export const getFav = (req, res, next) => {
    favourite.fetchAll_ID(ids => {
        Home.fetchAll(AllHomes => {
            const favIds = ids.map(obj => obj.favid);
            const favHomesFound = AllHomes.filter(home => favIds.includes(home.id));
            res.render('favHomes', {favHomesFound : favHomesFound});
        })
    })
   
}

export const postfavHomes = (req, res, next) => {
    const id = req.params.homeID;
    const favHomeID = new favourite(id);
    favHomeID.save();
    res.redirect('/favpage')
 
}

export const removeFavHomes = (req, res, next) => {
    const id = req.params.homeID;
    favourite.deleteById(id, () => {
        res.redirect('/favpage');
    });
 
}