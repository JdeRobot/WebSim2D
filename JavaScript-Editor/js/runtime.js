var __callstack__;
var __symbolmap__ = {}; var __linemap__ = {};
var getfuncatline = function (lineno) {
	for (let x in __symbolmap__) {
		let p = __symbolmap__[x];
		if (p[0] <= lineno && p[1] >= lineno) {
			return x;
		}
	}
}
function decodecallstack () {
	let arr = __callstack__.split ('\n');
	let lineno_stack = [];
	for (let el of arr) {
		let lineno = el.slice (el.indexOf (':') + 1, el.lastIndexOf (':'));
		lineno_stack.push (lineno);
	}

	for (let x of lineno_stack) {
		let name = getfuncatline (x);
		if (name != undefined) {
			console.log (`function ${name} at ${__linemap__[x]}\n`);
		}
	}
}
function make_array (init = []) {
	return new Proxy (init, {
		get (target, key, recv) {
			var id = Number (key);
			if (!isNaN (id)) {
				if (id < 0) {id += target.length;}
				console.log (key);
				return Reflect.get(target, id, recv);
			}
            return Reflect.get(target, key, recv);
		},
		set (target, key, value, recv) {
			var id = Number (key);
			if (!isNaN (id)) {
				if (id < 0) {id += target.length;}
				console.log (key);
				return Reflect.set(target, id, recv);
			}
            return Reflect.set (target, key, value, recv);
		}
	});
}

function __PyType__ () {
	__PyObject__.call (this);
}
__PyType__.__class__ = __PyType__;
__PyType__.__call__ = function (x) {
	return x.__class__;
}
var __PyObject__ = function () {
	this.__class__ = __PyObject__;
	this.__uniqueid__ = __PyObject__.__uniqueid__;
	__PyObject__.__uniqueid__++;
	this.__dict__ = {}
}
__PyObject__.__uniqueid__ = 0;
__PyObject__.__class__ = __PyType__;
__PyObject__.__call__ = function () {
	return new __PyObject__ ();
}
__PyObject__.prototype.__setattr__ = function (x, y) {
	if (x in this.__dict__) {
		this.__dict__.x = y;
	} else {
		__callstack__ = new Error ().stack; throw new __PyAttributeError__ (
			`'${this.__class__}' object has no attribute '${x}'`
		);
	}
}
__PyObject__.prototype.__getattr__ = function (x) {
	if (x in this.__dict__) {return this.__dict__[x];}
	__callstack__ = new Error ().stack; throw new __PyAttributeError__ (
		`'${this.__class__}' object has no attribute '${x}'`
	);
}
__PyObject__.prototype.__eq__ = function (other) {
	if (this === other) {return __PyTrue__;}
	return __PyNotImplemented__;
}
__PyObject__.prototype.__ge__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__gt__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__lt__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__le__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__ne__ = function (other) {
	if (this === other) {return __PyFalse__;}
	return __PyNotImplemented__;
}


// Extend __PyType__ to be a child of object.
__PyType__.prototype = Object.assign (__PyType__.prototype, __PyObject__.prototype);

// Extending functions to suit python3
Function.prototype.__eq__ = function (other) {return __getbool__ (this == other);}
Function.prototype.__call__ = function () {
    return this.apply (this, arguments);
}
Function.prototype = Object.assign (Function.prototype, __PyObject__.prototype);
var __PyStr__ = function (x) {
	__PyObject__.call (this);
	this.x = String (x);
	this.__class__ = __PyStr__;
}
__PyStr__.prototype = Object.create (__PyObject__.prototype);
__PyStr__.__class__ = __PyType__;
__PyStr__.__name__ = new __PyStr__ ('str');
__PyStr__.__call__ = function (x) {
	if (x instanceof __PyStr__) {
		return x;
	} else {
		return x.__str__ ();
	}
}
__PyStr__.__str__ = function () {return (new __PyStr__ (`<class 'str'>`));}
__PyStr__.prototype.__str__ = function () {return this;}
__PyStr__.prototype.toString = function () {return this.x;}
__PyStr__.prototype.__add__ = function (other) {
	if (other instanceof __PyStr__) {
		return (new __PyStr__ (this.x.concat (other.x)));
	}
	__callstack__ = new Error ().stack; throw (new __PyTypeError__ (`must be str, not ${other.__class__.__name__}`));
}
__PyStr__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__) {
		return (new __PyStr__ (this.x.repeat (other.x)));
	}
	__callstack__ = new Error ().stack; throw (new __PyTypeError__ (`can't multiply sequence by non-int of type ${other.__class__.__name__}`));
}
__PyStr__.prototype.__len__ = function () {
	return (new __PyInt__ (this.x.length));
}
__PyStr__.prototype.__eq__ = function (other) {return (this.x == other.x) ? __PyTrue__ : __PyFalse__;}
__PyStr__.prototype.__getitem__ = function (pos) {
	if (! (pos instanceof __PyInt__)) {
		__callstack__ = new Error ().stack; throw new TypeError (`string indices must be integers, not ${i.__class__.__name__}`);
	}

	if (__ge__ (pos, new __PyInt__ (0)) == __PyTrue__ && __lt__ (pos, this.__len__()) == __PyTrue__) {
		return new __PyStr__ (this.x[pos.x]);
	}
	__callstack__ = new Error ().stack; throw new IndexError (`string index out of range`);
}
__PyStr__.prototype.__iter__ = function * () {
	for (let x of this.x) {
		yield (new __PyStr__ (x));
	}
}
__PyStr__.prototype.__hash__ = function () {return 'str' + this.x;}

