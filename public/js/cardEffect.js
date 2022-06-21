/*******************************************************************
***  File Name          : w6.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.06.21
***  Purpose            : W8の画面を表示する
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.06.21
*/

//他から受け取るもの
//player...playerの配列 player
//turn...今のターンの人 
//cardNumber...踏んだマスのカード情報(番号)
//cardName...踏んだマスのカード情報(名前)

onload = function() {
    draw();
};

/******************************************************************
*** Function Name       : draw()
*** Designer            : 武田 和大
*** Date                : 2022.06.21
*** Function            : 画面全体を描画する
*** Return              : なし
******************************************************************/

function draw() {
    var canvas = document.getElementById('canvas');
    if ( ! canvas || ! canvas.getContext ) {
        return false;
    }
    var cvs = canvas.getContext('2d');

    let w = canvas.width;
    let h = canvas.height;
    let cardNumber;   //カード番号(これでルールカードかマスカードか分類)
    let cardName;    //カードの名前
    let leftTextLength;   //文字の左側の長さ
    let rightTextLength;  //文字の右側の長さ 色を変えるときに使用
    let allTextLength;    //文字全体の長さ
    let buttonSize = { //どのボタンも大きさ統一
        w: 100,    //ボタンの横幅
        h: 40      //ボタンの高さ
    }
    let checkButton = {
        x: w / 2 - 50,   //確認ボタンの左上のx座標
        y: 375           //確認ボタンの左上のy座標
    }
    let playerButton = {
        x: [],   //一番左のplayer選択ボタンの左上のx座標
        y: []    //一番左のplayer選択ボタンの左上のy座標
    }
    let player = ["[player1]", "[player2]", "[player3]", "[player4]", "[player5]", "[player6]"];
    let turn;   //何番目の人のターンか
    let i;      //for文で使用
    let j=0;    //playerボタンの番号

    for (i=0; i<5; ++i){   //player指名ボタンの座標決定
        playerButton.x[i] = w / 2 - 200 + i * 75;
        playerButton.y[i] = 430 + (i % 2) * 60;
    }

    cvs.textAlign = 'center';
    cvs.Baseline = 'center';
    cvs.font = '25px serif';
  
    cardNumber = 8;   //仮置き
    turn = 2;          //仮置き
    
    //cardNumberの分類は仮置き
    if(cardNumber<5){   //ルールカードのマスに止まった時
        //上の文字表示
        leftTextLength = cvs.measureText("ルールカード").width;
        rightTextLength = cvs.measureText("が変更されました").width;
        allTextLength = cvs.measureText("ルールカードが変更されました").width;
        cvs.fillStyle = 'rgb(0, 255, 0)';
        cvs.fillText("ルールカード", w / 2 - allTextLength / 2 + leftTextLength / 2, 25);
        cvs.fillStyle = 'black';
        cvs.fillText("が変更されました", w / 2 + allTextLength / 2 - rightTextLength / 2, 25);

        //実際のカードの入力に対応させる
        cardName = "GreenCard.png";   //仮置き
        cardDraw(cvs, cardName, w);
        checkButtonDraw(cvs, checkButton, buttonSize, w);
    }
    else {   //マスカードのマスに止まった時
        leftTextLength = cvs.measureText("マスカード").width;
        rightTextLength = cvs.measureText("の効果が発動します").width;
        allTextLength = cvs.measureText("マスカードの効果が発動します").width;
        cvs.fillStyle = 'orange';
        cvs.fillText("マスカード", w / 2 - allTextLength / 2 + leftTextLength / 2, 25);
        cvs.fillStyle = 'black';
        cvs.fillText("の効果が発動します", w / 2 + allTextLength / 2 - rightTextLength / 2, 25);
        
        if(cardNumber>10){   //playerを指名する場合
            cvs.fillText("どのプレイヤーを指名しますか？", w / 2, 400);
            cvs.font = '15px serif';
            for (let i=0; i<6; ++i){
                if(i==turn) { //自分は指名しない
                    continue;
                }
                cvs.fillStyle = 'gray';   //playerのボタン表示
                rectFill(cvs, playerButton.x[j], playerButton.y[j], buttonSize.w, buttonSize.h);
                cvs.fillStyle = 'white'; 
                cvs.fillText(player[i], playerButton.x[j]+buttonSize.w/2, playerButton.y[j]+buttonSize.h*3/5);
                j++;
            }
            //実際のカードの入力に対応させる
            cardName = "カードデザイン-03.png";   //仮置き
            cardDraw(cvs, cardName, w);
        }
        else {
            //実際のカードの入力に対応させる
            cardName = "カードデザイン-04.png";   //仮置き
            cardDraw(cvs, cardName, w);
            checkButtonDraw(cvs, checkButton, buttonSize, w);
        }
    }

    cvs.fillStyle = 'black';
    cvs.font = '20px serif';
    cvs.fillText(player[turn], w/2, 60); //カードの上にその番の人の名前表示

    //完了ボタンクリック時イベント
    canvas.addEventListener("click", e => {
        const rect = canvas.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        if(cardNumber>10){   //playerを指名する場合
            j = 0;
            for (i=0; i<6; ++i){
                if(i==turn){ //自分は指名しない
                    continue;
                }
                if(point.x>=playerButton.x[j] && point.x<=playerButton.x[j]+buttonSize.w){
                    if(point.y>=playerButton.y[j] && point.y<=playerButton.y[j]+buttonSize.h){
                        //ボタンクリック時はここ
                        //iが押されたplayerの番号
                        rectFill(cvs, playerButton.x[j], playerButton.y[j], buttonSize.w, buttonSize.h); //とりあえず塗る
                    }
                }
                ++j;
            }
        }
        else {
            if(point.x>=checkButton.x && point.x<=checkButton.x+buttonSize.w){
                if(point.y>=checkButton.y && point.y<=checkButton.y+buttonSize.h){
                    //ボタンクリック時はここ
                    rectFill(cvs, checkButton.x, checkButton.y, buttonSize.w, buttonSize.h);
                }
            }
        }
    });
}

