function auth (req, res, next){
    if (req.session.admin === true){
        next();
    } else{
        res.sendFile(path.join(__dirname, "../public/login.html"))
    }
}


export {auth}