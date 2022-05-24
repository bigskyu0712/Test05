//モジュール
const matching = require('./matchingLogic.js');
const server = require('./serverSettings.js');
const room = require('./room.js');



//マッチング処理
module.exports = class Matching{

    //始動
    start(io){
        let waitPlayer = "0";

        let tempRoomId;

        let waitUserList = new Array();

        let rooms = new Array();

        io.on('connection', function(socket) {
            console.log("connect..." + socket.id);
            let userData;

            //切断時処理
            socket.on('disconnect',function() {
                //ユーザーネームを登録していない場合
                if(userData==undefined) {
                    console.log("No name player disconnect...");

                //登録している場合
                }else{
                    //ゲーム中なら
                    if(userData.isPlayingGame == 1){

                    //待機中なら
                    }else if(userData.isPlayingGame == 0){
                        //ユーザーリストから削除してクライアントにデータを送信
                        if(waitUserData.length == 1){
                            waitUserData.shift();
                        }else{
                            waitUserData.splice(waitUserData.findIndex(data => data.id === userData.id),1);
                        }
                        io.emit("displayToClient",waitUserList);
                    }



                }
            });

            //トークンの作成と送信
            const token = matching.createToken(socket.id);
            io.to(socket.id).emit("sendToken",{token:token});


            //ログイン時
            socket.on('login', function(userName) {

                //ユーザーデータ(名前，ID，ゲーム中か)を作成
                //userDataオブジェクトはmatching.js以外では操作しないでください．
                userData={
                    userName:userName,
                    id:socket.id,
                    isPlayingGame:0
                };

            //待ち人数が6人以下の場合
                if( waitUserList.length > 0) {
                    //ゲーム開始時にtempRoomIdをそのままルームidに
                    socket.join(tempRoomId);
                    
                    //waitUserListを更
                    waitUserList.push(userData);

                    
                    io.emit("displayToClient",waitUserList);
                    console.log("new::" + userData);
                    console.log("userList::"+ waitUserList);


                    if(waitUserList.length == 6){
                        //待機中プレイヤーのリストを初期化
                        const userList = waitUserList;
                        waitUserList = [];

                        //ゲーム開始
                        room.startGame(tempRoomId,userList);

                    }
                    //待機中プレイヤーがいない場合
                }else{
                    
                    //RoomIdを作成
                    tempRoomId = matching.createRoomId(rooms, server.MAXROOMIDNUMBER);
                    socket.join(tempRoomId);

                    //自分を待ちプレイヤーに追加
                    waitUserList.push(userData);

                    io.emit("displayToClient",waitUserList);
                    console.log("new::" + userName + ",RoomId::" + tempRoomId);
                    console.log(waitUserList);

                }   
            });

        });

        
    }
    
}