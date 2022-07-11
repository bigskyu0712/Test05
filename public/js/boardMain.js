/*******************************************************************
***  File Name		: boardMain.js
***  Version		: V1.5
***  Designer		: 曾根 悠太
***  Date			: 2022.07.10
***  Purpose   :W3~W5，ボード表示の主に3d部分に関する処理 
***
*******************************************************************/
/*
*** Revision :
*** V1.0 : 曾根悠太, 2022.06.25
*** V1.1 : 曾根悠太, 2022.06.26
*** V1.2 : 曾根悠太, 2022.06.28
*** V1.3 : 曾根悠太, 2022.06.30
*** V1.4 : 曾根悠太, 2022.07.06
*** V1.5 : 曾根悠太, 2022.07.10
*/



      isInited = false;
      gameState = 0;
      isDrawed = 0;
      receiveCardDatas = [];
      createCard = [];
      let isClear = false;

/**************************************************************************** 

*** Function Name       : init() 

*** Designer            : 曾根悠太 

*** Date                : 2022.07.10 

*** Function            : UIの3Dに関するデータの初期化  

*** Return              : なし 

****************************************************************************/ 


      function init() {
        setDirection(gameData.myPlayerNum);
        isInited = true;
        console.log("direction:"+gameData.direction);
        let cameraInitZ = 1200;      //cameraのz座標,初期値

        let cameraX = 0;  //cameraのx座標
        let cameraY = 700;  //cameraのy座標
        let cameraZ = cameraInitZ;  //cameraのz座標

      
        let clickSquare;
        let cardList = [];
        let itemList = [[],[],[],[]];
        let handList = [[],[],[],[]];
        let isHoveringItem = false;
        let nowTerm = -1;
        let goalCard = [];


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

        
/****************************************************************************
*** Function Name       : placePlayerCards()
*** Designer            : 
*** Date                : 2022.07.02
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


/****************************************************************************
*** Function Name       : cardLanding()
*** Designer            : 
*** Date                : 2022.06.25
*** Function            : 表示中のカードの落下アニメーションの実装
*** Return              : なし
****************************************************************************/

        function cardLanding(){
          cardList.forEach(function(card){
            if(card.position.y > 3){
              card.position.y -= 10;
            }
          });
        }

/****************************************************************************
*** Function Name       : hoverItem()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : マウスオーバーしたアイテムを検知する
*** Return              : なし
****************************************************************************/        

        function hoverItem(raycaster){
          isHoveringItem = false;
          for(i = 0; i < 4; i++){
                  if(itemList[i].length > 0){
                    // その光線とぶつかったオブジェクトを得る
                    const intersects = raycaster.intersectObjects(itemList[i]);
                    itemList[i].map((mesh,index) => {
                    // 交差しているオブジェクトが1つ以上存在し、
                    // 交差しているオブジェクトの1番目(最前面)のものだったら
                      if (intersects.length > 0 && mesh === intersects[0].object) {
                      //カードInfoとhoverCardを更新
                        hoverCard.cardNum = index;
                        hoverCard.playerNum = i;
                        hoverCard.type = 1;
                        isHoveringItem = true;
                        return; //処理を終了
                      } else {

                    }
                  });
                }
                 
            }
        }


/****************************************************************************
*** Function Name       : hoverHand()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : マウスオーバーした相手の手札を検知する
*** Return              : なし
****************************************************************************/ 

        function hoverHand(raycaster){ //raycaster
          isHoveringHand = false;
          for(i = 0; i < 4; i++){
                  // その光線とぶつかったオブジェクトを得る
                  const intersects = raycaster.intersectObjects(handList[i]);
                    handList[i].map((mesh,index) => {
                    // 交差しているオブジェクトが1つ以上存在し、
                    // 交差しているオブジェクトの1番目(最前面)のものだったら
                    if (intersects.length > 0 && mesh === intersects[0].object) {
                      //カードInfoとhoverCardを更新
                      hoverCard.cardNum = index;
                      hoverCard.playerNum = i;
                      hoverCard.type = 2;
                      isHoveringHand = true;
                      return; //処理を終了
                    } else {

                    }
                  });
                 
            }
        }

/****************************************************************************
*** Function Name       : hoverGoal()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : マウスオーバーしたゴールカードを検知する
*** Return              : なし
****************************************************************************/ 

        function hoverGoal(raycaster){ //raycaster
                // その光線とぶつかったオブジェクトを得る
                const intersects = raycaster.intersectObjects(goalCard);
                  goalCard.map((mesh) => {
                  // 交差しているオブジェクトが1つ以上存在し、
                  // 交差しているオブジェクトの1番目(最前面)のものだったら
                  if (intersects.length > 0 && mesh === intersects[0].object) {
                    //カードInfoとhoverCardを更新
                    cardInfo.id = gameData.term;
                    cardInfo.type = "card";
                    return; //処理を終了
                  } else {

                  }
                });
               
          
          return 0;
      }

        //gamestate

/****************************************************************************
*** Function Name       : handleClick()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : クリック時のイベントの処理
*** Return              : なし
****************************************************************************/ 


        function handleClick(event){ //event
          if(isMyturn === true){
            //ゲームの遷移状態によって実行するイベントを変更する
          switch (gameState){
            //State:2,カードが選択された状態でマスがクリックされた場合マスにカードを設置
            case 2:
              sendData.position = clickSquare;
              console.log(sendData);
              if(sendData.cardNum != -1 && sendData.position != -1){
                console.log("socket send");
                socket.emit("reply", sendData);
                cardData.splice(sendData.cardNum, 1);
                gameData.hand.splice(sendData.cardNum,1);
                isUpdate = true;
                gameState = 3;
              }
              break;
            //State:6,サイコロを投げる
            case 6:
              socket.emit("throw",diceNum);
              break;
            //State:20,相手の手札をクリックした場合そのデータをサーバへ送る
            case 20:
              //console.log(hoverCard.type == 2);　確認用
              //console.log(isHoveringHand == true && hoverCard.type == 2);　確認用
              if(isHoveringHand == true && hoverCard.type == 2){
                console.log("hoge");
                socket.emit("reply",hoverCard);
              }
              break;
            //State:21,相手のアイテムをクリックした場合そのデータをサーバへ送る
            case 21:
              //console.log(hoverCard.type == 1); 確認用
              //console.log(isHoveringItem == true && hoverCard.type == 1);　確認用
              if(isHoveringItem == true && hoverCard.type == 1){
                console.log("hoge");
                socket.emit("reply",hoverCard);
              }
              break;



            default:
              break;
          }
          }
        }

/****************************************************************************
*** Function Name       : installationCard()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : マスの上にカードを設置する
*** Return              : なし
****************************************************************************/ 


        function installationCard(id, //カードのID
                                  squareNum){ //マス番号
          console.log("getNum=" +square.getNum(squareNum));
            if(square.getNum(squareNum) > -1){
              scene.remove(cardList[square.getNum(squareNum)]);
              cardList[square.getNum(squareNum)].geometry.dispose();
            }
            const card = new Card('./img/cards/png/c'+ id +'.png');
            console.log(squareNum);
            card.position.x = square.getPosition(squareNum).x;
            card.position.y = square.getPosition(squareNum).y + 82;
            card.position.z = square.getPosition(squareNum).z;
            card.rotation.y = Math.random() * 2 * Math.PI;
            square.setNum(squareNum,cardList.length);
            cardList.push(card);
            scene.add(card);
            square.setId(squareNum,id);
        }

/****************************************************************************
*** Function Name       : draw()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : ドローについてのアニメーションを設定する
*** Return              : なし
****************************************************************************/

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
            if(cardData.length == gameData.hand.length){
              isDrawed = 1;
              receiveCardDatas = [];
            }
          }
        }

        let timeoffset = 0;
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
              timeoffset = cameraZ;
            }
            else {
              if(timeoffset >= 60){
                gameState = 6;
                timeoffset = 0;
              }else{
                timeoffset++;
              }
            }
          }
          camera.position.set(cameraX, cameraY, cameraZ);
          camera.lookAt(new THREE.Vector3(0, 0, 0));
        }

