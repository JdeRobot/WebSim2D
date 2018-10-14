var stopBlock = {
  "type": "stop_robot",
  "message0": "%1 stop",
  "args0": [
    {
      "type": "field_variable",
      "name": "NAME",
      "variable": "myRobot"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 315,
  "tooltip": "Stops the robot",
  "helpUrl": ""
};

Blockly.Blocks['stop_robot'] = {
  init: function() {
    this.jsonInit(stopBlock);
  }
};

Blockly.JavaScript['stop_robot'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var code = variable_name + '.move(0, 0);\n';
  return code;
};


Blockly.Python['stop_robot'] = function(block) {
  var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var code = variable_name + '.parar()\r\n';
  return code;
};
