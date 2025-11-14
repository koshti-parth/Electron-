import mongoose from "mongoose";
// console.log(mongoose);


//DB Connection
mongoose.connect("mongodb://localhost:27017/ElectronDB")
.then(val => console.log("DB Connected"))
.catch(err => console.log("DB Error"));

//Schema - Database Structure

let userSchema = new mongoose.Schema({
    UserNo:{
        type:Number,
        required:true
    },
    
    UserName:{
        type:String,
        required:true
    },
    
    UserCollege:{
        type:String,
        required:true
    },

    UserCity:{
        type:String,
        required:true
    },

});

//Model - help to Perform CRUD

let userModel = mongoose.model("user",userSchema)

export async function createUser(data){
    try {
        let { no,name,college,city } = data;
        let user = await userModel.create({
            UserNo : no,
            UserName :name,
            UserCollege:college,
            UserCity:city,
        });
        console.log(" User Created: ",user )
        return {
            status:true,
            message:"User Created",
            // data:user
         }   
    } catch (error) {
         return {
            status:false,
            message:error.message
         }       
    }
}

export async function getUser(userId){
    try {
        let user = await userModel.find({_id:userId});
        console.log(" User Fetched: ",user )
        return {
            status:true,
            message:"User Fetched",
            // data:user
         }   
    } catch (error) {
         return {
            status:false,
            message:error.message
         }       
    }
}



export async function updateUser(userId,data){
    try {
        let {newno,newname,newcollege,newcity} = data;
        let newUser = {
            UserNo : newno,
            UserName :newname,
            UserCollege:newcollege,
            UserCity:newcity,
        }
        let user = await userModel.updateOne(
            {_id:userId},  //Find
            {$set:newUser} //Update
        )
        console.log(" User Updated: ",user )
        return {
            status:true,
            message:"User Updated",
            // data:user
         }   
    } catch (error) {
         return {
            status:false,
            message:error.message
         }       
    }
}

export async function deleteUser(userId){
    try {
        let user = await userModel.deleteOne({_id:userId});
        console.log(" User Deleted: ",user )
        return {
            status:true,
            message:"User Deleted",
            // data:user
         }   
    } catch (error) {
         return {
            status:false,
            message:error.message
         }       
    }
}

export async function deleteAllUser(){
    try {
        let user = await userModel.deleteMany({});
        console.log(" All User Deleted : ",user )
        return {
            status:true,
            message:"All User Deleted",
            // data:user
         }   
    } catch (error) {
         return {
            status:false,
            message:error.message
         }       
    }
}
