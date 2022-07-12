/*******************************************************************
***  File Name		: dialogue.js
***  Version		: V1.1
***  Designer		: 曾根 悠太 悠太
***  Date			: 2022.07.06
***  Purpose       	: 入退室，ゲーム終了時に出てくるダイアログボックスの描画
***
*******************************************************************/

/*
*** Revision :
*** v1.0 : 曾根 悠太 悠太,日野 優介, 2022.06.28
*** v1.1 : 曾根 悠太 悠太, 2022.07.06
*/

//canvasは流用

/****************************************************************************
*** Function Name       : makeDialog()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.07.06
*** Function            : ダイアログボックスの背景を作成する
*** Return              : なし
****************************************************************************/ 

function makeDialog(){
    using.style.display = 'block';
    using.style.pointerEvents ='auto';
    usingContext.clearRect(0, 0,800,600);
    usingContext.rect( 100, 100, 600, 400 );
    usingContext.fillStyle = "rgba(150,150,150,1)";
    usingContext.fill();
}


/****************************************************************************
*** Function Name       : form()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.07.06
*** Function            : ユーザ名入力フォームを作成する
*** Return              : なし
****************************************************************************/ 

function form(){
    makeDialog();
    dialogW = using.width;
    dialogH = using.height;
    usingContext.textAlign = 'center';
    usingContext.Baseline = 'center';
    usingContext.font = '30px serif';
    let text = "ユーザ名を入力してください";
    allTextLength = cvs.measureText(text).width;
    usingContext.fillStyle = 'black';
    usingContext.fillText(text, dialogW / 2 , 200);
    let form = document.getElementById("frm-login");
    form.style.position = 'absolute';
    form.style.top = "300px";
    form.style.left = "230px";
    form.style.zIndex = "100";
}

/****************************************************************************
*** Function Name       : formLogin()
*** Designer            : 金森 嵩天
*** Date                : 2022.07.06
*** Function            : W2マッチング待機画面を表示する
*** Return              : なし
****************************************************************************/ 

function formLogin(){
    let form = document.getElementById("frm-login");
    form.style.display = 'none';
    makeDialog();
    usingContext.textAlign = 'center';
    usingContext.Baseline = 'center';
    usingContext.font = '30px serif';
    let text = "マッチング待機中";
    allTextLength = cvs.measureText(text).width;
    usingContext.fillStyle = 'black';
    usingContext.fillText(text, dialogW / 2 , dialogH / 2);
}

/****************************************************************************
*** Function Name       : dialogueHide()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.07.06
*** Function            : フォームを消す
*** Return              : なし
****************************************************************************/ 

function dialogueHide(){
    usingContext.clearRect(0,0,800,600);
    using.style.display = 'none';
    using.style.pointerEvents ='none';
}


/****************************************************************************
*** Function Name       : showResult()
*** Designer            : 曾根 悠太 悠太  日野 優介
*** Date                : 2022.07.06
*** Function            : 結果画面を作成する
*** Return              : なし
****************************************************************************/ 

function showResult(){
    usingCardList = [];
    usingRemove();
    using.style.display = 'block';
    using.style.pointerEvents ='auto';
    usingContext.clearRect(0, 0,800,600);
    usingContext.rect( 100, 100, 600, 400 );
    usingContext.fillStyle = "rgba(0,0,0,0.7)"; //黒い半透明の背景
    usingContext.fill();   
    dialogW = using.width;
    dialogH = using.height;
    usingContext.textAlign = 'center';
    usingContext.Baseline = 'center';
    usingContext.font = '30px serif';
    let text = "Result";
    allTextLength = cvs.measureText(text).width;
    usingContext.fillStyle = 'white';
    usingContext.fillText(text, dialogW / 2 , 150);
    for(i=0;i<4;i++){
        //上から順に配置する
        displayAvater(i);
    }
    using.addEventListener('click', showNext, false);
}

/****************************************************************************
*** Function Name       : displayAvater()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.07.06
*** Function            : W6結果画面のアバター画像を配置する
*** Return              : なし
****************************************************************************/ 

function displayAvater(i){
        let image = new Image();
        image.src = "../img/p"+ i +".svg";
        image.onload = function () {
            usingContext.drawImage (image, 150, 140 + 80 * i, 80, 80);
            usingContext.textAlign = 'left';
            usingContext.fillText( gameData.playerName[i] + ":" + gameData.score[i], 220 , 200 + 80 * i);       
        }
}

/****************************************************************************
*** Function Name       : showNext()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.07.06
*** Function            : W7退出画面を表示する
*** Return              : なし
****************************************************************************/ 
function showNext(){
    usingContext.clearRect(0,0,800,600);
    makeDialog();
    usingContext.fill();
    dialogW = using.width;
    dialogH = using.height;
    usingContext.textAlign = 'center';
    usingContext.Baseline = 'center';
    usingContext.font = '30px serif';
    let text = "もう一度ゲームを行いますか？";
    allTextLength = cvs.measureText(text).width;
    usingContext.fillStyle = 'black';
    usingContext.fillText(text, dialogW / 2 , 200);
    
    makebutton();
}

// W7画面表示時のマウスの場所
let dialogueCursor = {
	x: 0,
	y: 0
};

/****************************************************************************
*** Function Name       : makebutton()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.07.06
*** Function            : W7のボタンを作成する
*** Return              : なし
****************************************************************************/ 
function makebutton(){
    usingContext.closePath();
    using.removeEventListener('click', showNext, false);
    usingContext.fillStyle = "rgba(120,120,120,1)";
    usingContext.fillRect(200,300,150,80);
    usingContext.fillRect(450,300,150,80);
    usingContext.fillStyle = 'white';
    usingContext.fillText("はい", 275 , 350);
    usingContext.fillText("いいえ", 525 , 350);
    using.addEventListener("mousemove", (point) => {
        // 表示する位置を少しずらしframe以外の要素に重ならないようにする
        dialogueCursor.x = point.clientX;
        dialogueCursor.y = point.clientY;
    });
    using.addEventListener("click",onClickEvent,false);
}

/****************************************************************************
*** Function Name       : onClickEvent()
*** Designer            : 曾根 悠太 悠太
*** Date                : 2022.07.06
*** Function            : W7のボタンが押された際の処理
*** Return              : なし
****************************************************************************/ 
function onClickEvent(){
    if(
        (dialogueCursor.x > 200 && dialogueCursor.x  < 350) && (dialogueCursor.y > 300 && dialogueCursor.y  < 380)
    ){
        initGameData();
        socket.connect();
        socket.emit('login',userName.value);
        formLogin();
        using.removeEventListener("click",onClickEvent,false);
    }
    if(
        (dialogueCursor.x > 450 && dialogueCursor.x  < 600) && (dialogueCursor.y > 300 && dialogueCursor.y  < 380)
    ){
        //タブを閉じることができなかったので代替処理
        location.reload();
    }
}