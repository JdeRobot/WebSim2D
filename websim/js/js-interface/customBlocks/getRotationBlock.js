var getRotation = {
  "type": "getRotation",
  "message0": "Get Rotation for %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "ROBOTVAR",
      "variable": "myRobot"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
};

Blockly.Blocks['getRotation'] = {
  init: function() {
    this.jsonInit(getRotation);
  }
};

Blockly.JavaScript['getRotation'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

  var code = variable_robotvar + '.getRotation()';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