// Add __str__ method for object, type.
__PyObject__.__name__ = new __PyStr__ ('object');
__PyObject__.__str__ = function () {return (new __PyStr__ (`<class 'object'>`));}

__PyType__.__name__ = new __PyStr__ ('type');
__PyType__.__str__ = function () {return (new __PyStr__ (`<class 'type'>`));}
var __PyNoneType__ = function () {
	__PyObject__.call (this);
	this.__class__ = __PyNoneType__;
}
__PyNoneType__.prototype = Object.assign (__PyNoneType__.prototype, __PyObject__.prototype);
__PyNoneType__.__class__ = __PyType__;
__PyNoneType__.__name__ = new __PyStr__ ('NoneType');
__PyNoneType__.prototype.__str__ = function () {
	return (new __PyStr__ ('None'))
}
__PyNoneType__.prototype.__bool__ = function () {
	return __PyFalse__;
}
__PyNoneType__.prototype.__eq__ = function (other) {
	return __getbool__ (other === __PyNone__);
}
__PyNoneType__.prototype.__ne__ = function (other) {
	return __getbool__ (other !== __PyNone__);
}
const __PyNone__ = new __PyNoneType__ ();
var __PyBaseException__ = function (msg) {
	__PyObject__.call (this);
	var err = Error.call (this);
	Object.defineProperty(this, 'stack', {
        get: function () {return err.stack;}
    });
	this.__class__  = __PyBaseException__;
	this.msg = msg;
}
__PyBaseException__.prototype = Object.assign (__PyBaseException__.prototype, Error.prototype);
__PyBaseException__.prototype = Object.assign (__PyBaseException__.prototype, __PyObject__.prototype);
__PyBaseException__.prototype.__str__ = function () {return `${this.__class__.__name__}: ${this.msg}`;}
__PyBaseException__.__str__ = function () {return (new __PyStr__ (`<class 'BaseException'>`));}
__PyBaseException__.__name__ = new __PyStr__ ('BaseException');
__PyBaseException__.__call__ = function (msg) {return new __PyBaseException__ (msg);}

var __PyException__ = function (msg) {
	__PyBaseException__.call (this, msg);
	this.__class__ = __PyException__;
}
__PyException__.prototype = Object.create (__PyBaseException__.prototype);
__PyException__.__str__ = function () {return (new __PyStr__ (`<class 'Exception'>`));}
__PyException__.__name__ = new __PyStr__ ('Exception');
__PyException__.__call__ = function (msg) {return new __PyException__ (msg);}

var __PyTypeError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyTypeError__;
}
__PyTypeError__.prototype = Object.create (__PyException__.prototype);
__PyTypeError__.__str__ = function () {return (new __PyStr__ (`<class 'TypeError'>`));}
__PyTypeError__.__name__ = new __PyStr__ ('TypeError');
__PyTypeError__.__call__ = function (msg) {return new __PyTypeError__ (msg);}

function __unsupportedbinaryop__ (op, a, b) {
	return (new __PyTypeError__ (
		`unsupported operand type(s) for ${op}: '${a.__class__.__name__}' and '${b.__class__.__name__}'`
	));
}


var __PyNameError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyNameError__;
}
__PyNameError__.prototype = Object.create (__PyException__.prototype);
__PyNameError__.__str__ = function () {return (new __PyStr__ (`<class 'NameError'>`));}
__PyNameError__.__name__ = new __PyStr__ ('NameError');
__PyNameError__.__call__ = function (msg) {return new __PyNameError__ (msg);}


var __PyUnboundLocalError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyUnboundLocalError__;
}
__PyUnboundLocalError__.prototype = Object.create (__PyException__.prototype);
__PyUnboundLocalError__.__str__ = function () {return (new __PyStr__ (`<class 'UnboundLocalError'>`));}
__PyUnboundLocalError__.__name__ = new __PyStr__ ('UnboundLocalError');
__PyUnboundLocalError__.__call__ = function (msg) {return new __PyUnboundLocalError__ (msg);}


var __PyIndexError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyIndexError__;
}
__PyIndexError__.prototype = Object.create (__PyException__.prototype);
__PyIndexError__.__str__ = function () {return (new __PyStr__ (`<class 'IndexError'>`));}
__PyIndexError__.__name__ = new __PyStr__ ('IndexError');
__PyIndexError__.__call__ = function (msg) {return new __PyIndexError__ (msg);}


var __PyValueError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyValueError__;
}
__PyValueError__.prototype = Object.create (__PyException__.prototype);
__PyValueError__.__str__ = function () {return (new __PyStr__ (`<class 'ValueError'>`));}
__PyValueError__.__name__ = new __PyStr__ ('ValueError');
__PyValueError__.__call__ = function (msg) {return new __PyValueError__ (msg);}


var __PyZeroDivisionError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyZeroDivisionError__;
}
__PyZeroDivisionError__.prototype = Object.create (__PyException__.prototype);
__PyZeroDivisionError__.__str__ = function () {return (new __PyStr__ (`<class 'ZeroDivisionError'>`));}
__PyZeroDivisionError__.__name__ = new __PyStr__ ('ZeroDivisionError');
__PyZeroDivisionError__.__call__ = function (msg) {return new __PyZeroDivisionError__ (msg);}


