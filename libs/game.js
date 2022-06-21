//モジュール
const Board = require('./board.js');
const receiver = require('./receiver.js');
const reader = require('./cardsReader.js');


//ゲームクラス
//ゲームの全体的な進行をここに記述、各工程に関する記述はBoard.jsに
module.exports = class Game{

    selectCard;
    reveived = 0;

    //クラスの初期化
    constructor(roomId,userList){
        this.board = new Board(roomId,userList,this);
        this.turn = this.board.setFirstPlayers();
        this.gamestate = 1;
        this.board.initdeck();
    }

    wait(){

    }

    startGame(){
        this.received = 0;
        this.board.initdeck();
        this.loadGameFlow(null);
    }

    next(){
        this.received = 0;
        this.gamestate++;
        this.loadGameFlow(null);
    }


    receive(data){
        this.received = 1;
        this.loadGameFlow(data);
        this.next();
    }

    loadGameFlow(data){

        //以下ゲームフローを記述

        switch(this.gamestate){

            case 1:
                //ドロー
                console.log("draw");
                this.board.draw(this.turn,this.received);
                break;

            case 2:
                //手札からカードを選択
                this.selectCardId = this.board.selectCard(this.turn,this.received,data);
                console.log(this.selectCardId);
                break;

            case 3:

                //もしカードの種類がマスカードなら
                if(reader.cards[this.selectCardId].cardtype == 1){

                    //マス目を選択して変更
                    this.board.selectSquare(this.turn,this.selectCardId,this.received);

                //カードの種類がルールカードなら
                }else if(reader.cards[this.selectCardId].cardtype == 2){

                    //ルールを変更
                    this.board.changedRule(this.selectCardId);

                }
                break;
            
            case 4:
                //サイコロを振り、出た目をdiceに代入
                let dice =  this.board.dice(this.turn,this.received);
                break;

            case 5:
                //移動
                this.board.move(this.turn,dice,this.received);
                break;

            case 6:
                //踏んだマスの処理
                this.board.action(this.turn);
                break;

            case 7:
                //次のユーザーに
                this.turn = this.board.getNextUser(this.turn);
                break;

            default:
                break;
            

        }
    }

}