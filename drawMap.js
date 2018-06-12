
// function to display the level
function renderLevel(){
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // walls = red boxes

  for(i=0;i<levelRows;i++){
    for(j=0;j<levelCols;j++){
      if(currentLevel[i][j]==1 || currentLevel[i][j]==6){
        context.fillStyle = "#7fbdd4"; // bleu clair
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
      if(currentLevel[i][j]==3 || currentLevel[i][j]==2){
        context.fillStyle = "#050c72"; // bleu foncé
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
      if(currentLevel[i][j]==4){
        context.fillStyle = "#7fbdd4"; // bleu clair
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
      if(currentLevel[i][j]==5){
        context.fillStyle = "#aeaca2"; // gris clair
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
      if(currentLevel[i][j]==7){
        context.fillStyle = "#f69113"; // gris clair
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
      if(currentLevel[i][j]==0){
        context.fillStyle = "#aeaca2"; // gris clair
        context.clearRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
    }
  }

  if(currentLevel===level1) {
    level1Mechanics();
  }
  if(currentLevel===level2) {
    level2Mechanics();
  }

  if(currentLevel===level3) {
    level3Mechanics();
  }

  // player = green box
  if(levelChanged || playerDead) {
    if(playerDead) {
      pause=true;
      setTimeout(()=>{
        pause=false;
        nbLives=5;
      },5000)
    }

    playerCol=6;
    playerRow=19;
    playerYPos=playerRow*tileSize;
    playerXPos=playerCol*tileSize;

    totalTranslateCameraX=0;
    oldPlayerPosX=0;
    context.setTransform(1, 0, 0, 1, 0, 0);
    levelChanged=false;
    playerDead=false;
  }
  context.drawImage(image, playerXPos,playerYPos,tileSize*3,tileSize*3);
  /*context.fillStyle = "#ADFF00";
  context.fillRect(playerXPos,playerYPos,tileSize,tileSize);
*/

context.fillStyle = "rgba(0, 0, 0, 0.2)";
context.font="16px Arial";

// vies
context.drawImage(imgHeart, 3*tileSize-totalTranslateCameraX,1.5*tileSize,tileSize*1.5,tileSize*1.5);
context.fillText("X "+nbLives,5*tileSize-totalTranslateCameraX, 3*tileSize);

  //score et temps
  context.fillText(score + "pts",67*tileSize-totalTranslateCameraX,3*tileSize)
  if(timer[0]<10)
    context.fillText( timer[1]+":0"+timer[0],61*tileSize-totalTranslateCameraX,3*tileSize)
  else context.fillText( timer[1]+":"+timer[0],61*tileSize-totalTranslateCameraX,3*tileSize)
  if(nbGoodData>=nbGoodDataNeeded && currentLevel===level1) {
    context.fillStyle = "rgba(0, 0, 0, 0.4)";
    context.fillRect(16*tileSize-totalTranslateCameraX,24*tileSize,35*tileSize,7*tileSize);
    context.fillStyle = "white";
    context.font="16px Arial";
    context.fillText("Bravo ! Vous avez constitu"+String.fromCharCode(233)+" votre "+String.fromCharCode(233)+"quipe" ,18*tileSize-totalTranslateCameraX,27*tileSize)
    context.fillText( "avec succ"+String.fromCharCode(232)+"s ",18*tileSize-totalTranslateCameraX,29*tileSize)
  }


  if(pause) {
    context.fillStyle = "rgba(0, 0, 0, 0.2)"; // marron foncé
    context.fillRect(0*tileSize-totalTranslateCameraX,0*tileSize,73*tileSize,34*tileSize);
    upPressed=false;
    leftPressed=false;
    rightPressed=false;
  }

  if(anomaly) {
    pause=true;
    var imgAnomaly = new Image();
    imgAnomaly.src = "pictures/anomalie.png";
    context.drawImage(imgAnomaly, 8*tileSize-totalTranslateCameraX,5*tileSize,tileSize*55,tileSize*15);
  }
}
