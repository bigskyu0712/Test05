/*******************************************************************
***  File Name		: matchingLogic.js
***  Version      : V1.0
***  Designer		  : 曽根
***  Date			    : 2022.07.4
***  Purpose      : マッチングに関するサブルーチンをこちらに
***
*******************************************************************/



//Matchinglogic
//マッチングに関するサブルーチンをこちらに
const crypto = require('crypto');


exports.createRoomId = function(rooms,maxIdNumber){
    //RoomIdを作成
    let id;
    if(rooms.length >= maxIdNumber){
        console.log("room is full");
        return -1;
    }
    while(1){
        id = Math.floor(Math.random()*maxIdNumber);
        if(rooms[id] == null){
            return id;
        }
    }
    
}

//副窓対策などを兼ねてIdはハッシュ化して管理します．
exports.createToken = function(id){
    const str = "kanamori" + id;
    return(crypto.createHash("sha1")).update(str).digest("hex");
}
