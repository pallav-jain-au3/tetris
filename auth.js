const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) res.status(401).json({error : "Unauthorised Request"});

   
    try {
        const verifiy = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verifiy;
        next();

    }catch(err){
        res.status(401).json({error : "Invalid Token"})
    }
}