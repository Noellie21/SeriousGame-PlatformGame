function messages() {

  var spanStatus = [];
  for(i=0;i<spans.length;i++)
    spanStatus.push(spans[i].style.opacity)

    if(spanStatus.includes("1")) {
      pause = true;
      if(!displayDone) {
        pause = !pause;
        displayDone=true;
        for(i=0;i<spans.length;i++)
          spans[i].style.opacity="0";
      }
    }


  if(!messagesDispalyed[0]) {
    spans[0].style.opacity="1";
    if(!message0[0])
      spans[0].textContent = "Attention DataBoo !";
    message0[0]=true;
    if(message0[0] && !message0[1] && !message0[2]) {
      setTimeout(()=> {
        spans[0].innerHTML = "Te voilà parti sur le long chemin de la donnée, tout au long de celui-ci, tu risques de rencontrer plein de petites données.";
        message0[1]=true;
      },3000)
    }
    if(message0[1] && !message0[2]) {
      setTimeout(()=> {
        spans[0].innerHTML = "Parmi elles, certaines sont bonnes et viendront renforcer ton équipe, mais d’autres sont de mauvaise qualité, à toi de les éviter…";
        message0[2]=true;
      },3000)
    }
    if(message0[2]) {
      setTimeout(()=> {
        if(spans[0].style.opacity=="1")
          displayDone=false;
        messagesDispalyed[0] = true;
      },3000)
    }

  }
  if(nbGoodData===1 && !messagesDispalyed[1]) {
    displayDone=true;
    spans[1].style.opacity="1";
    setTimeout(()=> {
      if(spans[1].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[1] = true;
    },5000)
  }

  if(touched && !messagesDispalyed[2]) {
    displayDone=true;
    spans[2].style.opacity="1";
    setTimeout(()=> {
      if(spans[2].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[2] = true;

    },5000)
  }

  if(currentLevel===level2 && !messagesDispalyed[3]) {
    displayDone=true;
    spans[3].style.opacity="1";
    setTimeout(()=> {
      if(spans[3].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[3] = true;
    },7000)
  }

  if(messagesDispalyed[3] && !messagesDispalyed[4]) {
    displayDone=true;
    spans[4].style.opacity="1";
    if(nbBadData>1)
      spans[4].innerHTML = "Voyons cela de plus près... D'après le contrôle d'exactitude tu as récupérés " + nbGoodData + " bonnes données différentes dans ton équipe! Le contrôle d'unicité indique " + nbBadData + " mauvaises données, mais cela ne veut pas dire qu'elles sont méchantes pour autant, certaines données étaient simplement des doublons !";
    else spans[4].innerHTML = "Voyons cela de plus près... D'après le contrôle d'exactitude tu as récupérés " + nbGoodData + " bonnes données différentes dans ton équipe! Le contrôle d'unicité indique " + nbBadData + " mauvaise donnée, mais cela ne veut pas dire qu'elle est méchante pour autant, certaines données étaient simplement des doublons !";
    setTimeout(()=> {
      if(spans[4].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[4] = true;
    },7000)
  }

  if(anomaly && !messagesDispalyed[5]) {
    displayDone=true;
    spans[5].style.opacity="1";
    setTimeout(()=> {
      if(spans[5].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[5] = true;
    },5000)
  }

  if(currentLevel===level3 && !messagesDispalyed[6]) {
    displayDone=true;
    spans[6].style.opacity="1";
    setTimeout(()=> {
      if(spans[6].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[6] = true;
    },7000)
  }

  if(nbHeart==1 && !messagesDispalyed[7]) {
    displayDone=true;
    spans[7].style.opacity="1";
    setTimeout(()=> {
      if(spans[7].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[7] = true;
    },5000)
  }

  if(nbHeart>9 && !messagesDispalyed[8]) {
    displayDone=true;
    spans[8].style.opacity="1";
    setTimeout(()=> {
      if(spans[8].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[8] = true;
    },7000)
  }
  if(messagesDispalyed[8] && !messagesDispalyed[9]) {
    displayDone=true;
    spans[9].style.opacity="1";
    setTimeout(()=> {
      if(spans[9].style.opacity=="1")
        displayDone = false;
      messagesDispalyed[9] = true;
    },5000)
  }
  if(playerDead) {
    displayDone=true;
    spans[10].style.opacity="1";
    setTimeout(()=> {
      if(spans[10].style.opacity=="1")
        displayDone = false;
    },5000)
  }

}
