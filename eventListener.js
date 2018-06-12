// simple WASD listeners
document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 37:
      if(!pause) {
        leftPressed=true;
        upPressed=false;
      }
      break;
    case 38:
    case 32:
      if(!lockKeyup && !pause)
        upPressed=true;
      else
        upPressed=false;
      break;
    case 39:
      if(!pause) {
        rightPressed=true;
        upPressed=false;
      }
      break;
    case 40:
      if(!pause)
        downPressed=true;
      break;
    case 80:
      pause=!pause;
  }
}, false);

document.addEventListener("keyup", function(e){
  switch(e.keyCode){
    case 37: // flèche
      leftPressed=false;
      image.src = "pictures/fixe_gauche.png";
      break;
    case 38:
    case 32:
      upPressed=false;
      break;
    case 39: // flèche
      rightPressed=false;
      image.src = "pictures/fixe_droite.png";
      break;
    case 40: // flèche
      downPressed=false;
  }
}, false);
