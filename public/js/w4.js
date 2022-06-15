/*******************************************************************
***  File Name		: w4.js
***  Version      : V1.0
***  Designer		  : 岩上 雄飛
***  Date			    : 2022.06.13
***  Purpose      : W4の画面
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 岩上 雄飛, 2022.06.13
*/

onload = function() {
  main();
};

var cards = [];
var cardSpacing = 0
var cardWidth = 0
var cardCenteredAxis = 0
var isHoveringOnCard = false

/****************************************************************************
*** Function Name       : main()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.14
*** Function            : 画面への描画する関数の呼び出し
                          マウスの動きなどを管理
*** Return              : なし
****************************************************************************/
function main() {
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  let gridSize = 60;
  
  if (!ctx) {
    alert('エラー.');
    return;
  }

  drawGrid(ctx, canvas, gridSize);  
  drawMessage(ctx);

  //カードの読み込み
  let cardData = ["OrangeCard1", "OrangeCard2", "OrangeCard3"];
  showCards(ctx, canvas, cardData);

  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const clickPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    gridClicked(ctx, canvas, clickPoint, gridSize);
  });

  canvas.addEventListener("mousemove", (point) => {
    const hoverPoint = {
      x: point.clientX,
      y: point.clientY
    };
    gridClicked(ctx, canvas, hoverPoint, gridSize)
    let hoverCardWidth = 250
    if (isHoveringCard(canvas, hoverPoint) > -1){
      if (isHoveringOnCard == false){
        isHoveringOnCard = true
        console.log("hover", isHoveringCard(canvas, hoverPoint))
        let sqr = ctx
        sqr.fillRect((canvas.width-240)/2, 
                      (canvas.height-88/63*240)/2, 
                      240, 
                      88/63*240);
        let hoverCard = cards[isHoveringCard(canvas, hoverPoint)]
        hoverCard.src = hoverCard.src
        hoverCard.onload = function(){
          ctx.fillStyle = "clear"
          ctx.drawImage(hoverCard, 
                        (canvas.width-hoverCardWidth)/2, 
                        (canvas.height-88/63*hoverCardWidth)/2, 
                        hoverCardWidth, 
                        88/63*hoverCardWidth); 
        }
      }
    } else {
      if (isHoveringOnCard == true){
        console.log("no hover")
        isHoveringOnCard = false
        ctx.clearRect((canvas.width-hoverCardWidth)/2, 
                        (canvas.height-88/63*hoverCardWidth)/2, 
                        hoverCardWidth, 
                        88/63*hoverCardWidth);
        drawGrid(ctx, canvas, gridSize);  
      }
    }
  });
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
    let card = cards[i]
    let cardMinY = hoverPoint.y
    let cardMinX = (cardCenteredAxis + 140*i + 20*i)
    let cardMaxX = (cardCenteredAxis + 140*(i+1) + 20*i)
    
    if (cardMinY > (canvas.height-100) && cardMinX <= hoverPoint.x && cardMaxX >= hoverPoint.x){
      return i
    }
  }
  return -1
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
      if (0<i && i<5 && 0<j && j<5){

      } else {
        ctx.beginPath();
        ctx.rect(i*width + canvas.width/2 - width*3, 
                 j*width + canvas.height/2 - width*3,
                 width, width);

        ctx.fillStyle = "white"
        ctx.fill()
        ctx.stroke();
      }
    }
  }
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
    ctx.fillStyle = "rgba(255,149,0,1)"
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
                   cardData)  //表示するカード情報
{
  for (let index = 0; index < cardData.length; index++) {
    const element = cardData[index];
    const image = new Image();
    cardSpacing = 20; //カードの感覚
    cardWidth = 140; //カードの幅
    cardCenteredAxis = (canvas.width - (cardWidth*cardData.length + cardSpacing*(cardData.length-1)))/2

    image.src = element + ".png";
    cards.push(image);
    image.onload = function(){
      ctx.drawImage(image, 
                    cardCenteredAxis + (cardSpacing+cardWidth)*(index), 
                    canvas.height-100, 
                    cardWidth, 
                    88/63*cardWidth); 
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
function drawMessage(ctx){
  var text = ctx;
  text.font = "40px Arial";

  //表示するメッセージを画面中央に表示
  text.fillStyle = "rgba(255,149,0,1)"
  text.fillText("マスカード",
                (canvas.width - ctx.measureText("マスカードを配置する場所を選択").width)/2,
                80);
  text.fillStyle = "black"
  text.fillText("を配置する場所を選択",
                (canvas.width - ctx.measureText("マスカードを配置する場所を選択").width)/2 + ctx.measureText("マスカード").width,
                80);
}