var __PyAttributeError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyAttributeError__;
}
__PyAttributeError__.prototype = Object.create (__PyException__.prototype);
__PyAttributeError__.__str__ = function () {return (new __PyStr__ (`<class 'AttributeError'>`));}
__PyAttributeError__.__name__ = new __PyStr__ ('AttributeError');
__PyAttributeError__.__call__ = function (msg) {return new __PyAttributeError__ (msg);}


var __PyModuleNotFoundError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyModuleNotFoundError__;
}
__PyModuleNotFoundError__.prototype = Object.create (__PyException__.prototype);
__PyModuleNotFoundError__.__str__ = function () {return (new __PyStr__ (`<class 'ModuleNotFoundError'>`));}
__PyModuleNotFoundError__.__name__ = new __PyStr__ ('ModuleNotFoundError');
__PyModuleNotFoundError__.__call__ = function (msg) {return new __PyModuleNotFoundError__ (msg);}


var __PyKeyError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyNameError__;
}
__PyKeyError__.prototype = Object.create (__PyException__.prototype);
__PyKeyError__.__str__ = function () {return (new __PyStr__ (`<class 'KeyError'>`));}
__PyKeyError__.__name__ = new __PyStr__ ('KeyError');
__PyKeyError__.__call__ = function (msg) {return new __PyNameError__ (msg);}
var __PyFunction__ = function (name, posargs, defaults, f) {
	__PyObject__.call (this);
	this.fvalue = f;
	this.__name__ = new __PyStr__ (name);
	this.__class__ = __PyFunction__;
	this.__defaults__ = defaults;
	this.__posargs__ = posargs;
}
__PyFunction__.prototype = Object.assign (__PyFunction__.prototype, __PyObject__.prototype);
__PyFunction__.__call__ = function (name, f) {return new __PyFunction__ (f);}
__PyFunction__.__str__ = function () {return (new __PyStr__ (`<class 'function'>`));}

__PyFunction__.prototype.__str__ = function () {
	return this.__name__;
};
__PyFunction__.prototype.__call__ = function () {
	if (arguments.length < this.__posargs__.length - this.__defaults__.length
		|| arguments.length > this.__posargs__.length
	) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (
			`${this.__name__}() takes ${this.__posargs__.length} positional arguments`
		);
	}
	return this.fvalue.apply (null, arguments);
}
__PyFunction__.prototype.__hash__ = function () {return 'function' + String (this.__uniqueid__);}
var __PySlice__ = function (lower, upper, step) {
	__PyObject__.call (this);
	this.lower = lower;
	this.upper = upper;
	this.step = step;

	this.__class__ = __PySlice__;
}
__PySlice__.prototype = Object.create (__PyObject__.prototype);
__PySlice__.__class__ = __PyType__;
__PySlice__.__name__ = new __PyStr__ ('slice');
__PySlice__.__str__ = function () {return (new __PyStr__ (`<class 'slice'>`));}

__PySlice__.__call__ = function (lower, upper, step) {
	let l, u, s;
	if (! ((lower instanceof __PyNoneType__) || (lower instanceof __PyInt__))
	|| ! ((upper instanceof __PyNoneType__) || (upper instanceof __PyInt__))
	|| ! ((step instanceof __PyNoneType__) || (step instanceof __PyInt__)) ) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`slice indices must be integers or None`);
	}
	if (lower === __PyNone__) {l = 0;}
	else {l = lower.x;}
	if (upper === __PyNone__) {u = 10000000000;}
	else {u = upper.x;}
	if (step === __PyNone__) {s = 1;}
	else {
		s = step.x;
		if (s == 0) {
			__callstack__ = new Error ().stack; throw new __PyValueError__ (`slice step cannot be zero`);
		}
	}

	return (new __PySlice__ (l, u, s));
}

