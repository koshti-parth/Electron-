import DataStore from "nedb-promises";

let userDB = new DataStore({
    filename:"./ParthDB",
    autoload:true
})


export async function createUser(data){
    try {
        let { no,name,college,city } = data;
        let user = await userDB.insert({
            UserNo : no,
            UserName :name,
            UserCollege:college,
            UserCity:city,
        });
        return {
            status:true,
            message:"User Created",
            data:user
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
        let user = await userDB.findOne({_id:userId});
        return {
            status:true,
            message:"User Fetched",
            data:user
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
        let user = await userDB.updateOne(
            {_id:userId},  //Find
            {$set:newUser} //Update
        )
        return {
            status:true,
            message:"User Updated",
            data:user
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
        let user = await userDB.remove({_id:userId});
        return {
            status:true,
            message:"User Deleted",
            data:user
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
        let user = await userDB.remove({},{multi:true});
        return {
            status:true,
            message:"All User Deleted",
            data:user
         }   
    } catch (error) {
         return {
            status:false,
            message:error.message
         }       
    }
}






