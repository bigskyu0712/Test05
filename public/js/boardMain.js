
gameState = 0;
isDrawed = 0;
receiveCardDatas = [];
createCard = [];

function init() {

  setDirection(gameData.myPlayerNum);
  let cameraInitZ = 1200;      //cameraのz座標,初期値

  let cameraX = 0;  //cameraのx座標
  let cameraY = 700;  //cameraのy座標
  let cameraZ = cameraInitZ;  //cameraのz座標


  let clickSquare;
  let cardList = [];

  // サイズを指定
  const width = 800;
  const height = 600;

  // マウス座標管理用のベクトルを作成
  const mouse = new THREE.Vector2();

  // canvas 要素の参照を取得する
  const canvas = document.querySelector('#cvs3d');

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(cameraX, cameraY, cameraZ);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const cubesize = 100;
  let square = new Square(cubesize);
  scene.add(square);

  let pieces = [];
  for(i = 0; i < 4; i++){
    let piece = new Piece('./img/p'+ i +'.svg',square,i);

    piece.position.x = square.getPosition(0).x;
    piece.position.y = 63;
    piece.position.z = square.getPosition(0).z;
    piece.now = 0;
    piece.scale.set(150, 150, 10);

    scene.add(piece);
    pieces.push(piece);
  }

  const loader = new THREE.GLTFLoader();
  loader.load( './img/deck.glb', function ( gltf ) {

    const model = gltf.scene;
    model.position.set( 0, 0, 0 );
    model.scale.set( 0.66, 0.66, 0.66 );
    scene.add( model );


  }, undefined, function ( e ) {

    console.error( e );

  } );


  let drawCard = new DrawCard();
  drawCard.position.set(0,21,5);
  scene.add(drawCard);


  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 700, 500);
  scene.add(directionalLight);

  // 環境光源
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // レイキャストを作成
  const raycaster = new THREE.Raycaster();

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('click',handleClick);
  tick();

  // マウスを動かしたときのイベント
  function handleMouseMove(event) {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    // canvas要素の幅・高さ
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x / w) * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
  }

  function cardLanding(){
    cardList.forEach(function(card){
      if(card.position.y > 3){
        card.position.y -= 10;
      }
    });
  }

  //gamestate

  function handleClick(event){
    if(isMyturn === true){
      switch (gameState){
        case 2:
          sendData.position = clickSquare;
          console.log(sendData);
          if(sendData.cardNum != -1){
            console.log("socket send");
            socket.emit("reply", sendData);
            cardData.splice(sendData.cardNum, 1);
            gameData.hand.splice(sendData.cardNum,1);
            isUpdate = true;
            gameState = 3;
          }
          break;
        
        case 6:
          dice.throw(diceNum);
          gameState = 7;
          break;
        
        case 7:

        case 8:
          // カードを作成
          const itemCard = new ItemCard('./img/cards/png/i'+ 1 +'.png');
          // ユーザの番号（ランダムだから後で変更）
          let ran = Math.floor(Math.random() * 4);
          // カードの場所を設定
          itemCard.setPosition(ran);
          // ユーザの所持カード情報の更新
          gameData.item[ran].push(1);
          // sceneにカードを追加
          scene.add(itemCard);
          break;
        default:
          break;
      }
    }
  }


  /****************************************************************************
    *** Function Name       : placePlayerCards()
    *** Designer            : 
    *** Date                : 2022.7.2
    *** Function            : 入力されたユーザのマスカード枚数を画面に表示する
    *** Return              : なし
    ****************************************************************************/
  function placePlayerCards(playerNum)  // プレイヤーの番号
  {
    for (var i = 0; i < gameData.playerHandNumber[playerNum]; i++) {
      const squareCard = new SquareCard('./img/cback.png');
      squareCard.setPosition(2, i);
      scene.add(squareCard);
    }
  }

  function installationCard(id,squareNum){
      const card = new Card('./img/cards/png/c'+ id +'.png');
      card.position.x = square.getPosition(squareNum).x;
      card.position.y = square.getPosition(squareNum).y + 42;
      card.position.z = square.getPosition(squareNum).z;
      card.rotation.y = Math.random() * 2 * Math.PI;
      cardList.push(card);
      scene.add(card);
      square.setId(squareNum,0);
  }

  function draw(){
    isDrawed = 0;
    p = drawCard.draw(receiveCardDatas.length);
    if(p == 1){
      if(drawCard.counter != 0){
        cardData.push(receiveCardDatas[drawCard.counter - 1]);
      }else{
        cardData.push(receiveCardDatas[receiveCardDatas.length - 1]);
      }
      isUpdate = true;
      if(drawCard.counter == 0){
        isDrawed = 1;
        receiveCardDatas = [];
        console.log("socket send");
        socket.emit("reply","drawed");
      }
    }
  }

  function cameraMove(){
    if(gameState==2){
      if(cameraZ>1){              
        //画角がマスの真上になるまで移動
        cameraY += 20;
        cameraZ -= 20;
      }
    }
    else if(gameState==4){
      if(cameraZ<cameraInitZ){   //画角を初期値まで戻す
        cameraY -= 20;
        cameraZ += 20;
      }
      else {
        gameState = 6;
      }
    }
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  let dice = new Dice();
  function createDice(){
    dice.position.set(0,200,300);
    scene.add( dice );
    dice.isVisible = true;
  }

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, camera);

    clickSquare = square.onMouse(raycaster);
    cardInfo = square.getCardId(clickSquare);
    cardLanding();


    if(gameData.hand.length != cardData.length){
      if(receiveCardDatas.length == 0){
        receiveCardDatas = gameData.hand;
      }
      draw();
    }


    let positionList = [];
    pieces.forEach(function(piece) {
      if(piece.isRun == 0) {
        if(positionList[piece.now] == 0){
          positionList[piece.now] = 1;
        }else{
          positionList[piece.now] = 0;
        }
      }
    });

    pieces.forEach(function(piece) {
      piece.setPosition(positionList);
    });




    switch(gameState){
      case 3:
        installationCard(createCard[0],createCard[1]);
        gameState = 4;
        break;
      case 6:
        if(dice.isVisible == false){
          createDice();
        }else{
          dice.rotate();
        }
        break;
      case 7:
        dice.dice();
        if(dice.t > 300){
          scene.remove( dice );
          dice.geometry.dispose();
          dice.isVisible = false;
          gameState = 8;
        }
        break;
      case 8:
        let isMoved = 1;
        for(i = 0; i < 4; i++){
          pieces[i].moveTo(gameData.positions[i]);
          isMoved *= pieces.isRun;
        }
        if(isMoved == 0){
          gameState = 9;
        }
        break;
      default:
        break;
    }
    cameraMove();
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);

    //ここは消して
  }
}