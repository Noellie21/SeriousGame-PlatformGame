

function isNear(obstacleRow, obstacleCol) {
  var playerRow = ~~(playerYPos/tileSize);
  var playerCol = ~~(playerXPos/tileSize);
  if( ( playerRow==obstacleRow || playerRow==obstacleRow+1 || playerRow==obstacleRow-1 || playerRow==obstacleRow+2|| playerRow==obstacleRow-2)
&& ( playerCol==obstacleCol-2 || playerCol==obstacleCol+2 || playerCol==obstacleCol+1 || playerCol==obstacleCol-1 || playerCol==obstacleCol))
    return true
  else return false
}

function isVisible(col) {
  var refPos = ~~(playerXPos/tileSize);
  if((col<refPos+70 && ( refPos<12 || col>refPos-12)) || refPos>levelCols/2) {
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
  if(col>3) {
    score-=3;
    nbLives--;
  }
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
  if(col>3) {
    if(playerXPos<col*tileSize)
      playerXPos-=5*tileSize // force de repoussement des mauvaises données
    else playerXPos+=5*tileSize
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
        if(obstacleCol[k]<50 ||  obstacleCol[k]>72) { // zone contenant des roues
          if(obstacleCol[k]>2 && obstacleCol[k]<levelCols-2) {
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

function rebound(level) {
  var baseCol = ~~((playerXPos)/tileSize);
  var baseRow = ~~((playerYPos)/tileSize);
  var colOverlap = playerXPos%tileSize;
  var rowOverlap = playerYPos%tileSize;

  if (playerXSpeed>0) {    // coté droit rebondissement sur les bords 1 uniquement
    if(baseRow<levelRows-3 && baseCol<levelCols-3) { // si on n'est pas en bas
      if((level[baseRow+2][baseCol+2]===1 && !level[baseRow+2][baseCol+1])
      || (level[baseRow+3][baseCol+2]===1 && !level[baseRow+3][baseCol+1] && rowOverlap)) {
        if(baseRow>=2) {
          playerXPos=(baseCol-2)*tileSize;
          playerYPos=(baseRow-2)*tileSize;
        }
        else {  // cas en haut de la map
          playerXPos=(baseCol-2)*tileSize;
          playerYPos=(baseRow+1)*tileSize;
        }
      }
    }
    else {
      if(baseRow>=levelRows-3) {  // cas en bas de la map => pas utile car on meurt en arrivant en bas
        if((level[baseRow][baseCol+2]===1 && !level[baseRow][baseCol+1])
        || (level[baseRow+1][baseCol+2]===1 && !level[baseRow+1][baseCol+1] && rowOverlap)) {
          playerXPos=(baseCol-2)*tileSize;
          playerYPos=(baseRow-2)*tileSize;
        }
      }
    }
  }

  if (playerXSpeed<0) {    // coté gauche rebondissement sur les bords 1 uniquement
    if(baseRow<levelRows-3) {
      if ((!level[baseRow+2][baseCol+1] && level[baseRow+2][baseCol]===1)
      || (!level[baseRow+3][baseCol+1] && level[baseRow+3][baseCol]===1 && rowOverlap)) {
        if(baseRow>=2) {
          playerXPos=(baseCol+3)*tileSize;
          playerYPos=(baseRow-2)*tileSize;
        }
        else {  // cas en haut de la map
          playerXPos=(baseCol+3)*tileSize;
          playerYPos=(baseRow+1)*tileSize;
        }
      }
    }
    else { // cas en bas de la map => pas utile car on meurt en arrivant en bas
      if(baseRow>=levelRows-3) {
        if((!level[baseRow][baseCol+1] && level[baseRow][baseCol])
        || (!level[baseRow+1][baseCol+1] && level[baseRow+1][baseCol] && rowOverlap)) {
          playerXPos=(baseCol+3)*tileSize;
          playerYPos=(baseRow-3)*tileSize;
        }
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
  //    console.log("dedans")
      playerYPos = (baseRow+1)*tileSize;
    }
  }

}
