import sys

args = sys.argv

for num in range(int(args[1]), int(args[2])):    
    f = open('c' + str(num) + '.js', 'w')
    f.write("const Card = require('./card.js');\n//カードの2番目，アイテムの取得になります。\n\n\nmodule.exports = class c"+ str(num) +" extends Card {\n\n    //カードタイプ設定，\n    static cardType = 1;\n\n    //コンストラクタ，必要がなければいじらなくて大丈夫です．\n    constructor(board,player) {\n        super(board,player);\n    }\n\n    //処理を記述\n    effect(){\n        board.addItemRandom(player);\n        console.log('"+ str(num) +"');\n    }\n\n\n}")
    f.close()