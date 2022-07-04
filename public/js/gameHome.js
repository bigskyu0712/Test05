/*******************************************************************
***  File Name		: gameHome.js
***  Version      : V1.1
***  Designer		  : 岩上 雄飛
***  Date			    : 2022.06.21
***  Purpose      : W4の画面
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

var cards = [];
var cardSpacing = 0
var cardWidth = 0
var cardCenteredAxis = 0
var isHoveringOnCard = false

let cardData = [];
let isUpdate = false;


/****************************************************************************
*** Function Name       : main()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 画面への描画する関数の呼び出し
                          マウスの動きなどを管理
*** Return              : なし
****************************************************************************/
function main() {
  var canvas = document.querySelector('#underBar');
  var ctx = canvas.getContext('2d');
  let gridSize = canvas.height/10;
  let tmp;

  let hoverCard = -1;
  
  if (!ctx) {
    alert('エラー.');
    return;
  }

  //drawGrid(ctx, canvas, gridSize);

  //ユーザ情報を取得（今後追加予定）
  // rgba(48,211,59,1)  rgba(255,149,0,1)
  //drawMessage(canvas, "rgba(48,211,59,1)");

  //カードの読み込み
  showCards(ctx, canvas, cardData,-1);

  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const clickPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    switch(gameState){
      case 2:
        console.log(sendData);
        sendData.cardNum = tmp;
        if(sendData.cardNum != -1 && sendData.position != -1){
          console.log("socket send");
          socket.emit("reply", sendData);
          cardData.splice(sendData.cardNum, 1);
          gameData.hand.splice(sendData.cardNum,1);
          isUpdate = true;
          gameState = 3;
        }
        break;

      case 10:
        console.log(sendData);
        sendData.cardNum = tmp;
        if(sendData.cardNum != -1){
          console.log("socket send");
          socket.emit("effectReply", sendData);
          cardData.splice(sendData.cardNum, 1);
          gameData.hand.splice(sendData.cardNum,1);
          isUpdate = true;
          gameState = 0;
        }
      default:
        break;
    }

    // gridClicked(ctx, canvas, clickPoint, gridSize);
  });

  // マウスの位置を取得
  canvas.addEventListener("mousemove", (point) => {
    const hoverPoint = {
      x: point.clientX,
      y: point.clientY
    };
    //gridClicked(ctx, canvas, hoverPoint, gridSize)

    var hoverCardHeight = canvas.height*0.8 // 拡大表示されるカードのサイズ
    if (hoverCardHeight > 380){
      hoverCardHeight = 380
    }

    if (isHoveringCard(canvas, hoverPoint) > -1){ // カードの上にマウスがある場合
      if (isHoveringOnCard == false){
        isHoveringOnCard = true;
        tmp = isHoveringCard(canvas, hoverPoint);
        console.log("hover", isHoveringCard(canvas, hoverPoint));
        /*let hoverCard = cards[isHoveringCard(canvas, hoverPoint)]
        hoverCard.src = hoverCard.src
        hoverCard.onload = function(){
          ctx.fillStyle = "clear"
          ctx.drawImage(hoverCard, 
                        (canvas.width  - hoverCardHeight / 88*63 )/2, 
                        (canvas.height - hoverCardHeight         )/2, 
                        hoverCardHeight /88*63, 
                        hoverCardHeight); 
        }
      */
        
       if(hoverCard != isHoveringCard(canvas,hoverPoint)){
        isUpdate = true;
       }else{
        isUpdate = false;
       }
       hoverCard = isHoveringCard(canvas, hoverPoint);

      }
    } else { // カードの上にマウスがない場合
      if (isHoveringOnCard == true){
        console.log("no hover")
        isHoveringOnCard = false
        
        //拡大表示されたカードの部分を再描画
        /*ctx.clearRect((canvas.width  - hoverCardHeight / 88*63 )/2, 
                     (canvas.height - hoverCardHeight         )/2, 
                     hoverCardHeight * 88/63, 
                     hoverCardHeight);
                     */

        //drawGrid(ctx, canvas, gridSize);
        //drawMessage(canvas, "rgba(48,211,59,1)")
      }
    }
  });
  setInterval(function() {
    if(isHoveringOnCard == false){
      hoverCard = -1;
    }
    if(isUpdate == true) {
      ctx.clearRect(cardCenteredAxis,
      0, 
      (cardWidth + cardSpacing) * cards.length, 
      canvas.height);
      cards = [];
      showCards(ctx,canvas,cardData,hoverCard)
      isUpdate = false;
      console.log(isUpdate);
    }
  },1000 / 60);
}



/****************************************************************************
*** Function Name       : isHoveringCard()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : カードの上にマウスがあるか確認する
*** Return              : -1: カードの上にない
                          -1以外: 左から何番目のカードかを返す
****************************************************************************/
function isHoveringCard(canvas,     //canvas
                        hoverPoint) //マウスの座標
{
  for (var i = 0; i < cards.length; i++){
    let card = cards[i];
    let cardMinY = hoverPoint.y;
    let cardMinX = (cardCenteredAxis + cardWidth*i + cardSpacing*i);
    let cardMaxX = (cardCenteredAxis + cardWidth*(i+1) + cardSpacing*i);
    
    if (cardMinY > (canvas.height/5) && cardMinX <= hoverPoint.x*2 && cardMaxX >= hoverPoint.x*2){
      return i;
    }
  }
  return -1;
}

