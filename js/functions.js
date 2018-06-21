

function isNear(obstacleRow, obstacleCol) {
  var playerRow = ~~(playerYPos/tileSize);
  var playerCol = ~~(playerXPos/tileSize);
  if( ( playerRow==obstacleRow || playerRow==obstacleRow+1 || playerRow==obstacleRow-1 || playerRow==obstacleRow+2) //|| playerRow==obstacleRow+3
&& ( playerCol==obstacleCol+2 || playerCol==obstacleCol+1 || playerCol==obstacleCol-1 || playerCol==obstacleCol)) //playerCol==obstacleCol+3 ||
    return true
  else return false
}

function isVisible(col) {
  var refPos = ~~(playerXPos/tileSize);
  if((col<refPos+70 && ( refPos<15 || col>refPos-15)) || refPos>levelCols/2) {
    return true;
  }
  else return false;
}

function cruchBadData(row, col) {  // ligne et colonne de la mauvaise donnée
  var playerRow = ~~(playerYPos/tileSize);
  var playerCol = ~~(playerXPos/tileSize);
  let playerPlage = [playerCol,playerCol+1,playerCol+2];
  if(playerRow+3==row && playerPlage.includes(col+1) )
    return true
  else return false
}

function isHurt(col) {
  if(col>3 && !alreadyHurt) {
    if(score>0) 
      score-=3;
    nbLives-=1;
    alreadyHurt = true;
    if(currentLevel==level1){
      nbBadData++;
      points.hurtBadData=true;
    }
    if(currentLevel==level2)
      points.obstacle=true;
  }
  setTimeout(() => {
    alreadyHurt = false;
  },500)
}

function isDead(colArray,rowArray,initColArray,initRowArray) {
  colArray=[];
  rowArray=[];
  for(let i=0; i<initColArray.length; i++) {
    colArray[i]=initColArray[i];
    rowArray[i]=initRowArray[i];
  }
  return [colArray, rowArray]
}

function beatBackPlayer(col) {// repousser player a droite ou à gauche selon d'où il vient
  var playerCol = ~~(playerXPos/tileSize);
  var playerRow = ~~(playerYPos/tileSize);
  if(col>3) {
    if( (playerXPos<col*tileSize && (currentLevel[playerRow][playerCol-1]===0 || currentLevel[playerRow][playerCol-2]===0 || currentLevel[playerRow][playerCol-3]===0 || currentLevel[playerRow][playerCol-4]===0 || currentLevel[playerRow][playerCol-4]===0) )
    || (currentLevel[playerRow][playerCol+3] || currentLevel[playerRow][playerCol+4] || currentLevel[playerRow][playerCol+5] || currentLevel[playerRow][playerCol+6] || currentLevel[playerRow][playerCol+7]) )
      playerXPos-=5*tileSize // force de repoussement des mauvaises données
    if( (playerXPos>col*tileSize && (currentLevel[playerRow][playerCol+3]===0 || currentLevel[playerRow][playerCol+4]===0 || currentLevel[playerRow][playerCol+5]===0 || currentLevel[playerRow][playerCol+6]===0 || currentLevel[playerRow][playerCol+7]===0) )
    || (currentLevel[playerRow][playerCol-1] || currentLevel[playerRow][playerCol-2] || currentLevel[playerRow][playerCol-3] || currentLevel[playerRow][playerCol-4] || currentLevel[playerRow][playerCol-5]) )
    playerXPos+=5*tileSize
  }
}

function isDown() {
  var row = ~~(playerYPos/tileSize);
  var col = ~~(playerXPos/tileSize);
  if(row<levelRows-3 && row>0) {
  if (!upPressed && ( !currentLevel[row+3][col] && !currentLevel[row+3][col+1] && !currentLevel[row+3][col+2])) {

      return false
    }
    else return true
  }
  else return true
}

function goDown(row,col) {
  while ( currentLevel[row+3][col]==0 && currentLevel[row+3][col+1]==0 && currentLevel[row+3][col+2]==0 && row<levelRows-3) {
      ++row
  }
  return row;
}

function datasMove () {
    for(var i=0; i<randPositionGoodData.length; i++) {
      if ( (Math.random()>0.5 || randPositionGoodData[i]==0) && randPositionGoodData[i]!=6 && !pause)
        randPositionGoodData[i]+=1
      if ( (Math.random()<0.5 || randPositionGoodData[i]==6) && randPositionGoodData[i]!=0 && !pause)
        randPositionGoodData[i]-=1
    }
    for(var i=0; i<badDataCol.length; i++) {  // supprimer les mauvaises données tombées dans le gouffre
      if(badDataRow[i]>=levelRows-3) {
        badDataCol.splice(i,1);
        badDataRow.splice(i,1);
      }
      else {
        if(isVisible(badDataCol[i]) && !pause) {  // déplacer les mauvaises données dans la direction du joueur
          if(~~(playerXPos/tileSize)>badDataCol[i])
            badDataCol[i]+=1
          else
            badDataCol[i]-=1
          badDataRow[i] = goDown(badDataRow[i],badDataCol[i]);
        }
      }
    }
}

