var setLateralBlock = {
  "type": "set_lateral",
  "message0": "Move lateral %1 at speed %2",
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
  "tooltip": "Sets lateral speed for the robot.",
  "helpUrl": ""
}

Blockly.Blocks['set_lateral'] = {
  init: function() {
    this.jsonInit(setLateralBlock);

  }
};

Blockly.JavaScript['set_lateral'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);

  var code = variable_name + '.setL(' + value_robotvar + '); \n';
  return code;
};
