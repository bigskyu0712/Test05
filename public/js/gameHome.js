/*******************************************************************
***  File Name		: gameHome.js
***  Version      : V1.1
***  Designer		  : 岩上 雄飛
***  Date			    : 2022.06.21
***  Purpose      : W4（ゲームのホーム画面）のカード表示
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
var showCardType = 0; // 0:マス, 1:アイテム

let itemCardData = [];
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

  //カードの読み込み
  switchCards(ctx, canvas);

  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const clickPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    
    if(clickPoint.x < 125 && clickPoint.y > 150){
      if (showCardType == 1){
        showCardType = 0
      } else {
        showCardType = 1
      }
      switchCards(ctx, canvas)
    }

    switch(gameState){
      case 2:
        console.log("sendata: ", sendData);
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
        console.log("sendata: ", sendData);
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
      if (showCardType == 0){
        showCards(ctx, canvas, cardData, hoverCard);
      } else {
        showItemCards(ctx, canvas, itemCardData, hoverCard);
      }
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
*** Function Name       : makeSwitchButton()
*** Designer            : 岩上 雄飛
*** Date                : 2022.7.4
*** Function            : カードの表示を切り替えるボタンを作成
*** Return              : 
****************************************************************************/
function makeSwitchButton(canvas){
  var buttonX = 0;
  var buttonY = 300;
  let ctx = canvas.getContext('2d');

  var sqr = ctx
  if (showCardType == 0){
    sqr.fillStyle = "rgba(255, 159, 10, 1.0)"
  } else {
    sqr.fillStyle = "rgba(255, 69,  58, 1.0)"
  }
  
  sqr.fillRect(buttonX,buttonY,250, 60);
  sqr.fill();

  var txt = ctx;
  txt.font = "40px Arial";
  txt.textAlign = 'center';
  txt.Baseline = 'center';
  if (showCardType == 0){
    txt.fillStyle = "white";
    txt.fillText("マス", 
    (160 - txt.measureText("マス").width / 2) + buttonX, 
    buttonY + 40 );

  } else {
    txt.fillStyle = "white"
    txt.fillText("アイテム", 
    (200 - txt.measureText("アイテム").width / 2) + buttonX, 
    buttonY + 40 );
  }
}



/****************************************************************************
*** Function Name       : switchCards()
*** Designer            : 岩上 雄飛
*** Date                : 2022.7.4
*** Function            : 現在の表示するカードのタイプに応じて、一覧を表示する
*** Return              : 
****************************************************************************/
function switchCards(ctx, canvas) //context
{
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  makeSwitchButton(canvas);
  if (showCardType == 0){
    cardData = gameData.hand;
    showCards(ctx, canvas, cardData,-1);
  } else {
    itemCardData = gameData.item[gameData.myPlayerNum];
    showItemCards(ctx, canvas, itemCardData,-1);
  }
}



/****************************************************************************
*** Function Name       : showCards()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 入力されたマスカードを表示する
*** Return              : なし
****************************************************************************/
function showCards(ctx,       //canvasのcontext
                   canvas,    //canvas
                   cardData,  //表示するカード情報
                   hovercard) //マウスオーバーされたカード
{
  cardWidth = (canvas.width / 2 - 10*4) / 4 //カードの幅

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
*** Function Name       : showItemCards()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 入力されたアイテムカードを表示する
*** Return              : なし
****************************************************************************/
function showItemCards(ctx,       //canvasのcontext
                       canvas,    //canvas
                       cardData,  //表示するアイテムカード情報
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
    image.src = "../img/cards/svg/" + "i" + element + ".svg";
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
