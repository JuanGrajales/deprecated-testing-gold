class Obstacle {
     /**
     * constructor for Player object
     * @param {x axis position on canvas} x 
     * @param {y axis position on canvas} y 
     * @param {width of player} width 
     * @param {height of player} height 
     * @param {default money type is random} obstacleType 
     */
    constructor(x,y,width,height,obstacleType){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.obstacleType = obstacleType; 
    }

    revealObstacleType(obstacleType) {
        if(obstacleType === 1) {
            const rockImg = new Image();
            rockImg.src = "../images/rock.png";
            return rockImg;
        }
        if(obstacleType === 2) {
            const potholeImg = new Image();
            potholeImg.src = "../images/pothole.png";
            return potholeImg;
        }
    }

    getObstacleValue(obstacleType, luckyCharmFlag) {
        let val;
        console.log(luckyCharmFlag);
      if(obstacleType === 1) {
          if(!luckyCharmFlag) {
            val =- 10;
          } else {
            val =+ 10;
            console.log(val);
          }
        
      }
      if(obstacleType === 2) {
          if(!luckyCharmFlag) {
            val =- 20;
          } else {
              val =+ 20;
              console.log(val);
          }
         
      }
      return val;
    }
}