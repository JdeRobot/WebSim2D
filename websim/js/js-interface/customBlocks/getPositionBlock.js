
var getPositionBlock = {
  "type": "get_position",
  "message0": "Get %1 coordinate for %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "POSITION_OPTIONS",
      "options": [
        [
          "x",
          "POSX"
        ],
        [
          "y",
          "POSY"
        ],
        [
          "z",
          "POSZ"
        ],
        [
          "theta",
          "ROTATION"
        ]
      ]
    },
    {
      "type": "field_variable",
      "name": "ROBOTVAR",
      "variable": "myRobot"
    }
  ],
  "output": null,
  "colour": 195,
  "tooltip": "Returns coordinate X, Y or Z for the robot. The X and Z coordinates represent the horizontal plane,",
  "helpUrl": ""
};

Blockly.Blocks['get_position'] = {
  init: function() {
    this.jsonInit(getPositionBlock);

  }
};

Blockly.JavaScript['get_position'] = function(block) {
  var dropdown_position_options = block.getFieldValue('POSITION_OPTIONS');
  var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
  var code = '';

  if(dropdown_position_options === "POSX"){
    code = variable_robotvar + '.getPosition().x';
  }else if(dropdown_position_options === "POSY"){
    code = variable_robotvar + '.getPosition().z';
  }else if(dropdown_position_options === "POSZ"){
    code = variable_robotvar + '.getPosition().y';
  }else{
    code = variable_robotvar + '.getPosition().theta';
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
