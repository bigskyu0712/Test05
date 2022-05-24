//モジュール
const Board = require('./board.js');


//ゲームクラス
//ゲームの全体的な進行をここに記述、各工程に関する記述はBoard.jsに
module.exports = class Game{

    //クラスの初期化
    constructor(roomId,board){
        this.board = new Board(roomId,userList);
    }

    startGame(){
        //以下ゲームの進行を記述
        let gamestate = 1;

        while(gamestate == 1){

            //ドロー
            this.board.draw(turn);

            //手札からカードを選択しセレクトカードに代入
            let selectCard = this.board.selectCard(turn);

            //もしカードの種類がマスカードなら
            if(selectCard.cardtype == 1){

                //マス目を選択して変更
                this.board.selectAndChangeSquare(turn,selectCard);

            //カードの種類がルールカードなら
            }else if(selectCard.cardtype == 2){

                //ルールを変更
                this.board.changeRule(card);

            }

            //サイコロを振り、出た目をdiceに代入
            let dice =  this.board.dice(turn);

            //移動
            this.board.move(turn,dice);

            //踏んだマスの処理
            this.board.action(turn);

            //次のユーザーに
            turn = this.board.getNextUser(turn);
        }
    }
}