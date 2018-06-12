(function() {

canvas.width=tileSize*levelCols/2;                   // canvas width. Won't work without it even if you style it from CSS
canvas.height=tileSize*levelRows;                   // canvas height. Same as before


// this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"
window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60);
  };
})();


setInterval(datasMove, 300) // mouvement des bonnes et mauvaises données
setInterval(obstacleMove, 200) // mouvement des obstacles
setInterval(function() {  // timer
  if(!pause) {
    timer[0]++;
    if(timer[0]==60) {
      timer[0]=0;
      timer[1]++;
    }
  }
 }, 1000);

setInterval(function(){   // tt les 2 secondes, ajouter un obstacle de la liste si celui ci est dans la zone visible
  if( isVisible(initObstacleCol[obstacleIndex%initObstacleRow.length]) && !pause) {
    obstacleRow.push(initObstacleRow[obstacleIndex%initObstacleRow.length])
    obstacleCol.push(initObstacleCol[obstacleIndex%initObstacleRow.length])
  }
  obstacleIndex++;
}, 2000);

setInterval(()=> { // faire défiler les sprites
  if(leftPressed && !rightPressed)
    image.src = "pictures/gauche"+(idImage%3+1)+".png";
    if(rightPressed && !leftPressed)
      image.src = "pictures/droite"+(idImage%3+1)+".png";

  idImage=idImage%3+1;
},200)


function updateGame() { // function to handle the game itself

  // no friction or inertia at the moment, so at every frame initial speed is set to zero
  playerXSpeed=0;
  playerYSpeed=0;

  // updating speed according to key pressed
  if(rightPressed && !leftPressed){
    playerXSpeed=movementSpeed
  }
  if(leftPressed && !rightPressed){
      playerXSpeed=-movementSpeed;
  }
  // gère la hauteur des sauts
  if(upPressed && nbUp<upMax){ // limite la durée des sauts
    playerYSpeed=-3*movementSpeed; // limite la vitesse des sauts
    nbUp++
  }
  else {
    nbUp=0;
    upPressed=false;
  }


  // updating player position
  var offset = (playerYPos+playerYSpeed)%tileSize

  if(offset !== 0 && (isDown() && !upPressed)) // ne pas pouvoir sauter et arriver dans l'épaisseur des plateformes
    playerYPos+=playerYSpeed-offset;
  else playerYPos+=playerYSpeed;

  playerXPos+=playerXSpeed;

   weakPlatform();  // fonction qui permet les plateformes qui se détruisent

  rebound(currentLevel); // rebondissements droite et gauche - collisions horizontales
  verticalCollision(currentLevel); // check for vertical collisions
  if(!isDown()) {  // faire descendre le personnage si aucun sol sous sa position
    lockKeyup = true;
    playerYSpeed=movementSpeed;
    playerYPos+=playerYSpeed;
  }
  else {
    lockKeyup = false;
    if(~~((playerYPos)/tileSize) > levelRows-5)  // chute au fond d'un gouffre
      playerDead=true;
  };
  if(nbLives<1) {// retourner a la porte si le joueur n'a plus de vie
    playerDead=true;
  }
  //console.log(Math.abs(playerXPos-oldPlayerPosX))
  if(playerXPos>translateOffset && playerXPos/tileSize<83) {// 83 == colonne à partir de laquelle la dernière colonne du niveau est affichée
    totalTranslateCameraX += oldPlayerPosX-playerXPos;
    context.translate(oldPlayerPosX-playerXPos,0);
  }
  oldPlayerPosX=playerXPos;

  // rendering level
  renderLevel();

  // update the game in about 1/60 seconds
  requestAnimFrame(function() {
    updateGame();
  });
}

updateGame();

})();
