class ItemCard extends Card {

    cardSize = 1.3;
    cardId;
    t;
    
    constructor(path){
        super(path,geometry, material);

        this.t = 0;
    }

}