__PySlice__.prototype.__str__ = function () {
	let ret = 'slice (' + this.lower + ', ' + this.upper + ', ' + this.step + ')';
	return new __PyStr__ (ret);
}
function __uadd__ (a) {
	if ('__pos__' in a) {
		return a.__pos__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`bad operand type for unary +: '${a.__class__.__name__}'`);
}
function __usub__ (a) {
	if ('__neg__' in a) {
		return a.__neg__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`bad operand type for unary -: '${a.__class__.__name__}'`);
}
function __add__ (a, b) {
	if ('__add__' in a) {
		let ret = a.__add__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__radd__' in b) {
				let ret = b.__radd__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	__callstack__ = new Error ().stack; throw __unsupportedbinaryop__ ('+', a, b);
}
function __sub__ (a, b) {
	if ('__sub__' in a) {
		let ret =  a.__sub__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__rsub__' in b) {
				let ret = b.__rsub__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	__callstack__ = new Error ().stack; throw __unsupportedbinaryop__ ('-', a, b);
}
function __mul__ (a, b) {
	if ('__mul__' in a) {
		let ret =  a.__mul__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__rmul__' in b) {
				let ret = b.__rmul__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	__callstack__ = new Error ().stack; throw __unsupportedbinaryop__ ('*', a, b);
}
function __div__ (a, b) {
	if ('__div__' in a) {
		let ret =  a.__div__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__rdiv__' in b) {
				let ret = b.__rdiv__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	__callstack__ = new Error ().stack; throw __unsupportedbinaryop__ ('/', a, b);
}
function __iadd__ (a, b) {
	if ('__iadd__' in a) {
		return a.__iadd__ (b);
	}
	return __add__ (a, b);
}
function __imul__ (a, b) {
	if ('__imul__' in a) {
		return a.__imul__ (b);
	}
	return __mul__ (a, b);
}
function __isub__ (a, b) {
	if ('__isub__' in a) {
		return a.__isub__ (b);
	}
	return __sub__ (a, b);
}
function __idiv__ (a, b) {
	if ('__idiv__' in a) {
		return a.__idiv__ (b);
	}
	return __div__ (a, b);
}
function __index__ (i) {
	if ('__index__' in i) {
		return i.__index__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyAttributeError__ (`'${i.__class__.__name__}' object has no attribute '__index__'`)
}
function __int__ (i) {
	if ('__int__' in i) {return i.__int__ ();}
		__callstack__ = new Error ().stack; throw new __PyAttributeError__ (`'${i.__class__.__name__}' object has no attribute '__float__'`)
}
function __float__ (i) {
	if ('__float__' in i) {return i.__float__ ();}
	__callstack__ = new Error ().stack; throw new __PyAttributeError__ (`'${i.__class__.__name__}' object has no attribute '__float__'`)
}
function __mod__ (a, b) {
	if ('__mod__' in a) {
		return a.__mod__ (b);
	}
}
function __gt__ (a, b) {
	let ret = a.__gt__ (b);
	if (ret === __PyNotImplemented__) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'>' not supported between instances of '${a.__class__.__name__}' and '${b.__class__.__name__}'`);
	}
	return ret;
}
function __ge__ (a, b) {
	let ret = a.__ge__ (b);
	if (ret === __PyNotImplemented__) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'>=' not supported between instances of '${a.__class__.__name__}' and '${b.__class__.__name__}'`);
	}
	return ret;
}
function __lt__ (a, b) {
	let ret = a.__lt__ (b);
	if (ret === __PyNotImplemented__) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'<' not supported between instances of '${a.__class__.__name__}' and '${b.__class__.__name__}'`);
	}
	return ret;
}
function __le__ (a, b) {
	let ret = a.__le__ (b);
	if (ret === __PyNotImplemented__) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'<=' not supported between instances of '${a.__class__.__name__}' and '${b.__class__.__name__}'`);
	}
	return ret;
}
function __eq__ (a, b) {
	let ret = a.__eq__ (b);
	if (ret === __PyNotImplemented__) {
		return __PyFalse__;
	}
	return ret;
}
function __neq__ (a, b) {
	let ret = a.__neq__ (b);
	if (ret === __PyNotImplemented__) {
		return __PyFalse__;
	}
	return ret;
}
function __is__ (a, b) {return __getbool__ (a === b);}
function __isnot__ (a, b) {return __getbool__ (a !== b);}

function __getitem__ (l, i) {
	if ('__getitem__' in l) {
		return l.__getitem__ (i);
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${l.__class__.__name__}' object is not subscriptable`)
}
function __setitem__ (l, i, v) {
	if ('__setitem__' in l) {
		return l.__setitem__ (i, v);
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${l.__class__.__name__}' object does not support item assignment`)
}
function __call__ (f) {
    if ('__call__' in f) {
		let ret = f.__call__;
		ret.bind (f);
		return f.__call__.bind (f);
    }
    __callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${f.__class__.__name__}' object is not callable`)
}
function __iter__ (o) {
	if ('__iter__' in o) {
		return o.__iter__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${o.__class__.__name__}' object is not iterable`);
}
function __raise__ (o) {
	if (o instanceof __PyBaseException__) {__callstack__ = new Error ().stack; throw o;}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`exceptions must derive from BaseException`);
}
function __isinstance__ (v, t) {
	if (t.__class__ !== __PyType__) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`isinstance() arg 2 must be a type`);
	}
	return __getbool__ (v instanceof t);
}
function __isexception__ (e) {
		if (e instanceof __PyBaseException__) {return true;}
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`catching classes that do not inherit from BaseException is not allowed`);
}
// function __catch__ (e, c) {
// 	try {
// 		if (e instanceof c) {
// 			return true;
// 		}
// 		return false;
// 	}
// 	catch (e) {
// 		__callstack__ = new Error ().stack; throw new __PyTypeError__
// 	}
// }

function __getfuncscope__ (parscope, __globalvars__, __localvars__) {
	return new Proxy ({__parscope__ : parscope}, {
		get (target, key, recv) {
			if (key in __localvars__) {
				if (key in target) {
					return target[key];
				}
				__callstack__ = new Error ().stack; throw new __PyUnboundLocalError__ (`name '${key}' referenced before assginment`);
			} else if (! (key in target)) {
				return target['__parscope__'][key];
			}
			return target[key];
		},
		set (target, key, value, recv) {
			if (key in __globalvars__) {
				target['__parscope__'][key] = value;
			} else {
				target[key] = value;
			}
	}});
}

