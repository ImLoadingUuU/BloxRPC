#!/usr/bin/env deno run --unstable --allow-env --allow-run --allow-net --allow-read --allow-write --allow-ffi

import axios from "axios"
import { Client } from "https://deno.land/x/discord_rpc/mod.ts";
const client = new Client({
  id: "781057233931862016",
});
await client.connect();
var ROBLOSECURITY = "Roblosecuirty Here It used to read playing game."
let getstatus = async (userid) => {
    let result = await axios({
        method: "POST",
        url: "https://presence.roblox.com/v1/presence/users",
        data: {
            "userIds": [userid]
        },
        headers: {
            "Cookie": `.ROBLOSECURITY=${ROBLOSECURITY}`
        }})
        console.log(result.data)
        return result.data.userPresences[0]
}

let getplaceicon = async (universeid) => {

   try {
    let result =  await axios.get(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeid}&size=512x512&format=Png&isCircular=false`)
    console.log(result.data.data[0].imageUrl)
    return result.data.data[0].imageUrl
 
   } catch (err) {
    console.log(err)
    
   }
    
}

function startRPC(rpc,uid){
    setInterval(async () => {
     let result = await getstatus(uid)
    if (result.userPresenceType == 1 ) {
        await rpc.setActivity({
            details: "On Website",
            state: "Browsing",
          });
    } else if(result.userPresenceType == 2) {
         let icon =  await getplaceicon(result.universeId)
        await rpc.setActivity({
            details: "Playing " + result.lastLocation,
            state: "Playing",
            assets: {
                "large_image": icon
            }
          });
    }
    },5000)

}


startRPC(client,"My Roblox User ID")
