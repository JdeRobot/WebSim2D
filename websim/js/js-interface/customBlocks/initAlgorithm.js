
var initAlgorithm = {
  "type": "start_point",
  "message0": "Starting point %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "ALGORITHM"
    }
  ],
  "colour": 65,
  "tooltip": "Starting point for robot algorithm.",
  "helpUrl": ""
}

Blockly.Blocks['start_point'] = {
  init: function() {
    this.jsonInit(initAlgorithm);
  }
};

Blockly.JavaScript['start_point'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'ALGORITHM');


  var code = '$("#scene").on(' + '"loaded" , function() {\n var myRobot = new RobotI("a-pibot");\n' + statements_name.toString() + '});\n';
  return code;
};
