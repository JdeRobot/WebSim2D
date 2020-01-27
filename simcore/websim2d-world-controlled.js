function startStopCode(play, reservedVariables, mainInterval, codeContent){
  var image = document.getElementById("runbtn").firstChild;

  if(!play){
    image.src = "../assets/resources/stop-icon.png";
    codeContent = cleanRedefinition(codeContent, reservedVariables);
    play = true;
    console.log(codeContent);
    eval(codeContent);
    console.log("Executing code.");
  }else{
    image.src = "../assets/resources/play-icon.png";
    //clearInterval(mainInterval);
    if (mainInterval && typeof mainInterval === "function"){
     mainInterval(); //mainInterval now is a function that clears setIntervalSynchronous
    }else{
      null
    }
    myRobot.clearVelocity();

    play = false;
    console.log("Execution stopped.")
  }
  return {"play": play, "mainInterval": mainInterval}
  //return "prueba";
}

function cleanRedefinition(scriptContent, reservedVariables){
/*
  This function removes redefinition of variables "myRobot" and "mainInterval"
*/
  var contentSplitted = scriptContent.split("\n");
  var definitionLine = contentSplitted[1].split(" ");
  console.log(definitionLine);
  reservedVariables.forEach((variable, position)=>{
    var index = definitionLine.indexOf(variable);
    if(index != -1){
      if(position == 0 || position == 1){
        definitionLine[index] = "";
      }else{
        definitionLine[index] = "dummyVariable;"
      }
    }
  });

  contentSplitted[1] = definitionLine.join(" ");
  return contentSplitted.join("\n");
}
