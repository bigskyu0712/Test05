//モジュール
const Board = require('./board.js');
const receiver = require('./receiver.js');


//ゲームクラス
//ゲームの全体的な進行をここに記述、各工程に関する記述はBoard.jsに
module.exports = class Game{

    //クラスの初期化
    constructor(roomId,userList){
        this.board = new Board(roomId,userList);
        this.turn = this.board.setFirstPlayers();
        this.gamestate = 1;
        this.board.initdeck();
    }

    startGame(){
        initdeck();
        loadGameFlow;
    }


    next(){    //次のゲームフローへ進行
        this.gamestate++;
        loadGameFlow();
    }

    loadGameFlow(){

        //以下ゲームフローを記述

        switch(this.gamestate){

            case 1:
                //ドロー
                this.board.draw(this.turn);
                break;

            case 2:
                //手札からカードを選択し代入
                let chooseCard = this.board.chooseCard(this.turn);
                break;

            case 3:
                //もしカードの種類がマスカードなら
                if(chooseCard.cardtype == 1){

                    //マス目を選択して変更
                    this.board.changedSquare(this.turn,selectCard);

                //カードの種類がルールカードなら
                }else if(selectCard.cardtype == 2){

                    //ルールを変更
                    this.board.changedRule(card);

                }
                break;
            
            case 4:
                //サイコロを振り、出た目をdiceに代入
                let dice =  this.board.dice(this.turn);
                break;

            case 5:
                //移動
                this.board.move(this.turn,dice);
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