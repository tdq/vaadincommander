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
    return jl_Thread_currentThread();
}
function $rt_setThread(t) {
    return jl_Thread_setCurrentThread(t);
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
    this.$monitor = null;
    this.$id$ = 0;
}
function jl_Object_monitorEnterSync($o) {
    var var$2;
    if ($o.$monitor === null)
        jl_Object_createMonitor($o);
    if ($o.$monitor.$owner === null)
        $o.$monitor.$owner = jl_Thread_currentThread0;
    else if ($o.$monitor.$owner !== jl_Thread_currentThread0) {
        var$2 = new jl_IllegalStateException;
        jl_Throwable__init_(var$2, $rt_s(0));
        $rt_throw(var$2);
    }
    $o = $o.$monitor;
    $o.$count = $o.$count + 1 | 0;
}
function jl_Object_monitorExitSync($o) {
    var var$2, var$3;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread0) {
        var$2 = $o.$monitor;
        var$3 = var$2.$count - 1 | 0;
        var$2.$count = var$3;
        if (!var$3)
            $o.$monitor.$owner = null;
        jl_Object_isEmptyMonitor($o);
        return;
    }
    $o = new jl_IllegalMonitorStateException;
    jl_Exception__init_($o);
    $rt_throw($o);
}
function jl_Object_monitorEnter($o) {
    if ($o.$monitor === null)
        jl_Object_createMonitor($o);
    if ($o.$monitor.$owner === null)
        $o.$monitor.$owner = jl_Thread_currentThread0;
    if ($o.$monitor.$owner !== jl_Thread_currentThread0)
        jl_Object_monitorEnterWait($o, 1);
    else {
        $o = $o.$monitor;
        $o.$count = $o.$count + 1 | 0;
    }
}
function jl_Object_createMonitor($o) {
    var var$2;
    var$2 = new jl_Object$Monitor;
    var$2.$owner = jl_Thread_currentThread0;
    $o.$monitor = var$2;
}
function jl_Object_monitorEnterWait(var$1, var$2) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Object_monitorEnterWait0(var$1, var$2, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Object_monitorEnterWait0($o, $count, $callback) {
    var $thread, $monitor, var$6;
    $thread = jl_Thread_currentThread0;
    if ($o.$monitor === null) {
        jl_Object_createMonitor($o);
        jl_Thread_setCurrentThread($thread);
        $o = $o.$monitor;
        $o.$count = $o.$count + $count | 0;
        otpp_AsyncCallbackWrapper_complete($callback, null);
        return;
    }
    if ($o.$monitor.$owner === null) {
        $o.$monitor.$owner = $thread;
        jl_Thread_setCurrentThread($thread);
        $o = $o.$monitor;
        $o.$count = $o.$count + $count | 0;
        otpp_AsyncCallbackWrapper_complete($callback, null);
        return;
    }
    $monitor = $o.$monitor;
    if ($monitor.$enteringThreads === null)
        $monitor.$enteringThreads = otp_Platform_createQueueJs$js_body$_30();
    $monitor = $monitor.$enteringThreads;
    var$6 = new jl_Object$monitorEnterWait$lambda$_6_0;
    var$6.$_0 = $thread;
    var$6.$_1 = $o;
    var$6.$_2 = $count;
    var$6.$_3 = $callback;
    $callback = var$6;
    $monitor.push($callback);
}
function jl_Object_monitorExit($o) {
    var var$2;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread0) {
        var$2 = $o.$monitor;
        var$2.$count = var$2.$count - 1 | 0;
        if (var$2.$count <= 0) {
            var$2.$owner = null;
            if (var$2.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static(var$2.$enteringThreads)) {
                var$2 = new jl_Object$monitorExit$lambda$_8_0;
                var$2.$_00 = $o;
                otp_Platform_postpone(var$2);
            } else
                jl_Object_isEmptyMonitor($o);
        }
        return;
    }
    $o = new jl_IllegalMonitorStateException;
    jl_Exception__init_($o);
    $rt_throw($o);
}
function jl_Object_isEmptyMonitor($this) {
    var $monitor;
    $monitor = $this.$monitor;
    if ($monitor === null)
        return 1;
    a: {
        if ($monitor.$owner === null && !($monitor.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static($monitor.$enteringThreads))) {
            if ($monitor.$notifyListeners === null)
                break a;
            if (otp_PlatformQueue_isEmpty$static($monitor.$notifyListeners))
                break a;
        }
        return 0;
    }
    $this.$monitor = null;
    return 1;
}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_hashCode($this) {
    return jl_Object_identity($this);
}
function jl_Object_equals($this, $other) {
    return $this !== $other ? 0 : 1;
}
function jl_Object_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$1 = jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), jl_Class_getName(jl_Object_getClass($this))), $rt_s(1));
    var$2 = jl_Object_identity($this);
    if (!var$2)
        var$3 = $rt_s(2);
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
        var$6 = (((32 - var$4 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$7 = $rt_createCharArray(var$6);
        var$8 = var$7.data;
        var$4 = (var$6 - 1 | 0) * 4 | 0;
        var$6 = 0;
        while (var$4 >= 0) {
            var$5 = var$6 + 1 | 0;
            var$8[var$6] = jl_Character_forDigit(var$2 >>> var$4 & 15, 16);
            var$4 = var$4 - 4 | 0;
            var$6 = var$5;
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
function jl_Object_clone($this) {
    var $result, var$2, var$3;
    if (!$rt_isInstance($this, jl_Cloneable) && $this.constructor.$meta.item === null) {
        $result = new jl_CloneNotSupportedException;
        jl_Exception__init_($result);
        $rt_throw($result);
    }
    $result = otp_Platform_clone($this);
    var$2 = $result;
    var$3 = $rt_nextId();
    var$2.$id$ = var$3;
    return $result;
}
function jl_Object_notifyAll($this) {
    var $listeners, $listener;
    if (!($this.$monitor !== null && $this.$monitor.$owner === jl_Thread_currentThread0 ? 1 : 0)) {
        $listeners = new jl_IllegalMonitorStateException;
        jl_Exception__init_($listeners);
        $rt_throw($listeners);
    }
    $listeners = $this.$monitor.$notifyListeners;
    if ($listeners === null)
        return;
    while (!otp_PlatformQueue_isEmpty$static($listeners)) {
        $listener = otp_PlatformQueue_remove$static($listeners);
        if (!$listener.$expired())
            otp_Platform_postpone($listener);
    }
    $this.$monitor.$notifyListeners = null;
}
function ovnc_Client() {
    jl_Object.call(this);
}
function ovnc_Client_main($args) {
    var var$2, var$3;
    jl_String__clinit_();
    jl_Integer__clinit_();
    jl_Character__clinit_();
    ovncv_VCommander__clinit_();
    ovncv_RenderRegistry__clinit_();
    jnc_CodingErrorAction__clinit_();
    jnc_CoderResult__clinit_();
    jn_ByteOrder__clinit_();
    jl_Thread__clinit_();
    ovncv_Palete16__clinit_();
    var$2 = new ovnc_Client$main$lambda$_1_0;
    var$3 = new ovnc_CustomElement$registerCustomComponent$lambda$_1_0;
    var$3.$_01 = var$2;
    window.registerCustomElement("v-commander", otji_JS_function(var$3, "create"));
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
function jl_Class_getPlatformClass($this) {
    return $this.$platformClass;
}
function jl_Class_getName($this) {
    if ($this.$name === null)
        $this.$name = $rt_str($this.$platformClass.$meta.name);
    return $this.$name;
}
function jl_Class_getComponentType($this) {
    return jl_Class_getClass($this.$platformClass.$meta.item);
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
function otp_Platform_clone(var$1) {
    var copy = new var$1.constructor();
    for (var field in var$1) {
        if (!var$1.hasOwnProperty(field)) {
            continue;
        }
        copy[field] = var$1[field];
    }
    return copy;
}
function otp_Platform_startThread(var$1) {
    return setTimeout(function() {
        $rt_threadStarter(otp_Platform_launchThread)(var$1);
    }, 0);
}
function otp_Platform_launchThread($runnable) {
    $runnable.$run();
}
function otp_Platform_postpone($runnable) {
    otp_Platform_schedule($runnable, 0);
}
function otp_Platform_schedule(var$1, var$2) {
    return setTimeout(function() {
        otp_Platform_launchThread(var$1);
    }, var$2);
}
function otp_Platform_createQueueJs$js_body$_30() {
    return [];
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
    var var$2;
    if ($index >= 0 && $index < $this.$characters.data.length)
        return $this.$characters.data[$index];
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_isEmpty($this) {
    return $this.$characters.data.length ? 0 : 1;
}
function jl_String_toCharArray($this) {
    var $array, var$2, $i, var$4;
    $array = $rt_createCharArray($this.$characters.data.length);
    var$2 = $array.data;
    $i = 0;
    var$4 = var$2.length;
    while ($i < var$4) {
        var$2[$i] = $this.$characters.data[$i];
        $i = $i + 1 | 0;
    }
    return $array;
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
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_0(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_($this, $message) {
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
function jl_AbstractStringBuilder_append($this, $value, $radix) {
    return jl_AbstractStringBuilder_insert($this, $this.$length0, $value, $radix);
}
function jl_AbstractStringBuilder_insert($this, $target, $value, $radix) {
    var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value;
    }
    a: {
        if ($value < $radix) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = 2147483647 / $radix | 0;
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if (var$10 > $value) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (var$10 > $posLimit)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer.data;
                $positive = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (var$10 <= 0)
                    break a;
                var$5 = $this.$buffer.data;
                $target = $positive + 1 | 0;
                var$5[$positive] = jl_Character_forDigit($value / var$10 | 0, $radix);
                $value = $value % var$10 | 0;
                var$10 = var$10 / $radix | 0;
                $positive = $target;
            }
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var $sz, $i;
    $sz = $this.$length0 - $start | 0;
    jl_StringBuilder_ensureCapacity($this, ($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
}
function jl_Appendable() {
}
function jl_StringBuilder() {
    jl_AbstractStringBuilder.call(this);
}
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_0($this) {
    $this.$buffer = $rt_createCharArray(16);
}
function jl_StringBuilder_append($this, $string) {
    jl_StringBuilder_insert($this, $this.$length0, $string);
    return $this;
}
function jl_StringBuilder_append0($this, $value) {
    jl_AbstractStringBuilder_append($this, $value, 10);
    return $this;
}
function jl_StringBuilder_append1($this, $c) {
    jl_StringBuilder_insert0($this, $this.$length0, $c);
    return $this;
}
function jl_StringBuilder_insert0($this, $index, $c) {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
}
function jl_StringBuilder_insert($this, $index, $string) {
    var var$3, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        a: {
            if ($string === null)
                $string = $rt_s(3);
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
    $string = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_($string);
    $rt_throw($string);
}
function jl_StringBuilder_setLength($this, var$1) {
    $this.$length0 = var$1;
}
function jl_StringBuilder_getChars($this, var$1, var$2, var$3, var$4) {
    var var$5, var$6, var$7, var$8, var$9;
    if (var$1 > var$2) {
        var$5 = new jl_IndexOutOfBoundsException;
        jl_Throwable__init_(var$5, $rt_s(4));
        $rt_throw(var$5);
    }
    while (var$1 < var$2) {
        var$6 = var$3.data;
        var$7 = var$4 + 1 | 0;
        var$8 = $this.$buffer.data;
        var$9 = var$1 + 1 | 0;
        var$6[var$4] = var$8[var$1];
        var$4 = var$7;
        var$1 = var$9;
    }
}
function jl_StringBuilder_length($this) {
    return $this.$length0;
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
        var$4 = var$3.data;
        var$1 = jl_Math_min(var$1, var$2.length);
        var$5 = 0;
        while (var$5 < var$1) {
            var$4[var$5] = var$2[var$5];
            var$5 = var$5 + 1 | 0;
        }
        $this.$buffer = var$3;
    }
}
function jl_StringBuilder_insert1($this, var$1, var$2) {
    return jl_StringBuilder_insert0($this, var$1, var$2);
}
function jl_StringBuilder_insert2($this, var$1, var$2) {
    return jl_StringBuilder_insert($this, var$1, var$2);
}
function jl_Number() {
    jl_Object.call(this);
}
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
var jl_Integer_TYPE = null;
var jl_Integer_integerCache = null;
function jl_Integer__init_(var_0) {
    var var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
}
function jl_Integer__init_0($this, $value) {
    $this.$value = $value;
}
function jl_Integer_parseInt($s, $radix) {
    var $negative, $index, $value, var$6, var$7, var$8, $digit, var$10, var$11, var$12, var$13, var$14, var$15;
    if ($radix >= 2 && $radix <= 36) {
        if ($s !== null && !jl_String_isEmpty($s)) {
            a: {
                $negative = 0;
                $index = 0;
                switch (jl_String_charAt($s, 0)) {
                    case 43:
                        $index = 1;
                        break a;
                    case 45:
                        $negative = 1;
                        $index = 1;
                        break a;
                    default:
                }
            }
            $value = 0;
            if ($index == jl_String_length($s)) {
                $s = new jl_NumberFormatException;
                jl_Exception__init_($s);
                $rt_throw($s);
            }
            while ($index < jl_String_length($s)) {
                var$6 = $index + 1 | 0;
                $index = jl_String_charAt($s, $index);
                if (jl_Character_digitMapping === null) {
                    if (jl_Character_$$metadata$$0 === null)
                        jl_Character_$$metadata$$0 = jl_Character_obtainDigitMapping$$create();
                    var$7 = (jl_Character_$$metadata$$0.value !== null ? $rt_str(jl_Character_$$metadata$$0.value) : null);
                    var$8 = new otci_CharFlow;
                    var$8.$characters0 = jl_String_toCharArray(var$7);
                    $digit = otci_Base46_decode(var$8);
                    var$10 = $rt_createIntArray($digit);
                    var$11 = var$10.data;
                    var$12 = 0;
                    while (var$12 < $digit) {
                        var$11[var$12] = otci_Base46_decode(var$8);
                        var$12 = var$12 + 1 | 0;
                    }
                    jl_Character_digitMapping = var$10;
                }
                var$10 = jl_Character_digitMapping.data;
                var$12 = 0;
                var$13 = (var$10.length / 2 | 0) - 1 | 0;
                b: {
                    while (var$13 >= var$12) {
                        var$14 = (var$12 + var$13 | 0) / 2 | 0;
                        $digit = var$14 * 2 | 0;
                        var$15 = $rt_compare($index, var$10[$digit]);
                        if (var$15 > 0)
                            var$12 = var$14 + 1 | 0;
                        else {
                            if (var$15 >= 0) {
                                $digit = var$10[$digit + 1 | 0];
                                break b;
                            }
                            var$13 = var$14 - 1 | 0;
                        }
                    }
                    $digit = (-1);
                }
                if ($digit < 0) {
                    var$7 = new jl_NumberFormatException;
                    jl_Throwable__init_(var$7, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(5)), $s)));
                    $rt_throw(var$7);
                }
                if ($digit >= $radix) {
                    var$7 = new jl_NumberFormatException;
                    jl_Throwable__init_(var$7, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(6)), $radix), $rt_s(7)), $s)));
                    $rt_throw(var$7);
                }
                $value = $rt_imul($radix, $value) + $digit | 0;
                if ($value < 0) {
                    if (var$6 == jl_String_length($s) && $value == (-2147483648) && $negative)
                        return (-2147483648);
                    var$7 = new jl_NumberFormatException;
                    jl_Throwable__init_(var$7, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(8)), $s)));
                    $rt_throw(var$7);
                }
                $index = var$6;
            }
            if ($negative)
                $value =  -$value;
            return $value;
        }
        $s = new jl_NumberFormatException;
        jl_Throwable__init_($s, $rt_s(9));
        $rt_throw($s);
    }
    var$7 = new jl_NumberFormatException;
    jl_Throwable__init_(var$7, jl_StringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(10)), $radix)));
    $rt_throw(var$7);
}
function jl_Integer_valueOf($s) {
    var var$2, var$3;
    var$2 = jl_Integer_parseInt($s, 10);
    if (var$2 >= (-128) && var$2 <= 127) {
        a: {
            if (jl_Integer_integerCache === null) {
                jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
                var$3 = 0;
                while (true) {
                    if (var$3 >= jl_Integer_integerCache.data.length)
                        break a;
                    jl_Integer_integerCache.data[var$3] = jl_Integer__init_(var$3 - 128 | 0);
                    var$3 = var$3 + 1 | 0;
                }
            }
        }
        $s = jl_Integer_integerCache.data[var$2 + 128 | 0];
    } else
        $s = jl_Integer__init_(var$2);
    return $s;
}
function jl_Integer_intValue($this) {
    return $this.$value;
}
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
    jl_Throwable__init_($this, $message);
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
function jl_Exception__init_0() {
    var var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
}
function jl_Exception__init_($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
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
    jl_Throwable__init_($this, $message);
}
function juf_Supplier() {
}
function ovnc_Client$main$lambda$_1_0() {
    jl_Object.call(this);
}
function ovnc_Client$main$lambda$_1_0_get(var$0) {
    var var$1;
    var$1 = new ovncv_VCommander;
    var$1.$buffer0 = $rt_createMultiArray($rt_arraycls($rt_arraycls(ovncv_VCommander$Item)), [0, 0]);
    var$1.$width = 80;
    var$1.$height = 25;
    return var$1;
}
function ovnc_CustomElement() {
    jl_Object.call(this);
    this.$jsInstance = null;
}
function ovnc_CustomElement_getElement($this) {
    return $this.$jsInstance;
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
    this.$_01 = null;
}
function ovnc_CustomElement$registerCustomComponent$lambda$_1_0_create(var$0, var$1) {
    var var$2;
    var$2 = ovnc_Client$main$lambda$_1_0_get(var$0.$_01);
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
var jl_Character_digitMapping = null;
var jl_Character_characterCache = null;
var jl_Character_$$metadata$$0 = null;
function jl_Character_isHighSurrogate($ch) {
    return ($ch & 64512) != 55296 ? 0 : 1;
}
function jl_Character_isLowSurrogate($ch) {
    return ($ch & 64512) != 56320 ? 0 : 1;
}
function jl_Character_forDigit($digit, $radix) {
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function jl_Character_obtainDigitMapping$$create() {
    return {"value" : "oD#*% .%%2%)6%-:%1>%5B%9F%=J%AN%Eo%Is%Mw%Q{%U!\'Y&\'^*\'b.\'f2\'j6\'n:\'r>\'vB\'zF\'!#J\'&#N\'*#R\'.#V\'2#Z\'6#_\':#c\'>#g\'B#k\'F#o\'J#s\'N#w\'R#6)I:)M>)QB)UF)YJ)^N)bR)fV)jZ)n_)rc)vg)zk)!#o)&#s)*#w).#{)2#!+6#&+:#*+>#.+B#2+F#6+J#:+N#>+R#{R# !T#%&T#)*T#-.T#12T#56T#9:T#=>T#ABT#E6a# :a#%>a#)Ba#-Fa#1Ja#5Na#9Ra#=Va#AZa#E:s# >s#%Bs#)Fs#-Js#1Ns#5Rs#9Vs#=Zs#A_s#EZ:% _:%%c:%)g:%-k:%1o:%5s:%9w:%={:%A!<%E2F% 6F%%:F%)>F%-BF%1FF%5JF%9NF%=RF%AVF%EgP% kP%%oP%)sP%-wP%1{P%5!R%9&R%=*R%A.R%E>]% B]%%F]%)J]%-N]%1R]%5V]%9Z]%=_]%Ac]%Esg% wg%%{g%)!i%-&"
    + "i%1*i%5.i%92i%=6i%A:i%EJs% Ns%%Rs%)Vs%-Zs%1_s%5cs%9gs%=ks%Aos%E!!\' &!\'%*!\').!\'-2!\'16!\'5:!\'9>!\'=B!\'AF!\'EV,\' Z,\'%_,\')c,\'-g,\'1k,\'5o,\'9s,\'=w,\'A{,\'E.8\' 28\'%68\'):8\'->8\'1B8\'5F8\'9J8\'=N8\'AR8\'EcB\' gB\'%kB\')oB\'-sB\'1wB\'5{B\'9!D\'=&D\'A*D\'E>L\' BL\'%FL\')JL\'-NL\'1RL\'5VL\'9ZL\'=_L\'AcL\'EsV\' wV\'%{V\')!X\'-&X\'1*X\'5.X\'92X\'=6X\'A:X\'EB_\' F_\'%J_\')N_\'-R_\'1V_\'5Z_\'9__\'=c_\'Ag_\'Esw\' ww\'%{w\')!y\'-&y\'1*y\'5.y\'92y\'=6y\'A:y\'EB!) F!)%J!))N!)-R!)1V!)5Z!)9_!)=c!)Ag!)Egi+ ki+%oi+)si+-wi+1{i+5!k+9&k+=*k+A.k+Eom+ sm+%wm+){m+-!o+1&o+5*o+9.o+=2o+A6o+E>,- B,-%F"
    + ",-)J,--N,-1R,-5V,-9Z,-=_,-Ac,-E>8- B8-%F8-)J8--N8-1R8-5V8-9Z8-=_8-Ac8-E{F- !H-%&H-)*H--.H-12H-56H-9:H-=>H-ABH-E_H- cH-%gH-)kH--oH-1sH-5wH-9{H-=!J-A&J-E!Z- &Z-%*Z-).Z--2Z-16Z-5:Z-9>Z-=BZ-AFZ-E2c- 6c-%:c-)>c--Bc-1Fc-5Jc-9Nc-=Rc-AVc-EJo- No-%Ro-)Vo--Zo-1_o-5co-9go-=ko-Aoo-E.q- 2q-%6q-):q-->q-1Bq-5Fq-9Jq-=Nq-ARq-E&4r *4r%.4r)24r-64r1:4r5>4r9B4r=F4rAJ4rE{or !qr%&qr)*qr-.qr12qr56qr9:qr=>qrABqrE&ur *ur%.ur)2ur-6ur1:ur5>ur9Bur=FurAJurE**t .*t%2*t)6*t-:*t1>*t5B*t9F*t=J*tAN*tEN,t R,t%V,t)Z,t-_,t1c,t5g,t9k,t=o,tAs,tE_"
    + "4t c4t%g4t)k4t-o4t1s4t5w4t9{4t=!6tA&6tEgXt kXt%oXt)sXt-wXt1{Xt5!Zt9&Zt=*ZtA.ZtE{c@# !e@#%&e@#)*e@#-.e@#12e@#56e@#9:e@#=>e@#ABe@#Ece@#Ige@#Mke@#Qoe@#Use@#Ywe@#^{e@#b!g@#f&g@#j*g@#n.g@#r2g@#v6g@#z:g@#!#>g@#&#Bg@#*#Fg@#.#Jg@#2#Ng@#6#Rg@#:#Vg@#>#Zg@#B#_g@#F#cg@#J#gg@#N#kg@#R#*i@#I.i@#M2i@#Q6i@#U:i@#Y>i@#^Bi@#bFi@#fJi@#jNi@#nRi@#rVi@#vZi@#z_i@#!#ci@#&#gi@#*#ki@#.#oi@#2#si@#6#wi@#:#{i@#>#!k@#B#&k@#F#*k@#J#.k@#N#2k@#R#s&D# w&D#%{&D#)!(D#-&(D#1*(D#5.(D#92(D#=6(D#A:(D#E2.H# 6.H#%:.H#)>.H#-B.H#1F.H#5J.H#9N.H#=R.H#AV."
    + "H#EwuH# {uH#%!wH#)&wH#-*wH#1.wH#52wH#96wH#=:wH#A>wH#Ew$J# {$J#%!&J#)&&J#-*&J#1.&J#52&J#96&J#=:&J#A>&J#E{*J# !,J#%&,J#)*,J#-.,J#12,J#56,J#9:,J#=>,J#AB,J#E_8J# c8J#%g8J#)k8J#-o8J#1s8J#5w8J#9{8J#=!:J#A&:J#E2RJ# 6RJ#%:RJ#)>RJ#-BRJ#1FRJ#5JRJ#9NRJ#=RRJ#AVRJ#ENqJ# RqJ#%VqJ#)ZqJ#-_qJ#1cqJ#5gqJ#9kqJ#=oqJ#AsqJ#E&}J# *}J#%.}J#)2}J#-6}J#1:}J#5>}J#9B}J#=F}J#AJ}J#Eg@L# k@L#%o@L#)s@L#-w@L#1{@L#5!BL#9&BL#=*BL#A.BL#EZJL# _JL#%cJL#)gJL#-kJL#1oJL#5sJL#9wJL#={JL#A!LL#ENTL# RTL#%VTL#)ZTL#-_TL#1cTL#5gTL#9kTL#=oTL#AsTL#E:{L# >{L#"
    + "%B{L#)F{L#-J{L#1N{L#5R{L#9V{L#=Z{L#A_{L#ERkN# VkN#%ZkN#)_kN#-ckN#1gkN#5kkN#9okN#=skN#AwkN#E_$P# c$P#%g$P#)k$P#-o$P#1s$P#5w$P#9{$P#=!&P#A&&P#E.,P# 2,P#%6,P#):,P#->,P#1B,P#5F,P#9J,P#=N,P#AR,P#EFau# Jau#%Nau#)Rau#-Vau#1Zau#5_au#9cau#=gau#Akau#Eouu# suu#%wuu#){uu#-!wu#1&wu#5*wu#9.wu#=2wu#A6wu#EF0N% J0N%%N0N%)R0N%-V0N%1Z0N%5_0N%9c0N%=g0N%Ak0N%Eo0N% s0N%%w0N%){0N%-!2N%1&2N%5*2N%9.2N%=22N%A62N%E:2N% >2N%%B2N%)F2N%-J2N%1N2N%5R2N%9V2N%=Z2N%A_2N%Ec2N% g2N%%k2N%)o2N%-s2N%1w2N%5{2N%9!4N%=&4N%A*4N%E.4N% 24N%%64N%):4N%->"
    + "4N%1B4N%5F4N%9J4N%=N4N%AR4N%ERJR% VJR%%ZJR%)_JR%-cJR%1gJR%5kJR%9oJR%=sJR%AwJR%E>qR% BqR%%FqR%)JqR%-NqR%1RqR%5VqR%9ZqR%=_qR%AcqR%E:FV% >FV%%BFV%)FFV%-JFV%1NFV%5RFV%9VFV%=ZFV%A_FV%E"};
}
function jl_IndexOutOfBoundsException() {
    jl_RuntimeException.call(this);
}
function jl_StringIndexOutOfBoundsException() {
    jl_IndexOutOfBoundsException.call(this);
}
function ovncv_VCommander() {
    var a = this; ovnc_CustomElement.call(a);
    a.$buffer0 = null;
    a.$width = 0;
    a.$height = 0;
    a.$content = null;
}
var ovncv_VCommander_pluginsProviders = null;
var ovncv_VCommander_plugins = null;
function ovncv_VCommander_getPlugin($name) {
    return ju_HashMap_get(ovncv_VCommander_plugins, jl_Class_getName($name));
}
function ovncv_VCommander_init($this) {
    var $application, $document, $apiBridge, $item, $j, $i;
    $this.$width = jl_Integer_valueOf($rt_str($this.$jsInstance.getAttribute("width"))).$value;
    $this.$height = jl_Integer_valueOf($rt_str($this.$jsInstance.getAttribute("height"))).$value;
    $application = $this.$jsInstance.style;
    $document = jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder__init_(), $this.$width), $rt_s(11)));
    $application.setProperty("width", $rt_ustr($document));
    $this.$content = window.document.createElement("div");
    $apiBridge = $this.$content;
    $document = "commander";
    $apiBridge.className = $document;
    $item = $this.$jsInstance;
    $apiBridge = $this.$content;
    $item.appendChild($apiBridge);
    $this.$buffer0 = $rt_createMultiArray($rt_arraycls($rt_arraycls(ovncv_VCommander$Item)), [$this.$width, $this.$height]);
    $document = window.document;
    $j = 0;
    while ($j < $this.$height) {
        $i = 0;
        while ($i < $this.$width) {
            $item = $document.createElement("span");
            $apiBridge = "";
            $item.innerHTML = $apiBridge;
            $this.$buffer0.data[$j].data[$i] = ovncv_VCommander$Item__init_(0, 15, 0, 0);
            $this.$content.appendChild($item);
            $i = $i + 1 | 0;
        }
        $j = $j + 1 | 0;
    }
    $apiBridge = new ovncv_VCommander$VAPIBridge;
    $apiBridge.$this$0 = $this;
    $apiBridge.$commander = ju_Objects_requireNonNull($this);
    $document = ovncv_VCommander_pluginsProviders;
    $item = new ovncv_VCommander$init$lambda$_3_0;
    $item.$_02 = $apiBridge;
    jl_Iterable_forEach($document, $item);
    $application = new ovncv_Main;
    $application.$api = $apiBridge;
    ovncv_Main_exec($application);
}
function ovncv_VCommander__clinit_() {
    var var$1;
    var$1 = new ju_ArrayList;
    var$1.$array = $rt_createArray(jl_Object, 10);
    ovncv_VCommander_pluginsProviders = var$1;
    ovncv_VCommander_plugins = ju_HashMap__init_();
}
function ovncv_VCommander$Item() {
    var a = this; jl_Object.call(a);
    a.$value0 = 0;
    a.$color = 0;
    a.$bgcolor = 0;
    a.$shadowed = 0;
}
function ovncv_VCommander$Item__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new ovncv_VCommander$Item();
    ovncv_VCommander$Item__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function ovncv_VCommander$Item__init_0($this, $value, $color, $bgcolor, $shadowed) {
    $this.$value0 = $value;
    $this.$color = $color;
    $this.$bgcolor = $bgcolor;
    $this.$shadowed = $shadowed;
}
function ovncv_VCommander$Item_equals($this, $o) {
    var $item;
    if ($this === $o)
        return 1;
    if ($o !== null && jl_Object_getClass($this) === jl_Object_getClass($o)) {
        $item = $o;
        return $this.$color == $item.$color && $this.$bgcolor == $item.$bgcolor && $this.$shadowed == $item.$shadowed && $this.$value0 == $item.$value0 ? 1 : 0;
    }
    return 0;
}
function jl_Iterable() {
}
function jl_Iterable_forEach($this, $action) {
    var $itr;
    $itr = ju_AbstractList_iterator($this);
    while (ju_AbstractList$1_hasNext($itr)) {
        ovncv_VCommander$init$lambda$_3_0_accept($action, ju_AbstractList$1_next($itr));
    }
}
function ju_Collection() {
}
function ju_AbstractCollection() {
    jl_Object.call(this);
}
function ju_List() {
}
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
function ju_AbstractList_iterator($this) {
    var var$1;
    var$1 = new ju_AbstractList$1;
    var$1.$this$00 = $this;
    var$1.$modCount0 = var$1.$this$00.$modCount;
    var$1.$size = var$1.$this$00.$size0;
    var$1.$removeIndex = (-1);
    return var$1;
}
function jl_Cloneable() {
}
function ju_RandomAccess() {
}
function ju_ArrayList() {
    var a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size0 = 0;
}
function ju_ArrayList_ensureCapacity($this, $minCapacity) {
    var $newLength, var$3, var$4, var$5;
    if ($this.$array.data.length < $minCapacity) {
        $newLength = $this.$array.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array.data.length * 2 | 0, 5));
        var$3 = $this.$array;
        var$4 = jl_Class_getComponentType(jl_Object_getClass(var$3));
        if (var$4 === null) {
            var$4 = new jl_NullPointerException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if (var$4 === $rt_cls($rt_voidcls())) {
            var$4 = new jl_IllegalArgumentException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if ($newLength < 0) {
            var$4 = new jl_NegativeArraySizeException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        var$5 = var$3.data;
        var$3 = jlr_Array_newInstanceImpl(var$4.$platformClass, $newLength);
        $minCapacity = jl_Math_min($newLength, var$5.length);
        $newLength = 0;
        while ($newLength < $minCapacity) {
            var$3.data[$newLength] = var$5[$newLength];
            $newLength = $newLength + 1 | 0;
        }
        $this.$array = var$3;
    }
}
function ju_ArrayList_get($this, $index) {
    var var$2;
    if ($index >= 0 && $index < $this.$size0)
        return $this.$array.data[$index];
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
}
function ju_ArrayList_size($this) {
    return $this.$size0;
}
function ju_ArrayList_add($this, $element) {
    var var$2, var$3;
    ju_ArrayList_ensureCapacity($this, $this.$size0 + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size0;
    $this.$size0 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
}
function ju_Map() {
}
function ju_AbstractMap() {
    jl_Object.call(this);
}
function ju_HashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount1 = 0;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
function ju_HashMap__init_() {
    var var_0 = new ju_HashMap();
    ju_HashMap__init_0(var_0);
    return var_0;
}
function ju_HashMap_newElementArray($this, $s) {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
}
function ju_HashMap__init_0($this) {
    var var$1;
    var$1 = ju_HashMap_calculateCapacity(16);
    $this.$elementCount = 0;
    $this.$elementData = $rt_createArray(ju_HashMap$HashEntry, var$1);
    $this.$loadFactor = 0.75;
    ju_HashMap_computeThreshold($this);
}
function ju_HashMap_calculateCapacity($x) {
    var var$2;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    $x = var$2 | var$2 >> 1;
    $x = $x | $x >> 2;
    $x = $x | $x >> 4;
    $x = $x | $x >> 8;
    return ($x | $x >> 16) + 1 | 0;
}
function ju_HashMap_computeThreshold($this) {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
}
function ju_HashMap_get($this, $key) {
    var $m;
    $m = ju_HashMap_getEntry($this, $key);
    if ($m === null)
        return null;
    return $m.$value1;
}
function ju_HashMap_getEntry($this, $key) {
    var $m, $hash;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode0();
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $hash & ($this.$elementData.data.length - 1 | 0), $hash);
    }
    return $m;
}
function ju_HashMap_findNonNullKeyEntry($this, $key, $index, $keyHash) {
    var $m;
    $m = $this.$elementData.data[$index];
    while ($m !== null && !($m.$origKeyHash == $keyHash && ju_HashMap_areEqualKeys($key, $m.$key))) {
        $m = $m.$next0;
    }
    return $m;
}
function ju_HashMap_findNullKeyEntry($this) {
    var $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next0;
    }
    return $m;
}
function ju_HashMap_put($this, $key, $value) {
    return ju_HashMap_putImpl($this, $key, $value);
}
function ju_HashMap_putImpl($this, $key, $value) {
    var $entry, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, null, 0, 0);
            $hash = $this.$elementCount + 1 | 0;
            $this.$elementCount = $hash;
            if ($hash > $this.$threshold)
                ju_HashMap_rehash($this);
        }
    } else {
        $hash = $key.$hashCode0();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, $key, $index, $hash);
            $hash = $this.$elementCount + 1 | 0;
            $this.$elementCount = $hash;
            if ($hash > $this.$threshold)
                ju_HashMap_rehash($this);
        }
    }
    $result = $entry.$value1;
    $entry.$value1 = $value;
    return $result;
}
function ju_HashMap_createHashedEntry($this, $key, $index, $hash) {
    var $entry, var$5;
    $entry = new ju_HashMap$HashEntry;
    var$5 = null;
    $entry.$key = $key;
    $entry.$value1 = var$5;
    $entry.$origKeyHash = $hash;
    $entry.$next0 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
}
function ju_HashMap_rehash0($this, $capacity) {
    var $length, $newData, var$4, $i, $entry, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $rt_createArray(ju_HashMap$HashEntry, $length);
    var$4 = $newData.data;
    $i = 0;
    $length = $length - 1 | 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            $index = $entry.$origKeyHash & $length;
            $next = $entry.$next0;
            $entry.$next0 = var$4[$index];
            var$4[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
}
function ju_HashMap_rehash($this) {
    ju_HashMap_rehash0($this, $this.$elementData.data.length);
}
function ju_HashMap_remove($this, $key) {
    var $entry;
    $entry = ju_HashMap_removeEntry($this, $key);
    if ($entry === null)
        return null;
    return $entry.$value1;
}
function ju_HashMap_removeEntry($this, $key) {
    var $index, $last, $entry, $entry_0, $hash;
    a: {
        $index = 0;
        $last = null;
        if ($key === null) {
            $entry = $this.$elementData.data[0];
            while ($entry !== null) {
                if ($entry.$key === null)
                    break a;
                $entry_0 = $entry.$next0;
                $last = $entry;
                $entry = $entry_0;
            }
        } else {
            $hash = $key.$hashCode0();
            $index = $hash & ($this.$elementData.data.length - 1 | 0);
            $entry = $this.$elementData.data[$index];
            while ($entry !== null && !($entry.$origKeyHash == $hash && ju_HashMap_areEqualKeys($key, $entry.$key))) {
                $entry_0 = $entry.$next0;
                $last = $entry;
                $entry = $entry_0;
            }
        }
    }
    if ($entry === null)
        return null;
    if ($last !== null)
        $last.$next0 = $entry.$next0;
    else
        $this.$elementData.data[$index] = $entry.$next0;
    $this.$modCount1 = $this.$modCount1 + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
    return $entry;
}
function ju_HashMap_areEqualKeys($key1, $key2) {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
}
function jl_IllegalArgumentException() {
    jl_RuntimeException.call(this);
}
function otjb_WindowEventTarget() {
}
function otjb_StorageProvider() {
}
function otjc_JSArrayReader() {
}
function otjb_Window() {
    jl_Object.call(this);
}
function otjb_Window_addEventListener$exported$0(var$0, var$1, var$2) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_removeEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_get$exported$2(var$0, var$1) {
    return var$0.$get1(var$1);
}
function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function otjb_Window_getLength$exported$5(var$0) {
    return var$0.$getLength();
}
function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function ovncv_APIBridge() {
}
function ovncv_VCommander$VAPIBridge() {
    var a = this; jl_Object.call(a);
    a.$commander = null;
    a.$this$0 = null;
}
function ovncv_VCommander$VAPIBridge_setItem($this, $x, $y, $item) {
    var var$4, var$5, var$6, var$7;
    var$4 = $this.$commander;
    ju_Objects_requireNonNull($item);
    var$5 = var$4.$buffer0.data[$y].data[$x];
    if (!(var$5 === $item ? 1 : var$5 !== null ? ovncv_VCommander$Item_equals(var$5, $item) : $item !== null ? 0 : 1)) {
        var$4.$buffer0.data[$y].data[$x] = $item;
        var$4 = var$4.$content.childNodes[$rt_imul($y, var$4.$width) + $x | 0];
        var$5 = $item.$shadowed ? ovncv_Palete16_color.data[7] : ovncv_Palete16_color.data[$item.$color];
        var$6 = $item.$shadowed ? ovncv_Palete16_color.data[0] : ovncv_Palete16_color.data[$item.$bgcolor];
        $y = $item.$value0;
        $item = new jl_String;
        var$7 = $rt_createCharArray(1);
        var$7.data[0] = $y;
        jl_String__init_0($item, var$7);
        $item = $rt_ustr($item);
        var$4.innerHTML = $item;
        var$4.style.setProperty("color", $rt_ustr(var$5));
        var$4.style.setProperty("background-color", $rt_ustr(var$6));
    }
}
function juf_Consumer() {
}
function ovncv_VCommander$init$lambda$_3_0() {
    jl_Object.call(this);
    this.$_02 = null;
}
function ovncv_VCommander$init$lambda$_3_0_accept(var$0, var$1) {
    var var$2, var$3, var$4, var$5, var$6, var$7;
    var$1 = ovncv_RenderRegistry$_clinit_$lambda$_5_0_apply(var$1, var$0.$_02);
    ju_HashMap_putImpl(ovncv_VCommander_plugins, jl_Class_getName(jl_Object_getClass(var$1)), var$1);
    if (jl_System_errCache === null) {
        var$2 = new ji_PrintStream;
        var$2.$out = new jl_ConsoleOutputStreamStderr;
        var$2.$sb = jl_StringBuilder__init_();
        var$2.$buffer1 = $rt_createCharArray(32);
        var$2.$autoFlush = 0;
        var$3 = new jnci_UTF8Charset;
        var$4 = $rt_createArray(jl_String, 0);
        var$5 = var$4.data;
        jnc_Charset_checkCanonicalName($rt_s(12));
        var$6 = var$5.length;
        var$7 = 0;
        while (var$7 < var$6) {
            jnc_Charset_checkCanonicalName(var$5[var$7]);
            var$7 = var$7 + 1 | 0;
        }
        var$3.$canonicalName = $rt_s(12);
        var$3.$aliases = var$4.$clone();
        var$2.$charset = var$3;
        jl_System_errCache = var$2;
    }
    ji_PrintStream_println(jl_System_errCache, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(13)), jl_Class_getName(jl_Object_getClass(var$1)))));
}
function ovncv_Application() {
    var a = this; jl_Object.call(a);
    a.$api = null;
    a.$content0 = null;
}
function ovncv_Application_setContent($this, $content) {
    $this.$content0 = ju_Objects_requireNonNull($content);
    ovncv_RenderRegistry_registerApplication(ovncv_VCommander_getPlugin($rt_cls(ovncv_RenderRegistry)), $this);
}
function ovncv_Application_render($this) {
    if ($this.$content0 !== null && $this.$api !== null)
        ovncvc_Label_render($this.$content0, $this.$api);
}
function ovncv_Main() {
    ovncv_Application.call(this);
}
function ovncv_Main_exec($this) {
    var $label;
    $label = new ovncvc_Label;
    ovncvc_Label_setValue($label, $rt_s(14));
    ovncv_Application_setContent($this, $label);
}
function ju_Map$Entry() {
}
function ju_MapEntry() {
    var a = this; jl_Object.call(a);
    a.$key = null;
    a.$value1 = null;
}
function ju_HashMap$HashEntry() {
    var a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next0 = null;
}
function ju_Objects() {
    jl_Object.call(this);
}
function ju_Objects_requireNonNull($obj) {
    if ($obj !== null)
        return $obj;
    $obj = new jl_NullPointerException;
    jl_Throwable__init_($obj, $rt_s(15));
    $rt_throw($obj);
}
function jl_NumberFormatException() {
    jl_IllegalArgumentException.call(this);
}
function jl_NullPointerException() {
    jl_RuntimeException.call(this);
}
function otpp_ResourceAccessor() {
    jl_Object.call(this);
}
function otciu_UnicodeHelper() {
    jl_Object.call(this);
}
function otci_CharFlow() {
    var a = this; jl_Object.call(a);
    a.$characters0 = null;
    a.$pointer = 0;
}
function otci_Base46() {
    jl_Object.call(this);
}
function otci_Base46_decode($seq) {
    var $number, var$3, var$4, var$5, var$6, $result;
    $number = 0;
    var$3 = 1;
    while (true) {
        var$4 = $seq.$characters0.data;
        var$5 = $seq.$pointer;
        $seq.$pointer = var$5 + 1 | 0;
        var$5 = var$4[var$5];
        var$6 = var$5 < 34 ? var$5 - 32 | 0 : var$5 >= 92 ? (var$5 - 32 | 0) - 2 | 0 : (var$5 - 32 | 0) - 1 | 0;
        $result = (var$6 % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul(var$3, var$6 / 2 | 0) | 0;
        var$3 = var$3 * 46 | 0;
        if (!$result)
            break;
    }
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result;
    return $result;
}
function ovncvc_Component() {
    jl_Object.call(this);
    this.$width0 = 0;
}
function ovncvc_Label() {
    ovncvc_Component.call(this);
    this.$value2 = null;
}
function ovncvc_Label_setValue($this, $value) {
    $this.$value2 = $value;
    ovncv_RenderRegistry_invokeRender(ovncv_VCommander_getPlugin($rt_cls(ovncv_RenderRegistry)));
}
function ovncvc_Label_getWidth($this) {
    return $this.$width0 > 0 ? $this.$width0 : $this.$value2 === null ? 0 : jl_String_length($this.$value2);
}
function ovncvc_Label_render($this, $api) {
    var $i;
    if ($this.$value2 === null)
        return;
    $i = 0;
    while ($i < ovncvc_Label_getWidth($this)) {
        ovncv_VCommander$VAPIBridge_setItem($api, $i, 0, ovncv_VCommander$Item__init_(jl_String_charAt($this.$value2, $i), 7, 0, 0));
        $i = $i + 1 | 0;
    }
}
function jl_Math() {
    jl_Object.call(this);
}
function jl_Math_min($a, $b) {
    if ($a < $b)
        $b = $a;
    return $b;
}
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
function ju_Arrays() {
    jl_Object.call(this);
}
function ju_Iterator() {
}
function ju_AbstractList$1() {
    var a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount0 = 0;
    a.$size = 0;
    a.$removeIndex = 0;
    a.$this$00 = null;
}
function ju_AbstractList$1_hasNext($this) {
    return $this.$index >= $this.$size ? 0 : 1;
}
function ju_AbstractList$1_next($this) {
    var var$1, var$2;
    if ($this.$modCount0 < $this.$this$00.$modCount) {
        var$1 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    $this.$removeIndex = $this.$index;
    var$1 = $this.$this$00;
    var$2 = $this.$index;
    $this.$index = var$2 + 1 | 0;
    return ju_ArrayList_get(var$1, var$2);
}
function ovncv_Plugin() {
    jl_Object.call(this);
    this.$apiBridge = null;
}
function ovncv_RenderRegistry() {
    var a = this; ovncv_Plugin.call(a);
    a.$application = null;
    a.$invoke = 0;
}
function ovncv_RenderRegistry_registerApplication($this, $application) {
    $this.$application = ju_Objects_requireNonNull($application);
}
function ovncv_RenderRegistry_invokeRender($this) {
    var $timer, var$2;
    if (!$this.$invoke) {
        $this.$invoke = 1;
        $timer = new ju_Timer;
        var$2 = new ju_HashSet;
        var$2.$backingMap = ju_HashMap__init_();
        $timer.$tasks = var$2;
        var$2 = new ovncv_RenderRegistry$1;
        var$2.$this$01 = $this;
        var$2.$nativeTimerId = (-1);
        ju_Timer_schedule($timer, var$2, Long_ZERO);
    }
}
function ovncv_RenderRegistry__clinit_() {
    var var$1;
    var$1 = new ovncv_RenderRegistry$_clinit_$lambda$_5_0;
    ju_ArrayList_add(ovncv_VCommander_pluginsProviders, ju_Objects_requireNonNull(var$1));
}
function jl_System() {
    jl_Object.call(this);
}
var jl_System_errCache = null;
function jl_System_currentTimeMillis() {
    return Long_fromNumber(new Date().getTime());
}
function jl_AutoCloseable() {
}
function ji_Closeable() {
}
function ji_Flushable() {
}
function ji_OutputStream() {
    jl_Object.call(this);
}
function ji_OutputStream_write($this, $b, $off, $len) {
    var $i, var$5, var$6;
    $i = 0;
    while ($i < $len) {
        var$5 = $b.data;
        var$6 = $off + 1 | 0;
        jl_ConsoleOutputStreamStderr_write($this, var$5[$off]);
        $i = $i + 1 | 0;
        $off = var$6;
    }
}
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out = null;
}
function ji_PrintStream() {
    var a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$errorState = 0;
    a.$sb = null;
    a.$buffer1 = null;
    a.$charset = null;
}
function ji_PrintStream_write($this, $b, $off, $len) {
    var $$je;
    if ($this.$out === null)
        $this.$errorState = 1;
    if (!($this.$errorState ? 0 : 1))
        return;
    a: {
        try {
            ji_OutputStream_write($this.$out, $b, $off, $len);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
            } else {
                throw $$e;
            }
        }
        $this.$errorState = 1;
    }
}
function ji_PrintStream_println($this, $s) {
    var var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    jl_StringBuilder_append1(jl_StringBuilder_append($this.$sb, $s), 10);
    var$2 = jl_StringBuilder_length($this.$sb) <= $this.$buffer1.data.length ? $this.$buffer1 : $rt_createCharArray(jl_StringBuilder_length($this.$sb));
    var$3 = var$2.data;
    jl_StringBuilder_getChars($this.$sb, 0, jl_StringBuilder_length($this.$sb), var$2, 0);
    var$4 = jl_StringBuilder_length($this.$sb) - 0 | 0;
    var$5 = new jn_CharBufferOverArray;
    var$6 = var$3.length;
    var$4 = 0 + var$4 | 0;
    jn_Buffer__init_(var$5, var$6);
    var$5.$position = 0;
    var$5.$limit = var$4;
    var$5.$start = 0;
    var$5.$readOnly = 0;
    var$5.$array0 = var$2;
    var$2 = $rt_createByteArray(jl_Math_max(16, jl_Math_min(var$6, 1024)));
    var$4 = var$2.data.length;
    var$7 = new jn_ByteBufferImpl;
    var$8 = 0 + var$4 | 0;
    jn_Buffer__init_(var$7, var$4);
    var$7.$order = jn_ByteOrder_BIG_ENDIAN;
    var$7.$start0 = 0;
    var$7.$array1 = var$2;
    var$7.$position = 0;
    var$7.$limit = var$8;
    var$7.$direct = 0;
    var$7.$readOnly0 = 0;
    $s = jnc_CharsetEncoder_onUnmappableCharacter(jnc_CharsetEncoder_onMalformedInput(jnci_UTF8Charset_newEncoder($this.$charset), jnc_CodingErrorAction_REPLACE), jnc_CodingErrorAction_REPLACE);
    while (true) {
        var$9 = jnc_CoderResult_isOverflow(jnc_CharsetEncoder_encode($s, var$5, var$7, 1));
        ji_PrintStream_write($this, var$2, 0, var$7.$position);
        jn_Buffer_clear(var$7);
        if (!var$9)
            break;
    }
    while (true) {
        var$9 = jnc_CoderResult_isOverflow(jnc_CharsetEncoder_flush($s, var$7));
        ji_PrintStream_write($this, var$2, 0, var$7.$position);
        jn_Buffer_clear(var$7);
        if (!var$9)
            break;
    }
    jl_StringBuilder_setLength($this.$sb, 0);
}
function jl_ConsoleOutputStreamStderr() {
    ji_OutputStream.call(this);
}
function jl_ConsoleOutputStreamStderr_write($this, $b) {
    $rt_putStderr($b);
}
function juf_Function() {
}
function ovncv_RenderRegistry$_clinit_$lambda$_5_0() {
    jl_Object.call(this);
}
function ovncv_RenderRegistry$_clinit_$lambda$_5_0_apply(var$0, var$1) {
    var var$2;
    var$1 = var$1;
    var$2 = new ovncv_RenderRegistry;
    var$2.$apiBridge = ju_Objects_requireNonNull(var$1);
    return var$2;
}
function jnc_Charset() {
    var a = this; jl_Object.call(a);
    a.$canonicalName = null;
    a.$aliases = null;
}
function jnc_Charset_checkCanonicalName($name) {
    var $i, $c;
    if (jl_String_isEmpty($name))
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    if (!jnc_Charset_isValidCharsetStart(jl_String_charAt($name, 0)))
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    $i = 1;
    while ($i < jl_String_length($name)) {
        a: {
            $c = jl_String_charAt($name, $i);
            switch ($c) {
                case 43:
                case 45:
                case 46:
                case 58:
                case 95:
                    break;
                default:
                    if (jnc_Charset_isValidCharsetStart($c))
                        break a;
                    else
                        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
            }
        }
        $i = $i + 1 | 0;
    }
}
function jnc_Charset_isValidCharsetStart($c) {
    return !($c >= 48 && $c <= 57) && !($c >= 97 && $c <= 122) && $c < 65 && $c > 90 ? 0 : 1;
}
function jnci_UTF8Charset() {
    jnc_Charset.call(this);
}
function jnci_UTF8Charset_newEncoder($this) {
    var var$1, var$2, var$3, var$4, var$5;
    var$1 = new jnci_UTF8Encoder;
    var$2 = $rt_createByteArray(1);
    var$3 = var$2.data;
    var$3[0] = 63;
    var$1.$malformedAction = jnc_CodingErrorAction_REPORT;
    var$1.$unmappableAction = jnc_CodingErrorAction_REPORT;
    var$4 = var$3.length;
    if (var$4 && var$4 >= var$1.$maxBytesPerChar) {
        var$1.$charset0 = $this;
        var$1.$replacement = var$2.$clone();
        var$1.$averageBytesPerChar = 2.0;
        var$1.$maxBytesPerChar = 4.0;
        return var$1;
    }
    var$5 = new jl_IllegalArgumentException;
    jl_Throwable__init_(var$5, $rt_s(16));
    $rt_throw(var$5);
}
function jnc_IllegalCharsetNameException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName = null;
}
function jnc_IllegalCharsetNameException__init_(var_0) {
    var var_1 = new jnc_IllegalCharsetNameException();
    jnc_IllegalCharsetNameException__init_0(var_1, var_0);
    return var_1;
}
function jnc_IllegalCharsetNameException__init_0($this, $charsetName) {
    jl_Exception__init_($this);
    $this.$charsetName = $charsetName;
}
function jl_CloneNotSupportedException() {
    jl_Exception.call(this);
}
function ju_ConcurrentModificationException() {
    jl_RuntimeException.call(this);
}
function jn_Buffer() {
    var a = this; jl_Object.call(a);
    a.$capacity = 0;
    a.$position = 0;
    a.$limit = 0;
    a.$mark = 0;
}
function jn_Buffer__init_0(var_0) {
    var var_1 = new jn_Buffer();
    jn_Buffer__init_(var_1, var_0);
    return var_1;
}
function jn_Buffer__init_($this, $capacity) {
    $this.$mark = (-1);
    $this.$capacity = $capacity;
    $this.$limit = $capacity;
}
function jn_Buffer_position($this) {
    return $this.$position;
}
function jn_Buffer_position0($this, $newPosition) {
    var var$2;
    if ($newPosition >= 0 && $newPosition <= $this.$limit) {
        $this.$position = $newPosition;
        if ($newPosition < $this.$mark)
            $this.$mark = 0;
        return $this;
    }
    var$2 = new jl_IllegalArgumentException;
    jl_Throwable__init_(var$2, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(17)), $newPosition), $rt_s(18)), $this.$limit), $rt_s(19))));
    $rt_throw(var$2);
}
function jn_Buffer_clear($this) {
    $this.$position = 0;
    $this.$limit = $this.$capacity;
    $this.$mark = (-1);
    return $this;
}
function jn_Buffer_remaining($this) {
    return $this.$limit - $this.$position | 0;
}
function jn_Buffer_hasRemaining($this) {
    return $this.$position >= $this.$limit ? 0 : 1;
}
function jl_Readable() {
}
function jn_CharBuffer() {
    jn_Buffer.call(this);
}
function jn_CharBuffer_get($this, $dst, $offset, $length) {
    var var$4, var$5, $pos, var$7, $i, var$9, var$10;
    if ($offset >= 0) {
        var$4 = $dst.data;
        var$5 = var$4.length;
        if ($offset < var$5) {
            $pos = $offset + $length | 0;
            if ($pos > var$5) {
                var$7 = new jl_IndexOutOfBoundsException;
                jl_Throwable__init_(var$7, jl_StringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(20)), $pos), $rt_s(21)), var$5)));
                $rt_throw(var$7);
            }
            if (jn_Buffer_remaining($this) < $length) {
                var$7 = new jn_BufferUnderflowException;
                jl_Exception__init_(var$7);
                $rt_throw(var$7);
            }
            if ($length < 0) {
                var$7 = new jl_IndexOutOfBoundsException;
                jl_Throwable__init_(var$7, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(22)), $length), $rt_s(23))));
                $rt_throw(var$7);
            }
            $pos = $this.$position;
            $i = 0;
            while ($i < $length) {
                var$9 = $offset + 1 | 0;
                var$5 = $pos + 1 | 0;
                var$4[$offset] = jn_CharBufferOverArray_getChar($this, $pos);
                $i = $i + 1 | 0;
                $offset = var$9;
                $pos = var$5;
            }
            $this.$position = $this.$position + $length | 0;
            return $this;
        }
    }
    $dst = $dst.data;
    var$10 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_(var$10, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(24)), $offset), $rt_s(18)), $dst.length), $rt_s(25))));
    $rt_throw(var$10);
}
function jn_ByteBuffer() {
    var a = this; jn_Buffer.call(a);
    a.$start0 = 0;
    a.$array1 = null;
    a.$order = null;
}
function jn_ByteBuffer_put($this, $src, $offset, $length) {
    var var$4, var$5, var$6, $pos, $i, var$9, var$10;
    if (!$length)
        return $this;
    if ($this.$readOnly0) {
        var$4 = new jn_ReadOnlyBufferException;
        jl_Exception__init_(var$4);
        $rt_throw(var$4);
    }
    if (jn_Buffer_remaining($this) < $length) {
        var$4 = new jn_BufferOverflowException;
        jl_Exception__init_(var$4);
        $rt_throw(var$4);
    }
    if ($offset >= 0) {
        var$5 = $src.data;
        var$6 = var$5.length;
        if ($offset < var$6) {
            $pos = $offset + $length | 0;
            if ($pos > var$6) {
                var$4 = new jl_IndexOutOfBoundsException;
                jl_Throwable__init_(var$4, jl_StringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(26)), $pos), $rt_s(21)), var$6)));
                $rt_throw(var$4);
            }
            if ($length < 0) {
                var$4 = new jl_IndexOutOfBoundsException;
                jl_Throwable__init_(var$4, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(22)), $length), $rt_s(23))));
                $rt_throw(var$4);
            }
            $pos = $this.$position + $this.$start0 | 0;
            $i = 0;
            while ($i < $length) {
                $src = $this.$array1.data;
                var$9 = $pos + 1 | 0;
                var$6 = $offset + 1 | 0;
                $src[$pos] = var$5[$offset];
                $i = $i + 1 | 0;
                $pos = var$9;
                $offset = var$6;
            }
            $this.$position = $this.$position + $length | 0;
            return $this;
        }
    }
    $src = $src.data;
    var$10 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_(var$10, jl_StringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(24)), $offset), $rt_s(18)), $src.length), $rt_s(25))));
    $rt_throw(var$10);
}
function jn_ByteBuffer_put0($this, $src) {
    return jn_ByteBuffer_put($this, $src, 0, $src.data.length);
}
function jnc_CodingErrorAction() {
    jl_Object.call(this);
    this.$name0 = null;
}
var jnc_CodingErrorAction_IGNORE = null;
var jnc_CodingErrorAction_REPLACE = null;
var jnc_CodingErrorAction_REPORT = null;
function jnc_CodingErrorAction__init_(var_0) {
    var var_1 = new jnc_CodingErrorAction();
    jnc_CodingErrorAction__init_0(var_1, var_0);
    return var_1;
}
function jnc_CodingErrorAction__init_0($this, $name) {
    $this.$name0 = $name;
}
function jnc_CodingErrorAction__clinit_() {
    jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(27));
    jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(28));
    jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(29));
}
function jn_CharBufferImpl() {
    jn_CharBuffer.call(this);
}
function jn_CharBufferOverArray() {
    var a = this; jn_CharBufferImpl.call(a);
    a.$readOnly = 0;
    a.$start = 0;
    a.$array0 = null;
}
function jn_CharBufferOverArray_getChar($this, $index) {
    return $this.$array0.data[$index + $this.$start | 0];
}
function jnc_CharsetEncoder() {
    var a = this; jl_Object.call(a);
    a.$charset0 = null;
    a.$replacement = null;
    a.$averageBytesPerChar = 0.0;
    a.$maxBytesPerChar = 0.0;
    a.$malformedAction = null;
    a.$unmappableAction = null;
    a.$status = 0;
}
function jnc_CharsetEncoder_onMalformedInput($this, $newAction) {
    var var$2;
    if ($newAction !== null) {
        $this.$malformedAction = $newAction;
        return $this;
    }
    var$2 = new jl_IllegalArgumentException;
    jl_Throwable__init_(var$2, $rt_s(30));
    $rt_throw(var$2);
}
function jnc_CharsetEncoder_implOnMalformedInput($this, $newAction) {
    return;
}
function jnc_CharsetEncoder_onUnmappableCharacter($this, $newAction) {
    var var$2;
    if ($newAction !== null) {
        $this.$unmappableAction = $newAction;
        return $this;
    }
    var$2 = new jl_IllegalArgumentException;
    jl_Throwable__init_(var$2, $rt_s(30));
    $rt_throw(var$2);
}
function jnc_CharsetEncoder_implOnUnmappableCharacter($this, $newAction) {
    return;
}
function jnc_CharsetEncoder_encode($this, $in, $out, $endOfInput) {
    var $result, $e, $remaining, $action, $$je;
    a: {
        if ($this.$status != 3) {
            if ($endOfInput)
                break a;
            if ($this.$status != 2)
                break a;
        }
        $in = new jl_IllegalStateException;
        jl_Exception__init_($in);
        $rt_throw($in);
    }
    $this.$status = !$endOfInput ? 1 : 2;
    while (true) {
        try {
            $result = jnci_BufferedEncoder_encodeLoop($this, $in, $out);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_RuntimeException) {
                $e = $$je;
                $in = new jnc_CoderMalfunctionError;
                $in.$suppressionEnabled = 1;
                $in.$writableStackTrace = 1;
                $in.$cause = $e;
                $rt_throw($in);
            } else {
                throw $$e;
            }
        }
        if (jnc_CoderResult_isUnderflow($result)) {
            if (!$endOfInput)
                return $result;
            $remaining = jn_Buffer_remaining($in);
            if ($remaining <= 0)
                return $result;
            $result = jnc_CoderResult_malformedForLength($remaining);
        } else if (jnc_CoderResult_isOverflow($result))
            break;
        $action = !jnc_CoderResult_isUnmappable($result) ? $this.$malformedAction : $this.$unmappableAction;
        b: {
            if ($action !== jnc_CodingErrorAction_REPLACE) {
                if ($action === jnc_CodingErrorAction_IGNORE)
                    break b;
                else
                    return $result;
            }
            if (jn_Buffer_remaining($out) < $this.$replacement.data.length)
                return jnc_CoderResult_OVERFLOW;
            jn_ByteBuffer_put0($out, $this.$replacement);
        }
        jn_Buffer_position0($in, $in.$position + jnc_CoderResult_length($result) | 0);
    }
    return $result;
}
function jnc_CharsetEncoder_flush($this, $out) {
    var $result;
    if ($this.$status != 2 && $this.$status != 4) {
        $out = new jl_IllegalStateException;
        jl_Exception__init_($out);
        $rt_throw($out);
    }
    $result = jnc_CoderResult_UNDERFLOW;
    if ($result === jnc_CoderResult_UNDERFLOW)
        $this.$status = 3;
    return $result;
}
function jnc_CharsetEncoder_implFlush($this, $out) {
    return jnc_CoderResult_UNDERFLOW;
}
function jnc_CoderResult() {
    var a = this; jl_Object.call(a);
    a.$kind = 0;
    a.$length1 = 0;
}
var jnc_CoderResult_UNDERFLOW = null;
var jnc_CoderResult_OVERFLOW = null;
function jnc_CoderResult__init_(var_0, var_1) {
    var var_2 = new jnc_CoderResult();
    jnc_CoderResult__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnc_CoderResult__init_0($this, $kind, $length) {
    $this.$kind = $kind;
    $this.$length1 = $length;
}
function jnc_CoderResult_isUnderflow($this) {
    return $this.$kind ? 0 : 1;
}
function jnc_CoderResult_isOverflow($this) {
    return $this.$kind != 1 ? 0 : 1;
}
function jnc_CoderResult_isError($this) {
    return !jnc_CoderResult_isMalformed($this) && !jnc_CoderResult_isUnmappable($this) ? 0 : 1;
}
function jnc_CoderResult_isMalformed($this) {
    return $this.$kind != 2 ? 0 : 1;
}
function jnc_CoderResult_isUnmappable($this) {
    return $this.$kind != 3 ? 0 : 1;
}
function jnc_CoderResult_length($this) {
    var var$1;
    if (jnc_CoderResult_isError($this))
        return $this.$length1;
    var$1 = new jl_UnsupportedOperationException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
}
function jnc_CoderResult_malformedForLength($length) {
    return jnc_CoderResult__init_(2, $length);
}
function jnc_CoderResult__clinit_() {
    jnc_CoderResult_UNDERFLOW = jnc_CoderResult__init_(0, 0);
    jnc_CoderResult_OVERFLOW = jnc_CoderResult__init_(1, 0);
}
function jn_ByteBufferImpl() {
    var a = this; jn_ByteBuffer.call(a);
    a.$direct = 0;
    a.$readOnly0 = 0;
}
function jn_ByteBufferImpl_isReadOnly($this) {
    return $this.$readOnly0;
}
function jn_ByteOrder() {
    jl_Object.call(this);
    this.$name1 = null;
}
var jn_ByteOrder_BIG_ENDIAN = null;
var jn_ByteOrder_LITTLE_ENDIAN = null;
function jn_ByteOrder__init_(var_0) {
    var var_1 = new jn_ByteOrder();
    jn_ByteOrder__init_0(var_1, var_0);
    return var_1;
}
function jn_ByteOrder__init_0($this, $name) {
    $this.$name1 = $name;
}
function jn_ByteOrder__clinit_() {
    jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(31));
    jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(32));
}
function jnci_BufferedEncoder() {
    jnc_CharsetEncoder.call(this);
}
function jnci_BufferedEncoder_encodeLoop($this, $in, $out) {
    var $inArray, var$4, $inPos, $inSize, $outArray, var$8, $i, $outSize, var$11, $controller;
    $inArray = $rt_createCharArray(jl_Math_min(jn_Buffer_remaining($in), 512));
    var$4 = $inArray.data;
    $inPos = 0;
    $inSize = 0;
    $outArray = $rt_createByteArray(jl_Math_min(jn_Buffer_remaining($out), 512));
    var$8 = $outArray.data;
    a: {
        while (true) {
            if (($inPos + 32 | 0) > $inSize && jn_Buffer_hasRemaining($in)) {
                $i = $inPos;
                while ($i < $inSize) {
                    var$4[$i - $inPos | 0] = var$4[$i];
                    $i = $i + 1 | 0;
                }
                $outSize = $inSize - $inPos | 0;
                $inSize = jl_Math_min(jn_Buffer_remaining($in) + $outSize | 0, var$4.length);
                jn_CharBuffer_get($in, $inArray, $outSize, $inSize - $outSize | 0);
                $inPos = 0;
            }
            if (!jn_Buffer_hasRemaining($out)) {
                var$11 = !jn_Buffer_hasRemaining($in) && $inPos >= $inSize ? jnc_CoderResult_UNDERFLOW : jnc_CoderResult_OVERFLOW;
                break a;
            }
            $outSize = jl_Math_min(jn_Buffer_remaining($out), var$8.length);
            $controller = new jnci_BufferedEncoder$Controller;
            $controller.$in = $in;
            $controller.$out0 = $out;
            var$11 = jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, 0, $outSize, $controller);
            $inPos = $controller.$inPosition;
            if (var$11 === null && 0 == $controller.$outPosition)
                var$11 = jnc_CoderResult_UNDERFLOW;
            jn_ByteBuffer_put($out, $outArray, 0, $controller.$outPosition);
            if (var$11 !== null)
                break;
        }
    }
    jn_Buffer_position0($in, $in.$position - ($inSize - $inPos | 0) | 0);
    return var$11;
}
function jnci_UTF8Encoder() {
    jnci_BufferedEncoder.call(this);
}
function jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) {
    var $result, var$9, var$10, $ch, $low, $codePoint, var$14;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize) {
                var$9 = $inPos;
                break a;
            }
            var$10 = $inArray.data;
            var$9 = $inPos + 1 | 0;
            $ch = var$10[$inPos];
            if ($ch < 128) {
                var$10 = $outArray.data;
                $low = $outPos + 1 | 0;
                var$10[$outPos] = $ch << 24 >> 24;
            } else if ($ch < 2048) {
                if (($outPos + 2 | 0) > $outSize) {
                    var$9 = var$9 + (-1) | 0;
                    if (jnci_BufferedEncoder$Controller_hasMoreOutput($controller, 2))
                        break a;
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                $inPos = $outPos + 1 | 0;
                var$10[$outPos] = (192 | $ch >> 6) << 24 >> 24;
                $low = $inPos + 1 | 0;
                var$10[$inPos] = (128 | $ch & 63) << 24 >> 24;
            } else if (!(!jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1)) {
                if (($outPos + 3 | 0) > $outSize) {
                    var$9 = var$9 + (-1) | 0;
                    if (jnci_BufferedEncoder$Controller_hasMoreOutput($controller, 3))
                        break a;
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                $low = $outPos + 1 | 0;
                var$10[$outPos] = (224 | $ch >> 12) << 24 >> 24;
                $outPos = $low + 1 | 0;
                var$10[$low] = (128 | $ch >> 6 & 63) << 24 >> 24;
                $low = $outPos + 1 | 0;
                var$10[$outPos] = (128 | $ch & 63) << 24 >> 24;
            } else {
                if (!jl_Character_isHighSurrogate($ch)) {
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (var$9 >= $inSize) {
                    if (jnci_BufferedEncoder$Controller_hasMoreInput($controller))
                        break a;
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                $inPos = var$9 + 1 | 0;
                $low = var$10[var$9];
                if (!jl_Character_isLowSurrogate($low)) {
                    var$9 = $inPos + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (($outPos + 4 | 0) > $outSize) {
                    var$9 = $inPos + (-2) | 0;
                    if (jnci_BufferedEncoder$Controller_hasMoreOutput($controller, 4))
                        break a;
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                $codePoint = (($ch & 1023) << 10 | $low & 1023) + 65536 | 0;
                $low = $outPos + 1 | 0;
                var$10[$outPos] = (240 | $codePoint >> 18) << 24 >> 24;
                var$14 = $low + 1 | 0;
                var$10[$low] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                var$9 = var$14 + 1 | 0;
                var$10[var$14] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                $low = var$9 + 1 | 0;
                var$10[var$9] = (128 | $codePoint & 63) << 24 >> 24;
                var$9 = $inPos;
            }
            $inPos = var$9;
            $outPos = $low;
        }
        var$9 = $inPos;
    }
    $controller.$inPosition = var$9;
    $controller.$outPosition = $outPos;
    return $result;
}
function ji_IOException() {
    jl_Exception.call(this);
}
function jlr_Array() {
    jl_Object.call(this);
}
function jlr_Array_newInstanceImpl(var$1, var$2) {
    if (var$1.$meta.primitive) {
        if (var$1 == $rt_bytecls()) {
            return $rt_createByteArray(var$2);
        }
        if (var$1 == $rt_shortcls()) {
            return $rt_createShortArray(var$2);
        }
        if (var$1 == $rt_charcls()) {
            return $rt_createCharArray(var$2);
        }
        if (var$1 == $rt_intcls()) {
            return $rt_createIntArray(var$2);
        }
        if (var$1 == $rt_longcls()) {
            return $rt_createLongArray(var$2);
        }
        if (var$1 == $rt_floatcls()) {
            return $rt_createFloatArray(var$2);
        }
        if (var$1 == $rt_doublecls()) {
            return $rt_createDoubleArray(var$2);
        }
        if (var$1 == $rt_booleancls()) {
            return $rt_createBooleanArray(var$2);
        }
    } else {
        return $rt_createArray(var$1, var$2)
    }
}
function jl_NegativeArraySizeException() {
    jl_RuntimeException.call(this);
}
function ju_Timer() {
    var a = this; jl_Object.call(a);
    a.$tasks = null;
    a.$cancelled = 0;
}
function ju_Timer_schedule($this, $task, $delay) {
    var var$3, var$4;
    if (!$this.$cancelled && $task.$timer === null && $task.$nativeTimerId < 0) {
        $task.$timer = $this;
        var$3 = new ju_Timer$schedule$lambda$_3_0;
        var$3.$_03 = $this;
        var$3.$_10 = $task;
        var$4 = $delay.lo;
        $task.$nativeTimerId = setTimeout(otji_JS_function(var$3, "onTimer"), var$4);
        return;
    }
    $task = new jl_IllegalStateException;
    jl_Exception__init_($task);
    $rt_throw($task);
}
function jl_Runnable() {
}
function ju_TimerTask() {
    var a = this; jl_Object.call(a);
    a.$timer = null;
    a.$nativeTimerId = 0;
}
function ovncv_RenderRegistry$1() {
    ju_TimerTask.call(this);
    this.$this$01 = null;
}
function ovncv_RenderRegistry$1_run($this) {
    if ($this.$this$01.$application !== null)
        ovncv_Application_render($this.$this$01.$application);
    $this.$this$01.$invoke = 0;
}
function ju_Set() {
}
function ju_AbstractSet() {
    ju_AbstractCollection.call(this);
}
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
function ju_HashSet_remove($this, $object) {
    return ju_HashMap_remove($this.$backingMap, $object) === null ? 0 : 1;
}
function jl_IllegalStateException() {
    jl_Exception.call(this);
}
function jnc_CoderMalfunctionError() {
    jl_Error.call(this);
}
function otjb_TimerHandler() {
}
function ju_Timer$schedule$lambda$_3_0() {
    var a = this; jl_Object.call(a);
    a.$_03 = null;
    a.$_10 = null;
}
function ju_Timer$schedule$lambda$_3_0_onTimer(var$0) {
    var var$1, var$2, var$3, var$4;
    var$1 = var$0.$_03;
    var$2 = var$0.$_10;
    var$3 = new jl_Thread;
    var$4 = new ju_Timer$lambda$schedule$1$lambda$_6_0;
    var$4.$_04 = var$1;
    var$4.$_11 = var$2;
    jl_Thread__init_(var$3, var$4, null);
    jl_Thread_start(var$3);
}
function ju_Timer$schedule$lambda$_3_0_onTimer$exported$0(var$0) {
    ju_Timer$schedule$lambda$_3_0_onTimer(var$0);
}
function jl_UnsupportedOperationException() {
    jl_RuntimeException.call(this);
}
function jnci_BufferedEncoder$Controller() {
    var a = this; jl_Object.call(a);
    a.$in = null;
    a.$out0 = null;
    a.$inPosition = 0;
    a.$outPosition = 0;
}
function jnci_BufferedEncoder$Controller_hasMoreInput($this) {
    return jn_Buffer_hasRemaining($this.$in);
}
function jnci_BufferedEncoder$Controller_hasMoreOutput($this, $sz) {
    return jn_Buffer_remaining($this.$out0) < $sz ? 0 : 1;
}
function jnci_BufferedEncoder$Controller_setInPosition($this, $inPosition) {
    $this.$inPosition = $inPosition;
}
function jnci_BufferedEncoder$Controller_setOutPosition($this, $outPosition) {
    $this.$outPosition = $outPosition;
}
function jl_Thread() {
    var a = this; jl_Object.call(a);
    a.$id = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name2 = null;
    a.$alive = 0;
    a.$target = null;
}
var jl_Thread_mainThread = null;
var jl_Thread_currentThread0 = null;
var jl_Thread_nextId = Long_ZERO;
var jl_Thread_activeCount = 0;
function jl_Thread__init_0(var_0, var_1) {
    var var_2 = new jl_Thread();
    jl_Thread__init_(var_2, var_0, var_1);
    return var_2;
}
function jl_Thread__init_($this, $target, $name) {
    var var$3;
    $this.$finishedLock = new jl_Object;
    $this.$alive = 1;
    $this.$name2 = $name;
    $this.$target = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = Long_add(var$3, Long_fromInt(1));
    $this.$id = var$3;
}
function jl_Thread_start($this) {
    var var$1;
    var$1 = new jl_Thread$start$lambda$_4_0;
    var$1.$_05 = $this;
    otp_Platform_startThread(var$1);
}
function jl_Thread_setCurrentThread($thread) {
    if (jl_Thread_currentThread0 !== $thread)
        jl_Thread_currentThread0 = $thread;
    jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
}
function jl_Thread_run($this) {
    if ($this.$target !== null)
        ju_Timer$lambda$schedule$1$lambda$_6_0_run($this.$target);
}
function jl_Thread_currentThread() {
    return jl_Thread_currentThread0;
}
function jl_Thread__clinit_() {
    jl_Thread_mainThread = jl_Thread__init_0(null, $rt_s(33));
    jl_Thread_currentThread0 = jl_Thread_mainThread;
    jl_Thread_nextId = Long_fromInt(1);
    jl_Thread_activeCount = 1;
}
function ju_Timer$lambda$schedule$1$lambda$_6_0() {
    var a = this; jl_Object.call(a);
    a.$_04 = null;
    a.$_11 = null;
}
function ju_Timer$lambda$schedule$1$lambda$_6_0_run(var$0) {
    var var$1, var$2;
    var$1 = var$0.$_04;
    var$2 = var$0.$_11;
    if (!var$1.$cancelled && var$2.$timer !== null && var$2.$timer !== null) {
        ovncv_RenderRegistry$1_run(var$2);
        ju_HashSet_remove(var$2.$timer.$tasks, var$2);
        var$2.$timer = null;
    }
}
function jn_ReadOnlyBufferException() {
    jl_UnsupportedOperationException.call(this);
}
function jn_BufferOverflowException() {
    jl_RuntimeException.call(this);
}
function jn_BufferUnderflowException() {
    jl_RuntimeException.call(this);
}
function otp_PlatformRunnable() {
}
function jl_Thread$start$lambda$_4_0() {
    jl_Object.call(this);
    this.$_05 = null;
}
function jl_Thread$start$lambda$_4_0_run(var$0) {
    var var$1, var$2, var$3, $$je;
    var$1 = var$0.$_05;
    a: {
        try {
            jl_Thread_activeCount = jl_Thread_activeCount + 1 | 0;
            jl_Thread_setCurrentThread(var$1);
            jl_Thread_run(var$1);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            break a;

        }
        var$2 = var$1.$finishedLock;
        jl_Object_monitorEnterSync(var$2);
        b: {
            try {
                jl_Object_notifyAll(var$1.$finishedLock);
                jl_Object_monitorExitSync(var$2);
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$1 = $$je;

            }
            jl_Object_monitorExitSync(var$2);
            $rt_throw(var$1);
        }
        var$1.$alive = 0;
        jl_Thread_activeCount = jl_Thread_activeCount - 1 | 0;
        jl_Thread_setCurrentThread(jl_Thread_mainThread);
        return;
    }
    var$3 = var$1.$finishedLock;
    jl_Object_monitorEnterSync(var$3);
    c: {
        try {
            jl_Object_notifyAll(var$1.$finishedLock);
            jl_Object_monitorExitSync(var$3);
            break c;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$1 = $$je;

        }
        jl_Object_monitorExitSync(var$3);
        $rt_throw(var$1);
    }
    var$1.$alive = 0;
    jl_Thread_activeCount = jl_Thread_activeCount - 1 | 0;
    jl_Thread_setCurrentThread(jl_Thread_mainThread);
    $rt_throw(var$2);
}
function jl_IllegalMonitorStateException() {
    jl_RuntimeException.call(this);
}
function jl_Object$Monitor() {
    var a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
function otp_PlatformQueue() {
    jl_Object.call(this);
}
function otp_PlatformQueue_isEmpty$static($this) {
    return $this.length ? 0 : 1;
}
function otp_PlatformQueue_remove$static($this) {
    return $this.shift();
}
function jl_Object$monitorExit$lambda$_8_0() {
    jl_Object.call(this);
    this.$_00 = null;
}
function jl_Object$monitorExit$lambda$_8_0_run(var$0) {
    var var$1, var$2, var$3;
    var$1 = var$0.$_00;
    if (!jl_Object_isEmptyMonitor(var$1) && var$1.$monitor.$owner === null) {
        var$2 = var$1.$monitor;
        if (var$2.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static(var$2.$enteringThreads)) {
            var$1 = var$2.$enteringThreads;
            var$3 = otp_PlatformQueue_remove$static(var$1);
            if (var$1 === null)
                var$2.$enteringThreads = null;
            jl_Object$monitorEnterWait$lambda$_6_0_run(var$3);
        }
    }
}
function oti_AsyncCallback() {
}
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
function otpp_AsyncCallbackWrapper_create($realAsyncCallback) {
    var var$2;
    var$2 = new otpp_AsyncCallbackWrapper;
    var$2.$realAsyncCallback = $realAsyncCallback;
    return var$2;
}
function otpp_AsyncCallbackWrapper_complete($this, $result) {
    $this.$realAsyncCallback.$complete($result);
}
function otpp_AsyncCallbackWrapper_error($this, $e) {
    $this.$realAsyncCallback.$error($e);
}
function jl_Object$monitorEnterWait$lambda$_6_0() {
    var a = this; jl_Object.call(a);
    a.$_0 = null;
    a.$_1 = null;
    a.$_2 = 0;
    a.$_3 = null;
}
function jl_Object$monitorEnterWait$lambda$_6_0_run(var$0) {
    var var$1, var$2, var$3, var$4;
    var$1 = var$0.$_0;
    var$2 = var$0.$_1;
    var$3 = var$0.$_2;
    var$4 = var$0.$_3;
    jl_Thread_setCurrentThread(var$1);
    var$2.$monitor.$owner = var$1;
    var$1 = var$2.$monitor;
    var$1.$count = var$1.$count + var$3 | 0;
    otpp_AsyncCallbackWrapper_complete(var$4, null);
}
function ovncv_Palete16() {
    jl_Object.call(this);
}
var ovncv_Palete16_color = null;
function ovncv_Palete16__clinit_() {
    var var$1, var$2;
    var$1 = $rt_createArray(jl_String, 16);
    var$2 = var$1.data;
    var$2[0] = $rt_s(34);
    var$2[1] = $rt_s(35);
    var$2[2] = $rt_s(36);
    var$2[3] = $rt_s(37);
    var$2[4] = $rt_s(38);
    var$2[5] = $rt_s(39);
    var$2[6] = $rt_s(40);
    var$2[7] = $rt_s(41);
    var$2[8] = $rt_s(34);
    var$2[9] = $rt_s(42);
    var$2[10] = $rt_s(43);
    var$2[11] = $rt_s(44);
    var$2[12] = $rt_s(45);
    var$2[13] = $rt_s(46);
    var$2[14] = $rt_s(47);
    var$2[15] = $rt_s(48);
    ovncv_Palete16_color = var$1;
}
$rt_packages([-1, "java", 0, "lang", -1, "org", 2, "vaadin", 3, "nikolay", 4, "client", 5, "vcommander"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, ["$hashCode0", function() { return jl_Object_hashCode(this); }, "$equals", function(var_1) { return jl_Object_equals(this, var_1); }],
ovnc_Client, 0, jl_Object, [], 0, 3, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, ["$equals", function(var_1) { return jl_String_equals(this, var_1); }, "$hashCode0", function() { return jl_String_hashCode(this); }],
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
juf_Supplier, 0, jl_Object, [], 3, 3, 0, 0,
ovnc_Client$main$lambda$_1_0, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0,
ovnc_CustomElement, 0, jl_Object, [], 1, 3, 0, 0,
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
ovncv_VCommander, 0, ovnc_CustomElement, [], 0, 3, 0, 0,
ovncv_VCommander$Item, 0, jl_Object, [], 0, 3, 0, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0]);
$rt_metadata([ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0,
ju_List, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0,
ju_Map, 0, jl_Object, [], 3, 3, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0,
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget], 3, 3, 0, 0,
otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0,
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, ["$addEventListener$exported$0", function(var_1, var_2) { return otjb_Window_addEventListener$exported$0(this, var_1, var_2); }, "$removeEventListener$exported$1", function(var_1, var_2) { return otjb_Window_removeEventListener$exported$1(this, var_1, var_2); }, "$get$exported$2", function(var_1) { return otjb_Window_get$exported$2(this, var_1); }, "$removeEventListener$exported$3", function(var_1,
var_2, var_3) { return otjb_Window_removeEventListener$exported$3(this, var_1, var_2, var_3); }, "$dispatchEvent$exported$4", function(var_1) { return otjb_Window_dispatchEvent$exported$4(this, var_1); }, "$getLength$exported$5", function() { return otjb_Window_getLength$exported$5(this); }, "$addEventListener$exported$6", function(var_1, var_2, var_3) { return otjb_Window_addEventListener$exported$6(this, var_1, var_2, var_3); }],
ovncv_APIBridge, 0, jl_Object, [], 3, 3, 0, 0,
ovncv_VCommander$VAPIBridge, 0, jl_Object, [ovncv_APIBridge], 0, 3, 0, 0,
juf_Consumer, 0, jl_Object, [], 3, 3, 0, 0,
ovncv_VCommander$init$lambda$_3_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, 0,
ovncv_Application, 0, jl_Object, [], 1, 3, 0, 0,
ovncv_Main, 0, ovncv_Application, [], 0, 3, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0,
jl_NumberFormatException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0,
jl_NullPointerException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
otpp_ResourceAccessor, 0, jl_Object, [], 4, 0, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 4, 3, 0, 0,
otci_CharFlow, 0, jl_Object, [], 0, 3, 0, 0,
otci_Base46, 0, jl_Object, [], 4, 3, 0, 0,
ovncvc_Component, 0, jl_Object, [], 1, 3, 0, 0,
ovncvc_Label, 0, ovncvc_Component, [], 0, 3, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0,
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
ovncv_Plugin, 0, jl_Object, [], 1, 3, 0, 0,
ovncv_RenderRegistry, "RenderRegistry", 6, ovncv_Plugin, [], 0, 3, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0,
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, 0,
jl_ConsoleOutputStreamStderr, 0, ji_OutputStream, [], 0, 0, 0, 0,
juf_Function, 0, jl_Object, [], 3, 3, 0, 0,
ovncv_RenderRegistry$_clinit_$lambda$_5_0, 0, jl_Object, [juf_Function], 0, 3, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0]);
$rt_metadata([jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, 0,
jnc_IllegalCharsetNameException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0,
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jn_Buffer, 0, jl_Object, [], 1, 3, 0, 0,
jl_Readable, 0, jl_Object, [], 3, 3, 0, 0,
jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, 0,
jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0,
jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, 0, 0,
jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0,
jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, 0,
jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, 0,
jnc_CoderResult, 0, jl_Object, [], 0, 3, 0, 0,
jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, 0,
jn_ByteOrder, 0, jl_Object, [], 4, 3, 0, 0,
jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, 0,
jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0,
ji_IOException, 0, jl_Exception, [], 0, 3, 0, 0,
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0,
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
ju_Timer, 0, jl_Object, [], 0, 3, 0, 0,
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0,
ju_TimerTask, 0, jl_Object, [jl_Runnable], 1, 3, 0, 0,
ovncv_RenderRegistry$1, 0, ju_TimerTask, [], 0, 0, 0, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0,
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0,
jl_IllegalStateException, 0, jl_Exception, [], 0, 3, 0, 0,
jnc_CoderMalfunctionError, 0, jl_Error, [], 0, 3, 0, 0,
otjb_TimerHandler, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
ju_Timer$schedule$lambda$_3_0, 0, jl_Object, [otjb_TimerHandler], 0, 3, 0, ["$onTimer$exported$0", function() { return ju_Timer$schedule$lambda$_3_0_onTimer$exported$0(this); }],
jl_UnsupportedOperationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0,
ju_Timer$lambda$schedule$1$lambda$_6_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0,
jn_ReadOnlyBufferException, 0, jl_UnsupportedOperationException, [], 0, 3, 0, 0,
jn_BufferOverflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jn_BufferUnderflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Thread$start$lambda$_4_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Thread$start$lambda$_4_0_run(this); }],
jl_IllegalMonitorStateException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0,
otp_PlatformQueue, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
jl_Object$monitorExit$lambda$_8_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$monitorExit$lambda$_8_0_run(this); }],
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0,
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, ["$complete", function(var_1) { otpp_AsyncCallbackWrapper_complete(this, var_1); }, "$error", function(var_1) { otpp_AsyncCallbackWrapper_error(this, var_1); }],
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0,
ovncv_Palete16, 0, jl_Object, [], 0, 3, 0, 0]);
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
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "@", "0", "null", "Index out of bounds", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for int type: ", "String is null or empty", "Illegal radix: ", "ch", "UTF-8", "Register plugin: ", "Hello, World!", "", "Replacement preconditions do not hold", "New position ", " is outside of range [0;", "]", "The last char in dst ", " is outside of array of size ", "Length ", " must be non-negative",
"Offset ", ")", "The last byte in src ", "IGNORE", "REPLACE", "REPORT", "Action must be non-null", "BIG_ENDIAN", "LITTLE_ENDIAN", "main", "#000000", "#0000c9", "#c90000", "#c900c9", "#00c900", "#00c9c9", "#c9c900", "#c9c9c9", "#0000ff", "#ff0000", "#ff00ff", "#00ff00", "#00ffff", "#ffff00", "#ffffff"]);
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
function Long_eq(a, b) {
    return a.hi === b.hi && a.lo === b.lo;
}
function Long_ne(a, b) {
    return a.hi !== b.hi || a.lo !== b.lo;
}
function Long_gt(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x > y;
    }
    return (a.lo & 1) > (b.lo & 1);
}
function Long_ge(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x >= y;
    }
    return (a.lo & 1) >= (b.lo & 1);
}
function Long_lt(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x < y;
    }
    return (a.lo & 1) < (b.lo & 1);
}
function Long_le(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x <= y;
    }
    return (a.lo & 1) <= (b.lo & 1);
}
function Long_add(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo + b.lo);
    } else if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo + b_lolo | 0;
    var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_inc(a) {
    var lo = a.lo + 1 | 0;
    var hi = a.hi;
    if (lo === 0) {
        hi = hi + 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_dec(a) {
    var lo = a.lo - 1 | 0;
    var hi = a.hi;
    if (lo ===  -1) {
        hi = hi - 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_neg(a) {
    return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
}
function Long_sub(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo - b.lo);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo - b_lolo | 0;
    var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_compare(a, b) {
    var r = a.hi - b.hi;
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
function Long_mul(a, b) {
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = 0;
    var lohi = 0;
    var hilo = 0;
    var hihi = 0;
    lolo = a_lolo * b_lolo | 0;
    lohi = lolo >>> 16;
    lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    hihi = hilo >>> 16;
    hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
    var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
    return positive ? result : Long_neg(result);
}
function Long_div(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_divRem(a, b))[0];
}
function Long_udiv(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[0];
}
function Long_rem(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
    }
    return (Long_divRem(a, b))[1];
}
function Long_urem(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[1];
}
function Long_divRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
}
function Long_udivRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return [q, a];
}
function Long_shiftLeft16(a) {
    return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
}
function Long_shiftRight16(a) {
    return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
}
function Long_and(a, b) {
    return new Long(a.lo & b.lo, a.hi & b.hi);
}
function Long_or(a, b) {
    return new Long(a.lo | b.lo, a.hi | b.hi);
}
function Long_xor(a, b) {
    return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
}
function Long_shl(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
    } else if (b === 32) {
        return new Long(0, a.lo);
    } else {
        return new Long(0, a.lo << b - 32);
    }
}
function Long_shr(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
    } else if (b === 32) {
        return new Long(a.hi, a.hi >> 31);
    } else {
        return new Long(a.hi >> b - 32, a.hi >> 31);
    }
}
function Long_shru(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
    } else if (b === 32) {
        return new Long(a.hi, 0);
    } else {
        return new Long(a.hi >>> b - 32, 0);
    }
}
function LongInt(lo, hi, sup) {
    this.lo = lo;
    this.hi = hi;
    this.sup = sup;
}
function LongInt_mul(a, b) {
    var a_lolo = (a.lo & 0xFFFF) * b | 0;
    var a_lohi = (a.lo >>> 16) * b | 0;
    var a_hilo = (a.hi & 0xFFFF) * b | 0;
    var a_hihi = (a.hi >>> 16) * b | 0;
    var sup = a.sup * b | 0;
    a_lohi = a_lohi + (a_lolo >>> 16) | 0;
    a_hilo = a_hilo + (a_lohi >>> 16) | 0;
    a_hihi = a_hihi + (a_hilo >>> 16) | 0;
    sup = sup + (a_hihi >>> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup & 0xFFFF;
}
function LongInt_sub(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo - b_lolo | 0;
    a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_add(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo + b_lolo | 0;
    a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_inc(a) {
    a.lo = a.lo + 1 | 0;
    if (a.lo === 0) {
        a.hi = a.hi + 1 | 0;
        if (a.hi === 0) {
            a.sup = a.sup + 1 & 0xFFFF;
        }
    }
}
function LongInt_dec(a) {
    a.lo = a.lo - 1 | 0;
    if (a.lo ===  -1) {
        a.hi = a.hi - 1 | 0;
        if (a.hi ===  -1) {
            a.sup = a.sup - 1 & 0xFFFF;
        }
    }
}
function LongInt_ucompare(a, b) {
    var r = a.sup - b.sup;
    if (r !== 0) {
        return r;
    }
    r = (a.hi >>> 1) - (b.hi >>> 1);
    if (r !== 0) {
        return r;
    }
    r = (a.hi & 1) - (b.hi & 1);
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function LongInt_numOfLeadingZeroBits(a) {
    var n = 0;
    var d = 16;
    while (d > 0) {
        if (a >>> d !== 0) {
            a >>>= d;
            n = n + d | 0;
        }
        d = d / 2 | 0;
    }
    return 31 - n;
}
function LongInt_shl(a, b) {
    if (b === 0) {
        return;
    }
    if (b < 32) {
        a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
        a.hi = a.lo >>> 32 - b | a.hi << b;
        a.lo <<= b;
    } else if (b === 32) {
        a.sup = a.hi & 0xFFFF;
        a.hi = a.lo;
        a.lo = 0;
    } else if (b < 64) {
        a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
        a.hi = a.lo << b;
        a.lo = 0;
    } else if (b === 64) {
        a.sup = a.lo & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    } else {
        a.sup = a.lo << b - 64 & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    }
}
function LongInt_shr(a, b) {
    if (b === 0) {
        return;
    }
    if (b === 32) {
        a.lo = a.hi;
        a.hi = a.sup;
        a.sup = 0;
    } else if (b < 32) {
        a.lo = a.lo >>> b | a.hi << 32 - b;
        a.hi = a.hi >>> b | a.sup << 32 - b;
        a.sup >>>= b;
    } else if (b === 64) {
        a.lo = a.sup;
        a.hi = 0;
        a.sup = 0;
    } else if (b < 64) {
        a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
        a.hi = a.sup >>> b - 32;
        a.sup = 0;
    } else {
        a.lo = a.sup >>> b - 64;
        a.hi = 0;
        a.sup = 0;
    }
}
function LongInt_copy(a) {
    return new LongInt(a.lo, a.hi, a.sup);
}
function LongInt_div(a, b) {
    var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
    var sz = 1 + (bits / 16 | 0);
    var dividentBits = bits % 16;
    LongInt_shl(b, bits);
    LongInt_shl(a, dividentBits);
    var q = new LongInt(0, 0, 0);
    while (sz-- > 0) {
        LongInt_shl(q, 16);
        var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
        var digitB = b.hi >>> 16;
        var digit = digitA / digitB | 0;
        var t = LongInt_copy(b);
        LongInt_mul(t, digit);
        if (LongInt_ucompare(t, a) >= 0) {
            while (LongInt_ucompare(t, a) > 0) {
                LongInt_sub(t, b);
                 --digit;
            }
        } else {
            while (true) {
                var nextT = LongInt_copy(t);
                LongInt_add(nextT, b);
                if (LongInt_ucompare(nextT, a) > 0) {
                    break;
                }
                t = nextT;
                ++digit;
            }
        }
        LongInt_sub(a, t);
        q.lo |= digit;
        LongInt_shl(a, 16);
    }
    LongInt_shr(a, bits + 16);
    return q;
}
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
    c = otjb_Window.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$1;
    c.getLength = c.$getLength$exported$5;
    c.get = c.$get$exported$2;
    c.addEventListener = c.$addEventListener$exported$6;
    c.removeEventListener = c.$removeEventListener$exported$3;
    c = ju_Timer$schedule$lambda$_3_0.prototype;
    c.onTimer = c.$onTimer$exported$0;
})();
})();

//# sourceMappingURL=classes.js.map