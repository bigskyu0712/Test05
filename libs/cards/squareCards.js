module.exports = class squareCards {
    constructor(board,userId) {
        this.board = board;
        this.player = this.board.getPlayer(userId);
    }

    
}