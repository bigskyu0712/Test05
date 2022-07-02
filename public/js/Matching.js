/*******************************************************************
***  File Name		: matchstart.js
***  Version      : V1.1
***  Designer		  : 日野優介
***  Date			    : 2022.06.21
***  Purpose      : W2の画面
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
    
    var btn1 = createButton("はい", canvas.clientWidth/3, 60, "#0275d8");
    btn1.x = canvas.clientWidth/12;
    btn1.y = 3*canvas.clientHeight/5;
    stage.addChild(btn1);

    var btn2 = createButton("いいえ", canvas.clientWidth/3, 60, "#0275d8");
    btn2.x = 7*canvas.clientWidth/12;
    btn2.y = 3*canvas.clientHeight/5;
    stage.addChild(btn2);

    btn1.addEventListener("click", yeshandleClick);
    function yeshandleClick() {
        alert("w3 マッチング待機画面");
    }

    btn2.addEventListener("click", nohandleClick);
    function nohandleClick() {
        alert("w1 ユーザ名登録画面");
    }

    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
      stage.update();
      drawCanvas(canvas, context);
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
    context.font = '30px sans-serif';
    context.textAlign = 'center';
    context.fillText('マッチングを開始しますか', canvas.clientWidth/2, canvas.clientHeight/3);

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
