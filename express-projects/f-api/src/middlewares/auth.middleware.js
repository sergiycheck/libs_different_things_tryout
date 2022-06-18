
const isAuthorized = (req,res,next)=>{
    if(
        req &&
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization ==='admin'
    ){
        next();
    }else{
        res.status(404).send("Not allowed");
    }
}

module.exports={
    isAuthorized
}