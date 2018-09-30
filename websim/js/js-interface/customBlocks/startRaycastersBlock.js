var startRaycasterBlock = {
  "type": "start_rays",
  "message0": "%1 Start %2 infrared sensors at distance %3",
  "args0": [
    {
      "type": "field_variable",
      "name": "ROBOTVAR",
      "variable": "myRobot"
    },
    {
      "type": "field_number",
      "name": "NUMOFRAYS",
      "value": 0,
      "min": 1,
      "max": 31
    },
    {
      "type": "field_number",
      "name": "RAYDISTANCE",
      "value": 0,
      "min": 1,
      "max": 10
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 150,
  "tooltip": "Start a given number of raycasters with a given distance",
  "helpUrl": ""
};

Blockly.Blocks['start_rays'] = {
  init: function() {
    this.jsonInit(startRaycasterBlock);

  }
};

Blockly.JavaScript['start_rays'] = function(block) {
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
  var number_numofrays = block.getFieldValue('NUMOFRAYS');
  var number_raydistance = block.getFieldValue('RAYDISTANCE');

  var code = variable_robotvar + '.startRaycasters(' + number_raydistance + ',' + number_numofrays + ');\n';
  return code;
};
