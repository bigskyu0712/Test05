
//ボードクラス
//ゲームの詳細な処理をこちらに
module.exports = class Borad{

    //初期化
    constructor(roomId,userList) {
        this.roomId = roomId;
        this.deck = [];
        this.players = new Array();
        userList.forEach(function(player){
            const player = new Player(player.name, player.id);
            this.players.push(player);
        });
    }

    setFirstPlayers(){
        return Math.floor(Math.random() * (players.length + 1));
    }

    //ドロー
    draw(turn){
        topCard = this.deck.shift;
        //display.draw(topCard);
        players[turn].addCard(topCard);
    }

    //次の手番のユーザを取得
    getNextUser(turn){
        return (turn + 1) % this.players.length;
    }

    //手札からカードを選択
    selectCard(turn){
        player[turn].getCard
    }

    //サイコロを振る
    dice(turn){
        return Math.floor(Math.random() * 7);
    }

    move(turn,dice){
        player[turn].updatePosition(dice);
    }


}