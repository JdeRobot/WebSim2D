var setTimeoutBlock = {
  "type": "set_timeout",
  "message0": "Execute once after %1 miliseconds %2",
  "args0": [
    {
      "type": "field_number",
      "name": "TIME",
      "value": 0,
      "min": 0
    },
    {
      "type": "input_statement",
      "name": "TEXT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Execute code inside every given miliseconds",
  "helpUrl": ""
};

Blockly.Blocks['set_timeout'] = {
  init: function() {
    this.jsonInit(setTimeoutBlock);
  }
};

Blockly.JavaScript['set_timeout'] = function(block) {
  var number_name = block.getFieldValue('TIME');
  var statements_text = Blockly.JavaScript.statementToCode(block, 'TEXT');

  var code = 'setTimeout(()=>{\n' + statements_text + '},' + number_name + ');\n';
  return code;
};

Blockly.Python['set_timeout'] = function(block) {
  var number_name = parseInt(block.getFieldValue('TIME'));
  var statements_text = Blockly.Python.statementToCode(block, 'TEXT');
  var time_secs = number_name / 1000;
  var code = 'time.sleep(' + time_secs + ')\n' + statements_text + "\r\n";
  return code;
};
