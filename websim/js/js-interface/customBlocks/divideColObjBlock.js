
var divideColObjBlock = {
  "type": "divide_obj",
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
          "centerX",
          "X"
        ],
        [
          "centerY",
          "Y"
        ],
        [
          "area",
          "AREA"
        ]
      ]
    }
  ],
  "output": null,
  "colour": 285,
  "tooltip": "Get only one field for an object.",
  "helpUrl": ""
}

Blockly.Blocks['divide_obj'] = {
  init: function() {
    this.jsonInit(divideColObjBlock);
  }
};

Blockly.JavaScript['divide_obj'] = function(block) {
  var variable_extract_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('EXTRACT_VAR'), Blockly.Variables.NAME_TYPE);
  var dropdown_fields = block.getFieldValue('FIELDS');
  var code = '';

  if(dropdown_fields === "X"){
    code = variable_extract_var + '.center[0]';
  }else if(dropdown_fields === "Y"){
    code = variable_extract_var + '.center[1]';
  }else{
    code = variable_extract_var + '.area';
  }

  return [code, Blockly.JavaScript.ORDER_NONE];
};
