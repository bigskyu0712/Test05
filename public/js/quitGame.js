/*******************************************************************
***  File Name		: quitGame.js
***  Version      : V1.1
***  Designer		  : 岩上 雄飛
***  Date			    : 2022.06.21
***  Purpose      : W10の画面
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 岩上 雄飛, 2022.06.14
*** V1.1 : 岩上 雄飛, 2022.06.21 C1
*/

onload = function() {
  main();
};

//再選ボタンの場所を保管
var rematchPosition = {
  x: 0, y: 0, width: 0, height: 0
}

//退出ボタンの場所を保管
var exitPosition = {
  x: 0, y: 0, width: 0, height: 0
}

/****************************************************************************
*** Function Name       : main()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 画面への描画する関数の呼び出し
                          マウスの動きなどを管理
*** Return              : なし
****************************************************************************/
function main() {
  var canvas = document.querySelector('#cvs');
  var ctx = canvas.getContext('2d');
  let width = 60;
  
  if (!ctx) {
    alert('エラー.');
    return;
  }
  drawMessageBackground(canvas)
  drawMessage(canvas, "退出しますか")
  drawButton(canvas)

  // 画面のクリックした場所の処理
  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const clickPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    
    // 退出ボタンを押した際の処理
    if (exitPosition.x <= clickPoint.x && clickPoint.x <= exitPosition.x + exitPosition.width){
      if (exitPosition.y <= clickPoint.y && clickPoint.y <= exitPosition.y + exitPosition.height){
        console.log("exit pressed")
      }
    }

    // 再戦ボタンを押した際の処理
    if (rematchPosition.x <= clickPoint.x && clickPoint.x <= rematchPosition.x + exitPosition.width){
      if (rematchPosition.y <= clickPoint.y && clickPoint.y <= rematchPosition.y + exitPosition.height){
        console.log("rematch pressed")
      }
    }
  });

}


/****************************************************************************
*** Function Name       : drawMessage(ctx)
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 画面上部に入力された文字を表示する処理を行う。
*** Return              : なし
****************************************************************************/
function drawMessage(canvas,   //描画をするcanvas
                     input) //入力文字
{
  let ctx = canvas.getContext('2d');
  var text = ctx;
  text.fillStyle = "black"
  text.font = "40px Arial"

  //表示するtextをx:画面中央、y:画面の下から4分の1 に設定
  text.fillText(input,
                (canvas.width - ctx.measureText(input).width)/2,
                canvas.height / 4)
}

/****************************************************************************
*** Function Name       : drawButtonText(ctx)
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 引数で指定された文字を指定された場所に描く
*** Return              : なし
****************************************************************************/
function drawButtonText(canvas, //描画をするcanvas
                        input,  //ボタンに表示する文字
                        x,      //ボタンのx座標
                        y)      //ボタンのy座標
{
  let ctx = canvas.getContext('2d');
  var txt = ctx;
  txt.fillStyle = "white"
  txt.font = "30px Arial";
  txt.fillText(input, x, y);
}


/****************************************************************************
*** Function Name       : drawButton(ctx)
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 画面上にボタンの四角を描画する
                          四角の上に文字を書く関数を呼ぶ
*** Return              : なし
****************************************************************************/
function drawButton(canvas) //描画をするcanvas
{
  let ctx = canvas.getContext('2d');
  let buttonWidth = canvas.width / 3
  let buttonHeight = canvas.height / 6
  let buttonSpacing = 40
  let originX = (canvas.width - buttonWidth*2 - buttonSpacing)/2

  //退出ボタンの枠の作成
  var exitButton = ctx;
  exitButton.fillStyle = "gray";
  exitButton.fillRect(originX,
                      canvas.height*4/5 - buttonHeight,
                      buttonWidth, buttonHeight)
  exitPosition.x = originX
  exitPosition.y = canvas.height*4/5 - buttonHeight
  exitPosition.width = buttonWidth
  exitPosition.height = buttonHeight
  exitButton.fill()
                    
  //再戦ボタンの枠の作成
  var rematchButton = ctx;
  rematchButton.fillStyle = "gray";
  rematchButton.fillRect(originX + buttonSpacing + buttonWidth,
                         canvas.height*4/5 - buttonHeight,
                         buttonWidth, buttonHeight)
  rematchButton.fill()
  rematchPosition.x = originX + buttonSpacing + buttonWidth
  rematchPosition.y = canvas.height*4/5 - buttonHeight
  rematchPosition.width = buttonWidth
  rematchPosition.height = buttonHeight

  // 作成したボタンの上に文字を表示する
  ctx.font = "30px Arial";
  drawButtonText(canvas, "退出する",
                 originX + (buttonWidth - ctx.measureText("退出する").width)/2,
                 canvas.height*4/5 - (buttonHeight - 30)/2)

  drawButtonText(canvas, "再戦する",
                 originX + buttonSpacing + buttonWidth + (buttonWidth - ctx.measureText("再戦する").width)/2,
                 canvas.height*4/5 - (buttonHeight - 30)/2)
}

/****************************************************************************
*** Function Name       : drawMessageBackground()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 画面上にゲーム画面との区別ができるよう背景を描画する
*** Return              : なし
****************************************************************************/
function drawMessageBackground(canvas)  //描画をするcanvas
{
  let ctx = canvas.getContext('2d');
  var background = ctx
  let spacing = canvas.width / 20
  background.fillStyle = "rgba(230,230,230,1)"
  background.fillRect(spacing, spacing,
                      canvas.width - spacing*2,
                      canvas.height - spacing*2)
}