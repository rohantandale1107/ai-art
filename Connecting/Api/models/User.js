const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true,
            trim:true,
            lowercase:true,
            required:true,

        },
        email:{
            type:String,
            unique:true,
            trim:true,
            lowercase:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        credit:{
            type:String,
            trim:true,
        },
        
        posts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Post",
            },
        ],
           
    },{
        timestamps:true,
    }
);

const User = mongoose.model("User",userSchema)

module.exports = User;