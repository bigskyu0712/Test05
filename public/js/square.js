/*******************************************************************
***  File Name          : w6.js
***  Version            : V1.0
***  Designer           : 武田 和大
***  Date               : 2022.06.21
***  Purpose            : W6の画面を表示する
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 武田 和大, 2022.06.21
*/

//他から欲しいもの
//playerPosition...今のターンのplayerの位置
//cardName...使用するカード情報(名前)

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
    let x = w / 2 - 150; //マスの1番左の所 横に6マスだから-150
    let y = 50; //マスの一番上の所
    let d = 50; //widthとheight
    let i; //for文などで使用
    let j; //for文などで使用
    let playerPosition = 10; //仮置き playerがいるマス番号(左上から時計回りに0~19)
    let player = { //playerがいるマスの左上の座標
        x: x,      //初期値は0番(左上のマス)
        y: y
    }; 
    let leftTextLength;   //文字列の左側の長さ
    let rightTextLength;  //文字列の右側の長さ 色を変えるときに使用
    let allTextLength;    //文字列全体の長さ

    cvs.textAlign = 'center';
    cvs.Baseline = 'center';
    cvs.font = '25px serif';
    leftTextLength = cvs.measureText("マスカード").width;
    rightTextLength = cvs.measureText("を置く場所を選んでください").width;
    allTextLength = cvs.measureText("マスカ－ドを置く場所を選んでください").width;
    cvs.fillStyle = 'orange';
    cvs.fillText("マスカード", w / 2 - allTextLength / 2 + leftTextLength / 2, 25);
    cvs.fillStyle = 'black';
    cvs.fillText("を置く場所を選んでください", w / 2 + allTextLength / 2 - rightTextLength / 2, 25);

    //playerがいるマスの左上の座標を決定
    if(playerPosition<5){
        player.x = x + playerPosition * 50;
    }
    else if(playerPosition<10){
        player.x = x + 250;
        player.y = y + (playerPosition - 5) * 50;
    }
    else if(playerPosition<15){
        player.x = x + (15 - playerPosition) * 50;
        player.y = y + 250;
    }
    else {
        player.y = y + (20 - playerPosition) * 50;
    }

    squareDraw(cvs, x, y, d); //マス描画

    //ユーザの影描画
    cvs.strokeStyle = 'black';
    playerDraw(cvs, player.x, player.y, d);

    //カード画像表示
    let ch = h - y - 300 - 10;   //カードの高さ
    let cw = ch * 63 / 88;   //カードの横幅
        
    //画像表示
    const img = new Image();
    img.src = "カードデザイン-03.png";   //仮置き
    img.onload = () => {
        cvs.drawImage(img, w/2 - cw/2, h - ch, cw, ch);
    }

    //クリック時イベント
    canvas.addEventListener("click", e => {
        const rect = canvas.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        cvs.fillStyle = 'rgb(0,255,0)';
        for (i=0; i<6; ++i){
            if(point.x>=i*d+x && point.x<=(i+1)*d+x){
                for (j=0; j<6; ++j){
                    if(j==0){
                        if(point.y>=j*d+y && point.y<=(j+1)*d+y){
                            //ボタンクリック時はここ
                            //マス番号はi
                            squareFill(cvs, i*d+x, j*d+y, d); //とりあえず塗る
                        }
                    }
                    else if(j==5){
                        if(point.y>=j*d+y && point.y<=(j+1)*d+y){
                            //ボタンクリック時はここ
                            //マス番号は (15-i)
                            squareFill(cvs, i*d+x, j*d+y, d); //とりあえず塗る
                        }
                    }
                    else {
                        if(i==0){
                            if(point.y>=j*d+y && point.y<=(j+1)*d+y){
                                //ボタンクリック時はここ
                                //マス番号は((20-j)%20)
                                squareFill(cvs, i*d+x, j*d+y, d); //とりあえず塗る
                            }
                        }
                        else if(i==5){
                            if(point.y>=j*d+y && point.y<=(j+1)*d+y){
                                //ボタンクリック時はここ
                                //マス番号は(5+j)
                                squareFill(cvs, i*d+x, j*d+y, d); //とりあえず塗る
                            }
                        }
                    }
                }
            }
        }
    });

    //マウスオーバー処理
    canvas.addEventListener('mousemove', m => {
        const rect = canvas.getBoundingClientRect();
        const point = {
            x: m.clientX - rect.left,
            y: m.clientY - rect.top
        };

        for (i=0; i<6; ++i){
            if(point.x>=i*d+x && point.x<=(i+1)*d+x){
                for (j=0; j<6; ++j){
                    if(j==0 || j==5){
                        if(point.y>=j*d+y && point.y<=(j+1)*d+y){
                            cvs.clearRect(x, y, 6*d, 6*d);   //前の色が残らないようにマスを白紙にする
                            squareDraw(cvs, x, y, d);   //もう一度マスを描画
                            cvs.fillStyle = 'orange';   //マスはオレンジ
                            squareFill(cvs, i*d+x, j*d+y, d);
                            cvs.fillStyle = 'rgb(0,0,0)'; //人描画
                            playerDraw(cvs, player.x, player.y, d);
                        }
                    }
                    else {
                        if(i==0 || i==5){
                            if(point.y>=j*d +y && point.y<=(j+1)*d+y){
                                cvs.clearRect(x, y, 6*d, 6*d);   //前の色が残らないようにマスを白紙にする
                                squareDraw(cvs, x, y, d);   //もう一度マスを描画
                                cvs.fillStyle = 'orange';   //マスはオレンジ
                                squareFill(cvs, i*d+x, j*d+y, d);
                                cvs.fillStyle = 'rgb(0,0,0)'; //人描画
                                playerDraw(cvs, player.x, player.y, d);
                            }
                        }
                    }
                }
            }
        }
    });
}

