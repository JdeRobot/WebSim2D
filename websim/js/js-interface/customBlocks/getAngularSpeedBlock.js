var getAngular = {
  "type": "getAngularSpeed",
  "message0": "Get angular speed for %1",
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

Blockly.Blocks['getAngularSpeed'] = {
  init: function() {
    this.jsonInit(getAngular);
  }
};

Blockly.JavaScript['getAngularSpeed'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

  var code = variable_robotvar + '.getW()';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
