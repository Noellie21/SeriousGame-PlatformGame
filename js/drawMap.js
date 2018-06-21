
// function to display the level
function renderLevel(){
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);


//image de fond
context.drawImage(imgBackground,tileSize,tileSize,tileSize*levelCols,tileSize*levelRows);



  for(i=0;i<levelRows;i++){
    for(j=0;j<levelCols;j++){

      if(currentLevel[i][j]==1 || currentLevel[i][j]==6){
        context.fillStyle = "#a76f05"; // marron clair
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }

      if(currentLevel[i][j]==3 || currentLevel[i][j]==2){
        context.fillStyle = "#5e3f03"; // bleu foncé
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
      if(currentLevel[i][j]==4){
        context.fillStyle = "#a76f05"; // marron clair
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
      if(currentLevel[i][j]==5){
        context.fillStyle = "#aeaca2"; // gris clair
        context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
  /*   if(currentLevel[i][j]==0){
        context.clearRect(j*tileSize,i*tileSize,tileSize,tileSize); // permettait d'effécer les répétitions avant d'avoir l'image de fond
      }*/
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

// affichage des points au dessus de la tete du joueur
context.fillStyle = "rgba(0, 0, 0, 0.5)";
context.font="15px Arial";
if(points.obstacle || points.hurtBadData) {
  texte.push('-3 pts')
  setTimeout(()=> {
    texte.splice(texte.indexOf('-3 pts'),1)
  },1000);
}
if(points.goodData || points.heart) {
  texte.push('+10 pts')
  setTimeout(()=> {
    texte.splice(texte.indexOf('+10 pts'),1)
  },1000);
}
if(points.killBadData) {
  texte.push('+3 pts')
  setTimeout(()=> {
    texte.splice(texte.indexOf('+3 pts'),1)
  },1000);
}
for(let i=0; i<texte.length; i++) {
  context.fillText(texte[i],playerXPos,playerYPos-tileSize-i*tileSize)
}
points.goodData=false;
points.heart=false;
points.killBadData=false;
points.obstacle=false;
points.hurtBadData=false;


  // player = green box
  if(levelChanged || playerDead) {
    if(playerDead) {
      pause=true;
      nbLives=5;
      setTimeout(()=>{
        pause=false;
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
/*  if(nbGoodData>=nbGoodDataNeeded && currentLevel===level1) {
    context.fillStyle = "rgba(0, 0, 0, 0.4)";
    context.fillRect(16*tileSize-totalTranslateCameraX,24*tileSize,35*tileSize,7*tileSize);
    context.fillStyle = "white";
    context.font="16px Arial";
    context.fillText("Bravo ! Vous avez constitu"+String.fromCharCode(233)+" votre "+String.fromCharCode(233)+"quipe" ,18*tileSize-totalTranslateCameraX,27*tileSize)
    context.fillText( "avec succ"+String.fromCharCode(232)+"s ",18*tileSize-totalTranslateCameraX,29*tileSize)
  }*/


if(pause) {
  imgBCBS.style.opacity="1";
  gameOpacity.style.opacity = "1";
  upPressed=false;
  leftPressed=false;
  rightPressed=false;
}
else {
  imgBCBS.style.opacity="0";
  gameOpacity.style.opacity = "0";
}


  if(anomaly) {
    pause=true;
    var imgAnomaly = new Image();
    imgAnomaly.src = "pictures/anomalie.png";
    context.drawImage(imgAnomaly, 8*tileSize-totalTranslateCameraX,5*tileSize,tileSize*55,tileSize*15);
  }
}
