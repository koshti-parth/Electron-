import {app,BrowserWindow,ipcMain,screen,Tray,Menu} from "electron";
import { createUser,getUser,updateUser,deleteUser,deleteAllUser } from "./mongodb.js";
 

import path from "node:path";
import {fileURLToPath}   from "node:url";
let __filename__ = fileURLToPath(import.meta.url);
let __dirname__  = path.dirname(__filename__);

let isQuit = false; 


let mainWindow;
function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const winWidth = 960;  // window width
    const winHeight = 1030; // window height

    const x = width - winWidth; // right edge position
    const y = height - winHeight; // bottom-right corner (optional)
    mainWindow = new BrowserWindow({
        width: winWidth,
        height: winHeight,
        x, // place from right side
        y, // optional: bottom alignment
        alwaysOnTop: true, // optional
        webPreferences: {
            preload: path.join(__dirname__, "preload.js"),
            contextIsolation: true,
            sandbox: false,
            nodeIntegration: true
        }
    })

    mainWindow.loadFile("./index.html");

    mainWindow.on("close",(event)=>{
        if(isQuit === false){
            event.preventDefault();  // Dont close App instead of hide
            mainWindow.hide();
        }
    })
}

app.whenReady().then(()=>{
    createWindow();

    ipcMain.handle("task",async (event,data)=>{

        let {
        action,
        no,name,college,city,                 // Create User
        userId,                               // Get && Delete User
        newno,newname,newcollege,newcity,     // Update User

        } = data;

        if(action === "create"){
            let result = await createUser({ no,name,college,city });
            return result;
        }

        
        if(action === "get"){
            let result = await getUser(userId);
            return result;
        }

        if(action === "update"){
            let result = await updateUser(userId,{newno,newname,newcollege,newcity});
            return result;
        }

        if(action === "delete"){
            let result = await deleteUser(userId);
            return result;
        }

        
        if(action === "deleteAll"){
            let result = await deleteAllUser();
            return result;
        }
    })



    //Appllication run as background
    const icon = app.isPackaged
        ? path.join(process.resourcesPath, "resources", "1.jpg")
        : path.join(__dirname__, "resources", "1.jpg");

    let tray = new Tray(icon);
    let menu = Menu.buildFromTemplate([
        {
            label:"open App",
            click:()=>{
                    mainWindow.show();
            }
        },
        {
            label:"close App",
            click:()=>{
                isQuit = true;
                if(isQuit){
                    console.log("Closing App")
                    if(mainWindow) mainWindow.close();
                    app.quit();
                }
            }
        }
    ])

    tray.setToolTip("Parth Electron App");
    tray.setContextMenu(menu);
    

})