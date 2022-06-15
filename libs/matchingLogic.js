//Matchinglogic
//マッチングに関するサブルーチンをこちらに
const crypto = require('crypto');


//RoomIdについてもハッシュ化する関数自体はありますがあくまでサーバ側のみの概念(クライアントは自身が所属しているルームIdを知ることができない)ため現在は使っていません．
exports.createRoomId = function(nowRooms,maxIdNumber){
    //RoomIdを作成
    if(nowRooms + 1 == maxIdNumber){
        console.log("room is full!!");
        return -1;
    }else{
    const str = "1B5hankoudo" + nowRooms + 1;
    return(crypto.createHash("sha1")).update(str).digest("hex");
    }
    
}

//副窓対策などを兼ねてIdはハッシュ化して管理します．
exports.createToken = function(id){
    const str = "kanamori" + id;
    return(crypto.createHash("sha1")).update(str).digest("hex");
}