/******************************************************************
*** Function Name       : rectFill()
*** Designer            : 武田 和大
*** Date                : 2022.06.14
*** Function            : 長方形を描画する
*** Return              : なし
******************************************************************/

function rectFill(cvs,   //canvasのcontext
                  x,     //長方形の左上のx座標
                  y,     //長方形の左上のx座標
                  w,     //長方形の横の長さ
                  h)     //長方形の縦の長さ
{
    cvs.beginPath(); 
    cvs.rect(x, y, w, h); 
    cvs.fill();
}

/******************************************************************
*** Function Name       : cardDraw()
*** Designer            : 武田 和大
*** Date                : 2022.06.21
*** Function            : カードの画像を表示する
*** Return              : なし
******************************************************************/

function cardDraw(cvs,        //canvasのcontext
                  cardName,   //カード画像のファイル名
                  w)          //canvas全体のwidth
{
    let cw = 200;             //カードのwidth
    let ch = cw * 88 / 63;    //カードのheight
    let img = new Image();
    img.src = cardName;
    img.onload = () => {
        cvs.drawImage(img, w/2-cw/2, 80, cw, ch);
    }
}

/******************************************************************
*** Function Name       : checkButtonDraw()
*** Designer            : 武田 和大
*** Date                : 2022.06.21
*** Function            : 確認ボタンを表示する
*** Return              : なし
******************************************************************/

function checkButtonDraw(cvs,          //canvasのcontext
                         checkButton,  //確認ボタンの左上の座標
                         buttonSize,   //ボタンの大きさ
                         w)            //canvas全体の大きさ
{
    cvs.fillStyle = 'gray'; 
    rectFill(cvs, checkButton.x, checkButton.y, buttonSize.w, buttonSize.h);
    cvs.fillStyle = 'white';
    cvs.font = '20px serif';
    cvs.fillText("確認", w/2, 400); 
}