/*******************************************************************
***  File Name    : cardText.js
***  Version      : V1.1
***  Designer     : 
***  Date         : 2022.07.02
***  Purpose      : カードのデータを保管
***
*******************************************************************/

/*
*** Revision :
*** V1.0 : 岩上雄飛, 2022.06.28
*** V1.1 : 岩上雄飛, 2022.07.02 アイテムカードの情報を追加
*/

/*
cardId  : カードの番号
cardType: カードの種類
            0: アイテムカード 
            1: マスカード
            2: ルールカード
cardName: カードのタイトル
cardText: カードの詳細
*/

cardTexts = [
    // アイテムカード
    {
        cardId:1,
        cardType = 0,
        cardName:"星",
        cardText:""
    },
    {
        cardId:2,
        cardType = 0,
        cardName:"愛",
        cardText:"ハート"
    }
    ,
    {
        cardId:3,
        cardType = 0,
        cardName:"コイン",
        cardText:""
    },
    {
        cardId:4,
        cardType = 0,
        cardName:"太陽",
        cardText:"惑星"
    },
    {
        cardId:5,
        cardType = 0,
        cardName:"コップ",
        cardText:""
    },
    {
        cardId:6,
        cardType = 0,
        cardName:"色鉛筆",
        cardText:""
    },
    {
        cardId:7,
        cardType = 0,
        cardName:"音楽",
        cardText:""
    },
    {
        cardId:8,
        cardType = 0,
        cardName:"",
        cardText:""
    },
    {
        cardId:9,
        cardType = 0,
        cardName:"",
        cardText:""
    },
    {
        cardId:10,
        cardType = 0,
        cardName:"",
        cardText:""
    },

    // マスカード
    {
        cardId:1,
        cardType = 1,
        cardName:"踏むと勝利",
        cardText:"このカードを踏んだ場合、そのプレイヤーが勝利する"
    },
    {
        cardId:2,
        cardType = 1,
        cardName:"踏むと勝利",
        cardText:"アイテムカードからランダムに１枚入手する"
    },
    {
        cardId:3,
        cardType = 1,
        cardName:"アイテムを１枚選ぶ",
        cardText:"アイテムカードから１枚選び、入手する"
    },
    {
        cardId:4,
        cardType = 1,
        cardName:"カードを１枚入手",
        cardText:"山札から１枚ランダムにカードを入手する"
    },
    {
        cardId:5,
        cardType = 1,
        cardName:"手札を１枚捨てる",
        cardText:"自分の手札からランダムに１枚捨てる"
    },
    {
        cardId:6,
        cardType = 1,
        cardName:"アイテムをすべて捨てる",
        cardText:"自分が所持しているアイテムを全て捨てる"
    },
    {
        cardId:7,
        cardType = 1,
        cardName:"アイテムをすべて捨てる",
        cardText:"自分の手札にアイテムカードをすべて捨てる"
    },
    {
        cardId:8,
        cardType = 1,
        cardName:"全員のカードを１枚捨てる",
        cardText:"すべてのプレイヤのカードをランダムに１枚捨てる"
    },
    {
        cardId:9,
        cardType = 1,
        cardName:"全員の手札を捨てる",
        cardText:"すべてのプレイヤの所持しているカードをすべて捨てる"
    },
    {
        cardId:10,
        cardType = 1,
        cardName:"全員の手札を捨て、３枚選ぶ",
        cardText:"すべてのプレーヤが所持しているカードを山札に戻し、３枚ずつランダムに配布"
    },
    {
        cardId:11,
        cardType = 1,
        cardName:"好きなカードを選ぶ",
        cardText:"山札にあるカードの中から、自分の好きなカードを１枚手札に加える"
    },
    {
        cardId:12,
        cardType = 1,
        cardName:"手札を１枚選び、捨てる",
        cardText:"自分の手札からカードを１枚選び、捨てる"
    },
    {
        cardId:13,
        cardType = 1,
        cardName:"全員が手札を選び、捨てる",
        cardText:"すべてのプレーヤがそれぞれ１枚選び、捨てる"
    },
    {
        cardId:14,
        cardType = 1,
        cardName:"次のターンお休み",
        cardText:"次のターンが回ってきた時、スキップする"
    },
    {
        cardId:15,
        cardType = 1,
        cardName:"自分の順位だけ進む",
        cardText:"サイコロの出目に加え、自分の順位の数だけさらに進む\n例：3位で４が出た場合、７マス進む"
    },
    {
        cardId:16,
        cardType = 1,
        cardName:"最下位の時、もう一度行動",
        cardText:"自分が最下位の場合、\nもう一度ドローからやり直すことができる"
    },
    {
        cardId:17,
        cardType = 1,
        cardName:"前番の人と位置を入れ替え",
        cardText:"自分の１つ前の番の人と位置を入れ替える"
    },
    {
        cardId:18,
        cardType = 1,
        cardName:"後番の人と位置を入れ替え",
        cardText:"自分の１つ後の番の人と位置を入れ替える"
    },
    {
        cardId:19,
        cardType = 1,
        cardName:"自分とランダムに入れ替え",
        cardText:"自分とランダムに選ばれたプレイヤーとの位置を入れ替える"
    },
    {
        cardId:20,
        cardType = 1,
        cardName:"サイコロをもう一度振る",
        cardText:"もう一度サイコロを振ることができる"
    },
    {
        cardId:21,
        cardType = 1,
        cardName:"サイコロをもう一度振る*",
        cardText:"もう一度サイコロを振り、出た目が奇数ならその分進み、出た目が偶数ならその分戻る。"
    },
    {
        cardId:22,
        cardType = 1,
        cardName:"サイコロをもう一度振る*",
        cardText:"もう一度サイコロを振り、出た目が奇数ならその分戻り、出た目が偶数ならその分進む。"
    },
    {
        cardId:23,
        cardType = 1,
        cardName:"プレイヤーのカードを捨てる",
        cardText:"他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚ランダムに捨てる。"
    },
    {
        cardId:24,
        cardType = 1,
        cardName:"プレイヤーのカードを奪う",
        cardText:"他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚ランダムに奪う。"
    },
    {
        cardId:25,
        cardType = 1,
        cardName:"プレイヤーとカードを交換",
        cardText:"他のプレイヤー1人を指定し、そのプレイヤーのカードを1枚ランダムに交換する。"
    },
    {
        cardId:26,
        cardType = 1,
        cardName:"カードを全て交換",
        cardText:"プレイヤーを指定する。その後互いのカードを全て入れ替える"
    },
    {
        cardId:27,
        cardType = 1,
        cardName:"プレイヤーのカードを捨てる",
        cardText:"他のプレイヤーを指定し、そのプレイヤーの手札から１枚選び、そのカードを捨てる"
    },
    {
        cardId:28,
        cardType = 1,
        cardName:"プレイヤーのカードを奪う",
        cardText:"他のプレイヤーを指定し、そのプレイヤーの手札から１枚選び、そのカードを奪う"
    },
    {
        cardId:29,
        cardType = 1,
        cardName:"プレイヤーとカードを交換",
        cardText:"他のプレイヤーを指定し、そのプレイヤーの手札から１枚選び、そのカードと自分の手札から１枚交換する"
    },
    {
        cardId:30,
        cardType = 1,
        cardName:"プレイヤーと位置を入れ替え",
        cardText:"他のプレイヤーを指定し、そのプレイヤーと位置を交換する"
    },

    // ルールカード
    {
        cardId:1,
        cardType = 2,
        cardName:"サイコロの数字を２倍",
        cardText:"このルールが設定されている間、サイコロが出した数字の２倍進む\n例：３が出た場合、６マス進む"
    },
    {
        cardId:2,
        cardType = 2,
        cardName:"カードを２回使用",
        cardText:"このルールが設定されている間、\nカードを２回 使用することができる"
    }
];