/******************************************************************
*** Function Name       : squareStroke()
*** Designer            : 武田 和大
*** Date                : 2022.06.14
*** Function            : 正方形の枠を描画する
*** Return              : なし
******************************************************************/

function squareStroke(cvs,  //canvas
                      x,    //正方形の左上のx座標
                      y,    //正方形の左上のy座標
                      d)    //正方形の一辺
{
    cvs.beginPath(); 
    cvs.rect(x, y, d, d); 
    cvs.stroke(); 
}

/******************************************************************
*** Function Name       : squareFill()
*** Designer            : 武田 和大
*** Date                : 2022.06.14
*** Function            : 正方形の塗りつぶしを描画する
*** Return              : なし
******************************************************************/

function squareFill(cvs,  //canvas
                    x,    //正方形の左上のx座標
                    y,    //正方形の左上のy座標
                    d)    //正方形の一辺
{
    cvs.beginPath();
    cvs.rect(x, y, d, d);
    cvs.fill();
}

/******************************************************************
*** Function Name       : squareDraw()
*** Designer            : 武田 和大
*** Date                : 2022.06.14
*** Function            : マス全体を描画する
*** Return              : なし
******************************************************************/

function squareDraw(cvs,  //canvas
                    x,    //正方形の左上のx座標
                    y,    //正方形の左上のy座標
                    d)    //正方形の一辺
{
    let a, b=y;
    for (a=x; a<d*5+x; a+=d){ //上段
        squareStroke(cvs, a, b, d);
    }
    for (; b<d*5+y; b+=d){ //右側
        squareStroke(cvs, a, b, d);
    }
    for (; a>x; a-=d){ //下段
        squareStroke(cvs, a, b, d);
    }
    for (; b>=y; b-=d){ //左側
        squareStroke(cvs, a, b, d);
    }
}

/******************************************************************
*** Function Name       : lineDraw()
*** Designer            : 武田 和大
*** Date                : 2022.06.14
*** Function            : 線を描画する
*** Return              : なし
******************************************************************/

function lineDraw(cvs,  //canvas
                  x1,   //始点のx座標
                  y1,   //始点のy座標
                  x2,   //終点のx座標
                  y2)   //終点のx座標
{
    cvs.beginPath();
    cvs.moveTo(x1, y1);
    cvs.lineTo(x2, y2);
    cvs.stroke();
}

/******************************************************************
*** Function Name       : draw()
*** Designer            : 武田 和大
*** Date                : 2022.06.14
*** Function            : playerの影を描画する
*** Return              : なし
******************************************************************/

function playerDraw(cvs,  //canvas
                    x,    //playerがいるマスの左上のx座標
                    y,    //playerがいるマス全体の左上のy座標
                    d)    //正方形の一辺
{
    cvs.beginPath();
    cvs.arc(x+d/2, y+d/5, d/10, 0, Math.PI*2, true); //人の顔
    cvs.fill();
    lineDraw(cvs, x+d/2, y+d*3/10, x+d/2, y+d*7/10); //胴体
    lineDraw(cvs, x+d/2, y+d*11/20, x+d*3/10, y+d*7/20); //左腕
    lineDraw(cvs, x+d/2, y+d*11/20, x+d*7/10, y+d*7/20); //右腕
    lineDraw(cvs, x+d/2, y+d*7/10, x+d*2/5, y+d*19/20); //左足
    lineDraw(cvs, x+d/2, y+d*7/10, x+d*3/5, y+d*19/20); //右足
}