/*******************************************************************
***  File Name          : cardsReader.js
***  Version            : V1.1
***  Designer           : 曾根 悠太
***  Date               : 2022.07.04
***  Purpose            : カードを読み取る
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太, 2022.06.21
*** v1.1 : 曾根 悠太, 2022.07.04
*/

const path = require('path');
const fs = require('fs');
const CARDNUMBER = 39;


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