function obstacleMove() {
  if(currentLevel===level2 && !pause) {
    for(let k=0; k<obstacleCol.length; k++) {
      if(isVisible(obstacleCol[k])) {   // faire bouger lorque l'obstacle apprait sur l'écran
        if(obstacleCol[k]<50 ||  obstacleCol[k]>93) { // zone contenant des roues
          if(obstacleCol[k]>1 && obstacleCol[k]<levelCols-2 && obstacleRow[k]<levelRows-1) {
            if(currentLevel[obstacleRow[k]+2][obstacleCol[k]+1]==0)
              ++obstacleRow[k];
            else --obstacleCol[k]
          }
          else {
            obstacleCol.splice(k,1);
            obstacleRow.splice(k,1);
          }
        }
        else {   // zone contenant des pierres
          if(obstacleRow[k]<levelRows) {
            obstacleRow[k]++
        }
        else {
          obstacleCol.splice(k,1);
          obstacleRow.splice(k,1);
        }
      }
     }
   }
  }
}

function weakPlatform() {
  var row = ~~(playerYPos/tileSize);
  var col = ~~(playerXPos/tileSize);
  if(col+2<levelCols && row+3<levelCols && col>0 && row>0) {
    if( currentLevel[row+3][col]===2 && currentLevel[row+3][col+1]===2 && currentLevel[row+3][col+2]===2) {
      currentLevel[row+3][col]=0;
      currentLevel[row+2][col]=0;
      currentLevel[row+1][col]=0;
      currentLevel[row][col]=0;
    }
  }
}

function horizontalCollision(level) {
  var baseCol = ~~((playerXPos)/tileSize);
  var baseRow = ~~((playerYPos)/tileSize);

  if (playerXSpeed>0) {    // coté droit rebondissement sur les bords 1 uniquement
    if(baseRow<levelRows-2) {
    if(level[baseRow][baseCol+3]==1 || level[baseRow+1][baseCol+3]==1 || level[baseRow+2][baseCol+3]==1)
      playerXPos=(baseCol)*tileSize;
    }
  }

  if (playerXSpeed<0) {    // coté gauche rebondissement sur les bords 1 uniquement
    if(baseRow<levelRows-2) {
      if(level[baseRow][baseCol]==1 || level[baseRow+1][baseCol]==1 || level[baseRow+2][baseCol]==1) {
        if(baseRow>=2)
            playerXPos=(baseCol+1)*tileSize;
        else  // cas en haut de la map
          playerXPos=(baseCol+1)*tileSize;
      }
    }
  }
}

function verticalCollision(level) {
  var baseCol = ~~(playerXPos/tileSize);
  var baseRow = ~~(playerYPos/tileSize);
  var colOverlap = playerXPos%tileSize;
  var rowOverlap = playerYPos%tileSize;

  // vers le haut
  if(playerYSpeed<0){
    if(baseCol<levelCols-3 && baseRow>0)  {
      if((!level[baseRow+1][baseCol] && level[baseRow][baseCol])
      || (!level[baseRow+1][baseCol+1] && level[baseRow][baseCol+1])
      || (!level[baseRow+1][baseCol+2] && level[baseRow][baseCol+2])
      || (!level[baseRow+1][baseCol+1] && level[baseRow][baseCol+1] && colOverlap)  ) {
        playerYPos = (baseRow+1)*tileSize;
      }
    }
    else {
      playerYPos = (baseRow+1)*tileSize;
    }
  }
}

function rebound(level) {
  var baseCol = ~~(playerXPos/tileSize);
  var baseRow = ~~(playerYPos/tileSize);
  if(lockKeyup && reboundPressed && !lockRebound) {
    //rebond à droite
    if(level[baseRow][baseCol+3]==1 || level[baseRow+1][baseCol+3]==1 || level[baseRow+2][baseCol+3]==1) {
        inPropulse.active=true;
        inPropulse.side="right";
      }

    if(level[baseRow][baseCol]==1 || level[baseRow+1][baseCol]==1 || level[baseRow+2][baseCol]==1) {
      inPropulse.active=true;
      inPropulse.side="left";
    }
  }
}
