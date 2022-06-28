var canvas = document.getElementById("canvas2d");
var element = document.getElementById("hoverElement");
let title = document.getElementById("hoverTitle");
let text = document.getElementById("hoverText");

var isHoveringItem = true
var lastPosition = {
    x: 0,
	y: 0
};

// カーソルの位置を保管
const cursor = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

// カーソルの位置を取得
canvas.addEventListener("mousemove", (point) => {
    // 表示する位置を少しずらしcanvas以外の要素に重ならないようにする
	cursor.x = point.clientX + 16;
	cursor.y = point.clientY + 16;
});

/****************************************************************************
*** Function Name       : updatePopover()
*** Designer            : 岩上 雄飛
*** Date                : 2022.6.25
*** Function            : カードの上にマスの上に乗せた際、その詳細を表示する
                          詳細はhtmlのhoverElementから取得し、cssで移動をさせる
*** Return              : なし
****************************************************************************/
function updatePopover(){
    var style = "background-color: white; "
    // 角の丸みの設定
    style += "border-radius: " + (element.offsetHeight/12.8) + "px; "
    // 余白の設定
    style += "padding: 12px 12px 12px 12px; "
    // 枠の設定
    style += "border-style: solid; border-color: rgb(255, 179, 64); border-width: 4px; "

    if (cardInfo > 0) { // 表示する状況の場合
        style += "display: block; position: absolute;"
        
        // 表示するブロックのy座標がcanvasの外に出るか判別
        let yCondition = cursor.y > canvas.height - element.offsetHeight
        // 表示するブロックのx座標がcanvasの外に出るか判別
        let xCondition = cursor.x > canvas.width - element.offsetWidth

        if (yCondition && xCondition) { // yとx共に外にある場合
            style += "left:" + (canvas.width - element.offsetWidth) + "px; " 
            style += "top: " + (canvas.height - element.offsetHeight) + "px; "
        } else if (yCondition) { //yのみ外にある場合
            style += "left: " + cursor.x + "px; "
            style += "top: " +  (canvas.height - element.offsetHeight) + "px; "
        } else if (xCondition) { //xのみ外にある場合
            style += "left:" + (canvas.width - element.offsetWidth) + "px; "
            style += "top: " +  cursor.y + "px; "
        } else { //以外
            style += "left:" + cursor.x + "px; top: " +  cursor.y + "px;"
        }

    } else { // 表示しない場合
        style = "display: none; position: absolute;"
    }
    element.style = style
    requestAnimationFrame(updatePopover);
}

updatePopover()