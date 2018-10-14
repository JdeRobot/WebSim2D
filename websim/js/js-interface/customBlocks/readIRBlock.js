var readIRBlock = {
  "type": "read_ir",
  "message0": "For  %1 read IR %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "ROBOT_VAR",
      "variable": "myRobot"
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": null,
  "colour": 180,
  "tooltip": "Returns 0/1/2/3 if IR sensors detect line",
  "helpUrl": ""
};

Blockly.Blocks['read_ir'] = {
  init: function() {
    this.jsonInit(readIRBlock);
  }
};

Blockly.JavaScript['read_ir'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

  var code = variable_robot_var + '.readIR(' + value_name + ')';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python['read_ir'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);

  var code = variable_robot_var + '.leerIRSigueLineas()\r\n';

  return [code, Blockly.Python.ORDER_ATOMIC];
};
