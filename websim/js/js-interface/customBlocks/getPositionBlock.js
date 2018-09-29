
var getPositionBlock = {
  "type": "get_position",
  "message0": "Get position for %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "ROBOTVAR",
      "variable": "myRobot"
    }
  ],
  "output": null,
  "colour": 195,
  "tooltip": "Returns position for raycaster in the center",
  "helpUrl": ""
};

Blockly.Blocks['get_position'] = {
  init: function() {
    this.jsonInit(getPositionBlock);

  }
};

Blockly.JavaScript['get_position'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

  var code = variable_robotvar + '.getPosition()';

  return [code, Blockly.JavaScript.ORDER_NONE];
};
