var getLinear = {
  "type": "getLinearSpeed",
  "message0": "Get linear speed for %1",
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

Blockly.Blocks['getLinearSpeed'] = {
  init: function() {
    this.jsonInit(getLinear);
  }
};

Blockly.JavaScript['getLinearSpeed'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

  var code = variable_robotvar + '.getV()';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
