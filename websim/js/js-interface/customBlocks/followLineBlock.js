
var followLineBlock = {
  "type": "follow_line",
  "message0": "%1 Follow line with color %2 at speed %3",
  "args0": [
    {
      "type": "field_variable",
      "name": "ROBOT",
      "variable": "myRobot"
    },
    {
      "type": "field_input",
      "name": "COLOUR",
      "text": "white"
    },
    {
      "type": "input_value",
      "name": "INPUT_SPEED"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 285,
  "tooltip": "Follow line, pass color and speed",
  "helpUrl": ""
};

Blockly.Blocks['follow_line'] = {
  init: function() {
    this.jsonInit(followLineBlock);
  }
};

Blockly.JavaScript['follow_line'] = function(block) {
  var variable_robot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var text_colour = block.getFieldValue('COLOUR');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'INPUT_SPEED', Blockly.JavaScript.ORDER_ATOMIC);

  var code = variable_robot + '.followLine("' + text_colour.toString() + '",' + value_speed + ');\n';
  return code;
};
