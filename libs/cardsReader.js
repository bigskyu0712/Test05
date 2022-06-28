const path = require('path');
const fs = require('fs');
const CARDNUMBER = 14;


//各カードに関する処理
exports.readCardsFile = function(){
    let cardArray = new Array();
    for(i = 0; i < CARDNUMBER; i++){
        const filepath = path.join(__dirname,"cards","c" + i + ".js");
        if( filecheck(filepath) == 1){
            cardArray.push(require(filepath));
        }

    }
    exports.cards = cardArray;
}

function filecheck(filepath){
    let isExist = false;
    try{
        fs.statSync(filepath);
        isExist = true;
    }catch(err){
        isExist = false;
        console.error(err);
    }
    return isExist;
}