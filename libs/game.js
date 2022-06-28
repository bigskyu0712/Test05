//モジュール
const Board = require('./board.js');
const receiver = require('./receiver.js');
const reader = require('./cardsReader.js');



//ゲームクラス
//ゲームの全体的な進行をここに記述、各工程に関する記述はBoard.jsに
module.exports = class Game{

    selectCard;
    reveived = 0;
    dice = 0;
    waitUserId = 0;

    //クラスの初期化
    constructor(roomId,userList){
        this.board = new Board(roomId,userList,this);
        this.turn = this.board.setFirstPlayers();
        console.log("turn="+this.turn);
        this.gamestate = 1;
        this.board.initdeck();
    }

    wait(){

    }

    startGame(){
        this.board.startGame();
        this.received = 0;
        this.board.initdeck();
        this.board.firstDraw();
        this.loadGameFlow(null);
    }

    next(){
        this.received = 0;
        this.gamestate++;
        this.loadGameFlow(null);
    }


    receive(data,socketid){
        console.log("wait=" + this.waitUserId + ",socketid=" + socketid);
        if(this.waitUserId == socketid){
            this.received = 1;
            this.loadGameFlow(data);
            this.next();
        }
    }

    loadGameFlow(data){

        //以下ゲームフローを記述

        switch(this.gamestate){

            case 1:
                //ドロー
                console.log("draw");
                this.waitUserId = this.board.players[this.turn].getUserId();
                this.board.drawPhase(this.turn,this.received);
                break;

            case 2:
                //手札からカードを選択
                console.log("changes");
                this.board.selectCard(this.turn,this.received,data);
                break;

            
            case 3:
                //サイコロを振り、出た目をdiceに代入
                this.dice =  this.board.dice(this.turn,this.received);
                console.log("diced!!" + this.dice);
                break;

            case 4:
                //移動
                this.board.move(this.turn,this.dice,this.received);
                break;

            case 5:
                //踏んだマスの処理
                this.board.action(this.turn);
                break;

            case 6:
                //次のユーザーに
                console.log("next turn");
                this.turn = this.board.getNextUser(this.turn);
                break;

            default:
                break;
            

        }
        if(this.gamestate == 6){
            this.gamestate = 1;
            this.loadGameFlow();
        }
    }

}