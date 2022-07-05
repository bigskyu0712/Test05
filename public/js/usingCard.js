/*******************************************************************
***  File Name		: usingCaed.js
***  Version		: V1.0
***  Designer		: 風間 絃吹
***  Date			: 2022.06.28
***  Purpose       	: W5 カード使用画面
***
*******************************************************************/

window.addEventListener('DOMContentLoaded', initUsing);

let using;

function initUsing(){
    using = document.getElementById('usingCard');
    if (using.getContext) {
        usingContext = using.getContext('2d');
    }

    form();

}

var expMainFlag = false;
var expFlag = [false, false, false, false]; //マウスオーバー処理用
var expRect = null;
var select;
var s = 1.6;
let usingCardList = [];

function makeCardList(deck,kind){
    usingCardList = [];
    select = -1;
    page = 1;
    let prefix;
    if(kind == "card"){
        prefix = "c";
    }else if(kind == "item"){
        prefix = "i";
    }
    deck.forEach(function(data){
        usingCardList.push("../img/cards/svg/" + prefix + data + ".svg");
    });
    maxPage = Math.trunc( ( usingCardList.length - 1) / 4) + 1;
    using.style.display = 'block';
    using.style.pointerEvents ='auto';
    using.addEventListener('mouseover', onMouseOver, false);
    using.addEventListener('mouseout', onMouseOut, false);
    using.addEventListener('click', onClick, false);
    usingDrawRect();
    usingMain();
}

function invisible() {
    using.style.display = 'none';
    using.style.pointerEvents ='none';
    using.removeEventListener('mouseover', onMouseOver, false);
    using.removeEventListener('mouseout', onMouseOut, false);
    using.removeEventListener('click', onClick, false);
}

function usingRemove(){
    using.removeEventListener('mouseover', onMouseOver, false);
    using.removeEventListener('mouseout', onMouseOut, false);
    using.removeEventListener('click', onClick, false);
    using.removeEventListener('mousemove', usingOnMouseMove, false);  
}

//usingCardListは単体実行用に代入、実際には外部から与えられる
/*var usingCardList = [
    'rc1.svg',
    'rc2.svg',
    'ic1.svg',
    'mc1.svg',
    'mc4.svg',
    'mc5.svg',
    'mc6.svg',
    'mc7.svg',
    'mc8.svg',
    'mc9.svg',
    'mc10.svg',
    'mc11.svg',
    'mc12.svg'
];*/
var numOfCard = usingCardList.length;
var page = 1; 
var maxPage;


function usingMain() {
    //文字列
   // usingContext.font = "36px 'ＭＳ ゴシック'";
   // usingContext.textAlign = "center";
    //usingContext.fillText("使用するカードを選んでください", 505, 40);

    //ページ数表示
    //ページを戻すボタン
    usingContext.fillStyle = "rgb(255,255,255)";
    
    usingContext.strokeRect(25 * s, 192.5 * s, 15 * s, 15 * s);
    usingContext.beginPath();
    usingContext.moveTo(37.5 * s, 194 * s);
    usingContext.lineTo(37.5 * s, 204 * s);
    usingContext.lineTo(27.5 * s, 199 * s);
    usingContext.closePath();
    usingContext.fill();
    usingContext.stroke();

    //ページを進めるボタン
    usingContext.strokeRect((365 + 63 + 25) * s, 192.5 * s, 15 * s, 15 * s);
    usingContext.beginPath();
    usingContext.moveTo((365 + 63 + 27.5) * s, 194 * s);
    usingContext.lineTo((365 + 63 + 27.5) * s, 204 * s);
    usingContext.lineTo((365 + 63 + 37.5) * s, 199 * s);
    usingContext.closePath();
    usingContext.fill();
    usingContext.stroke();
    
    
    return select;
}




//マウスオーバー処理
function onMouseOver(e) {
    rect = e.target.getBoundingClientRect();
    using.addEventListener('mousemove', usingOnMouseMove, false);
}

function onMouseOut() {
    using.removeEventListener('mousemove', usingOnMouseMove, false);
}

function usingOnMouseMove(e) {
    moveActions.updateTargetFlag(e);

    if (expMainFlag) {
        moveActions.throttle(moveActions.over, 50);
    } else {
        moveActions.throttle(moveActions.out, 50);
    }

}

var moveActions = {
    timer: null,
        updateTargetFlag: function(e) {
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var aLU = (x > 65 * s);
            var aRU = (x < (65 + 66) * s);
            var bLU = (x > 165 * s);
            var bRU = (x < (165 + 66) * s);
            var cLU = (x > 265 * s);
            var cRU = (x < (265 + 66) * s);
            var dLU = (x > 365 * s);
            var dRU = (x < (365 + 66) * s);
            
            var LD = (y > 150 * s);
            var RD = (y < (150 + 88) * s);


            expFlag[0] = (aLU && aRU && LD && RD); // booleanを代入
            expFlag[1] = (bLU && bRU && LD && RD);
            expFlag[2] = (cLU && cRU && LD && RD);
            expFlag[3] = (dLU && dRU && LD && RD);
            expMainFlag = (expFlag[0] || expFlag[1] || expFlag[2] || expFlag[3]);
        },
  
        throttle: function(targetFunc, time) {
            var _time = time || 100;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                targetFunc();
            }, _time);
        },
        out: function() {
            usingDrawRect();
        },
        over: function() {
            usingDrawRectIsHover();
        }
};

