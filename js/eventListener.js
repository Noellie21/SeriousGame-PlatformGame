// simple WASD listeners
document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 81: // q
    case 37:
      if(!pause) {
        leftPressed=true;
        upPressed=false;
      }
      else leftPressed=false;
      break;
    case 90: // z
    case 38: // espace
    case 32:
      if(lockKeyup && !lockRebound && !upPressed)
        reboundPressed=true;
      if(!lockKeyup && !pause)
        upPressed=true;
      else
        upPressed=false;
      break;
    case 68: // d
    case 39:
      if(!pause) {
        rightPressed=true;
        upPressed=false;
      }
      else rightPressed=false;
      break;
    case 40:
      if(!pause)
        downPressed=true;
      break;
    case 80:
      pause=!pause;
      if(pause) { // afficher les commandes lorsque pause est activée manuellement
        document.getElementById("commandes").style.opacity="1";
        lockRebound=false;
        reboundPressed=false;
      }
      else document.getElementById("commandes").style.opacity="0";
  }
}, false);

document.addEventListener("keyup", function(e){
  switch(e.keyCode){
    case 81: // q
    case 37: // flèche
      leftPressed=false;
      image.src = "pictures/fixe_gauche.png";
      break;
    case 90: // z
    case 38:
    case 32:
      upPressed=false;
      break;
    case 68: // d
    case 39: // flèche
      rightPressed=false;
      image.src = "pictures/fixe_droite.png";
      break;
    case 40: // flèche
      downPressed=false;
  }
}, false);
