//モジュール
const matching = require('./matchingLogic.js');
const server = require('./serverSettings.js');
const room = require('./room.js');
const display = require('./display.js');
const receiver = require('./receiver.js');
const Game = require('./game.js');



//マッチング処理
module.exports = class Matching{

    //始動
    start(io){

        let tempRoomId;

        let waitUserList = new Array();

        let rooms = new Array();

        let roomIds = new Array();

        let latestRoomNum = 0;

        let idRoomMap = {};



        io.on('connection', function(socket) {
            console.log("connect..." + socket.id);
            let userData;

            receiver.startReceive(io,socket,rooms);

            //切断時処理
            socket.on('disconnect',function() {
                //ユーザーネームを登録していない場合
                console.log(idRoomMap[socket.id]);
                if(idRoomMap[socket.id] == undefined) {
                    console.log("No name player disconnect...");

                //登録している場合
                }else{
                    //ゲーム中なら
                    if(idRoomMap[socket.id].isPlayingGame == 1){
                        rooms[idRoomMap[socket.id].room].disconnectUser(socket.id);
                    //待機中なら
                    }else{
                        //ユーザーリストから削除してクライアントにデータを送信
                        if(waitUserList.length == 1){
                            waitUserList = [];
                        }else{
                            waitUserList.splice(waitUserList.findIndex(data => data.id === socket.id),1);
                            console.log("dis!");
                        }
                        io.emit("displayToClient",waitUserList);
                    }

                    delete idRoomMap[socket.id];

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
                    token:token,
                    isPlayingGame:0,
                    room:0
                };

            //待ち人数が6人以下の場合
                if( waitUserList.length > 0) {
                    //ゲーム開始時にtempRoomIdをそのままルームidに
                    socket.join(tempRoomId);
                    userData.room = tempRoomId;
                    idRoomMap[socket.id] = userData;
                    console.log("rooms!!" +userData.room);
                    //console.log("rooms!!" + Array.from(socket.rooms));
                    
                    //waitUserListを更
                    waitUserList.push(userData);

                    
                    io.emit("displayToClient",waitUserList);
                    console.log("new::" + userData);
                    console.log("userList::"+ waitUserList);


                    if(waitUserList.length == 4){
                        //待機中プレイヤーのリストを初期化
                        const userList = waitUserList;

                        //ゲームのインスタンスを作成
                        const game = new Game(tempRoomId,userList);
                        rooms[tempRoomId] = game;

                        rooms[tempRoomId].startGame();

                        for(i = 0;i < 4;i++){
                            idRoomMap[waitUserList[i].id].isPlayingGame = 1;
                        }



                        waitUserList = [];


                    }
                    //待機中プレイヤーがいない場合
                }else{
                    tempRoomId = matching.createRoomId(rooms,server.MAXROOMIDNUMBER);
                    //部屋に入室
                    socket.join(tempRoomId);
                    userData.room = tempRoomId;
                    idRoomMap[socket.id] = userData;
                    console.log(idRoomMap);
                    console.log("rooms!!" + Array.from(socket.rooms));

                    //自分を待ちプレイヤーに追加
                    waitUserList.push(userData);

                    io.emit("displayToClient",waitUserList);
                    console.log("new::" + userName + ",RoomId::" + tempRoomId);
                    console.log(waitUserList);

                }

                setInterval(function(){
                    rooms.forEach(function(room,index){
                        if(room != null){
                            if(room.gameState == 10){
                                rooms[index] = null;
                                console.log("DELETE ROOM!!!!");
                            }
                        }
                    });
                },1000/30);


            });

        });


        
    }
    
}