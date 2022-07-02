/*******************************************************************
***  File Name		: usingCaed.js
***  Version		: V1.0
***  Designer		: 風間 絃吹
***  Date			: 2022.06.28
***  Purpose       	: W5 カード使用画面
***
*******************************************************************/


var canvas = document.getElementById('usingCard');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        main();
    }
var expMainFlag = false;
var expFlag = [false, false, false, false]; //マウスオーバー処理用
var expRect = null;
var select;
//cardListは単体実行用に代入、実際には外部から与えられる
var cardList = [
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
];
var numOfCard = cardList.length;
var page = 1; 
var maxPage = Math.trunc( ( numOfCard - 1) / 4) + 1;


function main() {
    //文字列
    context.font = "36px 'ＭＳ ゴシック'";
    context.textAlign = "center";
    context.fillText("使用するカードを選んでください", 505, 40);

    //ページ数表示
    //ページを戻すボタン
    context.fillStyle = "rgb(0,0,0)";
    
    context.strokeRect(50, 163, 30, 30);
    context.beginPath();
    context.moveTo(75, 168);
    context.lineTo(75, 188);
    context.lineTo(55, 178);
    context.closePath();
    context.fill();
    context.stroke();

    //ページを進めるボタン
    context.strokeRect(730 + 63 * 2 + 50 , 163, 30, 30);
    context.beginPath();
    context.moveTo(730 + 63 * 2 + 55, 168);
    context.lineTo(730 + 63 * 2 + 55, 188);
    context.lineTo(730 + 63 * 2 + 75, 178);
    context.closePath();
    context.fill();
    context.stroke();
    
    return select;
}
//マウスオーバー処理
function onMouseOver(e) {
    rect = e.target.getBoundingClientRect();
    canvas.addEventListener('mousemove', onMouseMove, false);
}

function onMouseOut() {
    canvas.removeEventListener('mousemove', onMouseMove, false);
}

function onMouseMove(e) {
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

            var aLU = (x > 130);
            var aRU = (x < 130 + 66 * 2);
            var bLU = (x > 330);
            var bRU = (x < 330 + 66 * 2);
            var cLU = (x > 530);
            var cRU = (x < 530 + 66 * 2);
            var dLU = (x > 730);
            var dRU = (x < 730 + 66 * 2);
            
            var LD = (y > 100);
            var RD = (y < 100 + 88 * 2);

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
            drawRect();
        },
        over: function() {
            drawRectIsHover();
        }
};

function drawRect(color) {
    clearExp ();
    for (let i = 1; i <= 4; i++) {
        cardDisp(cardList[(page - 1) * 4 + i - 1], i); 
    }
}
function drawRectIsHover() {
    // マウスが要素に乗った時の描画処理
    if (expFlag[0]) {
        expDisp(cardList[page * 4 - 4]);
    } else if (expFlag[1]) {
        expDisp(cardList[page * 4 - 3]);
    } else if (expFlag[2]) {
        expDisp(cardList[page * 4 - 2]);
    } else { //expFlag[3]
        expDisp(cardList[page * 4 - 1]);
    }
}

canvas.addEventListener('mouseover', onMouseOver, false);
canvas.addEventListener('mouseout', onMouseOut, false);
drawRect();

//クリック処理
var clickX = 0;
var clickY = 0; 
function onClick(e) {
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;

    click();
}

function click() {
    if ((clickX >= 50) && (clickX < 50 + 30) && (clickY >= 163) && (clickY < 163 + 30)) { //ページを戻す　
        prevPage();
    } else if ((clickX >= 730 + 63 * 2 + 50) && (clickX < 730 + 63 * 2 + 50 + 30) && (clickY >= 163) && (clickY < 163 + 30)) { //ページを進める　
        nextPage();
    } else if ((clickX >= 130) && (clickX < 130 + 63 * 2) && (clickY >= 100) && (clickY < 100 + 88 * 2)) {
        select = page * 4 - 4; 
    } else if ((clickX >= 330) && (clickX < 330 + 63 * 2) && (clickY >= 100) && (clickY < 100 + 88 * 2)) {
        select = page * 4 - 3; 
    } else if ((clickX >= 530) && (clickX < 530 + 63 * 2) && (clickY >= 100) && (clickY < 100 + 88 * 2)) {
        select = page * 4 - 2; 
    } else if ((clickX >= 730) && (clickX < 730 + 63 * 2) && (clickY >= 100) && (clickY < 100 + 88 * 2)) {
        select = page * 4 - 1; 
    } else {
        ;
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
        cardDisp(cardList[(page - 1) * 4 + i - 1], i); 
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
        cardDisp(cardList[(page - 1) * 4 + i - 1], i); 
    }
}

canvas.addEventListener('click', onClick, false);

//カード表示
function cardDisp (cardAddress, pod)  {
    let x, y = 100;
    let card = new Image ();
    card.src = cardAddress;
    switch (pod) {
        case 1:
            x = 130;
            break;
        case 2:
            x = 330;
            break;
        case 3:
            x = 530;
            break;
        default:
            x = 730;
    }
    card.onload = function () {
        context.drawImage (card, x, y, 63 * 2, 88 * 2);
    }
}

//カード説明表示 
function expDisp (expAddress) {
    let x = 380, y = 100;
    let exp = new Image ();
    exp.src = expAddress;
    exp.onload = function () {
        context.drawImage (exp, x, y, 63 * 3, 88 * 3);
    }
}

//カード消去
function clearCard () {
    context.clearRect (130, 100, 63 * 2, 88 * 2);
    context.clearRect (330, 100, 63 * 2, 88 * 2);
    context.clearRect (530, 100, 63 * 2, 88 * 2);
    context.clearRect (730, 100, 63 * 2, 88 * 2);
}


//説明文消去    
function clearExp () { 
    context.clearRect (380 , 100 , 63 * 3 + 10, 88 * 3);
}

