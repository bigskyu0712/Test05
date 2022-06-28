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
        default:
            break;
    }


}