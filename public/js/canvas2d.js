window.addEventListener('DOMContentLoaded', initCanvas2d);

function initCanvas2d(){
    //canvas2dの作成
    const canvas2d = document.querySelector('#canvas2d');
    if ( ! canvas2d || ! canvas2d.getContext ) {
        return false;
    }
    cvs = canvas2d.getContext('2d');
            
    //canvas2dの横幅
    w = canvas2d.width;
    h = canvas2d.height;
                    
    leftTextLength = 0;   //文字列の左側の長さ
    rightTextLength = 0;  //文字列の右側の長さ 色を変えるときに使用
    allTextLength = 0;    //文字列全体の長さ
            
    //上に表示する文字の設定
    cvs.textAlign = 'center';
    cvs.Baseline = 'center';
    cvs.font = '60px serif';
}

function clearTopText() {
    cvs.clearRect(0, 0, w, 80); //上に表示してた文字を消す
}


function drawTopText(){
    
    switch(gameState){
        case 2:
            clearTopText();
            leftTextLength = cvs.measureText("マスカード").width;
            rightTextLength = cvs.measureText("を置く場所を選んでください").width;
            allTextLength = cvs.measureText("マスカ－ドを置く場所を選んでください").width;
            cvs.fillStyle = 'orange';
            cvs.fillText("マスカード", w / 2 - allTextLength / 2 + leftTextLength / 2, 80);
            cvs.fillStyle = 'white';
            cvs.fillText("を置く場所を選んでください", w / 2 + allTextLength / 2 - rightTextLength / 2, 80);
            break;
        case 6:
            clearTopText();
            leftTextLength = cvs.measureText("さいころ").width;
            rightTextLength = cvs.measureText("を振ってください").width;
            allTextLength = cvs.measureText("さいころを振ってください").width;
            cvs.fillStyle = 'orange';
            cvs.fillText("さいころ", w / 2 - allTextLength / 2 + leftTextLength / 2, 80);
            cvs.fillStyle = 'white';
            cvs.fillText("を振ってください", w / 2 + allTextLength / 2 - rightTextLength / 2, 80);

        case 10:
            allTextLength = cvs.measureText("手札を1枚選んでください").width;
            cvs.fillStyle = 'white';
            cvs.fillText("手札を1枚選んでください", w / 2 + allTextLength / 2, 80);
        default:
            break;
    }


}

function drawName() {

    let leftTextLength = 0;   //左側のユーザ名の長さ
    let rightTextLength = 0;  //右側のユーザ名の長さ

    let player = gameData.playerName[gameData.myPlayerNum]; //仮置き
    let players = gameData.playerName; //仮置き
    let name = [];
    let j = 0;

    for (let i=gameData.myPlayerNum; i<gameData.myPlayerNum + 4; ++i){
        console.log(i % 4);
        if(player==players[i % 4]){
            continue;
        }
        name[j] = players[i % 4];
        ++j;
    }

    cvs.textAlign = 'center';
    cvs.Baseline = 'center';
    cvs.font = '60px serif';

    leftTextLength = cvs.measureText(name[0]).width;
    rightTextLength = cvs.measureText(name[1]).width;

    cvs.fillStyle = 'white';
    cvs.fillText(name[0], leftTextLength / 2, h / 2);
    cvs.fillText(name[1], w/2, 150);
    cvs.fillText(name[2], w - rightTextLength / 2, h/2);

}