# ゲームのタイトル募集中
以下にファイルの構造のうち私たちが編集する部分を示します．(変更した場合はここを更新してください．)
```bash
Test05
├── public
│   ├── index.html
│   └── js
│       ├── cardEffect.js
│       ├── client.js
│       ├── display.js
│       ├── gameHome.js
│       ├── quitGame.js
│       └── square.js
├── libs
│   ├── board.js
│   ├── cards
│   │   ├── c0.js
│   │   ├── c1.js
│   │   ├── c2.js
│   │   ├── card.js
│   │   ├── cardTypes.txt
│   │   └── squareCards.js
│   ├── cardsFactory.js
│   ├── cardsReader.js
│   ├── display.js
│   ├── game.js
│   ├── hoge.js
│   ├── matching.js
│   ├── matchingLogic.js
│   ├── player.js
│   ├── receiver.js
│   ├── room.js
│   └── serverSettings.js
└── server.js
```

## 概要

### index.html
クライアントが開くウェブページがこれです．

### client.js
index.htmlに紐づけるクライアント用のjavascriptファイルです．
メインの処理を書きます．

### display.js
クライアント用のjavascriptファイルです．
画面の描画関連をここに記述します．

### serverSettings.js
サーバーの設定に関する事をここに記述します．

### matching.js
マッチング周りを担当するjavascriptファイルになります．
プログラムを起動した時に(server.jsを除いて)一番最初に呼び出されるプログラムがこれです。

### matchingLogic.js
matching.jsで使用する関数やサブルーチンをここに記述します．
大まかな処理をmatching.jsで記述して，細かい処理をここでやります．

### room.js
matching.jsとgame.jsの橋渡しするするプログラムを書きます．

### game.js
gameクラスがあり，ゲームの流れに関する処理を行います．

### board.js
boardクラスです．ゲームに関する情報の保管と，ゲームの各工程の処理を行います．