function usingDrawRect(color) {
    
    clearExp ();
    for (let i = 1; i <= 4; i++) {
        if(usingCardList[(page - 1) * 4 + i - 1] == undefined){
            break;
        }
        cardDisp(usingCardList[(page - 1) * 4 + i - 1], i); 
    }
}
function usingDrawRectIsHover() {
    // マウスが要素に乗った時の描画処理
    if (expFlag[0]) {
        expDisp(usingCardList[page * 4 - 4]);
    } else if (expFlag[1]) {
        expDisp(usingCardList[page * 4 - 3]);
    } else if (expFlag[2]) {
        expDisp(usingCardList[page * 4 - 2]);
    } else { //expFlag[3]
        expDisp(usingCardList[page * 4 - 1]);
    }
}



//クリック処理
var clickX = 0;
var clickY = 0; 
function onClick(e) {
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;

    usingClick();
    console.log(select);
    if(select >= 0){
        if(isMyturn == true){
            socket.emit("reply",select);
            invisible()
        }
    }

}

function usingClick() {
    if ((clickX >= 25 * s) && (clickX < (25 + 15) * s) && (clickY >= 192.5 * s) && (clickY < (192.5 + 15) * s)) { //ページを戻す　
        prevPage();
    } else if ((clickX >= (365 + 63 + 25) * s) && (clickX < (365 + 63 + 25 + 15) * s) && (clickY >= 192.5 * s) && (clickY < (192.5 + 15) * s)) { //ページを進める　
        nextPage();
    } else if ((clickX >= 65 * s) && (clickX < (65 + 63) * s) && (clickY >= 150 * s) && (clickY < (150 + 88) * s)) {
        select = page * 4 - 4; 
    } else if ((clickX >= 165 * s) && (clickX < (165 + 63) * s) && (clickY >= 150 * s) && (clickY < (150 + 88) * s)) {
        select = page * 4 - 3; 
    } else if ((clickX >= 265 * s) && (clickX < (265 + 63) * s) && (clickY >= 150 * s) && (clickY < (150 + 88) * s)) {
        select = page * 4 - 2; 
    } else if ((clickX >= 365 * s) && (clickX < (365 + 63) * s) && (clickY >= 150 * s) && (clickY < (150 + 88) * s)) {
        select = page * 4 - 1; 
    } else {
        select = -1;
    }
}

function prevPage() {
    if (page == 1) {
        page = maxPage;
    } else {
        page -= 1;
    }
    clearCard();
    for (let i = 1; i <= 4; i++) {
        if(usingCardList[(page - 1) * 4 + i - 1] == undefined){
            break;
        }
        cardDisp(usingCardList[(page - 1) * 4 + i - 1], i); 
    }

}

function nextPage() {
    if (page == maxPage) {
        page = 1;
    } else {
        page += 1;
    }
    clearCard();
    for (let i = 1; i <= 4; i++) {
        if(usingCardList[(page - 1) * 4 + i - 1] == undefined){
            break;
        }
        cardDisp(usingCardList[(page - 1) * 4 + i - 1], i); 
    }
}



//カード表示
function cardDisp (cardAddress, pod)  {
    let x = 50 * s;
    let y = 250;
    let card = new Image ();
    card.src = cardAddress;
    switch (pod) {
        case 1:
            x = 65 * s;
            break;
        case 2:
            x = 165 * s;
            break;
        case 3:
            x = 265 * s;
            break;
        default:
            x = 365 * s;
    }
    card.onload = function () {
        usingContext.drawImage (card, x, y, 63 * s, 88 * s);
    }
}

//カード説明表示 
function expDisp (expAddress) {
    let x = 380, y = 200;
    let exp = new Image ();
    exp.src = expAddress;
    exp.onload = function () {
        usingContext.drawImage (exp, 197 * s, 100 * s, 63 * 1.5 * s, 88 * 1.5 * s);
    }
}

//カード消去
function clearCard () {
    usingContext.clearRect ( 50 * s, 225, 380 * s, 275 );
    usingContext.fillStyle = "rgba(255,255,255,1)" ;

    //矢印の再描画
    usingContext.strokeRect((365 + 63 + 25) * s, 192.5 * s, 15 * s, 15 * s);
    usingContext.beginPath();
    usingContext.moveTo((365 + 63 + 27.5) * s, 194 * s);
    usingContext.lineTo((365 + 63 + 27.5) * s, 204 * s);
    usingContext.lineTo((365 + 63 + 37.5) * s, 199 * s);
    usingContext.closePath();
    usingContext.fill();
    usingContext.stroke();
}

//説明文消去    
function clearExp () { 
    usingContext.clearRect (197 * s, 100 * s, (63 * 1.5 + 5) * s, (88 * 1.5 + 5) * s);
}
