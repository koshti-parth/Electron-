let api = window.app;

let createUser = document.getElementById("createUser");
createUser.addEventListener('click',async()=>{
    
    let result =  await api.send("task",{
        no: 31,
        name: "Deepak",
        college: "SCE",
        city: "Ahmedabad",
        action:"create"
    })
    console.log("Create User : ",result);
})


let getUser = document.getElementById("getUser");
getUser.addEventListener('click',async ()=>{

    let result = await api.send("task",{
        userId:"69181bce62885a21c4eccfb9",
        action:"get"
    });
    console.log("Get User  : ",result)
}) 



let updateUser = document.getElementById("updateUser");
updateUser.addEventListener('click',async ()=>{

    let result = await api.send("task",{
        userId:"69170f9341bb3e0988117477",
        newno:221133116006,
        newname:"Darji Dev",
        newcollege:"Sal College of Engineering",
        newcity:"Ahmedabad",
        action:"update"
    });
    console.log("Update User  : ",result)
})




let deleteUser = document.getElementById("deleteUser");
deleteUser.addEventListener('click',async ()=>{

    let result = await api.send("task",{
        userId:"69170fde6094977fdfac4259",
        action:"delete"
    });
    console.log("Delete User  : ",result)
})

let deleteAllUser = document.getElementById("deleteAllUser");
deleteAllUser.addEventListener('click',async ()=>{

    let result = await api.send("task",{
        action:"deleteAll"
    });
    console.log("Delete User  : ",result)
})