function __in__ (v, c) {
	if ('__contains__' in c) {
		return c.__contains__ (v);
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`argument of type '${this.__class__.__name__}' is not iterable`);
}
function __not__ (x) {
	return __getbool__ (x.__bool__ () !== __PyTrue__);
}
function __notin__ (v, c) {
	if ('__contains__' in c) {
		if (c.__contains__ (v)) {
			return __PyFalse__;
		}
	}
	return __PyTrue__;
}
var __PyFloat__ = function (x) {
	__PyObject__.call (this);
	this.x = parseFloat (x);
	this.__class__ = __PyFloat__;
}
__PyFloat__.prototype = Object.assign (__PyFloat__.prototype, __PyObject__.prototype);
__PyFloat__.__class__ = __PyType__;
__PyFloat__.__name__ = new __PyStr__ ('float');
__PyFloat__.__str__ = function () {return (new __PyStr__ (`<class 'float'>`));}
__PyFloat__.__call__ = function (x) {
	if (x instanceof __PyFloat__) {
		return x;
	} else if (x instanceof __PyStr__) {
		let n = Number (x.x);
		if (isNaN (n)) {
			__callstack__ = new Error ().stack; throw new __PyValueError__ (`could not convert string to float: '${x.x}'`);
		}
		return (new __PyFloat__ (n));
	} else {
		try {
			return __float__ (x);
		} catch (e) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`float() argument must be a string, a bytes-like object or a number, not '${x.__class__.__name__}'`);
		}
	}
}
__PyFloat__.__str__ = function () {return (new __PyStr__ (`<class 'float'>`));}
__PyFloat__.prototype.__str__ = function () {return (new __PyStr__ (this.x));}
__PyFloat__.prototype.__int__ = function () {return (new __PyInt__ (this.x));};
__PyFloat__.prototype.__float__ = function () {return this;};
__PyFloat__.prototype.__pos__ = function () {return this;};
__PyFloat__.prototype.__neg__ = function () {
	return (new __PyFloat__ (-this.x));
};
__PyFloat__.prototype.__add__ = function (other) {
	if (other instanceof __PyFloat__ || other instanceof __PyInt__) {
		return new __PyFloat__ (this.x + other.x);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__sub__ = function (other) {
	if (other instanceof __PyFloat__ || other instanceof __PyInt__) {
		return new __PyFloat__ (this.x - other.x);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__div__ = function (other) {
	if (other instanceof __PyFloat__ || other instanceof __PyInt__) {
		return new __PyFloat__ (this.x / other.x);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__mul__ = function (other) {
	if (other instanceof __PyFloat__ || other instanceof __PyInt__) {
		return new __PyFloat__ (this.x * other.x);
	}
	return __PyNotImplemented__;
}

__PyFloat__.prototype.__radd__ = __PyFloat__.prototype.__add__;
__PyFloat__.prototype.__rsub__ = __PyFloat__.prototype.__sub__;
__PyFloat__.prototype.__rmul__ = __PyFloat__.prototype.__mul__;
__PyFloat__.prototype.__rdiv__ = __PyFloat__.prototype.__div__;

__PyFloat__.prototype.__le__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x <= other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__lt__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x < other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__ge__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x >= other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__gt__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x > other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__eq__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x == other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__hash__ = function () {return 'float' + String (this.x);}
var __PyDict__ = function (keys, values) {
	__PyObject__.call (this);
	this.keys = keys;
	this.values = values;
	this.__class__ = __PyDict__;
	this.__dict__ = {
		'items' : __PyDict__.prototype.items.bind (this),
		'keys' : __PyDict__.prototype.keys.bind (this),
		'values' : __PyDict__.prototype.values.bind (this),
		'clear' : __PyDict__.prototype.clear.bind (this),
		'items' : __PyDict__.prototype.items.bind (this),
		'pop' : __PyDict__.prototype.pop.bind (this),
	};
	this.dict = {};
}

__PyDict__.__class__ = __PyType__;
__PyDict__.__name__ = new __PyStr__ (`dict`);
__PyDict__.__str__ = function () {return new __PyStr__ (`<class 'dict'>`);}
__PyDict__.__call__ = function (x) {
	return new __PyDict__ ([]);
}
__PyDict__.prototype = Object.create (__PyObject__.prototype);

__PyDict__.prototype.__getitem__ = function (x) {
	if (!('__hash__' in x)) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`unhashable type: ${x.__class__.__name__}`);
	}
	if (x.__hash__ () in this.dict) {
		return this.dict[x.__hash__ ()];
	}
	__callstack__ = new Error ().stack; throw new __PyKeyError__ (`${x.__str__ ()}`);
}
__PyDict__.prototype.__setitem__ = function (x, v) {
	if (!('__hash__' in x)) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`unhashable type: ${x.__class__.__name__}`);
	}
	this.keys.push (x);
	this.values.push (v);
	this.dict[x.__hash__ ()] = v;
	return __PyNone__;
}
__PyDict__.prototype.__str__ = function () {
	let n = this.keys.length;
	let ret = '{';
	for (let i = 0; i < n; i++) {
		let el = [this.keys[i], this.values[i]];
		ret += el[0].__str__ ().toString () + ' : ' + el[1].__str__ ().toString ();
		ret += ', '
	}
	ret += '}';
	return new __PyStr__ (ret);
};
__PyDict__.prototype.__len__ = function () {
	return new __PyInt__ (this.keys.length);
}
__PyDict__.prototype.__contains__ = function (x) {
	if (! ('__hash__' in x)) {
		__callstack__ = new Error ().stack; throw new __PyType__ (`unhashable type: ${x.__class__.__name__}`);
	}
	return __getbool__ (x.__hash__ () in this.dict);
}
__PyDict__.prototype.__iter__ = function * () {
	for (let x of this.keys) {
		yield x;
	}
}

// API
__PyDict__.prototype.keys = function () {
	return new __PyList__ (this.keys);
}
__PyDict__.prototype.values = function () {
	return new __PyList__ (this.values);
}
__PyDict__.prototype.clear = function () {
	this.keys = [];
	this.values = [];
	this.dict = {}
	return __PyNone__;
}
__PyDict__.prototype.items = function () {
	let n = this.keys.length, l = [];
	for (let i = 0; i < n; i++) {
		l.push (new __PyTuple__ ([this.keys[i], this.values[i]]));
	}
	return new __PyList__ (l);
}
__PyDict__.prototype.pop = function (k) {
	for (let i = 0; i < n; i++) {
		if (__getjsbool__ (__eq__ (this.keys[i], k))) {
			let ret = this.values[i];
			this.keys.splice (i, 1);
			this.values.splice (i, 1);

			return ret;
		}
	}
	__callstack__ = new Error ().stack; throw new __PyKeyError__ (`${k.__class__.__name__}`);
}
var __PyTuple__ = function (t) {
	__PyObject__.call (this);
	this.t = t;
	this.__size__ = new __PyInt__ (t.length);
	this.__class__ = __PyTuple__;
}
__PyTuple__.prototype = Object.assign (__PyTuple__.prototype, __PyObject__.prototype);
__PyTuple__.__class__ = __PyType__;
__PyTuple__.__name__ = new __PyStr__ ('tuple');
__PyTuple__.__str__ = function () {return (new __PyStr__ (`<class 'tuple'>`));}
__PyTuple__.__call__ = function (t) {return new __PyTuple__ (t);}

__PyTuple__.prototype.__len__ = function () {return this.__size__;}
__PyTuple__.prototype.__getitem__ = function (i) {
	if (! (i instanceof __PyInt__)) {
		__callstack__ = new Error ().stack; throw new TypeError (`tuple indices must be integers, not ${i.__class__.__name__}`);
	}
	if (__lt__ (i, __zero__) === __PyTrue__) {
		i = i.__add__ (this.__len__ ());
	}
	if (__ge__ (i, this.__len__ ()) === __PyTrue__ ||
		__lt__ (i, __zero__) === __PyTrue__) {
		__callstack__ = new Error ().stack; throw new IndexError (`tuple index out of range`);
	}
	return this.t[i.x];
}
__PyTuple__.prototype.__add__ = function (other) {
	if (other instanceof __PyTuple__) {
		return (new __PyTuple__ (this.t.concat (other.t)));
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`can only concatenate tuple (not "${other.__class__.__name__}") to tuple`)
}
__PyTuple__.prototype.__str__ = function () {
	let ret = '('
	for (let x = 0; x < this.t.length-1; x++) {
		ret += this.t[x].__str__().toString ();
		ret += ', ';
	}
	ret += this.t[this.t.length -1].__str__ ().toString ();
	ret += ')'

	return (new __PyStr__ (ret));
}
__PyTuple__.prototype.__iter__ = function * () {
	for (let x of this.t) {
		yield x;
	}
}
var __PyInt__ = function (x) {
	__PyObject__.call (this);
	this.x = parseInt (x);
	this.__class__ = __PyInt__;
}
__PyInt__.prototype = Object.create (__PyObject__.prototype);

__PyInt__.__call__ = function (x) {
	if (x instanceof __PyInt__) {
		return x;
	} else if (x instanceof __PyStr__) {
		let n = Number (x.x);
		if (isNaN (n)) {
			__callstack__ = new Error ().stack; throw new __PyValueError__ (`invalid literal for int(): '${x.x}'`);
		}
		return (new __PyInt__ (n));
	} else {
		try {
			return __int__ (x);
		} catch (e) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`int() argument must be a string, a bytes-like object or a number, not '${x.__class__.__name__}'`);
		}
	}
}
__PyInt__.__class__ = __PyType__;
__PyInt__.__name__ = new __PyStr__ ('int');
__PyInt__.__str__ = function () {return (new __PyStr__ (`<class 'int'>`));}
__PyInt__.prototype.__int__ = function () {return this;}
__PyInt__.prototype.__index__ = function () {return this;}
__PyInt__.prototype.__float__ = function () {return (new __PyFloat__ (this.x));}
__PyInt__.prototype.__bool__ = function () {this.x == 0 ? __PyFalse__ : __PyTrue__;}
__PyInt__.prototype.__pos__ = function () {return this;};
__PyInt__.prototype.__neg__ = function () {return (new __PyInt__ (-this.x));};

