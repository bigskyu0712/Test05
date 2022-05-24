//Matchinglogic
//マッチングに関するサブルーチンをこちらに

const uuid = require('node-uuid');
const crypto = require('crypto');

exports.createRoomId = function(nowRooms,maxIdNumber){
    //RoomIdを作成
    return uuid.v4().split("-").join("");

}

exports.createToken = function(id){
    const str = "kanamori" + id;
    return(crypto.createHash("sha1")).update(str).digest("hex");
}