/****************************************************************************
*** Function Name       : itemCreate()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : アイテムの生成を行う
*** Return              : なし
****************************************************************************/

        function itemCreate(num,scene){
          for(i = 0;i < gameData.item[num].length;i++){
            let itemCard = new ItemCard('./img/cards/png/i'+ gameData.item[num][i] +'.png',gameData.item[num][i],scene);
            console.log("num=" + num);
            itemCard.setPosition(num);
            itemList[num].push(itemCard);
            scene.add(itemCard);
            itemCard = null;
          }
        }

        let dice = new Dice();
        dice.out();
        scene.add( dice );

        drawName();

/****************************************************************************
*** Function Name       : tick()
*** Designer            : 
*** Date                : 2022.07.06
*** Function            : 毎フレーム毎のアニメーションを設定する
*** Return              : なし
****************************************************************************/        

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
          raycaster.setFromCamera(mouse, camera);

          clickSquare = square.onMouse(raycaster);
          cardInfo.type = "card";
          cardInfo.id = square.getCardId(clickSquare);
          cardLanding();
          
          
          hoverGoal(raycaster);

          


          switch(gameState){
            case 3:
              if(createCard.length > 0){
                while(createCard.length < 1){
                  installationCard(createCard[0][0],createCard[1][1]);
                  createCard.shift();
                }
               
              }
              gameState = 4;
              break;
            case 6:
                dice.in();
                dice.rotate();
              
              break;
            case 7:
              dice.throw(diceNum);
              gameState++;
              break;
            case 8:
              dice.dice();
              if(dice.t > 300){
                dice.out();
                dice.isVisible = false;
                console.log("socket send");
                socket.emit("reply", "dice");
                dice.isvisible = false;
                gameState = 0;
              }
              break;
            case 9:
              if(dice.isVisible == true) {
                dice.out()
              }
              dice.isvisible = false;
              gameState = 10;
              break;
            case 10:
              let isMoved = 1;
              for(i = 0; i < 4; i++){
                isMoved *= (gameData.positions[i] == pieces[i].now);
              }
              if(isMoved == 1){
                if(isMyturn == true){
                  console.log("socket send");
                  socket.emit("reply", "moved");
                }
                gameState = 0;
              }
              break;

            case 20:
              hoverHand(raycaster);
              break;

            case 21:
              hoverItem(raycaster);
              break;


            default:
              break;
          }

          for(i = 0; i < 4; i++){
            if(handList[i].length != gameData.playerHandNumber[i]){
              handList[i].forEach(function(card){
                scene.remove(card);
                card.geometry.dispose();
              });
              handList[i] = [];
              for(j = 0; j < gameData.playerHandNumber[i]; j++){
                let handCard = new HandCard();
                handCard.setPosition(i,j);
                handList[i].push(handCard);
                scene.add(handCard);
              }
            }
          }

          if(createCard.length > 0){
            installationCard(createCard[0][0],createCard[0][1]);
            createCard.shift();
          }

          if(gameData.hand.length > cardData.length){
            if(receiveCardDatas.length == 0){
              for(i = 0; i < gameData.hand.length - cardData.length;i++){
                receiveCardDatas[i] = gameData.hand[i + cardData.length];
              }
            }
            draw();
          }

          itemData = gameData.item[gameData.myPlayerNum];

          if(gameData.hand.length < cardData.length){
            cardData = gameData.hand;
          }

          if(nowTerm != gameData.term){
            if(goalCard[0] != null){
              scene.remove(goalCard[0]);
              goalCard[0].geometry.dispose();
            }
            goalCard[0] = new Card('./img/cards/png/c'+ gameData.term +'.png');
            goalCard[0].position.x = 120;
            goalCard[0].position.y = 2
            goalCard[0].position.z = 0;
            scene.add(goalCard[0]);
            nowTerm = gameData.term;
          }

          for(i = 0;i < 4; i++){
            pieces[i].moveTo(gameData.positions[i]);
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


          for(i = 0; i < 4;i++){
            if(gameData.item[i].length > itemList[i].length){
              itemList[i].forEach(function(itemCard){
                scene.remove(itemCard);
                itemCard.geometry.dispose();
              });
              itemList[i] = [];
              itemCreate(i,scene);
            }else if(gameData.item[i].length < itemList[i].length){
              itemList[i].forEach(function(itemCard){
                itemCard.setPosition(i,scene);
              });
              itemList[i] = gameData.item[i];
              console.log(itemList[i]);
            }
          }

          if(isClear == true){
              cardList.forEach(function(card){
                scene.remove(card);
                card.geometry.dispose();
              });            if(goalCard[0] != null){
                scene.remove(goalCard[0]);
                goalCard[0].geometry.dispose();
              }
              cardList = [];
              itemList = [[],[],[],[]];
              handList = [[],[],[],[]];
              isHoveringItem = false;
              nowTerm = -1;
              goalCard = [];
              isClear = false;
          }

          cameraMove();
          // レンダリング
          renderer.render(scene, camera);
          requestAnimationFrame(tick);

          //ここは消して
        }
      }