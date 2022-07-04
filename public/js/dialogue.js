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
    using.style.display = 'none';
    using.style.pointerEvents ='none';
}


function showResult(){
    using.style.display = 'block';
    using.style.pointerEvents ='auto';
    usingContext.clearRect(0, 0,800,600);
    usingContext.rect( 100, 100, 600, 400 );
    usingContext.fillStyle = "rgba(200,200,200,0.7)";
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
}

function displayAvater(i){
        let image = new Image();
        image.src = "../img/p"+ i +".svg";
        image.onload = function () {
            usingContext.drawImage (image, 150, 150 + 80 * i, 80, 80);
            usingContext.textAlign = 'left';
            usingContext.fillText( 'text', 220 , 210 + 80 * i);       
        }
}