/****************************************************************************
*** Function Name       : drawGrid()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : マスを画面に描画する
*** Return              : なし
****************************************************************************/
function drawGrid(ctx,    //canvasのcontext
                  canvas, //canvas
                  width)  //マスのサイズ
{
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      if ((0<=i && i<6 && 0<=j  && j<6) && (i==0 || i==5 || j==0 || j==5)){
        ctx.beginPath();
        ctx.rect(i*width + canvas.width/2 - width*3, 
                 j*width + canvas.height/2 - width*3,
                 width, width);


        let gridNumber = getGridNumber(i,j)
        ctx.fillStyle = "white"
        // if (他のユーザがいるマスだったら){
          // ctx.fillStyle = "rgba(200,200,200,1)"
        // }
        ctx.fill()
        ctx.stroke();
      }
    }
  }
}


/****************************************************************************
*** Function Name       : getGridNumber()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.21
*** Function            : 左上を(0,0)と仮定したx,yからマスの番号を計算し返す
*** Return              : 右下を0で時計回りに1ずつ増える時の番号
****************************************************************************/
function getGridNumber(x, //左上を(0,0)と仮定したx座標
                       y) //左上を(0,0)と仮定したy座標
{
  if (y==5){
    return 5 - x
  } else if (y==1){
    return x + 10
  } else if (x==0){
    return (5-y) + 5
  } else if (x==5){
    return y + 15
  }
  return 0
}


/****************************************************************************
*** Function Name       : gridClicked()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 入力されたカードを表示する
*** Return              : なし
****************************************************************************/
function gridClicked(ctx,     //canvasのcontext
                     canvas,  //canvas
                     point,   //クリックされた座標
                     width)   //マスのサイズ
{  
  let x = parseInt((point.x - canvas.width/2  + width*3) / width);
  let y = parseInt((point.y - canvas.height/2 + width*3) / width);
  // console.log(x, parseInt((point.x - canvas.width/2  + width*3) / width))
  if (isHoveringOnCard == true) { return }
  if ((0<=x && x<6 && 0<=y  && y<6) && (x==0 || x==5 || y==0 || y==5)){
    drawGrid(ctx, canvas, width)
    ctx.beginPath();
    ctx.fillStyle = "rgba(204, 204, 204, 0.4)"
    ctx.rect(x*width + canvas.width/2  - width*3,
              y*width + canvas.height/2 - width*3, 
              width, width);
    ctx.fill();
  }
  
}


/****************************************************************************
*** Function Name       : showCards()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 入力されたカードを表示する
*** Return              : なし
****************************************************************************/
function showCards(ctx,       //canvasのcontext
                   canvas,    //canvas
                   cardData,  //表示するカード情報
                   hovercard) //マウスオーバーされたカード
{
  //cardWidth = (canvas.width / 2 - 10*cardData.length) / cardData.length //カードの幅
  cardWidth = (canvas.width / 2 - 10*4) / 4 //カードの幅
  //if (cardWidth > 140){
  //  cardWidth = 140
  //}
  cardSpacing = cardWidth/8 //カードの間隔

  for (let index = 0; index < cardData.length; index++) {
    const element = cardData[index];
    const image = new Image();
    
    cardCenteredAxis = (canvas.width - (cardWidth*cardData.length + cardSpacing*(cardData.length-1)))/2

    //パスを変更
    image.src = "../img/cards/svg/" + "c" + element + ".svg";
    cards.push(image);
    if(index == hovercard){
      image.onload = function(){
        ctx.drawImage(image, 
        cardCenteredAxis + (cardSpacing+cardWidth)*(index), 
        canvas.height/5 - canvas.height / 10, 
        cardWidth, 
        88/63 * cardWidth); 
      }
    }else{
      image.onload = function(){
        ctx.drawImage(image, 
                     cardCenteredAxis + (cardSpacing+cardWidth)*(index), 
                     canvas.height/5, 
                     cardWidth, 
                      88/63 * cardWidth); 
      }
    }
  }
}


/****************************************************************************
*** Function Name       : drawMessage(ctx)
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 画面上部に文字を表示する処理を行う。
                          一部文字を異なる色で表示もする。
*** Return              : なし
****************************************************************************/
function drawMessage(canvas,      //canvas
                     color)       //現在のユーザを表示する色
{
  let currentUser = "test user" //現在操作しているユーザ名
  let nextUser    = "next user" //次に操作する　　ユーザ名

  let ctx = canvas.getContext('2d');
  var text = ctx;
  text.font = canvas.height/15 + "px Arial";

  var textWidth = ctx.measureText(currentUser).width + ctx.measureText(" の操作").width
  //表示するメッセージを画面中央に表示
  text.fillStyle = color
  text.fillText(currentUser,
                (canvas.width - textWidth)/2,
                canvas.height/10);
  text.fillStyle = "black"
  text.fillText(" の操作",
                (canvas.width - textWidth)/2 + ctx.measureText(currentUser).width,
                canvas.height/10);

  //次のユーザを表示
  text.font = canvas.height/30 + "px Arial";
  textWidth = ctx.measureText("次のユーザ：").width + ctx.measureText(nextUser).width
  text.fillStyle = "rgba(127.5, 127.5, 127.5, 1)"
  text.fillText("次のユーザ：" + nextUser,
                (canvas.width - textWidth)/2,
                canvas.height/20*3);
}