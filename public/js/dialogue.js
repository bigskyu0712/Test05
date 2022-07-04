/*******************************************************************
***  File Name		: dialogue.js
***  Version		: V1.0
***  Designer		: 曾根 悠太
***  Date			: 2022.06.28
***  Purpose       	: 
***
*******************************************************************/

//canvasは流用

function makeDialog(){
    using.style.display = 'block';
    using.style.pointerEvents ='auto';
    usingContext.clearRect(0, 0,800,600);
    usingContext.rect( 100, 100, 600, 400 );
    usingContext.fillStyle = "rgba(150,150,150,1)";
    usingContext.fill();
}

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

function dialogueHide(){
    usingContext.clearRect(0,0,800,600);
    using.style.display = 'none';
    using.style.pointerEvents ='none';
}


function showResult(){
    usingRemove();
    using.style.display = 'block';
    using.style.pointerEvents ='auto';
    usingContext.clearRect(0, 0,800,600);
    usingContext.rect( 100, 100, 600, 400 );
    usingContext.fillStyle = "rgba(0,0,0,0.7)";
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
        displayAvater(i);
    }
    using.addEventListener('click', showNext, false);
}

function displayAvater(i){
        let image = new Image();
        image.src = "../img/p"+ i +".svg";
        image.onload = function () {
            usingContext.drawImage (image, 150, 140 + 80 * i, 80, 80);
            usingContext.textAlign = 'left';
            usingContext.fillText( gameData.playerName[i] + ":" + gameData.score[i], 220 , 200 + 80 * i);       
        }
}

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

let dialogueCursor = {
	x: 0,
	y: 0
};

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
        location.reload();
    }
}