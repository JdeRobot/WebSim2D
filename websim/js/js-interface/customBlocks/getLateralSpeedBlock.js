var getLateral = {
  "type": "getLateralSpeed",
  "message0": "Get Lateral speed for %1",
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

Blockly.Blocks['getLateralSpeed'] = {
  init: function() {
    this.jsonInit(getLateral);
  }
};

Blockly.JavaScript['getLateralSpeed'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

  var code = variable_robotvar + '.getL()';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
