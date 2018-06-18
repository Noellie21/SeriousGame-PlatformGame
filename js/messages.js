function messages() {

  var spanStatus = [];
  for(i=0;i<spans.length;i++)
    spanStatus.push(spans[i].style.display)

    if(spanStatus.includes("block")) {
      pause = true;
      if(!displayDone) {
        pause = !pause;
        displayDone=true;
        for(i=0;i<spans.length;i++)
          spans[i].style.display="none";
      imgBCBS.style.width="0px";
      }
    }


  if(!messagesDispalyed[0]) {
    imgBCBS.style.width="auto";
    spans[0].style.display="block";
    setTimeout(()=> {
      if(spans[0].style.display=="block")
        displayDone=false;
      messagesDispalyed[0] = true;
    },5000)

  }
  if(nbGoodData===1 && !messagesDispalyed[1]) {
    displayDone=true;
    imgBCBS.style.width="auto";
    spans[1].style.display="block";
    setTimeout(()=> {
      if(spans[1].style.display=="block")
        displayDone = false;
      messagesDispalyed[1] = true;
    },5000)
  }

  if((points.killBadData || points.hurtBadData) && !messagesDispalyed[2]) {
    displayDone=true;
    imgBCBS.style.width="auto";
    spans[2].style.display="block";
    setTimeout(()=> {
      if(spans[2].style.display=="block")
        displayDone = false;
      messagesDispalyed[2] = true;

    },5000)
  }

  if(currentLevel===level2 && !messagesDispalyed[3]) {
    displayDone=true;
    imgBCBS.style.width="auto";
    spans[3].style.display="block";
    setTimeout(()=> {
      if(spans[3].style.display=="block")
        displayDone = false;
      messagesDispalyed[3] = true;
    },5000)
  }

  if(anomaly && !messagesDispalyed[4]) {
    displayDone=true;
    imgBCBS.style.width="auto";
    spans[4].style.display="block";
    setTimeout(()=> {
      if(spans[4].style.display=="block")
        displayDone = false;
      messagesDispalyed[4] = true;
    },5000)
  }

  if(currentLevel===level3 && !messagesDispalyed[5]) {
    displayDone=true;
    imgBCBS.style.width="auto";
    spans[5].style.display="block";
    setTimeout(()=> {
      if(spans[5].style.display=="block")
        displayDone = false;
      messagesDispalyed[5] = true;
    },5000)
  }

  if(nbHeart==1 && !messagesDispalyed[6]) {
    displayDone=true;
    imgBCBS.style.width="auto";
    spans[6].style.display="block";
    setTimeout(()=> {
      if(spans[6].style.display=="block")
        displayDone = false;
      messagesDispalyed[6] = true;
    },5000)
  }

  if(nbHeart>7 && !messagesDispalyed[7]) {
    displayDone=true;
    imgBCBS.style.width="auto";
    spans[7].style.display="block";
    setTimeout(()=> {
      if(spans[7].style.display=="block")
        displayDone = false;
      messagesDispalyed[7] = true;
    },5000)
  }

}
