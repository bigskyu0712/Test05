####################################################################
###  File Name          : cardcreate.py
###  Version            : V1.0
###  Designer           : 曾根 悠太
###  Date               : 2022.07.02
###  Purpose            : カードを作成する
###
####################################################################

##
### Revision :
### v1.0 : 曾根 悠太, 2022.07.02
##

import sys

args = sys.argv

for num in range(int(args[1]), int(args[2])):    
    f = open('c' + str(num) + '.js', 'w')
    f.write("const Card = require('./card.js');\n//カードの2番目，アイテムの取得になります。\n\n\nmodule.exports = class c"+ str(num) +" extends Card {\n\n    //カードタイプ設定，\n    static cardType = 1;\n\n    //コンストラクタ，必要がなければいじらなくて大丈夫です．\n    constructor(board,player) {\n        super(board,player);\n    }\n\n    //処理を記述\n    effect(){\n        board.addItemRandom(player);\n        console.log('"+ str(num) +"');\n    }\n\n\n}")
    f.close()