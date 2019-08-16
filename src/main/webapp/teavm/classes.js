"use strict";
var main;
(function() {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_createArray(cls, sz) {
    var data = new Array(sz);
    var arr = new $rt_array(cls, data);
    if (sz > 0) {
        var i = 0;
        do  {
            data[i] = null;
            i = i + 1 | 0;
        }while (i < sz);
    }
    return arr;
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new Array(sz));
}
function $rt_createLongArray(sz) {
    var data = new Array(sz);
    var arr = new $rt_array($rt_longcls(), data);
    for (var i = 0;i < sz;i = i + 1 | 0) {
        data[i] = Long_ZERO;
    }
    return arr;
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new Uint16Array(sz));
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new Int8Array(sz));
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new Int16Array(sz));
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new Int32Array(sz));
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new Int8Array(sz));
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new Float32Array(sz));
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new Float64Array(sz));
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        err = new Error("Java exception thrown");
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_objcls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && isNaN(value)) {
        throw "NaN";
    }
    return value;
}
var $rt_stdoutBuffer = "";
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.info($rt_stdoutBuffer);
        }
        $rt_stdoutBuffer = "";
    } else {
        $rt_stdoutBuffer += String.fromCharCode(ch);
    }
};
var $rt_stderrBuffer = "";
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.error($rt_stderrBuffer);
        }
        $rt_stderrBuffer = "";
    } else {
        $rt_stderrBuffer += String.fromCharCode(ch);
    }
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_threadStarter(f) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new DataView(new ArrayBuffer(8));
function $rt_doubleToLongBits(n) {
    $rt_numberConversionView.setFloat64(0, n, true);
    return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
}
function $rt_longBitsToDouble(n) {
    $rt_numberConversionView.setInt32(0, n.lo, true);
    $rt_numberConversionView.setInt32(4, n.hi, true);
    return $rt_numberConversionView.getFloat64(0, true);
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
function $rt_javaException(e) {
    return e instanceof Error && typeof e.$javaException === 'object' ? e.$javaException : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err.$javaException;
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
Long.prototype.toString = function() {
    var result = [];
    var n = this;
    var positive = Long_isPositive(n);
    if (!positive) {
        n = Long_neg(n);
    }
    var radix = new Long(10, 0);
    do  {
        var divRem = Long_divRem(n, radix);
        result.push(String.fromCharCode(48 + divRem[1].lo));
        n = divRem[0];
    }while (n.lo !== 0 || n.hi !== 0);
    result = (result.reverse()).join('');
    return positive ? result : "-" + result;
};
Long.prototype.valueOf = function() {
    return Long_toNumber(this);
};
var Long_ZERO = new Long(0, 0);
var Long_MAX_NORMAL = 1 << 18;
function Long_fromInt(val) {
    return val >= 0 ? new Long(val, 0) : new Long(val,  -1);
}
function Long_fromNumber(val) {
    if (val >= 0) {
        return new Long(val | 0, val / 0x100000000 | 0);
    } else {
        return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
    }
}
function Long_toNumber(val) {
    var lo = val.lo;
    var hi = val.hi;
    if (lo < 0) {
        lo += 0x100000000;
    }
    return 0x100000000 * hi + lo;
}
var $rt_imul = Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a / b | 0;
};
var $rt_umod = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a % b | 0;
};
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return null;
}
function $rt_setThread(t) {
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
var $java = Object.create(null);
function jl_Object() {
    this.$id$ = 0;
}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$1 = new jl_StringBuilder;
    var$1.$buffer = $rt_createCharArray(16);
    var$1 = jl_StringBuilder_append(jl_StringBuilder_append(var$1, jl_Class_getName(jl_Object_getClass($this))), $rt_s(0));
    var$2 = jl_Object_identity($this);
    if (!var$2)
        var$3 = $rt_s(1);
    else {
        if (!var$2)
            var$4 = 32;
        else {
            var$5 = 0;
            var$4 = var$2 >>> 16;
            if (var$4)
                var$5 = 16;
            else
                var$4 = var$2;
            var$6 = var$4 >>> 8;
            if (!var$6)
                var$6 = var$4;
            else
                var$5 = var$5 | 8;
            var$4 = var$6 >>> 4;
            if (!var$4)
                var$4 = var$6;
            else
                var$5 = var$5 | 4;
            var$6 = var$4 >>> 2;
            if (!var$6)
                var$6 = var$4;
            else
                var$5 = var$5 | 2;
            if (var$6 >>> 1)
                var$5 = var$5 | 1;
            var$4 = (32 - var$5 | 0) - 1 | 0;
        }
        var$4 = (((32 - var$4 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$7 = $rt_createCharArray(var$4);
        var$8 = var$7.data;
        var$6 = (var$4 - 1 | 0) * 4 | 0;
        var$9 = 0;
        while (var$6 >= 0) {
            var$10 = var$9 + 1 | 0;
            var$5 = var$2 >>> var$6 & 15;
            var$8[var$9] = var$5 >= 16 ? 0 : var$5 < 10 ? (48 + var$5 | 0) & 65535 : ((97 + var$5 | 0) - 10 | 0) & 65535;
            var$6 = var$6 - 4 | 0;
            var$9 = var$10;
        }
        var$3 = jl_String__init_(var$7);
    }
    return jl_StringBuilder_toString(jl_StringBuilder_append(var$1, var$3));
}
function jl_Object_identity($this) {
    var $platformThis, var$2;
    $platformThis = $this;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return $this.$id$;
}
function ovnc_Client() {
    jl_Object.call(this);
}
var ovnc_Client_i = 0;
function ovnc_Client_main($args) {
    var var$2, var$3;
    ovnc_Client__clinit_();
    jl_String__clinit_();
    jl_Integer__clinit_();
    jl_Character__clinit_();
    var$2 = new ovnc_Client$main$lambda$_1_0;
    var$3 = new ovnc_CustomElement$registerCustomComponent$lambda$_1_0;
    var$3.$_0 = var$2;
    window.registerCustomElement("v-commander", otji_JS_function(var$3, "create"));
}
function ovnc_Client__clinit_() {
    ovnc_Client_i = 0;
}
function jlr_AnnotatedElement() {
}
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
function jl_Class_getClass($cls) {
    var $result, var$3;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null) {
        $result = new jl_Class;
        $result.$platformClass = $cls;
        var$3 = $result;
        $cls.classObject = var$3;
    }
    return $result;
}
function jl_Class_getName($this) {
    if ($this.$name === null)
        $this.$name = $rt_str($this.$platformClass.$meta.name);
    return $this.$name;
}
function otji_JS() {
    jl_Object.call(this);
}
function otji_JS_function(var$1, var$2) {
    var name = 'jso$functor$' + var$2;
    if (!var$1[name]) {
        var fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        var$1[name] = function() {
            return fn;
        };
    }
    return var$1[name]();
}
function otji_JS_functionAsObject(var$1, var$2) {
    if (typeof var$1 !== "function") return var$1;
    var result = {};
    result[var$2] = var$1;
    return result;
}
function otp_Platform() {
    jl_Object.call(this);
}
function ji_Serializable() {
}
function jl_Comparable() {
}
function jl_CharSequence() {
}
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
}
function jl_String__init_0($this, $characters) {
    var var$2, $i;
    $characters = $characters.data;
    var$2 = $characters.length;
    $this.$characters = $rt_createCharArray(var$2);
    $i = 0;
    while ($i < var$2) {
        $this.$characters.data[$i] = $characters[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String_charAt($this, $index) {
    if ($index >= 0 && $index < $this.$characters.data.length)
        return $this.$characters.data[$index];
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_isEmpty($this) {
    return $this.$characters.data.length ? 0 : 1;
}
function jl_String_equals($this, $other) {
    var $str, $i;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    if (jl_String_length($str) != jl_String_length($this))
        return 0;
    $i = 0;
    while ($i < jl_String_length($str)) {
        if (jl_String_charAt($this, $i) != jl_String_charAt($str, $i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    a: {
        if (!$this.$hashCode) {
            var$1 = $this.$characters.data;
            var$2 = var$1.length;
            var$3 = 0;
            while (true) {
                if (var$3 >= var$2)
                    break a;
                $c = var$1[var$3];
                $this.$hashCode = (31 * $this.$hashCode | 0) + $c | 0;
                var$3 = var$3 + 1 | 0;
            }
        }
    }
    return $this.$hashCode;
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_81_0;
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
function jl_Error() {
    jl_Throwable.call(this);
}
function jl_LinkageError() {
    jl_Error.call(this);
}
function jl_NoClassDefFoundError() {
    jl_LinkageError.call(this);
}
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
function jl_Appendable() {
}
function jl_StringBuilder() {
    jl_AbstractStringBuilder.call(this);
}
function jl_StringBuilder_append($this, $string) {
    jl_StringBuilder_insert($this, $this.$length0, $string);
    return $this;
}
function jl_StringBuilder_insert($this, $index, $string) {
    var var$3, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        a: {
            if ($string === null)
                $string = $rt_s(2);
            else if (jl_String_isEmpty($string))
                break a;
            jl_StringBuilder_ensureCapacity($this, $this.$length0 + jl_String_length($string) | 0);
            var$3 = $this.$length0 - 1 | 0;
            while (var$3 >= $index) {
                $this.$buffer.data[var$3 + jl_String_length($string) | 0] = $this.$buffer.data[var$3];
                var$3 = var$3 + (-1) | 0;
            }
            $this.$length0 = $this.$length0 + jl_String_length($string) | 0;
            var$3 = 0;
            while (var$3 < jl_String_length($string)) {
                var$4 = $this.$buffer.data;
                var$5 = $index + 1 | 0;
                var$4[$index] = jl_String_charAt($string, var$3);
                var$3 = var$3 + 1 | 0;
                $index = var$5;
            }
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_StringBuilder_toString($this) {
    var var$1, var$2, var$3, var$4, var$5;
    var$1 = new jl_String;
    var$2 = $this.$buffer;
    var$3 = $this.$length0;
    var$1.$characters = $rt_createCharArray(var$3);
    var$4 = 0;
    while (var$4 < var$3) {
        var$5 = var$2.data;
        var$1.$characters.data[var$4] = var$5[var$4 + 0 | 0];
        var$4 = var$4 + 1 | 0;
    }
    return var$1;
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    var var$2, var$3, var$4, var$5;
    if ($this.$buffer.data.length < var$1) {
        var$1 = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max(var$1, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
        var$2 = $this.$buffer.data;
        var$3 = $rt_createCharArray(var$1);
        var$4 = var$2.length;
        if (var$1 < var$4)
            var$4 = var$1;
        var$5 = var$3.data;
        var$1 = 0;
        while (var$1 < var$4) {
            var$5[var$1] = var$2[var$1];
            var$1 = var$1 + 1 | 0;
        }
        $this.$buffer = var$3;
    }
}
function jl_StringBuilder_insert0($this, var$1, var$2) {
    return jl_StringBuilder_insert($this, var$1, var$2);
}
function jl_Number() {
    jl_Object.call(this);
}
function jl_Integer() {
    jl_Number.call(this);
}
var jl_Integer_TYPE = null;
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
function jl_IncompatibleClassChangeError() {
    jl_LinkageError.call(this);
}
function jl_IncompatibleClassChangeError__init_(var_0) {
    var var_1 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_0(var_1, var_0);
    return var_1;
}
function jl_IncompatibleClassChangeError__init_0($this, $message) {
    jl_Throwable__init_0($this, $message);
}
function jl_NoSuchFieldError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchFieldError__init_(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
function jl_NoSuchMethodError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
function jl_Exception() {
    jl_Throwable.call(this);
}
function jl_RuntimeException() {
    jl_Exception.call(this);
}
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_0($this, $message) {
    jl_Throwable__init_0($this, $message);
}
function ovnc_CustomElement() {
    jl_Object.call(this);
    this.$jsInstance = null;
}
function ovnc_CustomElement_getElement($this) {
    return $this.$jsInstance;
}
function ovncv_VCommander() {
    ovnc_CustomElement.call(this);
}
function ovncv_VCommander_init($this) {
    var var$1, var$2;
    var$1 = $this.$jsInstance;
    var$2 = "VCommnader web component test";
    var$1.innerHTML = var$2;
}
function juf_Supplier() {
}
function ovnc_Client$main$lambda$_1_0() {
    jl_Object.call(this);
}
function ovnc_Client$main$lambda$_1_0_get(var$0) {
    return new ovncv_VCommander;
}
function otci_IntegerUtil() {
    jl_Object.call(this);
}
function otj_JSObject() {
}
function ovnc_CustomElementJSObject$CustomElementCreator() {
}
function ovnc_CustomElement$registerCustomComponent$lambda$_1_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
function ovnc_CustomElement$registerCustomComponent$lambda$_1_0_create(var$0, var$1) {
    var var$2;
    var$2 = ovnc_Client$main$lambda$_1_0_get(var$0.$_0);
    var$2.$jsInstance = var$1;
    ovncv_VCommander_init(var$2);
    return var$2;
}
function ovnc_CustomElement$registerCustomComponent$lambda$_1_0_create$exported$0(var$0, var$1) {
    return ovnc_CustomElement$registerCustomComponent$lambda$_1_0_create(var$0, var$1);
}
function otjdx_Node() {
}
function otjdx_Element() {
}
function otjdc_ElementCSSInlineStyle() {
}
function otjde_EventTarget() {
}
function otjde_FocusEventTarget() {
}
function otjde_MouseEventTarget() {
}
function otjde_WheelEventTarget() {
}
function otjde_KeyboardEventTarget() {
}
function otjde_LoadEventTarget() {
}
function otjdh_HTMLElement() {
}
function otjdh_HTMLElement_querySelector($this, var$1) {
    return $this.querySelector($rt_ustr(var$1));
}
function otjdh_HTMLElement_getOwnerDocument($this) {
    return $this.ownerDocument;
}
function ovnc_CustomElementJSObject() {
    jl_Object.call(this);
}
function ovnc_CustomElementJSObject_getLastChild$exported$0(var$0) {
    return var$0.$getLastChild();
}
function ovnc_CustomElementJSObject_getOffsetHeight$exported$1(var$0) {
    return var$0.$getOffsetHeight();
}
function ovnc_CustomElementJSObject_setNodeValue$exported$2(var$0, var$1) {
    var$0.$setNodeValue($rt_str(var$1));
}
function ovnc_CustomElementJSObject_getPreviousSibling$exported$3(var$0) {
    return var$0.$getPreviousSibling();
}
function ovnc_CustomElementJSObject_removeAttributeNS$exported$4(var$0, var$1, var$2) {
    var$0.$removeAttributeNS($rt_str(var$1), $rt_str(var$2));
}
function ovnc_CustomElementJSObject_getElementsByTagNameNS$exported$5(var$0, var$1, var$2) {
    return var$0.$getElementsByTagNameNS($rt_str(var$1), $rt_str(var$2));
}
function ovnc_CustomElementJSObject_getAccessKey$exported$6(var$0) {
    return $rt_ustr(var$0.$getAccessKey());
}
function ovnc_CustomElementJSObject_getAccessKeyLabel$exported$7(var$0) {
    return $rt_ustr(var$0.$getAccessKeyLabel());
}
function ovnc_CustomElementJSObject_removeAttributeNode$exported$8(var$0, var$1) {
    return var$0.$removeAttributeNode(var$1);
}
function ovnc_CustomElementJSObject_addEventListener$exported$9(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function ovnc_CustomElementJSObject_getFirstChild$exported$10(var$0) {
    return var$0.$getFirstChild();
}
function ovnc_CustomElementJSObject_setAttributeNodeNS$exported$11(var$0, var$1) {
    return var$0.$setAttributeNodeNS(var$1);
}
function ovnc_CustomElementJSObject_hasChildNodesJS$exported$12(var$0) {
    return !!var$0.$hasChildNodesJS();
}
function ovnc_CustomElementJSObject_getOwnerDocument$exported$13(var$0) {
    return var$0.$getOwnerDocument();
}
function ovnc_CustomElementJSObject_requestPointerLock$exported$14(var$0) {
    var$0.$requestPointerLock();
}
function ovnc_CustomElementJSObject_getAttributeNode$exported$15(var$0, var$1) {
    return var$0.$getAttributeNode($rt_str(var$1));
}
function ovnc_CustomElementJSObject_setTitle$exported$16(var$0, var$1) {
    var$0.$setTitle($rt_str(var$1));
}
function ovnc_CustomElementJSObject_setInnerHTML$exported$17(var$0, var$1) {
    var$0.$setInnerHTML($rt_str(var$1));
}
function ovnc_CustomElementJSObject_getTagName$exported$18(var$0) {
    return $rt_ustr(var$0.$getTagName());
}
function ovnc_CustomElementJSObject_setAttributeNode$exported$19(var$0, var$1) {
    return var$0.$setAttributeNode(var$1);
}
function ovnc_CustomElementJSObject_getClassName$exported$20(var$0) {
    return $rt_ustr(var$0.$getClassName());
}
function ovnc_CustomElementJSObject_getAttributes$exported$21(var$0) {
    return var$0.$getAttributes();
}
function ovnc_CustomElementJSObject_setPrefix$exported$22(var$0, var$1) {
    var$0.$setPrefix($rt_str(var$1));
}
function ovnc_CustomElementJSObject_hasAttributes$exported$23(var$0) {
    return !!var$0.$hasAttributes();
}
function ovnc_CustomElementJSObject_isTranslate$exported$24(var$0) {
    return !!var$0.$isTranslate();
}
function ovnc_CustomElementJSObject_setTranslate$exported$25(var$0, var$1) {
    var$0.$setTranslate(var$1 ? 1 : 0);
}
function ovnc_CustomElementJSObject_getOffsetTop$exported$26(var$0) {
    return var$0.$getOffsetTop();
}
function ovnc_CustomElementJSObject_setScrollTop$exported$27(var$0, var$1) {
    var$0.$setScrollTop(var$1);
}
function ovnc_CustomElementJSObject_getDir$exported$28(var$0) {
    return $rt_ustr(var$0.$getDir());
}
function ovnc_CustomElementJSObject_setClassName$exported$29(var$0, var$1) {
    var$0.$setClassName($rt_str(var$1));
}
function ovnc_CustomElementJSObject_hasAttributeNS$exported$30(var$0, var$1, var$2) {
    return !!var$0.$hasAttributeNS($rt_str(var$1), $rt_str(var$2));
}
function ovnc_CustomElementJSObject_getTabIndex$exported$31(var$0) {
    return var$0.$getTabIndex();
}
function ovnc_CustomElementJSObject_setAccessKey$exported$32(var$0, var$1) {
    var$0.$setAccessKey($rt_str(var$1));
}
function ovnc_CustomElementJSObject_cloneNode$exported$33(var$0, var$1) {
    return var$0.$cloneNode(var$1 ? 1 : 0);
}
function ovnc_CustomElementJSObject_setDir$exported$34(var$0, var$1) {
    var$0.$setDir($rt_str(var$1));
}
function ovnc_CustomElementJSObject_getClientWidth$exported$35(var$0) {
    return var$0.$getClientWidth();
}
function ovnc_CustomElementJSObject_getAbsoluteLeft$exported$36(var$0) {
    return var$0.$getAbsoluteLeft();
}
function ovnc_CustomElementJSObject_getTitle$exported$37(var$0) {
    return $rt_ustr(var$0.$getTitle());
}
function ovnc_CustomElementJSObject_getBoundingClientRect$exported$38(var$0) {
    return var$0.$getBoundingClientRect();
}
function ovnc_CustomElementJSObject_getOffsetLeft$exported$39(var$0) {
    return var$0.$getOffsetLeft();
}
function ovnc_CustomElementJSObject_focus$exported$40(var$0) {
    var$0.$focus();
}
function ovnc_CustomElementJSObject_getAbsoluteTop$exported$41(var$0) {
    return var$0.$getAbsoluteTop();
}
function ovnc_CustomElementJSObject_getScrollTop$exported$42(var$0) {
    return var$0.$getScrollTop();
}
function ovnc_CustomElementJSObject_getInnerHTML$exported$43(var$0) {
    return $rt_ustr(var$0.$getInnerHTML());
}
function ovnc_CustomElementJSObject_isSupported$exported$44(var$0, var$1, var$2) {
    return !!var$0.$isSupported($rt_str(var$1), $rt_str(var$2));
}
function ovnc_CustomElementJSObject_getNodeType$exported$45(var$0) {
    return var$0.$getNodeType();
}
function ovnc_CustomElementJSObject_getLocalName$exported$46(var$0) {
    return $rt_ustr(var$0.$getLocalName());
}
function ovnc_CustomElementJSObject_dispatchEvent$exported$47(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function ovnc_CustomElementJSObject_getElementsByTagName$exported$48(var$0, var$1) {
    return var$0.$getElementsByTagName($rt_str(var$1));
}
function ovnc_CustomElementJSObject_isHidden$exported$49(var$0) {
    return !!var$0.$isHidden();
}
function ovnc_CustomElementJSObject_getClientHeight$exported$50(var$0) {
    return var$0.$getClientHeight();
}
function ovnc_CustomElementJSObject_getNodeName$exported$51(var$0) {
    return $rt_ustr(var$0.$getNodeName());
}
function ovnc_CustomElementJSObject_setScrollLeft$exported$52(var$0, var$1) {
    var$0.$setScrollLeft(var$1);
}
function ovnc_CustomElementJSObject_setLang$exported$53(var$0, var$1) {
    var$0.$setLang($rt_str(var$1));
}
function ovnc_CustomElementJSObject_blur$exported$54(var$0) {
    var$0.$blur();
}
function ovnc_CustomElementJSObject_normalize$exported$55(var$0) {
    var$0.$normalize();
}
function ovnc_CustomElementJSObject_querySelectorAll$exported$56(var$0, var$1) {
    return var$0.$querySelectorAll($rt_str(var$1));
}
function ovnc_CustomElementJSObject_click$exported$57(var$0) {
    var$0.$click();
}
function ovnc_CustomElementJSObject_setTabIndex$exported$58(var$0, var$1) {
    var$0.$setTabIndex(var$1);
}
function ovnc_CustomElementJSObject_getScrollLeft$exported$59(var$0) {
    return var$0.$getScrollLeft();
}
function ovnc_CustomElementJSObject_setHidden$exported$60(var$0, var$1) {
    var$0.$setHidden(var$1 ? 1 : 0);
}
function ovnc_CustomElementJSObject_querySelector$exported$61(var$0, var$1) {
    return otjdh_HTMLElement_querySelector(var$0, $rt_str(var$1));
}
function ovnc_CustomElementJSObject_hasAttribute$exported$62(var$0, var$1) {
    return !!var$0.$hasAttribute($rt_str(var$1));
}
function ovnc_CustomElementJSObject_getScrollWidth$exported$63(var$0) {
    return var$0.$getScrollWidth();
}
function ovnc_CustomElementJSObject_getNodeValue$exported$64(var$0) {
    return $rt_ustr(var$0.$getNodeValue());
}
function ovnc_CustomElementJSObject_insertBefore$exported$65(var$0, var$1, var$2) {
    return var$0.$insertBefore(var$1, var$2);
}
function ovnc_CustomElementJSObject_removeAttribute$exported$66(var$0, var$1) {
    var$0.$removeAttribute($rt_str(var$1));
}
function ovnc_CustomElementJSObject_removeChild$exported$67(var$0, var$1) {
    return var$0.$removeChild(var$1);
}
function ovnc_CustomElementJSObject_querySelector$exported$68(var$0, var$1) {
    return var$0.$querySelector0($rt_str(var$1));
}
function ovnc_CustomElementJSObject_getNextSibling$exported$69(var$0) {
    return var$0.$getNextSibling();
}
function ovnc_CustomElementJSObject_setAttribute$exported$70(var$0, var$1, var$2) {
    var$0.$setAttribute($rt_str(var$1), $rt_str(var$2));
}
function ovnc_CustomElementJSObject_getAttributeNS$exported$71(var$0, var$1, var$2) {
    return $rt_ustr(var$0.$getAttributeNS($rt_str(var$1), $rt_str(var$2)));
}
function ovnc_CustomElementJSObject_removeEventListener$exported$72(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function ovnc_CustomElementJSObject_replaceChild$exported$73(var$0, var$1, var$2) {
    return var$0.$replaceChild(var$1, var$2);
}
function ovnc_CustomElementJSObject_getScrollHeight$exported$74(var$0) {
    return var$0.$getScrollHeight();
}
function ovnc_CustomElementJSObject_hasChildNodes$exported$75(var$0) {
    return !!var$0.$hasChildNodes();
}
function ovnc_CustomElementJSObject_removeEventListener$exported$76(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function ovnc_CustomElementJSObject_getAttribute$exported$77(var$0, var$1) {
    return $rt_ustr(var$0.$getAttribute($rt_str(var$1)));
}
function ovnc_CustomElementJSObject_getOwnerDocument$exported$78(var$0) {
    return otjdh_HTMLElement_getOwnerDocument(var$0);
}
function ovnc_CustomElementJSObject_getPrefix$exported$79(var$0) {
    return $rt_ustr(var$0.$getPrefix());
}
function ovnc_CustomElementJSObject_getChildNodes$exported$80(var$0) {
    return var$0.$getChildNodes();
}
function ovnc_CustomElementJSObject_getParentNode$exported$81(var$0) {
    return var$0.$getParentNode();
}
function ovnc_CustomElementJSObject_getOffsetWidth$exported$82(var$0) {
    return var$0.$getOffsetWidth();
}
function ovnc_CustomElementJSObject_getStyle$exported$83(var$0) {
    return var$0.$getStyle();
}
function ovnc_CustomElementJSObject_addEventListener$exported$84(var$0, var$1, var$2) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function ovnc_CustomElementJSObject_appendChild$exported$85(var$0, var$1) {
    return var$0.$appendChild(var$1);
}
function ovnc_CustomElementJSObject_setAttributeNS$exported$86(var$0, var$1, var$2, var$3) {
    var$0.$setAttributeNS($rt_str(var$1), $rt_str(var$2), $rt_str(var$3));
}
function ovnc_CustomElementJSObject_getAttributeNodeNS$exported$87(var$0, var$1, var$2) {
    return var$0.$getAttributeNodeNS($rt_str(var$1), $rt_str(var$2));
}
function ovnc_CustomElementJSObject_getLang$exported$88(var$0) {
    return $rt_ustr(var$0.$getLang());
}
function ovnc_CustomElementJSObject_getNamespaceURI$exported$89(var$0) {
    return $rt_ustr(var$0.$getNamespaceURI());
}
function ju_Comparator() {
}
function jl_String$_clinit_$lambda$_81_0() {
    jl_Object.call(this);
}
function jl_Character() {
    jl_Object.call(this);
}
var jl_Character_TYPE = null;
var jl_Character_characterCache = null;
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function jl_IndexOutOfBoundsException() {
    jl_RuntimeException.call(this);
}
function jl_StringIndexOutOfBoundsException() {
    jl_IndexOutOfBoundsException.call(this);
}
function jl_StringIndexOutOfBoundsException__init_() {
    var var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_StringIndexOutOfBoundsException__init_0($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
}
function jl_Math() {
    jl_Object.call(this);
}
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
function ju_Arrays() {
    jl_Object.call(this);
}
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, 0,
ovnc_Client, 0, jl_Object, [], 0, 3, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, 0,
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0,
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0,
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0,
ovnc_CustomElement, 0, jl_Object, [], 1, 3, 0, 0,
ovncv_VCommander, 0, ovnc_CustomElement, [], 0, 3, 0, 0,
juf_Supplier, 0, jl_Object, [], 3, 3, 0, 0,
ovnc_Client$main$lambda$_1_0, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0,
ovnc_CustomElementJSObject$CustomElementCreator, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
ovnc_CustomElement$registerCustomComponent$lambda$_1_0, 0, jl_Object, [ovnc_CustomElementJSObject$CustomElementCreator], 0, 3, 0, ["$create$exported$0", function(var_1) { return ovnc_CustomElement$registerCustomComponent$lambda$_1_0_create$exported$0(this, var_1); }],
otjdx_Node, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjdx_Element, 0, jl_Object, [otjdx_Node], 3, 3, 0, 0,
otjdc_ElementCSSInlineStyle, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_WheelEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjdh_HTMLElement, 0, jl_Object, [otjdx_Element, otjdc_ElementCSSInlineStyle, otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_WheelEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget], 3, 3, 0, 0,
ovnc_CustomElementJSObject, 0, jl_Object, [otj_JSObject, otjdh_HTMLElement], 1, 3, 0, ["$getLastChild$exported$0", function() { return ovnc_CustomElementJSObject_getLastChild$exported$0(this); }, "$getOffsetHeight$exported$1", function() { return ovnc_CustomElementJSObject_getOffsetHeight$exported$1(this); }, "$setNodeValue$exported$2", function(var_1) { return ovnc_CustomElementJSObject_setNodeValue$exported$2(this, var_1); }, "$getPreviousSibling$exported$3", function() { return ovnc_CustomElementJSObject_getPreviousSibling$exported$3(this);
}, "$removeAttributeNS$exported$4", function(var_1, var_2) { return ovnc_CustomElementJSObject_removeAttributeNS$exported$4(this, var_1, var_2); }, "$getElementsByTagNameNS$exported$5", function(var_1, var_2) { return ovnc_CustomElementJSObject_getElementsByTagNameNS$exported$5(this, var_1, var_2); }, "$getAccessKey$exported$6", function() { return ovnc_CustomElementJSObject_getAccessKey$exported$6(this); }, "$getAccessKeyLabel$exported$7", function() { return ovnc_CustomElementJSObject_getAccessKeyLabel$exported$7(this);
}, "$removeAttributeNode$exported$8", function(var_1) { return ovnc_CustomElementJSObject_removeAttributeNode$exported$8(this, var_1); }, "$addEventListener$exported$9", function(var_1, var_2, var_3) { return ovnc_CustomElementJSObject_addEventListener$exported$9(this, var_1, var_2, var_3); }, "$getFirstChild$exported$10", function() { return ovnc_CustomElementJSObject_getFirstChild$exported$10(this); }, "$setAttributeNodeNS$exported$11", function(var_1) { return ovnc_CustomElementJSObject_setAttributeNodeNS$exported$11(this,
var_1); }, "$hasChildNodesJS$exported$12", function() { return ovnc_CustomElementJSObject_hasChildNodesJS$exported$12(this); }, "$getOwnerDocument$exported$13", function() { return ovnc_CustomElementJSObject_getOwnerDocument$exported$13(this); }, "$requestPointerLock$exported$14", function() { return ovnc_CustomElementJSObject_requestPointerLock$exported$14(this); }, "$getAttributeNode$exported$15", function(var_1) { return ovnc_CustomElementJSObject_getAttributeNode$exported$15(this, var_1); }, "$setTitle$exported$16",
function(var_1) { return ovnc_CustomElementJSObject_setTitle$exported$16(this, var_1); }, "$setInnerHTML$exported$17", function(var_1) { return ovnc_CustomElementJSObject_setInnerHTML$exported$17(this, var_1); }, "$getTagName$exported$18", function() { return ovnc_CustomElementJSObject_getTagName$exported$18(this); }, "$setAttributeNode$exported$19", function(var_1) { return ovnc_CustomElementJSObject_setAttributeNode$exported$19(this, var_1); }, "$getClassName$exported$20", function() { return ovnc_CustomElementJSObject_getClassName$exported$20(this);
}, "$getAttributes$exported$21", function() { return ovnc_CustomElementJSObject_getAttributes$exported$21(this); }, "$setPrefix$exported$22", function(var_1) { return ovnc_CustomElementJSObject_setPrefix$exported$22(this, var_1); }, "$hasAttributes$exported$23", function() { return ovnc_CustomElementJSObject_hasAttributes$exported$23(this); }, "$isTranslate$exported$24", function() { return ovnc_CustomElementJSObject_isTranslate$exported$24(this); }, "$setTranslate$exported$25", function(var_1) { return ovnc_CustomElementJSObject_setTranslate$exported$25(this,
var_1); }, "$getOffsetTop$exported$26", function() { return ovnc_CustomElementJSObject_getOffsetTop$exported$26(this); }, "$setScrollTop$exported$27", function(var_1) { return ovnc_CustomElementJSObject_setScrollTop$exported$27(this, var_1); }, "$getDir$exported$28", function() { return ovnc_CustomElementJSObject_getDir$exported$28(this); }, "$setClassName$exported$29", function(var_1) { return ovnc_CustomElementJSObject_setClassName$exported$29(this, var_1); }, "$hasAttributeNS$exported$30", function(var_1,
var_2) { return ovnc_CustomElementJSObject_hasAttributeNS$exported$30(this, var_1, var_2); }, "$getTabIndex$exported$31", function() { return ovnc_CustomElementJSObject_getTabIndex$exported$31(this); }, "$setAccessKey$exported$32", function(var_1) { return ovnc_CustomElementJSObject_setAccessKey$exported$32(this, var_1); }, "$cloneNode$exported$33", function(var_1) { return ovnc_CustomElementJSObject_cloneNode$exported$33(this, var_1); }, "$setDir$exported$34", function(var_1) { return ovnc_CustomElementJSObject_setDir$exported$34(this,
var_1); }, "$getClientWidth$exported$35", function() { return ovnc_CustomElementJSObject_getClientWidth$exported$35(this); }, "$getAbsoluteLeft$exported$36", function() { return ovnc_CustomElementJSObject_getAbsoluteLeft$exported$36(this); }, "$getTitle$exported$37", function() { return ovnc_CustomElementJSObject_getTitle$exported$37(this); }, "$getBoundingClientRect$exported$38", function() { return ovnc_CustomElementJSObject_getBoundingClientRect$exported$38(this); }, "$getOffsetLeft$exported$39", function()
{ return ovnc_CustomElementJSObject_getOffsetLeft$exported$39(this); }, "$focus$exported$40", function() { return ovnc_CustomElementJSObject_focus$exported$40(this); }, "$getAbsoluteTop$exported$41", function() { return ovnc_CustomElementJSObject_getAbsoluteTop$exported$41(this); }, "$getScrollTop$exported$42", function() { return ovnc_CustomElementJSObject_getScrollTop$exported$42(this); }, "$getInnerHTML$exported$43", function() { return ovnc_CustomElementJSObject_getInnerHTML$exported$43(this); }, "$isSupported$exported$44",
function(var_1, var_2) { return ovnc_CustomElementJSObject_isSupported$exported$44(this, var_1, var_2); }, "$getNodeType$exported$45", function() { return ovnc_CustomElementJSObject_getNodeType$exported$45(this); }, "$getLocalName$exported$46", function() { return ovnc_CustomElementJSObject_getLocalName$exported$46(this); }, "$dispatchEvent$exported$47", function(var_1) { return ovnc_CustomElementJSObject_dispatchEvent$exported$47(this, var_1); }, "$getElementsByTagName$exported$48", function(var_1) { return ovnc_CustomElementJSObject_getElementsByTagName$exported$48(this,
var_1); }, "$isHidden$exported$49", function() { return ovnc_CustomElementJSObject_isHidden$exported$49(this); }, "$getClientHeight$exported$50", function() { return ovnc_CustomElementJSObject_getClientHeight$exported$50(this); }, "$getNodeName$exported$51", function() { return ovnc_CustomElementJSObject_getNodeName$exported$51(this); }, "$setScrollLeft$exported$52", function(var_1) { return ovnc_CustomElementJSObject_setScrollLeft$exported$52(this, var_1); }, "$setLang$exported$53", function(var_1) { return ovnc_CustomElementJSObject_setLang$exported$53(this,
var_1); }, "$blur$exported$54", function() { return ovnc_CustomElementJSObject_blur$exported$54(this); }, "$normalize$exported$55", function() { return ovnc_CustomElementJSObject_normalize$exported$55(this); }, "$querySelectorAll$exported$56", function(var_1) { return ovnc_CustomElementJSObject_querySelectorAll$exported$56(this, var_1); }, "$click$exported$57", function() { return ovnc_CustomElementJSObject_click$exported$57(this); }, "$setTabIndex$exported$58", function(var_1) { return ovnc_CustomElementJSObject_setTabIndex$exported$58(this,
var_1); }, "$getScrollLeft$exported$59", function() { return ovnc_CustomElementJSObject_getScrollLeft$exported$59(this); }, "$setHidden$exported$60", function(var_1) { return ovnc_CustomElementJSObject_setHidden$exported$60(this, var_1); }, "$querySelector$exported$61", function(var_1) { return ovnc_CustomElementJSObject_querySelector$exported$61(this, var_1); }, "$hasAttribute$exported$62", function(var_1) { return ovnc_CustomElementJSObject_hasAttribute$exported$62(this, var_1); }, "$getScrollWidth$exported$63",
function() { return ovnc_CustomElementJSObject_getScrollWidth$exported$63(this); }, "$getNodeValue$exported$64", function() { return ovnc_CustomElementJSObject_getNodeValue$exported$64(this); }, "$insertBefore$exported$65", function(var_1, var_2) { return ovnc_CustomElementJSObject_insertBefore$exported$65(this, var_1, var_2); }, "$removeAttribute$exported$66", function(var_1) { return ovnc_CustomElementJSObject_removeAttribute$exported$66(this, var_1); }, "$removeChild$exported$67", function(var_1) { return ovnc_CustomElementJSObject_removeChild$exported$67(this,
var_1); }, "$querySelector$exported$68", function(var_1) { return ovnc_CustomElementJSObject_querySelector$exported$68(this, var_1); }, "$getNextSibling$exported$69", function() { return ovnc_CustomElementJSObject_getNextSibling$exported$69(this); }, "$setAttribute$exported$70", function(var_1, var_2) { return ovnc_CustomElementJSObject_setAttribute$exported$70(this, var_1, var_2); }, "$getAttributeNS$exported$71", function(var_1, var_2) { return ovnc_CustomElementJSObject_getAttributeNS$exported$71(this, var_1,
var_2); }, "$removeEventListener$exported$72", function(var_1, var_2) { return ovnc_CustomElementJSObject_removeEventListener$exported$72(this, var_1, var_2); }, "$replaceChild$exported$73", function(var_1, var_2) { return ovnc_CustomElementJSObject_replaceChild$exported$73(this, var_1, var_2); }, "$getScrollHeight$exported$74", function() { return ovnc_CustomElementJSObject_getScrollHeight$exported$74(this); }, "$hasChildNodes$exported$75", function() { return ovnc_CustomElementJSObject_hasChildNodes$exported$75(this);
}, "$removeEventListener$exported$76", function(var_1, var_2, var_3) { return ovnc_CustomElementJSObject_removeEventListener$exported$76(this, var_1, var_2, var_3); }, "$getAttribute$exported$77", function(var_1) { return ovnc_CustomElementJSObject_getAttribute$exported$77(this, var_1); }, "$getOwnerDocument$exported$78", function() { return ovnc_CustomElementJSObject_getOwnerDocument$exported$78(this); }, "$getPrefix$exported$79", function() { return ovnc_CustomElementJSObject_getPrefix$exported$79(this); },
"$getChildNodes$exported$80", function() { return ovnc_CustomElementJSObject_getChildNodes$exported$80(this); }, "$getParentNode$exported$81", function() { return ovnc_CustomElementJSObject_getParentNode$exported$81(this); }, "$getOffsetWidth$exported$82", function() { return ovnc_CustomElementJSObject_getOffsetWidth$exported$82(this); }, "$getStyle$exported$83", function() { return ovnc_CustomElementJSObject_getStyle$exported$83(this); }, "$addEventListener$exported$84", function(var_1, var_2) { return ovnc_CustomElementJSObject_addEventListener$exported$84(this,
var_1, var_2); }, "$appendChild$exported$85", function(var_1) { return ovnc_CustomElementJSObject_appendChild$exported$85(this, var_1); }, "$setAttributeNS$exported$86", function(var_1, var_2, var_3) { return ovnc_CustomElementJSObject_setAttributeNS$exported$86(this, var_1, var_2, var_3); }, "$getAttributeNodeNS$exported$87", function(var_1, var_2) { return ovnc_CustomElementJSObject_getAttributeNodeNS$exported$87(this, var_1, var_2); }, "$getLang$exported$88", function() { return ovnc_CustomElementJSObject_getLang$exported$88(this);
}, "$getNamespaceURI$exported$89", function() { return ovnc_CustomElementJSObject_getNamespaceURI$exported$89(this); }],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0,
jl_String$_clinit_$lambda$_81_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, 0,
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["@", "0", "null"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
function $rt_startThread(runner, callback) {
    var result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof Error) {
        throw result;
    }
}
function $rt_suspending() {
    return false;
}
function $rt_resuming() {
    return false;
}
function $rt_nativeThread() {
    return null;
}
function $rt_invalidPointer() {
}
main = $rt_mainStarter(ovnc_Client_main);
(function() {
    var c;
    c = ovnc_CustomElement$registerCustomComponent$lambda$_1_0.prototype;
    c.create = c.$create$exported$0;
    c = ovnc_CustomElementJSObject.prototype;
    c.getPreviousSibling = c.$getPreviousSibling$exported$3;
    c.getAbsoluteTop = c.$getAbsoluteTop$exported$41;
    c.addEventListener = c.$addEventListener$exported$84;
    c.removeChild = c.$removeChild$exported$67;
    c.getNodeType = c.$getNodeType$exported$45;
    c.setAttributeNode = c.$setAttributeNode$exported$19;
    c.getClientWidth = c.$getClientWidth$exported$35;
    c.hasChildNodes = c.$hasChildNodes$exported$75;
    c.hasChildNodesJS = c.$hasChildNodesJS$exported$12;
    c.getTagName = c.$getTagName$exported$18;
    c.getNextSibling = c.$getNextSibling$exported$69;
    c.replaceChild = c.$replaceChild$exported$73;
    c.getScrollTop = c.$getScrollTop$exported$42;
    c.getLastChild = c.$getLastChild$exported$0;
    c.normalize = c.$normalize$exported$55;
    c.hasAttributeNS = c.$hasAttributeNS$exported$30;
    c.setLang = c.$setLang$exported$53;
    c.getNamespaceURI = c.$getNamespaceURI$exported$89;
    c.setAttributeNodeNS = c.$setAttributeNodeNS$exported$11;
    c.getAttributeNode = c.$getAttributeNode$exported$15;
    c.setScrollTop = c.$setScrollTop$exported$27;
    c.setHidden = c.$setHidden$exported$60;
    c.getScrollWidth = c.$getScrollWidth$exported$63;
    c.hasAttribute = c.$hasAttribute$exported$62;
    c.setTranslate = c.$setTranslate$exported$25;
    c.getAccessKey = c.$getAccessKey$exported$6;
    c.getAbsoluteLeft = c.$getAbsoluteLeft$exported$36;
    c.focus = c.$focus$exported$40;
    c.setInnerHTML = c.$setInnerHTML$exported$17;
    c.setDir = c.$setDir$exported$34;
    c.getScrollHeight = c.$getScrollHeight$exported$74;
    c.getNodeName = c.$getNodeName$exported$51;
    c.getAttributes = c.$getAttributes$exported$21;
    c.querySelector = c.$querySelector$exported$61;
    c.getAttributeNodeNS = c.$getAttributeNodeNS$exported$87;
    c.insertBefore = c.$insertBefore$exported$65;
    c.getScrollLeft = c.$getScrollLeft$exported$59;
    c.setAccessKey = c.$setAccessKey$exported$32;
    c.blur = c.$blur$exported$54;
    c.removeEventListener = c.$removeEventListener$exported$76;
    c.removeEventListener = c.$removeEventListener$exported$72;
    c.requestPointerLock = c.$requestPointerLock$exported$14;
    c.getOffsetLeft = c.$getOffsetLeft$exported$39;
    c.dispatchEvent = c.$dispatchEvent$exported$47;
    c.querySelectorAll = c.$querySelectorAll$exported$56;
    c.getChildNodes = c.$getChildNodes$exported$80;
    c.getStyle = c.$getStyle$exported$83;
    c.getOffsetHeight = c.$getOffsetHeight$exported$1;
    c.getDir = c.$getDir$exported$28;
    c.removeAttributeNS = c.$removeAttributeNS$exported$4;
    c.getTitle = c.$getTitle$exported$37;
    c.getFirstChild = c.$getFirstChild$exported$10;
    c.getLang = c.$getLang$exported$88;
    c.getOffsetTop = c.$getOffsetTop$exported$26;
    c.getElementsByTagName = c.$getElementsByTagName$exported$48;
    c.setNodeValue = c.$setNodeValue$exported$2;
    c.cloneNode = c.$cloneNode$exported$33;
    c.getClientHeight = c.$getClientHeight$exported$50;
    c.getTabIndex = c.$getTabIndex$exported$31;
    c.setAttribute = c.$setAttribute$exported$70;
    c.getOffsetWidth = c.$getOffsetWidth$exported$82;
    c.getOwnerDocument = c.$getOwnerDocument$exported$78;
    c.hasAttributes = c.$hasAttributes$exported$23;
    c.getAttribute = c.$getAttribute$exported$77;
    c.addEventListener = c.$addEventListener$exported$9;
    c.getBoundingClientRect = c.$getBoundingClientRect$exported$38;
    c.getClassName = c.$getClassName$exported$20;
    c.setScrollLeft = c.$setScrollLeft$exported$52;
    c.removeAttributeNode = c.$removeAttributeNode$exported$8;
    c.querySelector = c.$querySelector$exported$68;
    c.setClassName = c.$setClassName$exported$29;
    c.isSupported = c.$isSupported$exported$44;
    c.getPrefix = c.$getPrefix$exported$79;
    c.setTabIndex = c.$setTabIndex$exported$58;
    c.removeAttribute = c.$removeAttribute$exported$66;
    c.getParentNode = c.$getParentNode$exported$81;
    c.getNodeValue = c.$getNodeValue$exported$64;
    c.getElementsByTagNameNS = c.$getElementsByTagNameNS$exported$5;
    c.getAccessKeyLabel = c.$getAccessKeyLabel$exported$7;
    c.getAttributeNS = c.$getAttributeNS$exported$71;
    c.getInnerHTML = c.$getInnerHTML$exported$43;
    c.isHidden = c.$isHidden$exported$49;
    c.click = c.$click$exported$57;
    c.getLocalName = c.$getLocalName$exported$46;
    c.setPrefix = c.$setPrefix$exported$22;
    c.setAttributeNS = c.$setAttributeNS$exported$86;
    c.isTranslate = c.$isTranslate$exported$24;
    c.appendChild = c.$appendChild$exported$85;
    c.getOwnerDocument = c.$getOwnerDocument$exported$13;
    c.setTitle = c.$setTitle$exported$16;
})();
})();

//# sourceMappingURL=classes.js.map