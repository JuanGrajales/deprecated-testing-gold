class Sound {
    constructor(backgroundSrc, grabSoundSrc, damageSoundSrc){
        this.backgroundSrc = backgroundSrc;
        this.grabSoundSrc = grabSoundSrc;
        this.damageSoundSrc = damageSoundSrc;
        this.background = new Audio(backgroundSrc);
        this.grabSound = new Audio(grabSoundSrc);
        this.damageSound = new Audio(damageSoundSrc);
        this.timerSound = new Audio();
        this.timerSound.src= '../music/timer-ending.mp3'
        this.diamonSound = new Audio();
        this.diamonSound.src ='../music/diamond-sound.mov';
        this.walkingSound = new Audio();
        this.walkingSound.src ='../music/walking.mov'
        this.crashingSound = new Audio();
        this.crashingSound.src = "../music/crash-rock.mov"
        this.fallingSound = new Audio();
        this.fallingSound.src = "../music/falling-sound.mov"
        this.sound = document.createElement("audio");
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    playBackground(){
        this.background.play();
    }

    stopBackground(){
        this.background.pause();
    }

    playGrabSound(){
        this.grabSound.play();
    }

    playDamageSound(){
        this.damageSound.play();
    }

    playTimerSound(){
        this.timerSound.play();
    }

    stopTimer(){
        this.timerSound.pause();
    }

    playDiamondSound(){
        this.diamonSound.play();
        
    }

    playWalkingSound(){
        this.walkingSound.play();
    }

    playCrashingSound(){
        this.crashingSound.play();
    }

    playFallingSound(){
        this.fallingSound.play();
    }

    stop(){
        this.pause();
    }

}


    
    




  