export default function(req,res,next){
    const bearerHeader = req.header["authorization"];
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        //Next middleware
        next();
    }
    else{
        res.sendStatus(403);
    }
}