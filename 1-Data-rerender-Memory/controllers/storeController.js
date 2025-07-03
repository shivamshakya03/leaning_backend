export const getIndex = (req,res,next) => {
    res.render('index', {registeredHome: registeredHome});
}

export const getAddHome = (req,res,next) => {
    res.render('add-home');
    
}

export const registeredHome = [];

export const postAddHome = (req,res,next) => {
    console.log(req.body);
    registeredHome.push(req.body);
    console.log(registeredHome);
    res.redirect('/');
    
}