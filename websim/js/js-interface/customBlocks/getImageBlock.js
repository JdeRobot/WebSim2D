var getImageBlock = {
  "type": "get_image",
  "message0": "Get %1 camera image",
  "args0": [
    {
      "type": "field_variable",
      "name": "ROBOTVAR",
      "variable": "myRobot"
    }
  ],
  "output": null,
  "colour": 210,
  "tooltip": "Gets image from robot camera",
  "helpUrl": ""
};

Blockly.Blocks['get_image'] = {
  init: function() {
    this.jsonInit(getImageBlock);

  }
};

Blockly.JavaScript['get_image'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

  var code = variable_robotvar.toString() + '.getImage()';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python['get_image'] = function(block) {
  var variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

  var code = variable_robotvar + '.leerIRSigueLineas()\r\n';

  return [code, Blockly.Python.ORDER_ATOMIC];
};