__PyInt__.prototype.__mod__ = function (other) {
	if (other instanceof __PyInt__) {
		let ret = this.x % other.x;
		if (isNaN (ret)) {
			__callstack__ = new Error ().stack; throw new __PyZeroDivisionError__ (`integer division or modulo by zero`)
		}
		return new __PyInt__ (ret);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__add__ = function (other) {
	if (other instanceof __PyInt__) {
		return new __PyInt__ (this.x + other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__sub__ = function (other) {
	if (other instanceof __PyInt__) {
		return new __PyInt__ (this.x - other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__div__ = function (other) {
	if (other instanceof __PyInt__ || other instanceof __PyFloat__) {
		if (other.x == 0) {
			__callstack__ = new Error ().stack; throw new __PyZeroDivisionError__ ('float division by zero');
		}
		return new __PyFloat__ (this.x / other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__ ) {
		return new __PyInt__ (this.x * other.x);
	}
	return __PyNotImplemented__;
}

__PyInt__.prototype.__le__ = function (other) {
	if (other instanceof __PyInt__) {
		return __getbool__ (this.x <= other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__lt__ = function (other) {
	if (other instanceof __PyInt__) {
		return __getbool__ (this.x < other.x)
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__ge__ = function (other) {
	if (other instanceof __PyInt__) {
		return __getbool__ (this.x >= other.x)
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__gt__ = function (other) {
	if (other instanceof __PyInt__) {
		return __getbool__ (this.x > other.x)
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__eq__ = function (other) {
	if (other instanceof __PyInt__) {
		return __getbool__ (this.x == other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__str__ = function () {return (new __PyStr__ (this.x));}
__PyInt__.prototype.__hash__ = function () {return 'int' + String (this.x);}
let __zero__ = new __PyInt__ (0);
let __one__ = new __PyInt__ (1);
var __PyRange__ = function (start, stop, step = 1) {
	__PyObject__.call (this);
	this.start = start;
	this.stop = stop;
	this.step = step;
	this.__class__ = __PyRange__;
}
__PyRange__.prototype = Object.create (__PyRange__.prototype);
__PyRange__.__class__ = __PyType__;
__PyRange__.__name__ = new __PyStr__ ('range');
__PyRange__.__call__ = function () {
	if (arguments.length == 1) {
		let x = arguments[0];
		if (x instanceof __PyRange__) {
			return x;
		}
		else if (x instanceof __PyInt__) {
			return new __PyRange__ (0, x.x);
		}
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${x.__class__.__name__}' object cannot be interpreted as an integer`);
	}
	else if (arguments.length == 2) {
		let x = arguments[0], y = arguments[1];
		if (!(x instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${x.__class__.__name__}' object cannot be interpreted as an integer`);
		} else if (! (y instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${y.__class__.__name__}' object cannot be interpreted as an integer`);
		}
		return (new __PyRange__ (x.x, y.x));
	} else if (arguments.length == 3) {
		let x = arguments[0], y = arguments[1], z = arguments[2];
		if (!(x instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${x.__class__.__name__}' object cannot be interpreted as an integer`);
		} else if (! (y instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${y.__class__.__name__}' object cannot be interpreted as an integer`);
		} else if (! (z instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${z.__class__.__name__}' object cannot be interpreted as an integer`);
		}
		return (new __PyRange__ (x.x, y.x, z.x));
	}
}
__PyRange__.__name__ = new __PyStr__ ('range');
__PyRange__.prototype.__iter__ = function * () {
	for (let x = this.start; x < this.stop; x += this.step) {
		yield (new __PyInt__ (x));
	}
}
__PyRange__.prototype.__bool__  = function () {return __PyTrue__;}
__PyRange__.prototype.__str__ = function () {
	var s = `range(${this.start}, ${this.stop}, ${this.step})`;
	return (new __PyStr__ (s));
}
var __PyBool__ = function (x) {
	__PyInt__.call (this, x);
	this.__class__ = __PyBool__;
}
__PyBool__.prototype = Object.create (__PyInt__.prototype);
__PyBool__.__class__ = __PyType__;
__PyBool__.__call__ = function (x) {
	if ('__bool__' in x) {
		return x.__bool__ ();
	} else if ('__len__' in x) {
		let len = x.__len__ ();
		return (len.x == 0 ? __PyFalse__ : __PyTrue__);
	}
	return __PyFalse__;
}
__PyBool__.__name__ = new __PyStr__ ('bool');
__PyBool__.__str__ = function () {return (new __PyStr__ (`<class 'bool'>`));}
__PyBool__.prototype.valueOf = function () {return this.x == true;}
__PyBool__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x ? "True" : "False"));
}
__PyBool__.prototype.__int__ = function () {
	return this.x ? (new __PyInt__ (1)) : (new __PyInt__ (0));
}
__PyBool__.prototype.__bool__ = function () {return this;}
__PyBool__.prototype.__index__ = function () {return this.__int__();}

__PyBool__.prototype.__and__ = function (other) {
	var other = other.__bool__ ()
	return __getbool__ (this.x && other.x);
}
__PyBool__.prototype.__or__ = function (other) {
	var other = other.__bool__ ();
	return __getbool__ (this.x || other.x);
}

function __getbool__ (x) {return (x == true) ? __PyTrue__ : __PyFalse__;}
function __getjsbool__ (x) {return x.__bool__ () === __PyTrue__;}
const __PyTrue__ = new __PyBool__ (1);
const __PyFalse__ = new __PyBool__ (0);
var __PyModule__ = function (name, dict) {
	__PyObject__.call (this);
	this.__name__ = name;
	this.__dict__ = dict;
}
__PyModule__.__class__ = __PyType__;
__PyModule__.__name__ = new __PyStr__ ('module');
__PyModule__.__str__ = function () {return (new __PyStr__ (`<class 'module'>`));}

__PyModule__.prototype = Object.create (__PyObject__.prototype);
__PyModule__.prototype.__getattr__ = function (x) {
	if (! (x in this.__dict__)) {
		__callstack__ = new Error ().stack; throw new __PyAttributeError__ (`${x} not in module`);
	}
	return this.__dict__[x];
}
__PyModule__.prototype.__setattr__ = function (x, y) {
	this.__dict__[x] = y;
	return __PyNone__;
}

__PyModule__.prototype.__str__ = function () {return new __PyStr__ (`<module '${this.__name__}'>`);}
var __PyList__ = function (l) {
	__PyObject__.call (this);
	this.l = l;
	this.__class__ = __PyList__;
	this.__dict__ = {'append' : __PyList__.prototype.append.bind (this),
		'append' : __PyList__.prototype.append.bind (this),
		'pop' : __PyList__.prototype.pop.bind (this),
		'clear' : __PyList__.prototype.clear.bind (this),
		'reverse' : __PyList__.prototype.reverse.bind (this),
		'copy' : __PyList__.prototype.copy.bind (this),
	}
}
__PyList__.prototype = Object.assign (__PyList__.prototype, __PyObject__.prototype);
__PyList__.__class__ = __PyType__;
__PyList__.__name__ = new __PyStr__ ('list');
__PyList__.__str__ = function () {return (new __PyStr__ (`<class 'list'>`));}
__PyList__.__call__ = function (l) {return new __PyList__ (l);}
__PyList__.prototype.__getitem__ = function (i) {
	if (!((i instanceof __PyInt__) || (i instanceof __PySlice__))) {
		__callstack__ = new Error ().stack; throw new TypeError (`list indices must be integers or slices, not ${i.__class__.__name__}`);
	}
	if (i instanceof __PySlice__) {
		let m = Math.min (i.upper, this.l.length);
		let ret = [];
		for (let id = i.lower; id < m; id+=i.step) {
			ret.push (this.l[id]);
		}
		return (new __PyList__ (ret));
	}
	var n = i.x;
	if (n < 0) {n += this.l.length;}
	if (n >= 0 && n < this.l.length) {
		return this.l[n];
	}
	__callstack__ = new Error ().stack; throw new IndexError (`list index out of range`);
}
__PyList__.prototype.__setitem__ = function (i, val) {
	if (!(i instanceof __PyInt__)) {
		__callstack__ = new Error ().stack; throw new TypeError (`list indices must be integers, not ${i.__class__.__name__}`);
	}
	var n = i.x;
	if (n < 0) {n += this.l.length;}
	if (n >= 0 && n < this.l.length) {
		this.l[n] = val;
	} else {
		__callstack__ = new Error ().stack; throw new IndexError (`list index out of range`);
	}
}
__PyList__.prototype.__len__ = function () {return new __PyInt__ (this.l.length);}
__PyList__.prototype.__str__ = function () {
	var ret = '[';
	for (let i = 0; i < this.l.length - 1; i++) {
		ret += this.l[i].__str__ ().toString ();
		ret += ', '
	}
	if (this.l.length > 0) {
		ret += this.l[this.l.length - 1].__str__ ().toString ();
	}
	ret += ']'
	return (new __PyStr__ (ret));
}
__PyList__.prototype.__add__ = function (other) {
	if (other instanceof __PyList__) {
		return new __PyList__ (this.l.concat (other.l));
	}
	return __PyNotImplemented__;
}
__PyList__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__) {
		let ret = [];
		for (let x = 0; x < other.x; x++) {
			ret = ret.concat (this.l);
		}
		return new __PyList__ (ret);
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (
		`cant't muliply list by non-int of type '${other.__class__.__name__}'`
	);
}

__PyList__.prototype.__iadd__ = function (l) {
	if (l instanceof __PyList__) {
		this.l = this.l.concat (l.l);
		return this;
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${l.__class__.__name__}' object is not iterable`);
}
__PyList__.prototype.__imul__ = function (other) {
	if (other instanceof __PyInt__) {
		for (let x = 1; x < other.x; x++) {
			this.l = this.l.concat (this.l);
		}
		return this;
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (
		`cant't muliply list by non-int of type '${other.__class__.__name__}'`
	);
}

__PyList__.prototype.__radd__ = __PyList__.prototype.__add__;
__PyList__.prototype.__rmul__ = __PyList__.prototype.__mul__;

__PyList__.prototype.__iter__ = function * () {
	for (let x of this.l) {
		yield x;
	}
}
__PyList__.prototype.__contains__ = function (x) {
	for (let el of l) {
		if (__getjsbool__ (__eq__ (x, el))) {
			return __PyTrue__;
		}
	}
	return __PyFalse__;
}

// API
__PyList__.prototype.append = function (x) {this.l.push (x); return __PyNone__;}
__PyList__.prototype.pop = function (x) {return this.l.pop();}
__PyList__.prototype.clear = function (x) {this.l = []; return __PyNone__;}
__PyList__.prototype.reverse = function (x) {this.l.reverse (); return __PyNone__;}
__PyList__.prototype.copy = function (x) {return new __PyList__ (this.l.slice ());}
// <builtin print>
var print = new __PyFunction__ (new __PyStr__ ('print'), [], [], function (x) {
	console.log (x.__str__().toString ());
	return __PyNone__;
});
print.__call__ = function () {
	for (let x of arguments) {
		console.log (x.__str__ ().toString ());
	}
}
var range = new __PyFunction__ (new __PyStr__ ('range'), function (start, end, step) {
	return (new __PyRange__ (start, end, step));
});

var len = new __PyFunction__ (new __PyStr__ ('len'), [], [], function (x) {
	if ('__len__' in x) {
		return x.__len__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`TypeError: object of type '${x.__class__.__name__}' has no len()`)
});
len.__call__ = function (x) {
	if (arguments.length != 1) {
		__callstack__ = new Error ().stack; throw (new __PyTypeError__ (`
			len() takes exactly one argument (${arguments.length} given)
			`))
	}
	if ('__len__' in x) {
		return x.__len__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`TypeError: object of type '${x.__class__.__name__}' has no len()`)
}
var __PyNotImplementedType__ = function () {
	this.__class__ = __PyNotImplementedType__;
	this.__name__ = new __PyStr__ ('NotImplemented');
}
__PyNotImplementedType__.prototype.__str__ = function () {return this.__name__;}

const __PyNotImplemented__ = new __PyNotImplementedType__ ();
