
export function startStopCode(play, myRobot, reservedVariables, mainInterval, codeContent){
  var image = document.getElementById("runbtn").firstChild;

  if(!play){
    image.src = "assets/resources/stop-icon.png";
    codeContent = cleanRedefinition(codeContent, reservedVariables);
    play = true;
    eval(codeContent);
    console.log("Executing code.");
  }else{
    image.src = "assets/resources/play-icon.png";
    clearInterval(mainInterval);
    myRobot.move(0,0);
    play = false;
    console.log("Execution stopped.")
  }
  return {"play": play, "mainInterval": mainInterval}

}

export function cleanRedefinition(scriptContent, reservedVariables){
/*
  This function removes redefinition of variables "myRobot" and "mainInterval"
*/
  console.log(scriptContent)
  var contentSplitted = scriptContent.split("\n");
  var definitionLine = contentSplitted[0].split(" ");
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

  contentSplitted[0] = definitionLine.join(" ");
  return contentSplitted.join("\n");
}
