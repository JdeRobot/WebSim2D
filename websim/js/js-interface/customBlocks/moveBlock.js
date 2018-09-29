
var moveBlock = {
  "type": "move_combined",
  "message0": "Move %1 at linear speed %2 and turn at speed %3",
  "args0": [
    {
      "type": "field_variable",
      "name": "NAME",
      "variable": "myRobot"
    },
    {
      "type": "input_value",
      "name": "LINEARSPEED",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "ANGULARSPEED",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Sets linear and angular speed for the robot.",
  "helpUrl": ""
}

Blockly.Blocks['move_combined'] = {
  init: function() {
    this.jsonInit(moveBlock);

  }
};

Blockly.JavaScript['move_combined'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_linear = Blockly.JavaScript.valueToCode(block, 'LINEARSPEED', Blockly.JavaScript.ORDER_ATOMIC);
  var value_angular = Blockly.JavaScript.valueToCode(block, 'ANGULARSPEED', Blockly.JavaScript.ORDER_ATOMIC);

  var code = variable_name + '.move(' + value_linear + ',' + value_angular + '); \n';
  return code;
};
