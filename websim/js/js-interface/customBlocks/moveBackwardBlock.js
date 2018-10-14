var moveBackwardBlock = {
  "type": "move_backward",
  "message0": "Move backward %1 at speed %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "NAME",
      "variable": "myRobot"
    },
    {
      "type": "input_value",
      "name": "ROBOTVAR",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Sets speed for the robot.",
  "helpUrl": ""
}

Blockly.Blocks['move_backward'] = {
  init: function() {
    this.jsonInit(moveBackwardBlock);

  }
};

Blockly.JavaScript['move_backward'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);

  var code = variable_name + '.setV(-' + value_robotvar + '); \n';
  return code;
};

Blockly.Python['move_backward'] = function(block) {
  var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);

  var code = variable_name + '.retroceder(' + value_robotvar + ')\r\n';
  return code;
};
