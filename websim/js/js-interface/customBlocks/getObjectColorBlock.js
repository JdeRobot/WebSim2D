var getObjectColorBlock = {
  "type": "get_objcolor",
  "message0": "For %1 get the object with colour %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "ROBOTVAR",
      "variable": "myRobot"
    },
    {
      "type": "field_input",
      "name": "COLOUR",
      "text": "blue"
    }
  ],
  "output": null,
  "colour": 270,
  "tooltip": "Get center and area of object with given color",
  "helpUrl": ""
};

Blockly.Blocks['get_objcolor'] = {
  init: function() {
    this.jsonInit(getObjectColorBlock);

  }
};

Blockly.JavaScript['get_objcolor'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
  var text_colour = block.getFieldValue('COLOUR');

  var code = variable_robotvar + '.getObjectColor("' + text_colour + '")';

  return [code, Blockly.JavaScript.ORDER_NONE];
};
