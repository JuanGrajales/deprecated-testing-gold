class Player {
    /**
     * constructor for Player object
     * @param {x axis position on canvas} x 
     * @param {y axis position on canvas} y 
     * @param {width of player} width 
     * @param {height of player} height 
     * @param {default charater type is a miner} characterType 
     */
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const minerImg = new Image();
        // minerImg.src = "/images/gold-miner.png";
        minerImg.src = "../images/sprite-monster1.png";
        this.characterType = minerImg;


    }

    /**
     * move method for Player object
     * @param {new x axis position on canvas} futureX 
     * @param {new y axis position on canvas} futureY 
     * @param {canvas width} canvasWidth 
     * @param {canvas height} canvasHeight 
     */
    movePlayer(futureX, futureY, canvasWidth, canvasHeight) {
        if(futureX + this.width <= canvasWidth && futureX >= 0 && 
            futureY + this.height <= canvasHeight && futureY >= 0) {
            this.x = futureX;
            this.y = futureY;
        }
    }
}
