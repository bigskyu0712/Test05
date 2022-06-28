/*******************************************************************
***  File Name		: result.js
***  Version      : V1.1
***  Designer		  : 日野優介
***  Date			    : 2022.06.21
***  Purpose      : W9の画面
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 日野優介, 2022.06.14
*/

window.onload = function() {
    main();
};

/****************************************************************************
*** Function Name       : main()
*** Designer            : 日野優介
*** Date                : 2022.6.14
*** Function            : 画面への描画する関数の呼び出し
                          マウスの動きなどを管理
*** Return              : なし
****************************************************************************/

function main() {

    var canvas = document.getElementById('canvas1');
    var context = canvas.getContext('2d');

    var stage = new createjs.Stage("canvas1");
    stage.enableMouseOver();

    //順位順にUserIDを格納
    var UserID = ["fujiwara","matukawa","kakunaka","fujioka"];

    stage.enableMouseOver();
    var btn = createButton("終了", canvas.clientWidth/3, 40, "#0275d8");
    btn.x = canvas.clientWidth/3;
    btn.y = 3*canvas.clientHeight/4+15;
    stage.addChild(btn);

    btn.addEventListener("click", handleClick);
    function handleClick() {
        alert("画面遷移");
    }

    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
      stage.update();
      drawCanvas(canvas, context);
      drawTable(canvas, context, UserID);
    }
}


/****************************************************************************
*** Function Name       : drawCanvas()
*** Designer            : 日野優介
*** Date                : 2022.6.14
*** Function            : 画面上部に文字を表示する処理を行う。
*** Return              : なし
****************************************************************************/

function drawCanvas(canvas, context){
    
    context.fillStyle = 'black';
    context.font = '35px sans-serif';
    context.textAlign = 'center';
    context.fillText('ゲーム結果', canvas.clientWidth/2, canvas.clientHeight/6);

}


/****************************************************************************
*** Function Name       : drawTable()
*** Designer            : 日野優介
*** Date                : 2022.6.14
*** Function            : 画面上部に文字を表示する処理を行う。
*** Return              : なし
****************************************************************************/

//順位表を作成
//順位順に名前が格納されている配列を引数に取る
function drawTable(canvas, context, array) {

    var tablex = canvas.clientWidth/8;
    var tabley = canvas.clientHeight/4;

    var tablewidth = canvas.clientWidth-2*tablex;
    var tableheight = canvas.clientHeight-2*tabley;

    //表の四角
    context.beginPath();
    context.rect(tablex,tabley,tablewidth,tableheight);
    context.stroke();
    
    //表の横線
    var h = (tableheight)/5; //表の幅

    for(var i=1;i<=4;i++){
        context.beginPath();
        context.moveTo(tablex, tabley+i*h);
        context.lineTo(tablex+tablewidth, tabley+i*h);
        context.stroke();
    }

    //表の縦線
    context.beginPath();
    context.moveTo(3*tablex, tabley);
    context.lineTo(3*tablex, tabley+tableheight);
    context.stroke();

    context.fillStyle = 'black';
    context.font = '20px sans-serif';
    context.textAlign = 'center';
    context.fillText('順位', 2*tablex, tabley+h-5);
    context.fillText('名前', 5*tablex, tabley+h-5);

    context.font = '20px sans-serif'; 
    for(i=1;i<=4;i++){
        context.fillText(i, 2*tablex, tabley+(i+1)*h-5);
    }

    //順位にあった名前を表示する
    //順位順に並べて、配列に格納⇒格納順に表示

    for(i=1;i<=4;i++){
        context.fillText(array[i-1], 5*tablex, tabley+(i+1)*h-5);
    }
}


/****************************************************************************
*** Function Name       : createButton()
*** Designer            : 日野優介
*** Date                : 2022.6.14
*** Function            : 引数で指定されたボタンを作成
*** Return              : button
****************************************************************************/

function createButton(text, width, height, keyColor) {

    // ボタン要素をグループ化
    var button = new createjs.Container();
    
    button.cursor = "pointer";

    var bgUp = new createjs.Shape();
    bgUp.graphics
            .setStrokeStyle(1.0)
            .beginStroke(keyColor)
            .beginFill("white")
            .drawRoundRect(0.5, 0.5, width - 1.0, height - 1.0, 4);
    button.addChild(bgUp);
    bgUp.visible = true;



    var bgOver = new createjs.Shape();
    bgOver.graphics
            .beginFill(keyColor)
            .drawRoundRect(0, 0, width, height, 4);
    bgOver.visible = false;
    button.addChild(bgOver);

    //ボタンに表示する文字
    var label = new createjs.Text(text, "18px sans-serif", keyColor);
    label.x = width / 2;
    label.y = height / 2;
    label.textAlign = "center";
    label.textBaseline = "middle";
    button.addChild(label);


    button.addEventListener("mouseover", handleMouseOver);
    button.addEventListener("mouseout", handleMouseOut);
    function handleMouseOver() {
        bgUp.visble = false;
        bgOver.visible = true;
        label.color = "white";
    }

    function handleMouseOut() {
        bgUp.visble = true;
        bgOver.visible = false;
        label.color = keyColor;
    }

    return button;

}
