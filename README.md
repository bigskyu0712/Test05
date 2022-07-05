# ゲームのタイトル募集中
以下にファイルの構造のうち私たちが編集する部分を示します．(変更した場合はここを更新してください．)
```bash
├── README.md
│
├── libs
│   ├── board.js
│   ├── cards               *M3-4 カード効果適応処理*
│   │   ├── c0.js
│   │   ├── c1.js
│   │   ├── c2.js
│   │   ├── c3.js
│   │   ├── c4.js
│   │   ├── c5.js
│   │   ├── c6.js
│   │   ├── c7.js
│   │   ├── c8.js
│   │   ├── c9.js
│   │   ├── c10.js
│   │   ├── c11.js
│   │   ├── c12.js
│   │   ├── c13.js
│   │   ├── c14.js
│   │   ├── c15.js
│   │   ├── c16.js
│   │   ├── c17.js
│   │   ├── c18.js
│   │   ├── c19.js
│   │   ├── c20.js
│   │   ├── c21.js
│   │   ├── c22.js
│   │   ├── c23.js
│   │   ├── c24.js
│   │   ├── c25.js
│   │   ├── c26.js
│   │   ├── c27.js
│   │   ├── c28.js
│   │   ├── c29.js
│   │   ├── c30.js
│   │   ├── c31.js
│   │   ├── c32.js
│   │   ├── c33.js
│   │   ├── card.js
│   │   ├── cardcreate.py
│   │   └── squareCards.js
│   │
│   ├── cardsFactory.js   *M5-1 カード情報管理*
│   ├── cardsReader.js
│   ├── display.js
│   ├── game.js
│   ├── hoge.js
│   ├── itemScore.js
│   ├── matching.js       *M2-1 ユーザ登録処理（88/161）*
│   ├── matchingLogic.js
│   ├── player.js
│   ├── receiver.js
│   ├── room.js
│   ├── serverSettings.js
│   └── winTerm.js
│
├── memo.txt
├── package-lock.json
├── package.json
│
├── public
│   ├── img
│   │   ├── c1.png
│   │   ├── cards
│   │   │   ├── c2.png
│   │   │   ├── c3.png
│   │   │   ├── c4.png
│   │   │   ├── c5.png
│   │   │   ├── c6.png
│   │   │   ├── png
│   │   │   │   ├── c1-34.png
│   │   │   │   ├── i1-8.png
│   │   │   │   └── r1-2.png
│   │   │   └── svg
│   │   │       ├── c1-34.svg
│   │   │       ├── i1-8.svg
│   │   │       └── r1-2.svg
│   │   ├── cback.png
│   │   ├── deck.glb
│   │   ├── dice1-6.jpg
│   │   ├── dummy.png
│   │   ├── koma.png
│   │   └── p0-3.svg
│   │
│   ├── index.html            *M1-2 マッチング開始処理  （12/79）*
│   │                         *M1-1 マッチングUI主処理  （12/79）*
│   │                         *M1-1 W1 ユーザ名登録画面 （4/79）*
│   │
│   └── js
│       ├── Dice.js
│       ├── DrawCard.js
│       ├── HandCard.js
│       ├── ItemCard.js
│       ├── boardMain.js      *M1-6 マス移動処理（10/480）*
│       │                     **
│       ├── canvas2d.js
│       ├── card.js
│       ├── cardEffect.js
│       ├── cardTexts.js
│       ├── client.js
│       ├── createSquare.js
│       ├── dialogue.js       *M1-7 ゲーム終了処理（16/147）*
│       │                     *M1-3 マッチング終了処理（5/147）*
│       │                     *W2 マッチング待機画面（12/147）*
│       │                     *W10 退出画面（40/147）*
│       │                     **
│       ├── display.js
│       ├── gameData.js
│       ├── gameHome.js       **
│       ├── gameResult.js
│       ├── goalCard.js
│       ├── overlay.js        *M1-5 カード表示処理*
│       ├── piece.js
│       ├── receiver.js
│       ├── ruleCard.js
│       ├── setCard.js
│       ├── square.js
│       ├── squareCard.js
│       └── usingCard.js      *W8 カード効果画面*
│                             *M1-5 カード表示処理（22/337）*
│
├── server.js
├── usingCard.html
└── usingCard.js
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
