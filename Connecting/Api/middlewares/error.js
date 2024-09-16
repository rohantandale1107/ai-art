const errorHandler =(err,req,res,next)=>{
    console.error(err.stack)

    if(err instanceof CustomError){
        return res.status(err.status).json({error:err.message});

    }
    return res.status(500).json({error:"Internal Server Error"})
}

class CustomError extends Error{
    constructor(message,status=500){
        super(message)
        this.name= this.constructor.name
        this.status= status;
        Error.captureStackTrace(this, this.constructor);
    }
}

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        throw new CustomError("You are not authenticated!", 401);
    }

    jwt.verify(token,process.env.JWT_SECRET, async(err,data)=>{
        if(err){
            throw new CustomError("TOken is not valid", 403);
        }
        req.userId = data._id;
        next();
    })
}

module.exports = verifyToken;