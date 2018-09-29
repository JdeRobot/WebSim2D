var extractPositionBlock = {
  "type": "extract_pos_fields",
  "message0": "Extract from variable  %1 field %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "EXTRACT_VAR",
      "variable": "aux"
    },
    {
      "type": "field_dropdown",
      "name": "FIELDS",
      "options": [
        [
          "positionX",
          "X"
        ],
        [
          "positionY",
          "Y"
        ],
        [
          "positionZ",
          "Z"
        ],
        [
          "rotation",
          "ROTATION"
        ]
      ]
    }
  ],
  "output": null,
  "colour": 285,
  "tooltip": "Get only one field for an object.",
  "helpUrl": ""
}

Blockly.Blocks['extract_pos_fields'] = {
  init: function() {
    this.jsonInit(extractPositionBlock);
  }
};

Blockly.JavaScript['extract_pos_fields'] = function(block) {
  var variable_extract_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('EXTRACT_VAR'), Blockly.Variables.NAME_TYPE);
  var dropdown_fields = block.getFieldValue('FIELDS');
  var code = '';

  if(dropdown_fields === "X"){
    code = variable_extract_var + '.x';
  }else if(dropdown_fields === "Y"){
    code = variable_extract_var + '.y';
  }else if(dropdown_fields === "Z"){
    code = variable_extract_var + '.z';
  }else{
    code = variable_extract_var + '.theta';
  }

  return [code, Blockly.JavaScript.ORDER_NONE];
};
