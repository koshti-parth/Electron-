import {contextBridge,ipcRenderer}  from "electron";

contextBridge.exposeInMainWorld("app",{
    
    //Renderer To Main
    send:(channel,data)=>{
        return ipcRenderer.invoke(channel,data);
    },

    //Main To Renderer
    receive:(channel,cb)=>{
        ipcRenderer.on(channel,(event,data)=>{
            cb(data);
        })
    }
});
