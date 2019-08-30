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
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), jl_Class_getName(jl_Object_getClass($this))), $rt_s(1)), jl_Integer_toHexString(jl_Object_identity($this))));
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
    ovncvc_EventBus__clinit_();
    ovncv_RenderRegistry__clinit_();
    jnc_CodingErrorAction__clinit_();
    jnc_CoderResult__clinit_();
    jn_ByteOrder__clinit_();
    jl_Thread__clinit_();
    jl_Boolean__clinit_();
    ju_Locale__clinit_();
    ovncv_Palete16__clinit_();
    jusi_SimpleStreamImpl__clinit_();
    jl_Byte__clinit_();
    jl_Short__clinit_();
    jl_Long__clinit_();
    jt_DecimalFormat__clinit_();
    jm_RoundingMode__clinit_();
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
function jl_Class_isInstance($this, $obj) {
    var var$2;
    $obj = $obj;
    var$2 = $this.$platformClass;
    return $obj !== null && !(typeof $obj.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable($obj.constructor, var$2) ? 1 : 0;
}
function jl_Class_getName($this) {
    if ($this.$name === null)
        $this.$name = $rt_str($this.$platformClass.$meta.name);
    return $this.$name;
}
function jl_Class_isPrimitive($this) {
    return $this.$platformClass.$meta.primitive ? 1 : 0;
}
function jl_Class_getComponentType($this) {
    return jl_Class_getClass($this.$platformClass.$meta.item);
}
function jl_Class_desiredAssertionStatus($this) {
    return 1;
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
function otp_Platform_isAssignable($from, $to) {
    var $supertypes, $i;
    if ($from === $to)
        return 1;
    $supertypes = $from.$meta.supertypes;
    $i = 0;
    while ($i < $supertypes.length) {
        if (otp_Platform_isAssignable($supertypes[$i], $to))
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
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
function jl_String__init_1(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
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
function jl_String__init_2($this, $value, $offset, $count) {
    var $i, var$5;
    $this.$characters = $rt_createCharArray($count);
    $i = 0;
    while ($i < $count) {
        var$5 = $value.data;
        $this.$characters.data[$i] = var$5[$i + $offset | 0];
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
function jl_String_indexOf($this, $ch, $fromIndex) {
    var $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$characters.data.length)
                return (-1);
            if ($this.$characters.data[$i] == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$characters.data.length - 1 | 0))
            return (-1);
        if ($this.$characters.data[$i] == $hi && $this.$characters.data[$i + 1 | 0] == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
}
function jl_String_indexOf0($this, $ch) {
    return jl_String_indexOf($this, $ch, 0);
}
function jl_String_lastIndexOf($this, $ch, $fromIndex) {
    var $i, $bmpChar, $hi, $lo, var$7;
    $i = jl_Math_min($fromIndex, jl_String_length($this) - 1 | 0);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if ($this.$characters.data[$i] == $bmpChar)
                break;
            $i = $i + (-1) | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i < 1)
            return (-1);
        if ($this.$characters.data[$i] == $lo) {
            var$7 = $this.$characters.data;
            $ch = $i - 1 | 0;
            if (var$7[$ch] == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return $ch;
}
function jl_String_lastIndexOf0($this, $ch) {
    return jl_String_lastIndexOf($this, $ch, jl_String_length($this) - 1 | 0);
}
function jl_String_substring($this, $beginIndex, $endIndex) {
    var var$3;
    if ($beginIndex <= $endIndex)
        return jl_String__init_1($this.$characters, $beginIndex, $endIndex - $beginIndex | 0);
    var$3 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$3);
    $rt_throw(var$3);
}
function jl_String_substring0($this, $beginIndex) {
    return jl_String_substring($this, $beginIndex, jl_String_length($this));
}
function jl_String_toString($this) {
    return $this;
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
function jl_String_valueOf($obj) {
    return $obj === null ? $rt_s(2) : $obj.$toString();
}
function jl_String_valueOf0($c) {
    var var$2, var$3;
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_0(var$2, var$3);
    return var$2;
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
function jl_String_toUpperCase($this) {
    var var$1, $codePointCount, $i, $codePoints, var$5, var$6, var$7, var$8, var$9, var$10;
    if (jl_String_isEmpty($this))
        return $this;
    var$1 = $rt_createIntArray($this.$characters.data.length).data;
    $codePointCount = 0;
    $i = 0;
    while ($i < $this.$characters.data.length) {
        a: {
            if ($i != ($this.$characters.data.length - 1 | 0) && jl_Character_isHighSurrogate($this.$characters.data[$i])) {
                $codePoints = $this.$characters.data;
                var$5 = $i + 1 | 0;
                if (jl_Character_isLowSurrogate($codePoints[var$5])) {
                    var$6 = $codePointCount + 1 | 0;
                    var$1[$codePointCount] = jl_Character_toUpperCase(jl_Character_toCodePoint($this.$characters.data[$i], $this.$characters.data[var$5]));
                    $i = var$5;
                    break a;
                }
            }
            var$6 = $codePointCount + 1 | 0;
            var$1[$codePointCount] = jl_Character_toUpperCase($this.$characters.data[$i]) & 65535;
        }
        $i = $i + 1 | 0;
        $codePointCount = var$6;
    }
    var$7 = new jl_String;
    $i = 0;
    var$7.$characters = $rt_createCharArray($codePointCount * 2 | 0);
    var$6 = 0;
    var$5 = 0;
    while (var$5 < $codePointCount) {
        var$8 = $i + 1 | 0;
        $i = var$1[$i];
        if ($i < 65536) {
            $codePoints = var$7.$characters.data;
            var$9 = var$6 + 1 | 0;
            $codePoints[var$6] = $i & 65535;
        } else {
            $codePoints = var$7.$characters.data;
            var$10 = var$6 + 1 | 0;
            $codePoints[var$6] = jl_Character_highSurrogate($i);
            $codePoints = var$7.$characters.data;
            var$9 = var$10 + 1 | 0;
            $codePoints[var$10] = jl_Character_lowSurrogate($i);
        }
        var$5 = var$5 + 1 | 0;
        $i = var$8;
        var$6 = var$9;
    }
    if (var$6 < var$7.$characters.data.length)
        var$7.$characters = ju_Arrays_copyOf(var$7.$characters, var$6);
    return var$7;
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
function jl_AbstractStringBuilder__init_(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_0($this, $capacity) {
    $this.$buffer = $rt_createCharArray($capacity);
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
function jl_AbstractStringBuilder_insert0($this, $target, $value, $radix) {
    var $positive, var$5, var$6, var$7, $sz, $pos, $pos_0;
    $positive = 1;
    if (Long_lt($value, Long_ZERO)) {
        $positive = 0;
        $value = Long_neg($value);
    }
    a: {
        var$5 = Long_fromInt($radix);
        if (Long_lt($value, var$5)) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$6 = $this.$buffer.data;
                var$7 = $target + 1 | 0;
                var$6[$target] = 45;
                $target = var$7;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value.lo, $radix);
        } else {
            $sz = 1;
            $pos = Long_fromInt(1);
            while (true) {
                $pos_0 = Long_mul($pos, var$5);
                if (Long_le($pos_0, $pos))
                    break;
                if (Long_gt($pos_0, $value))
                    break;
                $sz = $sz + 1 | 0;
                $pos = $pos_0;
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $sz = $target;
            else {
                var$6 = $this.$buffer.data;
                $sz = $target + 1 | 0;
                var$6[$target] = 45;
            }
            while (true) {
                if (Long_le($pos, Long_ZERO))
                    break a;
                var$6 = $this.$buffer.data;
                $target = $sz + 1 | 0;
                var$6[$sz] = jl_Character_forDigit(Long_div($value, $pos).lo, $radix);
                $value = Long_rem($value, $pos);
                $pos = Long_div($pos, var$5);
                $sz = $target;
            }
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
    var $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
}
function jl_AbstractStringBuilder_toString($this) {
    return jl_String__init_1($this.$buffer, 0, $this.$length0);
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
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
    jl_AbstractStringBuilder__init_0($this, 16);
}
function jl_StringBuilder_append($this, $string) {
    jl_StringBuilder_insert($this, $this.$length0, $string);
    return $this;
}
function jl_StringBuilder_append0($this, $value) {
    jl_AbstractStringBuilder_append($this, $value, 10);
    return $this;
}
function jl_StringBuilder_append1($this, $value) {
    jl_StringBuilder_insert0($this, $this.$length0, $value);
    return $this;
}
function jl_StringBuilder_append2($this, $c) {
    jl_StringBuilder_insert1($this, $this.$length0, $c);
    return $this;
}
function jl_StringBuilder_append3($this, $s, $start, $end) {
    jl_StringBuilder_insert2($this, $this.$length0, $s, $start, $end);
    return $this;
}
function jl_StringBuilder_append4($this, $s) {
    jl_StringBuilder_append3($this, $s, 0, $s.$length());
    return $this;
}
function jl_StringBuilder_append5($this, $obj) {
    jl_StringBuilder_insert3($this, $this.$length0, $obj);
    return $this;
}
function jl_StringBuilder_insert0($this, $target, $value) {
    jl_AbstractStringBuilder_insert0($this, $target, $value, 10);
    return $this;
}
function jl_StringBuilder_insert2($this, $index, $s, $start, $end) {
    var var$5, var$6;
    if ($start <= $end && $end <= $s.$length() && $start >= 0) {
        jl_AbstractStringBuilder_insertSpace($this, $index, ($index + $end | 0) - $start | 0);
        while ($start < $end) {
            var$5 = $this.$buffer.data;
            var$6 = $index + 1 | 0;
            var$5[$index] = $s.$charAt($start);
            $start = $start + 1 | 0;
            $index = var$6;
        }
        return $this;
    }
    $s = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($s);
    $rt_throw($s);
}
function jl_StringBuilder_insert3($this, $index, $obj) {
    jl_StringBuilder_insert($this, $index, $obj === null ? $rt_s(2) : jl_Object_toString($obj));
    return $this;
}
function jl_StringBuilder_insert1($this, $index, $c) {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
}
function jl_StringBuilder_deleteCharAt($this, $index) {
    var var$2, var$3, var$4, var$5;
    if ($index >= 0 && $index < $this.$length0) {
        $this.$length0 = $this.$length0 - 1 | 0;
        while ($index < $this.$length0) {
            var$2 = $this.$buffer.data;
            var$3 = $this.$buffer.data;
            var$4 = $index + 1 | 0;
            var$2[$index] = var$3[var$4];
            $index = var$4;
        }
        return $this;
    }
    var$5 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
}
function jl_StringBuilder_insert($this, $index, $string) {
    var var$3, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        a: {
            if ($string === null)
                $string = $rt_s(2);
            else if (jl_String_isEmpty($string))
                break a;
            jl_AbstractStringBuilder_ensureCapacity($this, $this.$length0 + jl_String_length($string) | 0);
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
        jl_Throwable__init_(var$5, $rt_s(3));
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
function jl_StringBuilder_insert4($this, var$1, var$2, var$3, var$4) {
    return jl_StringBuilder_insert2($this, var$1, var$2, var$3, var$4);
}
function jl_StringBuilder_append6($this, var$1, var$2, var$3) {
    return jl_StringBuilder_append3($this, var$1, var$2, var$3);
}
function jl_StringBuilder_charAt($this, var$1) {
    var var$2;
    if (var$1 >= 0 && var$1 < $this.$length0)
        return $this.$buffer.data[var$1];
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
}
function jl_StringBuilder_length($this) {
    return $this.$length0;
}
function jl_StringBuilder_toString($this) {
    return jl_AbstractStringBuilder_toString($this);
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuilder_insert5($this, var$1, var$2) {
    return jl_StringBuilder_insert3($this, var$1, var$2);
}
function jl_StringBuilder_insert6($this, var$1, var$2) {
    return jl_StringBuilder_insert1($this, var$1, var$2);
}
function jl_StringBuilder_insert7($this, var$1, var$2) {
    return jl_StringBuilder_insert0($this, var$1, var$2);
}
function jl_StringBuilder_insert8($this, var$1, var$2) {
    return jl_StringBuilder_insert($this, var$1, var$2);
}
function jl_StringBuilder_append7($this, var$1) {
    return jl_StringBuilder_append4($this, var$1);
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
function jl_Integer_toHexString($i) {
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
}
function jl_Integer_toString($i) {
    return jl_AbstractStringBuilder_append(jl_AbstractStringBuilder__init_(20), $i, 10).$toString();
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
                    jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(4)), $s)));
                    $rt_throw(var$7);
                }
                if ($digit >= $radix) {
                    var$7 = new jl_NumberFormatException;
                    jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(5)), $radix), $rt_s(6)), $s)));
                    $rt_throw(var$7);
                }
                $value = $rt_imul($radix, $value) + $digit | 0;
                if ($value < 0) {
                    if (var$6 == jl_String_length($s) && $value == (-2147483648) && $negative)
                        return (-2147483648);
                    var$7 = new jl_NumberFormatException;
                    jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(7)), $s)));
                    $rt_throw(var$7);
                }
                $index = var$6;
            }
            if ($negative)
                $value =  -$value;
            return $value;
        }
        $s = new jl_NumberFormatException;
        jl_Throwable__init_($s, $rt_s(8));
        $rt_throw($s);
    }
    var$7 = new jl_NumberFormatException;
    jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(9)), $radix)));
    $rt_throw(var$7);
}
function jl_Integer_valueOf($s) {
    return jl_Integer_valueOf0(jl_Integer_parseInt($s, 10));
}
function jl_Integer_valueOf0($i) {
    var var$2;
    if ($i >= (-128) && $i <= 127) {
        a: {
            if (jl_Integer_integerCache === null) {
                jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
                var$2 = 0;
                while (true) {
                    if (var$2 >= jl_Integer_integerCache.data.length)
                        break a;
                    jl_Integer_integerCache.data[var$2] = jl_Integer__init_(var$2 - 128 | 0);
                    var$2 = var$2 + 1 | 0;
                }
            }
        }
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_($i);
}
function jl_Integer_intValue($this) {
    return $this.$value;
}
function jl_Integer_toString0($this) {
    return jl_Integer_toString($this.$value);
}
function jl_Integer_hashCode($this) {
    return $this.$value >>> 4 ^ $this.$value << 28 ^ $this.$value << 8 ^ $this.$value >>> 24;
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
function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
    var $radix, $mask, $pos, $target, $target_0, $sz, $chars, var$10;
    if (!$value)
        return $rt_s(10);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    if (!$value)
        $pos = 32;
    else {
        $target = 0;
        $pos = $value >>> 16;
        if ($pos)
            $target = 16;
        else
            $pos = $value;
        $target_0 = $pos >>> 8;
        if (!$target_0)
            $target_0 = $pos;
        else
            $target = $target | 8;
        $pos = $target_0 >>> 4;
        if (!$pos)
            $pos = $target_0;
        else
            $target = $target | 4;
        $target_0 = $pos >>> 2;
        if (!$target_0)
            $target_0 = $pos;
        else
            $target = $target | 2;
        if ($target_0 >>> 1)
            $target = $target | 1;
        $pos = (32 - $target | 0) - 1 | 0;
    }
    $sz = (((32 - $pos | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    var$10 = $chars.data;
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        $target_0 = $target + 1 | 0;
        var$10[$target] = jl_Character_forDigit($value >>> $pos & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
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
function jl_Character_toCodePoint($high, $low) {
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
}
function jl_Character_highSurrogate($codePoint) {
    return (55296 | ($codePoint - 65536 | 0) >> 10 & 1023) & 65535;
}
function jl_Character_lowSurrogate($codePoint) {
    return (56320 | $codePoint & 1023) & 65535;
}
function jl_Character_toUpperCase($codePoint) {
    return (String.fromCharCode($codePoint)).toUpperCase().charCodeAt(0);
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
function ovncv_VCommander_registerPlugin($pluginProvider) {
    ju_ArrayList_add(ovncv_VCommander_pluginsProviders, ju_Objects_requireNonNull($pluginProvider));
}
function ovncv_VCommander_getPlugin($name) {
    return ju_HashMap_get(ovncv_VCommander_plugins, jl_Class_getName($name));
}
function ovncv_VCommander_init($this) {
    var $item, $document, $apiBridge, $application, $j, $i;
    $this.$width = jl_Integer_valueOf($rt_str($this.$jsInstance.getAttribute("width"))).$value;
    $this.$height = jl_Integer_valueOf($rt_str($this.$jsInstance.getAttribute("height"))).$value;
    $item = $this.$jsInstance.style;
    $document = jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder__init_(), $this.$width), $rt_s(11)));
    $item.setProperty("width", $rt_ustr($document));
    $this.$content = window.document.createElement("div");
    $apiBridge = $this.$content;
    $application = "commander";
    $apiBridge.className = $application;
    $document = $this.$jsInstance;
    $apiBridge = $this.$content;
    $document.appendChild($apiBridge);
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
    $application = ovncv_VCommander_pluginsProviders;
    $document = new ovncv_VCommander$init$lambda$_3_0;
    $document.$_02 = $apiBridge;
    jl_Iterable_forEach($application, $document);
    $application = new ovncv_Main;
    $application.$api = $apiBridge;
    ovncv_Main_exec($application);
}
function ovncv_VCommander__clinit_() {
    ovncv_VCommander_pluginsProviders = ju_ArrayList__init_();
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
    $itr = $this.$iterator();
    while ($itr.$hasNext()) {
        $action.$accept($itr.$next());
    }
}
function ju_Collection() {
}
function ju_Collection_spliterator($this) {
    var var$1;
    var$1 = new jusi_SpliteratorOverCollection;
    var$1.$collection = $this;
    return var$1;
}
function ju_Collection_stream($this) {
    var var$1;
    var$1 = new jusi_StreamOverSpliterator;
    var$1.$spliterator = ju_Collection_spliterator($this);
    return var$1;
}
function ju_AbstractCollection() {
    jl_Object.call(this);
}
function ju_AbstractCollection_toArray($this, $a) {
    var var$2, $i, $i_0, $iter, var$6;
    var$2 = $a.data;
    $i = $this.$size;
    $i_0 = var$2.length;
    if ($i_0 < $i)
        $a = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($a)), $i);
    else
        while ($i < $i_0) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i_0 = 0;
    $iter = ju_AbstractList_iterator($this);
    while (ju_AbstractList$1_hasNext($iter)) {
        var$2 = $a.data;
        var$6 = $i_0 + 1 | 0;
        var$2[$i_0] = ju_AbstractList$1_next($iter);
        $i_0 = var$6;
    }
    return $a;
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
    var$1.$size0 = var$1.$this$00.$size;
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
    a.$size = 0;
}
function ju_ArrayList__init_() {
    var var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
}
function ju_ArrayList__init_0($this) {
    $this.$array = $rt_createArray(jl_Object, 10);
}
function ju_ArrayList_ensureCapacity($this, $minCapacity) {
    var $newLength, var$3, var$4;
    if ($this.$array.data.length < $minCapacity) {
        $newLength = $this.$array.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array.data.length * 2 | 0, 5));
        var$3 = $this.$array;
        var$4 = var$3.data;
        var$3 = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass(var$3)), $newLength);
        $minCapacity = jl_Math_min($newLength, var$4.length);
        $newLength = 0;
        while ($newLength < $minCapacity) {
            var$3.data[$newLength] = var$4[$newLength];
            $newLength = $newLength + 1 | 0;
        }
        $this.$array = var$3;
    }
}
function ju_ArrayList_get($this, $index) {
    var var$2;
    if ($index >= 0 && $index < $this.$size)
        return $this.$array.data[$index];
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
}
function ju_ArrayList_size($this) {
    return $this.$size;
}
function ju_ArrayList_add($this, $element) {
    var var$2, var$3;
    ju_ArrayList_ensureCapacity($this, $this.$size + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size;
    $this.$size = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
}
function ju_Map() {
}
function ju_AbstractMap() {
    jl_Object.call(this);
    this.$cachedKeySet = null;
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
function ju_HashMap_keySet($this) {
    var var$1;
    if ($this.$cachedKeySet === null) {
        var$1 = new ju_HashMap$1;
        var$1.$this$01 = $this;
        $this.$cachedKeySet = var$1;
    }
    return $this.$cachedKeySet;
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
function ovncv_VCommander$VAPIBridge_getBufferWidth($this) {
    return $this.$commander.$width;
}
function ovncv_VCommander$VAPIBridge_getBufferHeight($this) {
    return $this.$commander.$height;
}
function ovncv_VCommander$VAPIBridge_setItem($this, $x, $y, $item) {
    var var$4, var$5, var$6;
    var$4 = $this.$commander;
    ju_Objects_requireNonNull($item);
    var$5 = var$4.$buffer0.data[$y].data[$x];
    if (!(var$5 === $item ? 1 : var$5 !== null ? ovncv_VCommander$Item_equals(var$5, $item) : $item !== null ? 0 : 1)) {
        var$4.$buffer0.data[$y].data[$x] = $item;
        var$4 = var$4.$content.childNodes[$rt_imul($y, var$4.$width) + $x | 0];
        var$5 = $item.$shadowed ? ovncv_Palete16_color.data[7] : ovncv_Palete16_color.data[$item.$color];
        var$6 = $item.$shadowed ? ovncv_Palete16_color.data[0] : ovncv_Palete16_color.data[$item.$bgcolor];
        $item = $rt_ustr(jl_String_valueOf0($item.$value0));
        var$4.innerHTML = $item;
        var$4.style.setProperty("color", $rt_ustr(var$5));
        var$4.style.setProperty("background-color", $rt_ustr(var$6));
    }
}
function ovncv_VCommander$VAPIBridge_addEventListener($this, $eventType, $action) {
    window.document.addEventListener($rt_ustr($eventType), otji_JS_function($action, "handleEvent"));
}
function juf_Consumer() {
}
function ovncv_VCommander$init$lambda$_3_0() {
    jl_Object.call(this);
    this.$_02 = null;
}
function ovncv_VCommander$init$lambda$_3_0_accept(var$0, var$1) {
    var$1 = var$1.$apply(var$0.$_02);
    ju_HashMap_putImpl(ovncv_VCommander_plugins, jl_Class_getName(jl_Object_getClass(var$1)), var$1);
    ji_PrintStream_println(jl_System_err(), jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(12)), jl_Class_getName(jl_Object_getClass(var$1)))));
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
function ovncv_Application_getApi($this) {
    return $this.$api;
}
function ovncv_Application_render($this) {
    if ($this.$content0 !== null && $this.$api !== null)
        $this.$content0.$render($this.$api);
}
function ovncv_Main() {
    ovncv_Application.call(this);
}
function ovncv_Main_exec($this) {
    var $width, $height, $middleX, $content, $leftPanel, var$6, $rightPanel, $label1, $label2, $button, $leftContent, $textField, $checkBox, $layout1, $layout2;
    $width = ovncv_VCommander$VAPIBridge_getBufferWidth($this.$api);
    $height = ovncv_VCommander$VAPIBridge_getBufferHeight($this.$api);
    $middleX = $width / 2 | 0;
    $content = new ovncvc_HorizontalLayout;
    ovncvc_Layout__init_($content);
    $leftPanel = new ovncvc_Panel;
    ovncvc_Component__init_($leftPanel);
    $leftPanel.$style.$bgcolor0 = 1;
    $leftPanel.$width0 = $middleX;
    var$6 = $height - 2 | 0;
    $leftPanel.$height0 = var$6;
    $rightPanel = new ovncvc_Panel;
    ovncvc_Component__init_($rightPanel);
    $rightPanel.$width0 = $middleX;
    $rightPanel.$height0 = var$6;
    ovncvc_Layout_add($content, $leftPanel);
    ovncvc_Layout_add($content, $rightPanel);
    $label1 = ovncvc_Label__init_();
    ovncvc_Label_setValue($label1, $rt_s(13));
    $label2 = ovncvc_Label__init_();
    ovncvc_Label_setValue($label2, $rt_s(14));
    $label2.$style.$color0 = 1;
    $label2.$style.$bgcolor0 = 4;
    $button = new ovncvc_Button;
    ovncvc_Component__init_($button);
    $leftContent = ovncv_VCommander_getPlugin($rt_cls(ovncvc_EventBus));
    $textField = new ovncvc_Button$_init_$lambda$_0_0;
    $textField.$_03 = $button;
    ovncvc_EventBus_registerEvent($leftContent, $button, $textField);
    ovncvc_Button_setCaption($button, $rt_s(15));
    $leftContent = new ovncv_Main$exec$lambda$_1_0;
    $leftContent.$_04 = $label2;
    ovncvc_Button_setClickListener($button, $leftContent);
    $checkBox = new ovncvc_CheckBox;
    ovncvc_Component__init_($checkBox);
    $checkBox.$caption = $rt_s(16);
    $leftContent = ovncv_VCommander_getPlugin($rt_cls(ovncvc_EventBus));
    $textField = new ovncvc_CheckBox$_init_$lambda$_0_0;
    $textField.$_05 = $checkBox;
    ovncvc_EventBus_registerEvent($leftContent, $checkBox, $textField);
    ovncvc_CheckBox_setCaption($checkBox, $rt_s(17));
    $leftContent = new ovncv_Main$exec$lambda$_1_1;
    $leftContent.$_06 = $label1;
    ovncvc_CheckBox_setValueChangeListener($checkBox, $leftContent);
    $textField = new ovncvc_TextField;
    ovncvc_Component__init_($textField);
    $textField.$value2 = jl_StringBuilder__init_();
    $textField.$renderValuePos = 0;
    $textField.$cursorPos = 0;
    $textField.$carretPos = 0;
    $layout1 = ovncv_VCommander_getPlugin($rt_cls(ovncvc_EventBus));
    $leftContent = new ovncvc_TextField$_init_$lambda$_0_0;
    $leftContent.$_07 = $textField;
    ovncvc_EventBus_registerEvent($layout1, $textField, $leftContent);
    $textField.$style.$color0 = 15;
    $textField.$style.$bgcolor0 = 5;
    ovncvc_TextField_setValue($textField, $rt_s(18));
    $textField.$width0 = 20;
    $textField.$focused = 1;
    jl_Object_getClass($label1);
    $leftContent = new ovncv_Main$exec$lambda$_1_2;
    $leftContent.$_08 = $label1;
    ovncvc_TextField_setValueChangeListener($textField, $leftContent);
    $leftContent = new ovncvc_VerticalLayout;
    ovncvc_Layout__init_($leftContent);
    $layout1 = new ovncvc_HorizontalLayout;
    ovncvc_Layout__init_($layout1);
    ovncvc_Layout_add($layout1, $label1);
    ovncvc_Layout_add($layout1, $label2);
    ovncvc_Layout_add($layout1, $button);
    $layout2 = new ovncvc_HorizontalLayout;
    ovncvc_Layout__init_($layout2);
    ovncvc_Layout_add($layout2, $checkBox);
    ovncvc_Layout_add($layout2, $textField);
    ovncvc_Layout_add($leftContent, $layout1);
    ovncvc_Layout_add($leftContent, $layout2);
    ovncvc_Panel_setContent($leftPanel, $leftContent);
    ovncv_Application_setContent($this, $content);
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
    jl_Throwable__init_($obj, $rt_s(16));
    $rt_throw($obj);
}
function jl_NumberFormatException() {
    jl_IllegalArgumentException.call(this);
}
function jl_NullPointerException() {
    jl_RuntimeException.call(this);
}
function jl_NullPointerException__init_() {
    var var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_0(var_0);
    return var_0;
}
function jl_NullPointerException__init_0($this) {
    jl_Exception__init_($this);
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
    var a = this; jl_Object.call(a);
    a.$width0 = 0;
    a.$height0 = 0;
    a.$focused = 0;
    a.$style = null;
}
function ovncvc_Component__init_0() {
    var var_0 = new ovncvc_Component();
    ovncvc_Component__init_(var_0);
    return var_0;
}
function ovncvc_Component__init_($this) {
    var var$1;
    var$1 = new ovncvc_Component$Style;
    var$1.$this$02 = $this;
    var$1.$color0 = 7;
    var$1.$bgcolor0 = 0;
    $this.$style = var$1;
}
function ovncvc_Component_getWidth($this) {
    return $this.$width0;
}
function ovncvc_Component_setWidth($this, $width) {
    $this.$width0 = $width;
}
function ovncvc_Component_getHeight($this) {
    return $this.$height0;
}
function ovncvc_Component_setHeight($this, $height) {
    $this.$height0 = $height;
}
function ovncvc_Component_isFocused($this) {
    return $this.$focused;
}
function ovncvc_Component_setFocused($this, $focused) {
    $this.$focused = $focused;
}
function ovncvc_Component_getStyle($this) {
    return $this.$style;
}
function ovncvc_Component_markAsDirty($this) {
    ovncv_RenderRegistry_invokeRender(ovncv_VCommander_getPlugin($rt_cls(ovncv_RenderRegistry)));
}
function ovncvc_Layout() {
    ovncvc_Component.call(this);
    this.$components = null;
}
function ovncvc_Layout__init_0() {
    var var_0 = new ovncvc_Layout();
    ovncvc_Layout__init_(var_0);
    return var_0;
}
function ovncvc_Layout__init_($this) {
    ovncvc_Component__init_($this);
    $this.$components = ju_ArrayList__init_();
}
function ovncvc_Layout_add($this, $component) {
    ju_ArrayList_add($this.$components, ju_Objects_requireNonNull($component));
}
function ovncvc_Layout_getComponents($this) {
    return $this.$components;
}
function ovncvc_HorizontalLayout() {
    ovncvc_Layout.call(this);
}
function ovncvc_HorizontalLayout_getWidth($this) {
    return jusi_SimpleStreamImpl_reduce(jusi_SimpleStreamImpl_map(ju_Collection_stream($this.$components), new ovncvc_HorizontalLayout$getWidth$lambda$_1_0), jl_Integer_valueOf0(0), new ovncvc_HorizontalLayout$getWidth$lambda$_1_1).$value;
}
function ovncvc_HorizontalLayout_getHeight($this) {
    return jusi_SimpleStreamImpl_reduce(jusi_SimpleStreamImpl_map(ju_Collection_stream($this.$components), new ovncvc_HorizontalLayout$getHeight$lambda$_2_0), jl_Integer_valueOf0(0), new ovncvc_HorizontalLayout$getHeight$lambda$_2_1).$value;
}
function ovncvc_HorizontalLayout_render($this, $api) {
    var $offset, var$3, $component, $childWidth, $wrapper;
    $offset = 0;
    var$3 = ju_AbstractList_iterator($this.$components);
    while (ju_AbstractList$1_hasNext(var$3)) {
        $component = ju_AbstractList$1_next(var$3);
        $childWidth = $component.$getWidth();
        $wrapper = new ovncvc_HorizontalLayout$HLAPIWrapper;
        $wrapper.$this$03 = $this;
        $wrapper.$api0 = $api;
        $wrapper.$width1 = $childWidth;
        $wrapper.$offset = $offset;
        $offset = $offset + $childWidth | 0;
        $component.$render($wrapper);
    }
}
function ovncvc_Panel() {
    var a = this; ovncvc_Component.call(a);
    a.$content1 = null;
    a.$title = null;
}
function ovncvc_Panel_setContent($this, $content) {
    $this.$content1 = ju_Objects_requireNonNull($content);
}
function ovncvc_Panel_render($this, $api) {
    var $width, $height, $borderX, $borderY, $color, $bgcolor, $j, $i, $length, var$11, var$12, $start, var$14, var$15;
    $width = $this.$width0;
    $height = $this.$height0;
    $borderX = $width - 1 | 0;
    $borderY = $height - 1 | 0;
    $color = $this.$style.$color0;
    $bgcolor = $this.$style.$bgcolor0;
    $j = 0;
    while ($j < $height) {
        $i = 0;
        while ($i < $width) {
            if (!$i && !$j)
                $api.$setItem($i, $j, ovncv_VCommander$Item__init_(9556, $color, $bgcolor, 0));
            else {
                $length = $rt_compare($i, $borderX);
                if (!$length && !$j)
                    $api.$setItem($i, $j, ovncv_VCommander$Item__init_(9559, $color, $bgcolor, 0));
                else if (!$i && $j == $borderY)
                    $api.$setItem($i, $j, ovncv_VCommander$Item__init_(9562, $color, $bgcolor, 0));
                else if (!$length && $j == $borderY)
                    $api.$setItem($i, $j, ovncv_VCommander$Item__init_(9565, $color, $bgcolor, 0));
                else if ($i > 0 && $length < 0 && !($j && $j != $borderY))
                    $api.$setItem($i, $j, ovncv_VCommander$Item__init_(9552, $color, $bgcolor, 0));
                else if ($i && $length)
                    $api.$setItem($i, $j, ovncv_VCommander$Item__init_(0, $color, $bgcolor, 0));
                else
                    $api.$setItem($i, $j, ovncv_VCommander$Item__init_(9553, $color, $bgcolor, 0));
            }
            $i = $i + 1 | 0;
        }
        $j = $j + 1 | 0;
    }
    if ($this.$title !== null) {
        $length = jl_Math_min($this.$title.$length(), $width - 2 | 0);
        var$11 = ($width / 2 | 0) - ($length / 2 | 0) | 0;
        var$12 = $rt_compare(var$11, 0.0);
        $start = var$11 + (var$12 > 0 ? 1.0 : var$12 >= 0 ? var$11 : (-1.0)) * 0.5 | 0;
        var$14 = $this.$title;
        var$12 = 0;
        while (var$12 < $length) {
            $api.$setItem($start + var$12 | 0, 0, ovncv_VCommander$Item__init_(var$14.$charAt(var$12), $color, $bgcolor, 0));
            var$12 = var$12 + 1 | 0;
        }
    }
    if ($this.$content1 !== null) {
        var$14 = $this.$content1;
        var$15 = new ovncvc_Panel$PAPIWrapper;
        var$15.$this$04 = $this;
        var$15.$api1 = $api;
        var$14.$render(var$15);
    }
}
function ovncvc_Label() {
    ovncvc_Component.call(this);
    this.$value3 = null;
}
function ovncvc_Label__init_() {
    var var_0 = new ovncvc_Label();
    ovncvc_Label__init_0(var_0);
    return var_0;
}
function ovncvc_Label__init_0($this) {
    ovncvc_Component__init_($this);
    $this.$style.$color0 = 7;
}
function ovncvc_Label_setValue($this, $value) {
    $this.$value3 = $value;
    ovncvc_Component_markAsDirty($this);
}
function ovncvc_Label_getWidth($this) {
    return $this.$width0 > 0 ? $this.$width0 : $this.$value3 === null ? 0 : jl_String_length($this.$value3);
}
function ovncvc_Label_getHeight($this) {
    return $this.$height0 <= 0 ? 1 : $this.$height0;
}
function ovncvc_Label_render($this, $api) {
    var $i;
    if ($this.$value3 === null)
        return;
    $i = 0;
    while ($i < ovncvc_Label_getWidth($this)) {
        $api.$setItem($i, 0, ovncv_VCommander$Item__init_(jl_String_charAt($this.$value3, $i), $this.$style.$color0, $this.$style.$bgcolor0, 0));
        $i = $i + 1 | 0;
    }
}
function ovncvc_Button() {
    var a = this; ovncvc_Component.call(a);
    a.$caption0 = null;
    a.$clickListener = null;
}
function ovncvc_Button_setCaption($this, $caption) {
    $this.$caption0 = $caption;
    ovncvc_Component_markAsDirty($this);
}
function ovncvc_Button_setClickListener($this, $listener) {
    $this.$clickListener = ju_Objects_requireNonNull($listener);
}
function ovncvc_Button_getWidth($this) {
    return $this.$caption0 === null ? 1 : jl_String_length($this.$caption0) + 4 | 0;
}
function ovncvc_Button_getHeight($this) {
    return 1;
}
function ovncvc_Button_render($this, $api) {
    var $color, $bgcolor, $width, $i, var$6, var$7;
    $color = $this.$focused ? 0 : $this.$style.$color0;
    $bgcolor = $this.$focused ? 7 : $this.$style.$bgcolor0;
    $width = ovncvc_Button_getWidth($this);
    $i = 0;
    var$6 = $width - 1 | 0;
    var$7 = $width - 2 | 0;
    while ($i < $width) {
        if (!$i)
            $api.$setItem($i, 0, ovncv_VCommander$Item__init_(91, $color, $bgcolor, 0));
        else if ($i == var$6)
            $api.$setItem($i, 0, ovncv_VCommander$Item__init_(93, $color, $bgcolor, 0));
        else if ($i != 1 && $i != var$7)
            $api.$setItem($i, 0, ovncv_VCommander$Item__init_(jl_String_charAt($this.$caption0, $i - 2 | 0), $color, $bgcolor, 0));
        else
            $api.$setItem($i, 0, ovncv_VCommander$Item__init_(0, $color, $bgcolor, 0));
        $i = $i + 1 | 0;
    }
}
function jl_Runnable() {
}
function ovncv_Main$exec$lambda$_1_0() {
    jl_Object.call(this);
    this.$_04 = null;
}
function ovncv_Main$exec$lambda$_1_0_run(var$0) {
    var var$1;
    var$1 = var$0.$_04;
    ovncvc_Label_setValue(var$1, $rt_s(19));
    var$1.$style.$bgcolor0 = 1;
    var$1.$style.$color0 = 4;
}
function ovncvc_CheckBox() {
    var a = this; ovncvc_Component.call(a);
    a.$caption = null;
    a.$checked = 0;
    a.$changeListener = null;
}
function ovncvc_CheckBox_setCaption($this, $caption) {
    $this.$caption = ju_Objects_requireNonNull($caption);
    ovncvc_Component_markAsDirty($this);
}
function ovncvc_CheckBox_setValueChangeListener($this, $listener) {
    $this.$changeListener = ju_Objects_requireNonNull($listener);
}
function ovncvc_CheckBox_setChecked($this, $checked) {
    $this.$checked = $checked;
    ovncvc_Component_markAsDirty($this);
}
function ovncvc_CheckBox_getWidth($this) {
    return jl_String_length($this.$caption) + 4 | 0;
}
function ovncvc_CheckBox_getHeight($this) {
    return 1;
}
function ovncvc_CheckBox_render($this, $api) {
    var $color, $bgcolor, $i;
    $color = $this.$focused ? 0 : $this.$style.$color0;
    $bgcolor = $this.$focused ? 7 : $this.$style.$bgcolor0;
    $api.$setItem(0, 0, ovncv_VCommander$Item__init_(91, $color, $bgcolor, 0));
    $api.$setItem(1, 0, ovncv_VCommander$Item__init_(!$this.$checked ? 0 : 9632, $color, $bgcolor, 0));
    $api.$setItem(2, 0, ovncv_VCommander$Item__init_(93, $color, $bgcolor, 0));
    $api.$setItem(3, 0, ovncv_VCommander$Item__init_(0, $color, $bgcolor, 0));
    $i = 0;
    while ($i < jl_String_length($this.$caption)) {
        $api.$setItem($i + 4 | 0, 0, ovncv_VCommander$Item__init_(jl_String_charAt($this.$caption, $i), $color, $bgcolor, 0));
        $i = $i + 1 | 0;
    }
}
function ovncvc_ValueChangeListener() {
}
function ovncv_Main$exec$lambda$_1_1() {
    jl_Object.call(this);
    this.$_06 = null;
}
function ovncv_Main$exec$lambda$_1_1_onChange(var$0, var$1) {
    var$1 = var$1;
    ovncvc_Label_setValue(var$0.$_06, !var$1.$value4 ? $rt_s(20) : $rt_s(21));
}
function ovncvc_TextField() {
    var a = this; ovncvc_Component.call(a);
    a.$value2 = null;
    a.$renderValuePos = 0;
    a.$cursorPos = 0;
    a.$carretPos = 0;
    a.$editMode = 0;
    a.$changeListener0 = null;
}
function ovncvc_TextField_setValue($this, $value) {
    var var$2, var$3;
    var$2 = new jl_StringBuilder;
    $value = ju_Objects_requireNonNull($value);
    var$2.$buffer = $rt_createCharArray(jl_String_length($value));
    var$3 = 0;
    while (var$3 < var$2.$buffer.data.length) {
        var$2.$buffer.data[var$3] = jl_String_charAt($value, var$3);
        var$3 = var$3 + 1 | 0;
    }
    var$2.$length0 = jl_String_length($value);
    $this.$value2 = var$2;
    ovncvc_Component_markAsDirty($this);
}
function ovncvc_TextField_setValueChangeListener($this, $listener) {
    $this.$changeListener0 = ju_Objects_requireNonNull($listener);
}
function ovncvc_TextField_setCarretPos($this, $pos) {
    var $width;
    if ($pos < 0)
        $this.$carretPos = 0;
    else if ($pos <= jl_StringBuilder_length($this.$value2))
        $this.$carretPos = $pos;
    else
        $this.$carretPos = jl_StringBuilder_length($this.$value2);
    $width = $this.$width0;
    if ($this.$carretPos >= $this.$renderValuePos && $this.$carretPos < ($this.$renderValuePos + $width | 0))
        $this.$cursorPos = $this.$carretPos - $this.$renderValuePos | 0;
    else if ($this.$carretPos < $this.$renderValuePos) {
        $this.$cursorPos = 0;
        $this.$renderValuePos = $this.$carretPos;
    } else {
        $this.$cursorPos = $width - 1 | 0;
        $this.$renderValuePos = ($this.$carretPos - $width | 0) + 1 | 0;
    }
}
function ovncvc_TextField_getHeight($this) {
    return 1;
}
function ovncvc_TextField_render($this, $api) {
    var $width, $valueSize, $bgcolor, var$5, var$6, var$7, var$8, var$9, $i, $currentPos;
    $width = $this.$width0;
    $valueSize = jl_StringBuilder_length($this.$value2);
    $bgcolor = $this.$editMode ? 0 : $this.$style.$bgcolor0;
    var$5 = jl_System_err();
    var$6 = $rt_createArray(jl_Object, 3);
    var$7 = var$6.data;
    var$7[0] = jl_Integer_valueOf0($this.$cursorPos);
    var$7[1] = jl_Integer_valueOf0($valueSize);
    var$7[2] = jl_Integer_valueOf0($this.$renderValuePos);
    var$8 = new ju_Formatter;
    var$9 = ju_Locale_defaultLocale;
    var$8.$out = jl_StringBuilder__init_();
    var$8.$locale = var$9;
    ji_PrintStream_println(var$5, ju_Formatter_toString(ju_Formatter_format(var$8, $rt_s(22), var$6)));
    $i = 0;
    while ($i < $width) {
        $currentPos = $this.$renderValuePos + $i | 0;
        if ($currentPos < $valueSize && $currentPos >= 0)
            $api.$setItem($i, 0, ovncv_VCommander$Item__init_(jl_StringBuilder_charAt($this.$value2, $currentPos), $this.$style.$color0, $i == $this.$cursorPos && $this.$editMode ? 2 : $bgcolor, 0));
        else
            $api.$setItem($i, 0, ovncv_VCommander$Item__init_(0, $this.$style.$color0, $i == $this.$cursorPos && $this.$editMode ? 2 : $bgcolor, 0));
        $i = $i + 1 | 0;
    }
}
function ovncvc_TextField_lambda$new$0($this, $e) {
    if (jl_String_equals($rt_s(23), $rt_str($e.key))) {
        $this.$editMode = $this.$editMode ? 0 : 1;
        if (!$this.$editMode && $this.$changeListener0 !== null)
            $this.$changeListener0.$onChange(jl_AbstractStringBuilder_toString($this.$value2));
        if ($this.$editMode)
            $this.$cursorPos = jl_Math_min(jl_StringBuilder_length($this.$value2), $this.$width0 - 1 | 0);
        $this.$renderValuePos = 0;
        ovncvc_Component_markAsDirty($this);
    }
    if ($this.$editMode) {
        if (jl_String_equals($rt_s(24), $rt_str($e.key))) {
            ovncvc_TextField_setCarretPos($this, $this.$carretPos + 1 | 0);
            ovncvc_Component_markAsDirty($this);
        } else if (jl_String_equals($rt_s(25), $rt_str($e.key))) {
            ovncvc_TextField_setCarretPos($this, $this.$carretPos - 1 | 0);
            ovncvc_Component_markAsDirty($this);
        } else if (jl_String_equals($rt_s(26), $rt_str($e.key))) {
            if ($this.$carretPos > 0) {
                jl_StringBuilder_deleteCharAt($this.$value2, $this.$carretPos - 1 | 0);
                ovncvc_TextField_setCarretPos($this, $this.$carretPos - 1 | 0);
                ovncvc_Component_markAsDirty($this);
            }
        } else if (jl_String_equals($rt_s(27), $rt_str($e.key))) {
            if (jl_StringBuilder_length($this.$value2) > 0) {
                jl_StringBuilder_deleteCharAt($this.$value2, $this.$carretPos);
                ovncvc_Component_markAsDirty($this);
            }
        } else if (jl_String_length($rt_str($e.key)) == 1) {
            jl_StringBuilder_insert($this.$value2, $this.$carretPos, $rt_str($e.key));
            ovncvc_TextField_setCarretPos($this, $this.$carretPos + 1 | 0);
            ovncvc_Component_markAsDirty($this);
        }
    }
}
function ovncv_Main$exec$lambda$_1_2() {
    jl_Object.call(this);
    this.$_08 = null;
}
function ovncv_Main$exec$lambda$_1_2_onChange(var$0, var$1) {
    var$1 = var$1;
    ovncvc_Label_setValue(var$0.$_08, var$1);
}
function ovncvc_VerticalLayout() {
    ovncvc_Layout.call(this);
}
function ovncvc_VerticalLayout_getWidth($this) {
    return jusi_SimpleStreamImpl_reduce(jusi_SimpleStreamImpl_map(ju_Collection_stream($this.$components), new ovncvc_VerticalLayout$getWidth$lambda$_1_0), jl_Integer_valueOf0(0), new ovncvc_VerticalLayout$getWidth$lambda$_1_1).$value;
}
function ovncvc_VerticalLayout_getHeight($this) {
    return jusi_SimpleStreamImpl_reduce(jusi_SimpleStreamImpl_map(ju_Collection_stream($this.$components), new ovncvc_VerticalLayout$getHeight$lambda$_2_0), jl_Integer_valueOf0(0), new ovncvc_VerticalLayout$getHeight$lambda$_2_1).$value;
}
function ovncvc_VerticalLayout_render($this, $api) {
    var $offset, var$3, $component, $childHeight, $wrapper;
    $offset = 0;
    var$3 = ju_AbstractList_iterator($this.$components);
    while (ju_AbstractList$1_hasNext(var$3)) {
        $component = ju_AbstractList$1_next(var$3);
        $childHeight = $component.$getHeight();
        $wrapper = new ovncvc_VerticalLayout$VLAPIWrapper;
        $wrapper.$this$05 = $this;
        $wrapper.$api2 = $api;
        $wrapper.$height1 = $childHeight;
        $wrapper.$offset0 = $offset;
        $offset = $offset + $childHeight | 0;
        $component.$render($wrapper);
    }
}
function ovncvc_Component$Style() {
    var a = this; jl_Object.call(a);
    a.$color0 = 0;
    a.$bgcolor0 = 0;
    a.$this$02 = null;
}
function ovncvc_Component$Style_getColor($this) {
    return $this.$color0;
}
function ovncvc_Component$Style_setColor($this, $color) {
    $this.$color0 = $color;
}
function ovncvc_Component$Style_getBgcolor($this) {
    return $this.$bgcolor0;
}
function ovncvc_Component$Style_setBgcolor($this, $bgcolor) {
    $this.$bgcolor0 = $bgcolor;
}
function ovncv_Plugin() {
    jl_Object.call(this);
    this.$apiBridge = null;
}
function ovncv_Plugin__init_(var_0) {
    var var_1 = new ovncv_Plugin();
    ovncv_Plugin__init_0(var_1, var_0);
    return var_1;
}
function ovncv_Plugin__init_0($this, $apiBridge) {
    $this.$apiBridge = ju_Objects_requireNonNull($apiBridge);
}
function ovncvc_EventBus() {
    ovncv_Plugin.call(this);
    this.$events = null;
}
function ovncvc_EventBus_registerEvent($this, $component, $action) {
    ju_Objects_requireNonNull($component);
    ju_Objects_requireNonNull($action);
    ju_HashMap_putImpl($this.$events, $component, $action);
}
function ovncvc_EventBus__clinit_() {
    ovncv_VCommander_registerPlugin(new ovncvc_EventBus$_clinit_$lambda$_5_0);
}
function ovncvc_EventBus$ComponentEvent() {
}
function ovncvc_Button$_init_$lambda$_0_0() {
    jl_Object.call(this);
    this.$_03 = null;
}
function ovncvc_Button$_init_$lambda$_0_0_call(var$0, var$1) {
    var var$2;
    var$2 = var$0.$_03;
    if (jl_String_equals($rt_s(23), $rt_str(var$1.key)) && var$2.$clickListener !== null)
        ovncv_Main$exec$lambda$_1_0_run(var$2.$clickListener);
}
function ovncvc_CheckBox$_init_$lambda$_0_0() {
    jl_Object.call(this);
    this.$_05 = null;
}
function ovncvc_CheckBox$_init_$lambda$_0_0_call(var$0, var$1) {
    var var$2;
    var$2 = var$0.$_05;
    if (jl_String_equals($rt_s(23), $rt_str(var$1.key))) {
        ovncvc_CheckBox_setChecked(var$2, var$2.$checked ? 0 : 1);
        if (var$2.$changeListener !== null)
            var$2.$changeListener.$onChange(!var$2.$checked ? jl_Boolean_FALSE : jl_Boolean_TRUE);
    }
}
function ovncvc_TextField$_init_$lambda$_0_0() {
    jl_Object.call(this);
    this.$_07 = null;
}
function ovncvc_TextField$_init_$lambda$_0_0_call(var$0, var$1) {
    ovncvc_TextField_lambda$new$0(var$0.$_07, var$1);
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
function jl_Math_abs($n) {
    if ($n <= 0)
        $n =  -$n;
    return $n;
}
function ju_Arrays() {
    jl_Object.call(this);
}
function ju_Arrays_copyOf($array, $length) {
    var $result, var$4, $sz, $i;
    $array = $array.data;
    $result = $rt_createCharArray($length);
    var$4 = $result.data;
    $sz = jl_Math_min($length, $array.length);
    $i = 0;
    while ($i < $sz) {
        var$4[$i] = $array[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function juf_Function() {
}
function ovncvc_EventBus$_clinit_$lambda$_5_0() {
    jl_Object.call(this);
}
function ovncvc_EventBus$_clinit_$lambda$_5_0_apply(var$0, var$1) {
    var var$2, var$3;
    var$1 = var$1;
    var$2 = new ovncvc_EventBus;
    ovncv_Plugin__init_0(var$2, var$1);
    var$2.$events = ju_HashMap__init_();
    var$3 = new ovncvc_EventBus$_init_$lambda$_0_0;
    var$3.$_09 = var$2;
    ovncv_VCommander$VAPIBridge_addEventListener(var$1, $rt_s(28), var$3);
    return var$2;
}
function ju_Iterator() {
}
function ju_AbstractList$1() {
    var a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount0 = 0;
    a.$size0 = 0;
    a.$removeIndex = 0;
    a.$this$00 = null;
}
function ju_AbstractList$1_hasNext($this) {
    return $this.$index >= $this.$size0 ? 0 : 1;
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
        var$2.$this$06 = $this;
        var$2.$nativeTimerId = (-1);
        ju_Timer_schedule($timer, var$2, Long_ZERO);
    }
}
function ovncv_RenderRegistry__clinit_() {
    ovncv_VCommander_registerPlugin(new ovncv_RenderRegistry$_clinit_$lambda$_5_0);
}
function jl_System() {
    jl_Object.call(this);
}
var jl_System_errCache = null;
function jl_System_err() {
    var var$1, var$2, var$3, var$4, var$5, var$6;
    if (jl_System_errCache === null) {
        var$1 = new ji_PrintStream;
        var$1.$out0 = new jl_ConsoleOutputStreamStderr;
        var$1.$sb = jl_StringBuilder__init_();
        var$1.$buffer1 = $rt_createCharArray(32);
        var$1.$autoFlush = 0;
        var$2 = new jnci_UTF8Charset;
        var$3 = $rt_createArray(jl_String, 0);
        var$4 = var$3.data;
        jnc_Charset_checkCanonicalName($rt_s(29));
        var$5 = var$4.length;
        var$6 = 0;
        while (var$6 < var$5) {
            jnc_Charset_checkCanonicalName(var$4[var$6]);
            var$6 = var$6 + 1 | 0;
        }
        var$2.$canonicalName = $rt_s(29);
        var$2.$aliases = var$3.$clone();
        var$1.$charset = var$2;
        jl_System_errCache = var$1;
    }
    return jl_System_errCache;
}
function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
    if (var$1 !== var$3 || var$4 < var$2) {
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[var$4++] = var$1.data[var$2++];
        }
    } else {
        var$2 = (var$2 + var$5) | 0;
        var$4 = (var$4 + var$5) | 0;
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[--var$4] = var$1.data[--var$2];
        }
    }
}
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
    this.$out0 = null;
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
    if ($this.$out0 === null)
        $this.$errorState = 1;
    if (!($this.$errorState ? 0 : 1))
        return;
    a: {
        try {
            ji_OutputStream_write($this.$out0, $b, $off, $len);
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
    jl_StringBuilder_append2(jl_StringBuilder_append($this.$sb, $s), 10);
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
function ovncv_RenderRegistry$_clinit_$lambda$_5_0() {
    jl_Object.call(this);
}
function ovncv_RenderRegistry$_clinit_$lambda$_5_0_apply(var$0, var$1) {
    var var$2;
    var$1 = var$1;
    var$2 = new ovncv_RenderRegistry;
    ovncv_Plugin__init_0(var$2, var$1);
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
    jl_Throwable__init_(var$5, $rt_s(30));
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
function jlr_Array() {
    jl_Object.call(this);
}
function jlr_Array_getLength(var$1) {
    if (var$1 === null || var$1.constructor.$meta.item === undefined) {
        $rt_throw(jl_IllegalArgumentException__init_());
    }
    return var$1.data.length;
}
function jlr_Array_newInstance($componentType, $length) {
    if ($componentType === null) {
        $componentType = new jl_NullPointerException;
        jl_Exception__init_($componentType);
        $rt_throw($componentType);
    }
    if ($componentType === $rt_cls($rt_voidcls())) {
        $componentType = new jl_IllegalArgumentException;
        jl_Exception__init_($componentType);
        $rt_throw($componentType);
    }
    if ($length >= 0)
        return jlr_Array_newInstanceImpl($componentType.$platformClass, $length);
    $componentType = new jl_NegativeArraySizeException;
    jl_Exception__init_($componentType);
    $rt_throw($componentType);
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
    jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(31)), $newPosition), $rt_s(32)), $this.$limit), $rt_s(33))));
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
                jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(34)), $pos), $rt_s(35)), var$5)));
                $rt_throw(var$7);
            }
            if (jn_Buffer_remaining($this) < $length) {
                var$7 = new jn_BufferUnderflowException;
                jl_Exception__init_(var$7);
                $rt_throw(var$7);
            }
            if ($length < 0) {
                var$7 = new jl_IndexOutOfBoundsException;
                jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(36)), $length), $rt_s(37))));
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
    jl_Throwable__init_(var$10, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(38)), $offset), $rt_s(32)), $dst.length), $rt_s(39))));
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
                jl_Throwable__init_(var$4, jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(40)), $pos), $rt_s(35)), var$6)));
                $rt_throw(var$4);
            }
            if ($length < 0) {
                var$4 = new jl_IndexOutOfBoundsException;
                jl_Throwable__init_(var$4, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(36)), $length), $rt_s(37))));
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
    jl_Throwable__init_(var$10, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(38)), $offset), $rt_s(32)), $src.length), $rt_s(39))));
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
    jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(41));
    jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(42));
    jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(43));
}
function jl_NegativeArraySizeException() {
    jl_RuntimeException.call(this);
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
    jl_Throwable__init_(var$2, $rt_s(44));
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
    jl_Throwable__init_(var$2, $rt_s(44));
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
    jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(45));
    jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(46));
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
            $controller.$out1 = $out;
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
    var $result, var$9, var$10, $ch, var$12, $low, $codePoint;
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
                var$12 = $outPos + 1 | 0;
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
                var$12 = $inPos + 1 | 0;
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
                $inPos = $outPos + 1 | 0;
                var$10[$outPos] = (224 | $ch >> 12) << 24 >> 24;
                $outPos = $inPos + 1 | 0;
                var$10[$inPos] = (128 | $ch >> 6 & 63) << 24 >> 24;
                var$12 = $outPos + 1 | 0;
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
                $codePoint = jl_Character_toCodePoint($ch, $low);
                $low = $outPos + 1 | 0;
                var$10[$outPos] = (240 | $codePoint >> 18) << 24 >> 24;
                $outPos = $low + 1 | 0;
                var$10[$low] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                $low = $outPos + 1 | 0;
                var$10[$outPos] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                var$12 = $low + 1 | 0;
                var$10[$low] = (128 | $codePoint & 63) << 24 >> 24;
                var$9 = $inPos;
            }
            $inPos = var$9;
            $outPos = var$12;
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
function otjde_EventListener() {
}
function ovncvc_EventBus$_init_$lambda$_0_0() {
    jl_Object.call(this);
    this.$_09 = null;
}
function ovncvc_EventBus$_init_$lambda$_0_0_handleEvent(var$0, var$1) {
    var var$2, var$3, var$4;
    var$2 = var$0.$_09;
    var$3 = ju_HashMap_keySet(var$2.$events);
    var$4 = new ovncvc_EventBus$lambda$new$1$lambda$_3_0;
    var$4.$_010 = var$2;
    var$4.$_10 = var$1;
    jl_Iterable_forEach(var$3, var$4);
}
function ovncvc_EventBus$_init_$lambda$_0_0_handleEvent$exported$0(var$0, var$1) {
    ovncvc_EventBus$_init_$lambda$_0_0_handleEvent(var$0, var$1);
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
        var$3.$_011 = $this;
        var$3.$_11 = $task;
        var$4 = $delay.lo;
        $task.$nativeTimerId = setTimeout(otji_JS_function(var$3, "onTimer"), var$4);
        return;
    }
    $task = new jl_IllegalStateException;
    jl_Exception__init_($task);
    $rt_throw($task);
}
function ju_TimerTask() {
    var a = this; jl_Object.call(a);
    a.$timer = null;
    a.$nativeTimerId = 0;
}
function ovncv_RenderRegistry$1() {
    ju_TimerTask.call(this);
    this.$this$06 = null;
}
function ovncv_RenderRegistry$1_run($this) {
    if ($this.$this$06.$application !== null)
        ovncv_Application_render($this.$this$06.$application);
    $this.$this$06.$invoke = 0;
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
function ovncvc_EventBus$lambda$new$1$lambda$_3_0() {
    var a = this; jl_Object.call(a);
    a.$_010 = null;
    a.$_10 = null;
}
function ovncvc_EventBus$lambda$new$1$lambda$_3_0_accept(var$0, var$1) {
    var var$2, var$3;
    var$1 = var$1;
    var$2 = var$0.$_010;
    var$3 = var$0.$_10;
    if (var$1.$focused) {
        var$3.preventDefault();
        ju_HashMap_get(var$2.$events, var$1).$call(var$3);
    }
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
    a.$_011 = null;
    a.$_11 = null;
}
function ju_Timer$schedule$lambda$_3_0_onTimer(var$0) {
    var var$1, var$2, var$3, var$4;
    var$1 = var$0.$_011;
    var$2 = var$0.$_11;
    var$3 = new jl_Thread;
    var$4 = new ju_Timer$lambda$schedule$1$lambda$_6_0;
    var$4.$_012 = var$1;
    var$4.$_12 = var$2;
    jl_Thread__init_(var$3, var$4, null);
    jl_Thread_start(var$3);
}
function ju_Timer$schedule$lambda$_3_0_onTimer$exported$0(var$0) {
    ju_Timer$schedule$lambda$_3_0_onTimer(var$0);
}
function ju_HashMap$1() {
    ju_AbstractSet.call(this);
    this.$this$01 = null;
}
function ju_HashMap$1_iterator($this) {
    var var$1, var$2;
    var$1 = new ju_HashMap$KeyIterator;
    var$2 = $this.$this$01;
    var$1.$associatedMap = var$2;
    var$1.$expectedModCount = var$2.$modCount1;
    var$1.$futureEntry = null;
    return var$1;
}
function ju_HashMap$AbstractMapIterator() {
    var a = this; jl_Object.call(a);
    a.$position1 = 0;
    a.$expectedModCount = 0;
    a.$futureEntry = null;
    a.$currentEntry = null;
    a.$prevEntry = null;
    a.$associatedMap = null;
}
function ju_HashMap$AbstractMapIterator_hasNext($this) {
    if ($this.$futureEntry !== null)
        return 1;
    while ($this.$position1 < $this.$associatedMap.$elementData.data.length) {
        if ($this.$associatedMap.$elementData.data[$this.$position1] !== null)
            return 1;
        $this.$position1 = $this.$position1 + 1 | 0;
    }
    return 0;
}
function ju_HashMap$AbstractMapIterator_checkConcurrentMod($this) {
    var var$1;
    if ($this.$expectedModCount == $this.$associatedMap.$modCount1)
        return;
    var$1 = new ju_ConcurrentModificationException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
}
function ju_HashMap$AbstractMapIterator_makeNext($this) {
    var var$1, var$2, var$3;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if (!ju_HashMap$AbstractMapIterator_hasNext($this)) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    if ($this.$futureEntry === null) {
        var$2 = $this.$associatedMap.$elementData.data;
        var$3 = $this.$position1;
        $this.$position1 = var$3 + 1 | 0;
        $this.$currentEntry = var$2[var$3];
        $this.$futureEntry = $this.$currentEntry.$next0;
        $this.$prevEntry = null;
    } else {
        if ($this.$currentEntry !== null)
            $this.$prevEntry = $this.$currentEntry;
        $this.$currentEntry = $this.$futureEntry;
        $this.$futureEntry = $this.$futureEntry.$next0;
    }
}
function ju_HashMap$KeyIterator() {
    ju_HashMap$AbstractMapIterator.call(this);
}
function ju_HashMap$KeyIterator_next($this) {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry.$key;
}
function jl_UnsupportedOperationException() {
    jl_RuntimeException.call(this);
}
function jnci_BufferedEncoder$Controller() {
    var a = this; jl_Object.call(a);
    a.$in = null;
    a.$out1 = null;
    a.$inPosition = 0;
    a.$outPosition = 0;
}
function jnci_BufferedEncoder$Controller_hasMoreInput($this) {
    return jn_Buffer_hasRemaining($this.$in);
}
function jnci_BufferedEncoder$Controller_hasMoreOutput($this, $sz) {
    return jn_Buffer_remaining($this.$out1) < $sz ? 0 : 1;
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
    var$1.$_013 = $this;
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
    jl_Thread_mainThread = jl_Thread__init_0(null, $rt_s(47));
    jl_Thread_currentThread0 = jl_Thread_mainThread;
    jl_Thread_nextId = Long_fromInt(1);
    jl_Thread_activeCount = 1;
}
function ju_Timer$lambda$schedule$1$lambda$_6_0() {
    var a = this; jl_Object.call(a);
    a.$_012 = null;
    a.$_12 = null;
}
function ju_Timer$lambda$schedule$1$lambda$_6_0_run(var$0) {
    var var$1, var$2;
    var$1 = var$0.$_012;
    var$2 = var$0.$_12;
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
    this.$_013 = null;
}
function jl_Thread$start$lambda$_4_0_run(var$0) {
    var var$1, var$2, var$3, $$je;
    var$1 = var$0.$_013;
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
function jl_Boolean() {
    jl_Object.call(this);
    this.$value4 = 0;
}
var jl_Boolean_TRUE = null;
var jl_Boolean_FALSE = null;
var jl_Boolean_TYPE = null;
function jl_Boolean__init_(var_0) {
    var var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
}
function jl_Boolean__init_0($this, $value) {
    $this.$value4 = $value;
}
function jl_Boolean_booleanValue($this) {
    return $this.$value4;
}
function jl_Boolean__clinit_() {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls());
}
function ju_NoSuchElementException() {
    jl_RuntimeException.call(this);
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
function ovncvc_HorizontalLayout$HLAPIWrapper() {
    var a = this; jl_Object.call(a);
    a.$api0 = null;
    a.$width1 = 0;
    a.$offset = 0;
    a.$this$03 = null;
}
function ovncvc_HorizontalLayout$HLAPIWrapper_setItem($this, $x, $y, $item) {
    $this.$api0.$setItem($x + $this.$offset | 0, $y, $item);
}
function ovncvc_Panel$PAPIWrapper() {
    var a = this; jl_Object.call(a);
    a.$api1 = null;
    a.$this$04 = null;
}
function ovncvc_Panel$PAPIWrapper_setItem($this, $x, $y, $item) {
    $this.$api1.$setItem($x + 1 | 0, $y + 1 | 0, $item);
}
function ovncvc_VerticalLayout$VLAPIWrapper() {
    var a = this; jl_Object.call(a);
    a.$api2 = null;
    a.$offset0 = 0;
    a.$height1 = 0;
    a.$this$05 = null;
}
function ovncvc_VerticalLayout$VLAPIWrapper_setItem($this, $x, $y, $item) {
    $this.$api2.$setItem($x, $y + $this.$offset0 | 0, $item);
}
function ju_Formatter() {
    var a = this; jl_Object.call(a);
    a.$locale = null;
    a.$out = null;
    a.$ioException = null;
}
function ju_Formatter_requireOpen($this) {
    var var$1;
    if ($this.$out !== null)
        return;
    var$1 = new ju_FormatterClosedException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
}
function ju_Formatter_toString($this) {
    ju_Formatter_requireOpen($this);
    return jl_AbstractStringBuilder_toString($this.$out);
}
function ju_Formatter_format($this, $format, $args) {
    return ju_Formatter_format0($this, $this.$locale, $format, $args);
}
function ju_Formatter_format0($this, $l, $format, $args) {
    var $e, $$je;
    ju_Formatter_requireOpen($this);
    a: {
        try {
            if ($args === null)
                $args = $rt_createArray(jl_Object, 1);
            ju_Formatter$FormatWriter_write(ju_Formatter$FormatWriter__init_($this, $this.$out, $l, $format, $args));
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                $e = $$je;
            } else {
                throw $$e;
            }
        }
        $this.$ioException = $e;
    }
    return $this;
}
function ju_Locale() {
    var a = this; jl_Object.call(a);
    a.$countryCode = null;
    a.$languageCode = null;
    a.$variantCode = null;
}
var ju_Locale_defaultLocale = null;
var ju_Locale_CANADA = null;
var ju_Locale_CANADA_FRENCH = null;
var ju_Locale_CHINA = null;
var ju_Locale_CHINESE = null;
var ju_Locale_ENGLISH = null;
var ju_Locale_FRANCE = null;
var ju_Locale_FRENCH = null;
var ju_Locale_GERMAN = null;
var ju_Locale_GERMANY = null;
var ju_Locale_ITALIAN = null;
var ju_Locale_ITALY = null;
var ju_Locale_JAPAN = null;
var ju_Locale_JAPANESE = null;
var ju_Locale_KOREA = null;
var ju_Locale_KOREAN = null;
var ju_Locale_PRC = null;
var ju_Locale_SIMPLIFIED_CHINESE = null;
var ju_Locale_TAIWAN = null;
var ju_Locale_TRADITIONAL_CHINESE = null;
var ju_Locale_UK = null;
var ju_Locale_US = null;
var ju_Locale_ROOT = null;
function ju_Locale__init_(var_0, var_1) {
    var var_2 = new ju_Locale();
    ju_Locale__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_Locale__init_1(var_0, var_1, var_2) {
    var var_3 = new ju_Locale();
    ju_Locale__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function ju_Locale__init_0($this, $language, $country) {
    ju_Locale__init_2($this, $language, $country, $rt_s(16));
}
function ju_Locale__init_2($this, $language, $country, $variant) {
    if ($language !== null && $country !== null && $variant !== null) {
        if (!jl_String_length($language) && !jl_String_length($country)) {
            $this.$languageCode = $rt_s(16);
            $this.$countryCode = $rt_s(16);
            $this.$variantCode = $variant;
            return;
        }
        $this.$languageCode = $language;
        $this.$countryCode = $country;
        $this.$variantCode = $variant;
        return;
    }
    $language = new jl_NullPointerException;
    jl_Exception__init_($language);
    $rt_throw($language);
}
function ju_Locale_getCountry($this) {
    return $this.$countryCode;
}
function ju_Locale_getLanguage($this) {
    return $this.$languageCode;
}
function ju_Locale__clinit_() {
    var $localeName, $countryIndex;
    ju_Locale_CANADA = ju_Locale__init_($rt_s(48), $rt_s(49));
    ju_Locale_CANADA_FRENCH = ju_Locale__init_($rt_s(50), $rt_s(49));
    ju_Locale_CHINA = ju_Locale__init_($rt_s(51), $rt_s(52));
    ju_Locale_CHINESE = ju_Locale__init_($rt_s(51), $rt_s(16));
    ju_Locale_ENGLISH = ju_Locale__init_($rt_s(48), $rt_s(16));
    ju_Locale_FRANCE = ju_Locale__init_($rt_s(50), $rt_s(53));
    ju_Locale_FRENCH = ju_Locale__init_($rt_s(50), $rt_s(16));
    ju_Locale_GERMAN = ju_Locale__init_($rt_s(54), $rt_s(16));
    ju_Locale_GERMANY = ju_Locale__init_($rt_s(54), $rt_s(55));
    ju_Locale_ITALIAN = ju_Locale__init_($rt_s(56), $rt_s(16));
    ju_Locale_ITALY = ju_Locale__init_($rt_s(56), $rt_s(57));
    ju_Locale_JAPAN = ju_Locale__init_($rt_s(58), $rt_s(59));
    ju_Locale_JAPANESE = ju_Locale__init_($rt_s(58), $rt_s(16));
    ju_Locale_KOREA = ju_Locale__init_($rt_s(60), $rt_s(61));
    ju_Locale_KOREAN = ju_Locale__init_($rt_s(60), $rt_s(16));
    ju_Locale_PRC = ju_Locale__init_($rt_s(51), $rt_s(52));
    ju_Locale_SIMPLIFIED_CHINESE = ju_Locale__init_($rt_s(51), $rt_s(52));
    ju_Locale_TAIWAN = ju_Locale__init_($rt_s(51), $rt_s(62));
    ju_Locale_TRADITIONAL_CHINESE = ju_Locale__init_($rt_s(51), $rt_s(62));
    ju_Locale_UK = ju_Locale__init_($rt_s(48), $rt_s(63));
    ju_Locale_US = ju_Locale__init_($rt_s(48), $rt_s(64));
    ju_Locale_ROOT = ju_Locale__init_($rt_s(16), $rt_s(16));
    if (otciu_CLDRHelper_$$metadata$$10 === null)
        otciu_CLDRHelper_$$metadata$$10 = otciu_CLDRHelper_getDefaultLocale$$create();
    $localeName = (otciu_CLDRHelper_$$metadata$$10.value !== null ? $rt_str(otciu_CLDRHelper_$$metadata$$10.value) : null);
    $countryIndex = jl_String_indexOf0($localeName, 95);
    ju_Locale_defaultLocale = ju_Locale__init_1(jl_String_substring($localeName, 0, $countryIndex), jl_String_substring0($localeName, $countryIndex + 1 | 0), $rt_s(16));
}
function otciu_CLDRHelper() {
    jl_Object.call(this);
}
var otciu_CLDRHelper_$$metadata$$0 = null;
var otciu_CLDRHelper_$$metadata$$10 = null;
var otciu_CLDRHelper_$$metadata$$17 = null;
var otciu_CLDRHelper_$$metadata$$20 = null;
function otciu_CLDRHelper_getCode($language, $country) {
    if (!jl_String_isEmpty($country))
        $language = jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $language), $rt_s(65)), $country));
    return $language;
}
function otciu_CLDRHelper_getLikelySubtagsMap$$create() {
    return {"ksh": {"value" : "ksh-Latn-DE"}, "ksj": {"value" : "ksj-Latn-ZZ"}, "cch": {"value" : "cch-Latn-NG"}, "und-Khar": {"value" : "pra-Khar-PK"}, "gkn": {"value" : "gkn-Latn-ZZ"}, "ksr": {"value" : "ksr-Latn-ZZ"}, "und-Mani": {"value" : "xmn-Mani-CN"}, "gkp": {"value" : "gkp-Latn-ZZ"}, "xmf": {"value" : "xmf-Geor-GE"}, "ccp": {"value" : "ccp-Cakm-BD"}, "ted": {"value" : "ted-Latn-ZZ"}, "und-Mand": {"value" : "myz-Mand-IR"}, "ktb": {"value" : "ktb-Ethi-ZZ"}, "xmn": {"value" : "xmn-Mani-CN"}, "sd-Sind":
    {"value" : "sd-Sind-IN"}, "xmr": {"value" : "xmr-Merc-SD"}, "tem": {"value" : "tem-Latn-SL"}, "und-Mroo": {"value" : "mro-Mroo-BD"}, "teo": {"value" : "teo-Latn-UG"}, "tet": {"value" : "tet-Latn-TL"}, "ktm": {"value" : "ktm-Latn-ZZ"}, "glk": {"value" : "glk-Arab-IR"}, "kto": {"value" : "kto-Latn-ZZ"}, "und-Soyo": {"value" : "cmg-Soyo-MN"}, "xna": {"value" : "xna-Narb-SA"}, "tfi": {"value" : "tfi-Latn-ZZ"}, "kub": {"value" : "kub-Latn-ZZ"}, "kue": {"value" : "kue-Latn-ZZ"}, "kud": {"value" : "kud-Latn-ZZ"}
    , "xnr": {"value" : "xnr-Deva-IN"}, "ceb": {"value" : "ceb-Latn-PH"}, "kuj": {"value" : "kuj-Latn-ZZ"}, "kum": {"value" : "kum-Cyrl-RU"}, "kun": {"value" : "kun-Latn-ZZ"}, "gmm": {"value" : "gmm-Latn-ZZ"}, "kup": {"value" : "kup-Latn-ZZ"}, "kus": {"value" : "kus-Latn-ZZ"}, "gmv": {"value" : "gmv-Ethi-ZZ"}, "tgc": {"value" : "tgc-Latn-ZZ"}, "xog": {"value" : "xog-Latn-UG"}, "und-Arab-YT": {"value" : "swb-Arab-YT"}, "und-Latn-ET": {"value" : "en-Latn-ET"}, "xon": {"value" : "xon-Latn-ZZ"}, "ha-CM": {"value"
    : "ha-Arab-CM"}, "gnd": {"value" : "gnd-Latn-ZZ"}, "kvg": {"value" : "kvg-Latn-ZZ"}, "tgo": {"value" : "tgo-Latn-ZZ"}, "cfa": {"value" : "cfa-Latn-ZZ"}, "gng": {"value" : "gng-Latn-ZZ"}, "tgu": {"value" : "tgu-Latn-ZZ"}, "und-Latn-GE": {"value" : "ku-Latn-GE"}, "kvr": {"value" : "kvr-Latn-ID"}, "kvx": {"value" : "kvx-Arab-PK"}, "und-Gujr": {"value" : "gu-Gujr-IN"}, "thl": {"value" : "thl-Deva-NP"}, "xpr": {"value" : "xpr-Prti-IR"}, "thq": {"value" : "thq-Deva-NP"}, "god": {"value" : "god-Latn-ZZ"}, "gof":
    {"value" : "gof-Ethi-ZZ"}, "kwj": {"value" : "kwj-Latn-ZZ"}, "ky-Arab": {"value" : "ky-Arab-CN"}, "thr": {"value" : "thr-Deva-NP"}, "goi": {"value" : "goi-Latn-ZZ"}, "cgg": {"value" : "cgg-Latn-UG"}, "kwo": {"value" : "kwo-Latn-ZZ"}, "gom": {"value" : "gom-Deva-IN"}, "gon": {"value" : "gon-Telu-IN"}, "gos": {"value" : "gos-Latn-NL"}, "gor": {"value" : "gor-Latn-ID"}, "und-Latn-CY": {"value" : "tr-Latn-CY"}, "got": {"value" : "got-Goth-UA"}, "tif": {"value" : "tif-Latn-ZZ"}, "tig": {"value" : "tig-Ethi-ER"}
    , "kxa": {"value" : "kxa-Latn-ZZ"}, "kxc": {"value" : "kxc-Ethi-ZZ"}, "pag": {"value" : "pag-Latn-PH"}, "tik": {"value" : "tik-Latn-ZZ"}, "tim": {"value" : "tim-Latn-ZZ"}, "pal": {"value" : "pal-Phli-IR"}, "tio": {"value" : "tio-Latn-ZZ"}, "pam": {"value" : "pam-Latn-PH"}, "und-Marc": {"value" : "bo-Marc-CN"}, "pap": {"value" : "pap-Latn-AW"}, "und-Latn-CN": {"value" : "za-Latn-CN"}, "tiv": {"value" : "tiv-Latn-NG"}, "kxm": {"value" : "kxm-Thai-TH"}, "kxp": {"value" : "kxp-Arab-PK"}, "pau": {"value" : "pau-Latn-PW"}
    , "chk": {"value" : "chk-Latn-FM"}, "chm": {"value" : "chm-Cyrl-RU"}, "xrb": {"value" : "xrb-Latn-ZZ"}, "chp": {"value" : "chp-Latn-CA"}, "cho": {"value" : "cho-Latn-US"}, "kxw": {"value" : "kxw-Latn-ZZ"}, "und-Latn-DZ": {"value" : "fr-Latn-DZ"}, "chr": {"value" : "chr-Cher-US"}, "kxz": {"value" : "kxz-Latn-ZZ"}, "und-Batk": {"value" : "bbc-Batk-ID"}, "und-Bass": {"value" : "bsq-Bass-LR"}, "kye": {"value" : "kye-Latn-ZZ"}, "pbi": {"value" : "pbi-Latn-ZZ"}, "und-Deva-MU": {"value" : "bho-Deva-MU"}, "und-Sgnw":
    {"value" : "ase-Sgnw-US"}, "xsa": {"value" : "xsa-Sarb-YE"}, "kyx": {"value" : "kyx-Latn-ZZ"}, "xsi": {"value" : "xsi-Latn-ZZ"}, "pcd": {"value" : "pcd-Latn-FR"}, "und-Latn-AM": {"value" : "ku-Latn-AM"}, "xsm": {"value" : "xsm-Latn-ZZ"}, "tkl": {"value" : "tkl-Latn-TK"}, "und-Thai-CN": {"value" : "lcp-Thai-CN"}, "grb": {"value" : "grb-Latn-ZZ"}, "xsr": {"value" : "xsr-Deva-NP"}, "und-Latn-AF": {"value" : "tk-Latn-AF"}, "grc": {"value" : "grc-Cprt-CY"}, "tkr": {"value" : "tkr-Latn-AZ"}, "cja": {"value" :
    "cja-Arab-KH"}, "pcm": {"value" : "pcm-Latn-NG"}, "tkt": {"value" : "tkt-Deva-NP"}, "und-Olck": {"value" : "sat-Olck-IN"}, "kzr": {"value" : "kzr-Latn-ZZ"}, "cjm": {"value" : "cjm-Cham-VN"}, "grt": {"value" : "grt-Beng-IN"}, "und-Arab-TJ": {"value" : "fa-Arab-TJ"}, "und-Arab-TG": {"value" : "apd-Arab-TG"}, "und-Arab-TH": {"value" : "mfa-Arab-TH"}, "und-Deva-PK": {"value" : "btv-Deva-PK"}, "grw": {"value" : "grw-Latn-ZZ"}, "cjv": {"value" : "cjv-Latn-ZZ"}, "pdc": {"value" : "pdc-Latn-US"}, "tlf": {"value"
    : "tlf-Latn-ZZ"}, "und-Arab-TR": {"value" : "az-Arab-TR"}, "ckb": {"value" : "ckb-Arab-IQ"}, "tly": {"value" : "tly-Latn-AZ"}, "pdt": {"value" : "pdt-Latn-CA"}, "tlx": {"value" : "tlx-Latn-ZZ"}, "ckl": {"value" : "ckl-Latn-ZZ"}, "cko": {"value" : "cko-Latn-ZZ"}, "gsw": {"value" : "gsw-Latn-CH"}, "ped": {"value" : "ped-Latn-ZZ"}, "tmh": {"value" : "tmh-Latn-NE"}, "cky": {"value" : "cky-Latn-ZZ"}, "kk-Arab": {"value" : "kk-Arab-CN"}, "und-Runr": {"value" : "non-Runr-SE"}, "cla": {"value" : "cla-Latn-ZZ"},
    "peo": {"value" : "peo-Xpeo-IR"}, "tmy": {"value" : "tmy-Latn-ZZ"}, "pex": {"value" : "pex-Latn-ZZ"}, "ky-TR": {"value" : "ky-Latn-TR"}, "tnh": {"value" : "tnh-Latn-ZZ"}, "guc": {"value" : "guc-Latn-CO"}, "gub": {"value" : "gub-Latn-BR"}, "gud": {"value" : "gud-Latn-ZZ"}, "pfl": {"value" : "pfl-Latn-DE"}, "cme": {"value" : "cme-Latn-ZZ"}, "cmg": {"value" : "cmg-Soyo-MN"}, "gur": {"value" : "gur-Latn-GH"}, "xwe": {"value" : "xwe-Latn-ZZ"}, "guw": {"value" : "guw-Latn-ZZ"}, "tof": {"value" : "tof-Latn-ZZ"}
    , "gux": {"value" : "gux-Latn-ZZ"}, "guz": {"value" : "guz-Latn-KE"}, "tog": {"value" : "tog-Latn-MW"}, "gvf": {"value" : "gvf-Latn-ZZ"}, "toq": {"value" : "toq-Latn-ZZ"}, "gvr": {"value" : "gvr-Deva-NP"}, "und-Guru": {"value" : "pa-Guru-IN"}, "gvs": {"value" : "gvs-Latn-ZZ"}, "tpi": {"value" : "tpi-Latn-PG"}, "tpm": {"value" : "tpm-Latn-ZZ"}, "und-Tfng": {"value" : "zgh-Tfng-MA"}, "gwc": {"value" : "gwc-Arab-ZZ"}, "und-Arab-PK": {"value" : "ur-Arab-PK"}, "phl": {"value" : "phl-Arab-ZZ"}, "und-Aghb": {"value"
    : "lez-Aghb-RU"}, "phn": {"value" : "phn-Phnx-LB"}, "gwi": {"value" : "gwi-Latn-CA"}, "tpz": {"value" : "tpz-Latn-ZZ"}, "cop": {"value" : "cop-Copt-EG"}, "gwt": {"value" : "gwt-Arab-ZZ"}, "lab": {"value" : "lab-Lina-GR"}, "lad": {"value" : "lad-Hebr-IL"}, "lah": {"value" : "lah-Arab-PK"}, "pil": {"value" : "pil-Latn-ZZ"}, "lag": {"value" : "lag-Latn-TZ"}, "tqo": {"value" : "tqo-Latn-ZZ"}, "laj": {"value" : "laj-Latn-UG"}, "pip": {"value" : "pip-Latn-ZZ"}, "und-Khmr": {"value" : "km-Khmr-KH"}, "las": {"value"
    : "las-Latn-ZZ"}, "sd-Deva": {"value" : "sd-Deva-IN"}, "und-Khoj": {"value" : "sd-Khoj-IN"}, "cps": {"value" : "cps-Latn-PH"}, "kk-AF": {"value" : "kk-Arab-AF"}, "und-Arab-MU": {"value" : "ur-Arab-MU"}, "lbe": {"value" : "lbe-Cyrl-RU"}, "und-Arab-NG": {"value" : "ha-Arab-NG"}, "gyi": {"value" : "gyi-Latn-ZZ"}, "tru": {"value" : "tru-Latn-TR"}, "trw": {"value" : "trw-Arab-ZZ"}, "trv": {"value" : "trv-Latn-TW"}, "lbu": {"value" : "lbu-Latn-ZZ"}, "lbw": {"value" : "lbw-Latn-ID"}, "tsd": {"value" : "tsd-Grek-GR"}
    , "tsf": {"value" : "tsf-Deva-NP"}, "pka": {"value" : "pka-Brah-IN"}, "tsg": {"value" : "tsg-Latn-PH"}, "tsj": {"value" : "tsj-Tibt-BT"}, "und-Deva-FJ": {"value" : "hif-Deva-FJ"}, "pko": {"value" : "pko-Latn-KE"}, "lcm": {"value" : "lcm-Latn-ZZ"}, "crh": {"value" : "crh-Cyrl-UA"}, "lcp": {"value" : "lcp-Thai-CN"}, "tsw": {"value" : "tsw-Latn-ZZ"}, "crj": {"value" : "crj-Cans-CA"}, "crl": {"value" : "crl-Cans-CA"}, "und-Arab-MN": {"value" : "kk-Arab-MN"}, "crk": {"value" : "crk-Cans-CA"}, "crm": {"value"
    : "crm-Cans-CA"}, "und-Arab-MM": {"value" : "rhg-Arab-MM"}, "pla": {"value" : "pla-Latn-ZZ"}, "tte": {"value" : "tte-Latn-ZZ"}, "crs": {"value" : "crs-Latn-SC"}, "ttd": {"value" : "ttd-Latn-ZZ"}, "ldb": {"value" : "ldb-Latn-ZZ"}, "ttj": {"value" : "ttj-Latn-UG"}, "kk-CN": {"value" : "kk-Arab-CN"}, "und-Yiii": {"value" : "ii-Yiii-CN"}, "tts": {"value" : "tts-Thai-TH"}, "csb": {"value" : "csb-Latn-PL"}, "ttr": {"value" : "ttr-Latn-ZZ"}, "ttt": {"value" : "ttt-Latn-AZ"}, "csw": {"value" : "csw-Cans-CA"}, "tuh":
    {"value" : "tuh-Latn-ZZ"}, "led": {"value" : "led-Latn-ZZ"}, "tul": {"value" : "tul-Latn-ZZ"}, "lee": {"value" : "lee-Latn-ZZ"}, "tum": {"value" : "tum-Latn-MW"}, "und-Arab-KH": {"value" : "cja-Arab-KH"}, "tuq": {"value" : "tuq-Latn-ZZ"}, "ctd": {"value" : "ctd-Pauc-MM"}, "lem": {"value" : "lem-Latn-ZZ"}, "lep": {"value" : "lep-Lepc-IN"}, "pms": {"value" : "pms-Latn-IT"}, "leq": {"value" : "leq-Latn-ZZ"}, "und-Pauc": {"value" : "ctd-Pauc-MM"}, "und-Sogo": {"value" : "sog-Sogo-UZ"}, "leu": {"value" : "leu-Latn-ZZ"}
    , "lez": {"value" : "lez-Cyrl-RU"}, "tvd": {"value" : "tvd-Latn-ZZ"}, "mn-CN": {"value" : "mn-Mong-CN"}, "sr-TR": {"value" : "sr-Latn-TR"}, "png": {"value" : "png-Latn-ZZ"}, "tvl": {"value" : "tvl-Latn-TV"}, "und-Brah": {"value" : "pka-Brah-IN"}, "und-Brai": {"value" : "fr-Brai-FR"}, "pnn": {"value" : "pnn-Latn-ZZ"}, "tvu": {"value" : "tvu-Latn-ZZ"}, "pnt": {"value" : "pnt-Grek-GR"}, "uz-CN": {"value" : "uz-Cyrl-CN"}, "ha-SD": {"value" : "ha-Arab-SD"}, "twh": {"value" : "twh-Latn-ZZ"}, "und-Takr": {"value"
    : "doi-Takr-IN"}, "lgg": {"value" : "lgg-Latn-ZZ"}, "pon": {"value" : "pon-Latn-FM"}, "twq": {"value" : "twq-Latn-NE"}, "und-Arab-ID": {"value" : "ms-Arab-ID"}, "und-Arab-IN": {"value" : "ur-Arab-IN"}, "txg": {"value" : "txg-Tang-CN"}, "yam": {"value" : "yam-Latn-ZZ"}, "und-Talu": {"value" : "khb-Talu-CN"}, "yao": {"value" : "yao-Latn-MZ"}, "yap": {"value" : "yap-Latn-FM"}, "yas": {"value" : "yas-Latn-ZZ"}, "yat": {"value" : "yat-Latn-ZZ"}, "ppo": {"value" : "ppo-Latn-ZZ"}, "yav": {"value" : "yav-Latn-CM"}
    , "yay": {"value" : "yay-Latn-ZZ"}, "yaz": {"value" : "yaz-Latn-ZZ"}, "und-Tale": {"value" : "tdd-Tale-CN"}, "ybb": {"value" : "ybb-Latn-CM"}, "yba": {"value" : "yba-Latn-ZZ"}, "tya": {"value" : "tya-Latn-ZZ"}, "lia": {"value" : "lia-Latn-ZZ"}, "lid": {"value" : "lid-Latn-ZZ"}, "und-Latn-TW": {"value" : "trv-Latn-TW"}, "lif": {"value" : "lif-Deva-NP"}, "lih": {"value" : "lih-Latn-ZZ"}, "lig": {"value" : "lig-Latn-ZZ"}, "lij": {"value" : "lij-Latn-IT"}, "hag": {"value" : "hag-Latn-ZZ"}, "und-Latn-TN": {"value"
    : "fr-Latn-TN"}, "tyv": {"value" : "tyv-Cyrl-RU"}, "yby": {"value" : "yby-Latn-ZZ"}, "und-Arab-GB": {"value" : "ks-Arab-GB"}, "hak": {"value" : "hak-Hans-CN"}, "und-Taml": {"value" : "ta-Taml-IN"}, "ham": {"value" : "ham-Latn-ZZ"}, "lis": {"value" : "lis-Lisu-CN"}, "und-Latn-SY": {"value" : "fr-Latn-SY"}, "ky-Latn": {"value" : "ky-Latn-TR"}, "pra": {"value" : "pra-Khar-PK"}, "haw": {"value" : "haw-Latn-US"}, "haz": {"value" : "haz-Arab-AF"}, "ku-LB": {"value" : "ku-Arab-LB"}, "prd": {"value" : "prd-Arab-IR"}
    , "prg": {"value" : "prg-Latn-001"}, "tzm": {"value" : "tzm-Latn-MA"}, "hbb": {"value" : "hbb-Latn-ZZ"}, "und-Latn-UA": {"value" : "pl-Latn-UA"}, "ljp": {"value" : "ljp-Latn-ID"}, "und-Tang": {"value" : "txg-Tang-CN"}, "yue-Hans": {"value" : "yue-Hans-CN"}, "und-Latn-RU": {"value" : "krl-Latn-RU"}, "lki": {"value" : "lki-Arab-IR"}, "pss": {"value" : "pss-Latn-ZZ"}, "lkt": {"value" : "lkt-Latn-US"}, "sr-RO": {"value" : "sr-Latn-RO"}, "und-Arab-CN": {"value" : "ug-Arab-CN"}, "lle": {"value" : "lle-Latn-ZZ"}
    , "und-Cyrl": {"value" : "ru-Cyrl-RU"}, "uz-AF": {"value" : "uz-Arab-AF"}, "yer": {"value" : "yer-Latn-ZZ"}, "und-Beng": {"value" : "bn-Beng-BD"}, "ptp": {"value" : "ptp-Latn-ZZ"}, "lln": {"value" : "lln-Latn-ZZ"}, "sr-RU": {"value" : "sr-Latn-RU"}, "hdy": {"value" : "hdy-Ethi-ZZ"}, "unr-NP": {"value" : "unr-Deva-NP"}, "und-Mend": {"value" : "men-Mend-SL"}, "lmn": {"value" : "lmn-Telu-IN"}, "lmp": {"value" : "lmp-Latn-ZZ"}, "lmo": {"value" : "lmo-Latn-IT"}, "puu": {"value" : "puu-Latn-GA"}, "und-Arab-CC":
    {"value" : "ms-Arab-CC"}, "pal-Phlp": {"value" : "pal-Phlp-CN"}, "ygr": {"value" : "ygr-Latn-ZZ"}, "ygw": {"value" : "ygw-Latn-ZZ"}, "lns": {"value" : "lns-Latn-ZZ"}, "ky-CN": {"value" : "ky-Arab-CN"}, "lnu": {"value" : "lnu-Latn-ZZ"}, "pwa": {"value" : "pwa-Latn-ZZ"}, "und-Mahj": {"value" : "hi-Mahj-IN"}, "rif-NL": {"value" : "rif-Latn-NL"}, "loj": {"value" : "loj-Latn-ZZ"}, "lol": {"value" : "lol-Latn-CD"}, "lok": {"value" : "lok-Latn-ZZ"}, "lor": {"value" : "lor-Latn-ZZ"}, "und-Sora": {"value" : "srb-Sora-IN"}
    , "los": {"value" : "los-Latn-ZZ"}, "loz": {"value" : "loz-Latn-ZM"}, "und-202": {"value" : "en-Latn-NG"}, "und-Latn-MR": {"value" : "fr-Latn-MR"}, "hhy": {"value" : "hhy-Latn-ZZ"}, "hia": {"value" : "hia-Latn-ZZ"}, "hif": {"value" : "hif-Latn-FJ"}, "dad": {"value" : "dad-Latn-ZZ"}, "hih": {"value" : "hih-Latn-ZZ"}, "hig": {"value" : "hig-Latn-ZZ"}, "daf": {"value" : "daf-Latn-ZZ"}, "ubu": {"value" : "ubu-Latn-ZZ"}, "dah": {"value" : "dah-Latn-ZZ"}, "hil": {"value" : "hil-Latn-PH"}, "dag": {"value" : "dag-Latn-ZZ"}
    , "und-Mero": {"value" : "xmr-Mero-SD"}, "dak": {"value" : "dak-Latn-US"}, "und-Merc": {"value" : "xmr-Merc-SD"}, "dar": {"value" : "dar-Cyrl-RU"}, "dav": {"value" : "dav-Latn-KE"}, "lrc": {"value" : "lrc-Arab-IR"}, "yko": {"value" : "yko-Latn-ZZ"}, "und-Latn-MK": {"value" : "sq-Latn-MK"}, "und-Latn-MM": {"value" : "kac-Latn-MM"}, "dbd": {"value" : "dbd-Latn-ZZ"}, "und-Latn-MO": {"value" : "pt-Latn-MO"}, "und-Latn-MA": {"value" : "fr-Latn-MA"}, "und-Bali": {"value" : "ban-Bali-ID"}, "und-Tavt": {"value"
    : "blt-Tavt-VN"}, "dbq": {"value" : "dbq-Latn-ZZ"}, "yle": {"value" : "yle-Latn-ZZ"}, "ylg": {"value" : "ylg-Latn-ZZ"}, "und-Maka": {"value" : "mak-Maka-ID"}, "yll": {"value" : "yll-Latn-ZZ"}, "udm": {"value" : "udm-Cyrl-RU"}, "dcc": {"value" : "dcc-Arab-IN"}, "yml": {"value" : "yml-Latn-ZZ"}, "hla": {"value" : "hla-Latn-ZZ"}, "und-Latn-IR": {"value" : "tk-Latn-IR"}, "ltg": {"value" : "ltg-Latn-LV"}, "und-Latn-KM": {"value" : "fr-Latn-KM"}, "ddn": {"value" : "ddn-Latn-ZZ"}, "hlu": {"value" : "hlu-Hluw-TR"}
    , "lua": {"value" : "lua-Latn-CD"}, "und-Bamu": {"value" : "bax-Bamu-CM"}, "hmd": {"value" : "hmd-Plrd-CN"}, "ded": {"value" : "ded-Latn-ZZ"}, "luo": {"value" : "luo-Latn-KE"}, "und-142": {"value" : "zh-Hans-CN"}, "und-143": {"value" : "uz-Latn-UZ"}, "den": {"value" : "den-Latn-CA"}, "und-Gran": {"value" : "sa-Gran-IN"}, "hmt": {"value" : "hmt-Latn-ZZ"}, "uga": {"value" : "uga-Ugar-SY"}, "luz": {"value" : "luz-Arab-IR"}, "luy": {"value" : "luy-Latn-KE"}, "und-145": {"value" : "ar-Arab-SA"}, "und-Cakm": {"value"
    : "ccp-Cakm-BD"}, "und-Dupl": {"value" : "fr-Dupl-FR"}, "yon": {"value" : "yon-Latn-ZZ"}, "ug-MN": {"value" : "ug-Cyrl-MN"}, "hne": {"value" : "hne-Deva-IN"}, "hnd": {"value" : "hnd-Arab-PK"}, "hnj": {"value" : "hnj-Hmng-LA"}, "hno": {"value" : "hno-Arab-PK"}, "hnn": {"value" : "hnn-Latn-PH"}, "ug-KZ": {"value" : "ug-Cyrl-KZ"}, "und-154": {"value" : "en-Latn-GB"}, "und-155": {"value" : "de-Latn-DE"}, "und-150": {"value" : "ru-Cyrl-RU"}, "und-151": {"value" : "ru-Cyrl-RU"}, "und-Sylo": {"value" : "syl-Sylo-BD"}
    , "hoc": {"value" : "hoc-Deva-IN"}, "dga": {"value" : "dga-Latn-ZZ"}, "lwl": {"value" : "lwl-Thai-TH"}, "und-Ital": {"value" : "ett-Ital-IT"}, "hoj": {"value" : "hoj-Deva-IN"}, "dgh": {"value" : "dgh-Latn-ZZ"}, "dgi": {"value" : "dgi-Latn-ZZ"}, "dgl": {"value" : "dgl-Arab-ZZ"}, "hot": {"value" : "hot-Latn-ZZ"}, "dgr": {"value" : "dgr-Latn-CA"}, "dgz": {"value" : "dgz-Latn-ZZ"}, "yrb": {"value" : "yrb-Latn-ZZ"}, "yre": {"value" : "yre-Latn-ZZ"}, "und-Lyci": {"value" : "xlc-Lyci-TR"}, "und-Cans": {"value"
    : "cr-Cans-CA"}, "und-Hluw": {"value" : "hlu-Hluw-TR"}, "und-Nand": {"value" : "sa-Nand-IN"}, "yrl": {"value" : "yrl-Latn-BR"}, "dia": {"value" : "dia-Latn-ZZ"}, "und-Grek": {"value" : "el-Grek-GR"}, "und-Mong": {"value" : "mn-Mong-CN"}, "und-Lydi": {"value" : "xld-Lydi-TR"}, "yss": {"value" : "yss-Latn-ZZ"}, "und-Newa": {"value" : "new-Newa-NP"}, "lzh": {"value" : "lzh-Hans-CN"}, "dje": {"value" : "dje-Latn-NE"}, "lzz": {"value" : "lzz-Latn-TR"}, "uli": {"value" : "uli-Latn-FM"}, "hsb": {"value" : "hsb-Latn-DE"}
    , "und-Xsux": {"value" : "akk-Xsux-IQ"}, "hsn": {"value" : "hsn-Hans-CN"}, "und-Cari": {"value" : "xcr-Cari-TR"}, "und-Syrc": {"value" : "syr-Syrc-IQ"}, "yua": {"value" : "yua-Latn-MX"}, "yue": {"value" : "yue-Hant-HK"}, "umb": {"value" : "umb-Latn-AO"}, "yuj": {"value" : "yuj-Latn-ZZ"}, "yut": {"value" : "yut-Latn-ZZ"}, "yuw": {"value" : "yuw-Latn-ZZ"}, "und-Bopo": {"value" : "zh-Bopo-TW"}, "und": {"value" : "en-Latn-US"}, "und-Egyp": {"value" : "egy-Egyp-EG"}, "und-Tglg": {"value" : "fil-Tglg-PH"}, "unr":
    {"value" : "unr-Beng-IN"}, "hui": {"value" : "hui-Latn-ZZ"}, "und-Elba": {"value" : "sq-Elba-AL"}, "unx": {"value" : "unx-Beng-IN"}, "und-Narb": {"value" : "xna-Narb-SA"}, "pa-PK": {"value" : "pa-Arab-PK"}, "und-Hebr-CA": {"value" : "yi-Hebr-CA"}, "und-Geor": {"value" : "ka-Geor-GE"}, "und-Shrd": {"value" : "sa-Shrd-IN"}, "dnj": {"value" : "dnj-Latn-CI"}, "dob": {"value" : "dob-Latn-ZZ"}, "und-Mymr-TH": {"value" : "mnw-Mymr-TH"}, "doi": {"value" : "doi-Arab-IN"}, "dop": {"value" : "dop-Latn-ZZ"}, "und-Sund":
    {"value" : "su-Sund-ID"}, "dow": {"value" : "dow-Latn-ZZ"}, "sr-ME": {"value" : "sr-Latn-ME"}, "und-Hung": {"value" : "hu-Hung-HU"}, "mad": {"value" : "mad-Latn-ID"}, "mag": {"value" : "mag-Deva-IN"}, "maf": {"value" : "maf-Latn-CM"}, "mai": {"value" : "mai-Deva-IN"}, "mak": {"value" : "mak-Latn-ID"}, "man": {"value" : "man-Latn-GM"}, "mas": {"value" : "mas-Latn-KE"}, "maw": {"value" : "maw-Latn-ZZ"}, "maz": {"value" : "maz-Latn-MX"}, "uri": {"value" : "uri-Latn-ZZ"}, "mbh": {"value" : "mbh-Latn-ZZ"}, "urt":
    {"value" : "urt-Latn-ZZ"}, "mbo": {"value" : "mbo-Latn-ZZ"}, "urw": {"value" : "urw-Latn-ZZ"}, "mbq": {"value" : "mbq-Latn-ZZ"}, "mbu": {"value" : "mbu-Latn-ZZ"}, "und-Hebr-GB": {"value" : "yi-Hebr-GB"}, "usa": {"value" : "usa-Latn-ZZ"}, "mbw": {"value" : "mbw-Latn-ZZ"}, "mci": {"value" : "mci-Latn-ZZ"}, "dri": {"value" : "dri-Latn-ZZ"}, "mcq": {"value" : "mcq-Latn-ZZ"}, "mcp": {"value" : "mcp-Latn-ZZ"}, "mcr": {"value" : "mcr-Latn-ZZ"}, "mcu": {"value" : "mcu-Latn-ZZ"}, "drs": {"value" : "drs-Ethi-ZZ"}
    , "mda": {"value" : "mda-Latn-ZZ"}, "mdf": {"value" : "mdf-Cyrl-RU"}, "mde": {"value" : "mde-Arab-ZZ"}, "mdh": {"value" : "mdh-Latn-PH"}, "dsb": {"value" : "dsb-Latn-DE"}, "mdj": {"value" : "mdj-Latn-ZZ"}, "utr": {"value" : "utr-Latn-ZZ"}, "mdr": {"value" : "mdr-Latn-ID"}, "mdx": {"value" : "mdx-Ethi-ZZ"}, "mee": {"value" : "mee-Latn-ZZ"}, "med": {"value" : "med-Latn-ZZ"}, "mek": {"value" : "mek-Latn-ZZ"}, "men": {"value" : "men-Latn-SL"}, "az-RU": {"value" : "az-Cyrl-RU"}, "mis-Medf": {"value" : "mis-Medf-NG"}
    , "mer": {"value" : "mer-Latn-KE"}, "dtm": {"value" : "dtm-Latn-ML"}, "meu": {"value" : "meu-Latn-ZZ"}, "met": {"value" : "met-Latn-ZZ"}, "dtp": {"value" : "dtp-Latn-MY"}, "dts": {"value" : "dts-Latn-ZZ"}, "uvh": {"value" : "uvh-Latn-ZZ"}, "dty": {"value" : "dty-Deva-NP"}, "mfa": {"value" : "mfa-Arab-TH"}, "uvl": {"value" : "uvl-Latn-ZZ"}, "mfe": {"value" : "mfe-Latn-MU"}, "dua": {"value" : "dua-Latn-CM"}, "dud": {"value" : "dud-Latn-ZZ"}, "duc": {"value" : "duc-Latn-ZZ"}, "mfn": {"value" : "mfn-Latn-ZZ"}
    , "dug": {"value" : "dug-Latn-ZZ"}, "mfo": {"value" : "mfo-Latn-ZZ"}, "mfq": {"value" : "mfq-Latn-ZZ"}, "und-Phag": {"value" : "lzh-Phag-CN"}, "dva": {"value" : "dva-Latn-ZZ"}, "mgh": {"value" : "mgh-Latn-MZ"}, "mgl": {"value" : "mgl-Latn-ZZ"}, "mgo": {"value" : "mgo-Latn-CM"}, "mgp": {"value" : "mgp-Deva-NP"}, "mgy": {"value" : "mgy-Latn-TZ"}, "zag": {"value" : "zag-Latn-SD"}, "mhi": {"value" : "mhi-Latn-ZZ"}, "mhl": {"value" : "mhl-Latn-ZZ"}, "dww": {"value" : "dww-Latn-ZZ"}, "mif": {"value" : "mif-Latn-ZZ"}
    , "und-Mymr-IN": {"value" : "kht-Mymr-IN"}, "min": {"value" : "min-Latn-ID"}, "mis": {"value" : "mis-Hatr-IQ"}, "ian": {"value" : "ian-Latn-ZZ"}, "miw": {"value" : "miw-Latn-ZZ"}, "iar": {"value" : "iar-Latn-ZZ"}, "uz-Arab": {"value" : "uz-Arab-AF"}, "ibb": {"value" : "ibb-Latn-NG"}, "iba": {"value" : "iba-Latn-MY"}, "dyo": {"value" : "dyo-Latn-SN"}, "dyu": {"value" : "dyu-Latn-BF"}, "iby": {"value" : "iby-Latn-ZZ"}, "zdj": {"value" : "zdj-Arab-KM"}, "ica": {"value" : "ica-Latn-ZZ"}, "mki": {"value" : "mki-Arab-ZZ"}
    , "und-Wcho": {"value" : "nnp-Wcho-IN"}, "ich": {"value" : "ich-Latn-ZZ"}, "mkl": {"value" : "mkl-Latn-ZZ"}, "dzg": {"value" : "dzg-Latn-ZZ"}, "mkp": {"value" : "mkp-Latn-ZZ"}, "zea": {"value" : "zea-Latn-NL"}, "mkw": {"value" : "mkw-Latn-ZZ"}, "mle": {"value" : "mle-Latn-ZZ"}, "idd": {"value" : "idd-Latn-ZZ"}, "idi": {"value" : "idi-Latn-ZZ"}, "lif-Limb": {"value" : "lif-Limb-IN"}, "mlp": {"value" : "mlp-Latn-ZZ"}, "mls": {"value" : "mls-Latn-SD"}, "idu": {"value" : "idu-Latn-ZZ"}, "quc": {"value" : "quc-Latn-GT"}
    , "qug": {"value" : "qug-Latn-EC"}, "und-Jamo": {"value" : "ko-Jamo-KR"}, "mmo": {"value" : "mmo-Latn-ZZ"}, "mmu": {"value" : "mmu-Latn-ZZ"}, "mmx": {"value" : "mmx-Latn-ZZ"}, "zgh": {"value" : "zgh-Tfng-MA"}, "mna": {"value" : "mna-Latn-ZZ"}, "mnf": {"value" : "mnf-Latn-ZZ"}, "ife": {"value" : "ife-Latn-TG"}, "mni": {"value" : "mni-Beng-IN"}, "mnw": {"value" : "mnw-Mymr-MM"}, "moa": {"value" : "moa-Latn-ZZ"}, "moe": {"value" : "moe-Latn-CA"}, "igb": {"value" : "igb-Latn-ZZ"}, "ige": {"value" : "ige-Latn-ZZ"}
    , "moh": {"value" : "moh-Latn-CA"}, "und-Hebr-SE": {"value" : "yi-Hebr-SE"}, "zhx": {"value" : "zhx-Nshu-CN"}, "mos": {"value" : "mos-Latn-BF"}, "und-Shaw": {"value" : "en-Shaw-GB"}, "zia": {"value" : "zia-Latn-ZZ"}, "mox": {"value" : "mox-Latn-ZZ"}, "vag": {"value" : "vag-Latn-ZZ"}, "vai": {"value" : "vai-Vaii-LR"}, "van": {"value" : "van-Latn-ZZ"}, "mpp": {"value" : "mpp-Latn-ZZ"}, "mpt": {"value" : "mpt-Latn-ZZ"}, "mps": {"value" : "mps-Latn-ZZ"}, "mpx": {"value" : "mpx-Latn-ZZ"}, "und-Hebr-US": {"value"
    : "yi-Hebr-US"}, "mql": {"value" : "mql-Latn-ZZ"}, "und-Hebr-UA": {"value" : "yi-Hebr-UA"}, "mrd": {"value" : "mrd-Deva-NP"}, "mrj": {"value" : "mrj-Cyrl-RU"}, "ijj": {"value" : "ijj-Latn-ZZ"}, "mro": {"value" : "mro-Mroo-BD"}, "und-Modi": {"value" : "mr-Modi-IN"}, "ebu": {"value" : "ebu-Latn-KE"}, "zlm": {"value" : "zlm-Latn-TG"}, "arc-Palm": {"value" : "arc-Palm-SY"}, "ikk": {"value" : "ikk-Latn-ZZ"}, "ikt": {"value" : "ikt-Latn-CA"}, "ikw": {"value" : "ikw-Latn-ZZ"}, "vec": {"value" : "vec-Latn-IT"},
    "ikx": {"value" : "ikx-Latn-ZZ"}, "zmi": {"value" : "zmi-Latn-MY"}, "mtc": {"value" : "mtc-Latn-ZZ"}, "mtf": {"value" : "mtf-Latn-ZZ"}, "vep": {"value" : "vep-Latn-RU"}, "zh-Bopo": {"value" : "zh-Bopo-TW"}, "mti": {"value" : "mti-Latn-ZZ"}, "und-Ethi": {"value" : "am-Ethi-ET"}, "mtr": {"value" : "mtr-Deva-IN"}, "und-Thai-LA": {"value" : "kdt-Thai-LA"}, "ilo": {"value" : "ilo-Latn-PH"}, "zne": {"value" : "zne-Latn-ZZ"}, "mua": {"value" : "mua-Latn-CM"}, "und-Thai-KH": {"value" : "kdt-Thai-KH"}, "imo": {"value"
    : "imo-Latn-ZZ"}, "mus": {"value" : "mus-Latn-US"}, "mur": {"value" : "mur-Latn-ZZ"}, "mva": {"value" : "mva-Latn-ZZ"}, "inh": {"value" : "inh-Cyrl-RU"}, "mvn": {"value" : "mvn-Latn-ZZ"}, "efi": {"value" : "efi-Latn-NG"}, "mvy": {"value" : "mvy-Arab-PK"}, "und-Java": {"value" : "jv-Java-ID"}, "mwk": {"value" : "mwk-Latn-ML"}, "mwr": {"value" : "mwr-Deva-IN"}, "und-021": {"value" : "en-Latn-US"}, "egl": {"value" : "egl-Latn-IT"}, "mww": {"value" : "mww-Hmnp-US"}, "mwv": {"value" : "mwv-Latn-ID"}, "iou": {"value"
    : "iou-Latn-ZZ"}, "und-029": {"value" : "es-Latn-CU"}, "vic": {"value" : "vic-Latn-SX"}, "egy": {"value" : "egy-Egyp-EG"}, "und-Ugar": {"value" : "uga-Ugar-SY"}, "mxc": {"value" : "mxc-Latn-ZW"}, "raj": {"value" : "raj-Deva-IN"}, "rai": {"value" : "rai-Latn-ZZ"}, "rao": {"value" : "rao-Latn-ZZ"}, "viv": {"value" : "viv-Latn-ZZ"}, "mxm": {"value" : "mxm-Latn-ZZ"}, "und-034": {"value" : "hi-Deva-IN"}, "und-030": {"value" : "zh-Hans-CN"}, "und-039": {"value" : "it-Latn-IT"}, "und-035": {"value" : "id-Latn-ID"}
    , "ug-Cyrl": {"value" : "ug-Cyrl-KZ"}, "myk": {"value" : "myk-Latn-ZZ"}, "mym": {"value" : "mym-Ethi-ZZ"}, "aai": {"value" : "aai-Latn-ZZ"}, "aak": {"value" : "aak-Latn-ZZ"}, "myw": {"value" : "myw-Latn-ZZ"}, "myv": {"value" : "myv-Cyrl-RU"}, "myx": {"value" : "myx-Latn-UG"}, "myz": {"value" : "myz-Mand-IR"}, "und-Sinh": {"value" : "si-Sinh-LK"}, "und-Sind": {"value" : "sd-Sind-IN"}, "aau": {"value" : "aau-Latn-ZZ"}, "rcf": {"value" : "rcf-Latn-RE"}, "und-Orkh": {"value" : "otk-Orkh-MN"}, "mzk": {"value"
    : "mzk-Latn-ZZ"}, "mzn": {"value" : "mzn-Arab-IR"}, "iri": {"value" : "iri-Latn-ZZ"}, "mzm": {"value" : "mzm-Latn-ZZ"}, "mzp": {"value" : "mzp-Latn-ZZ"}, "und-053": {"value" : "en-Latn-AU"}, "abi": {"value" : "abi-Latn-ZZ"}, "und-054": {"value" : "en-Latn-PG"}, "mzw": {"value" : "mzw-Latn-ZZ"}, "mzz": {"value" : "mzz-Latn-ZZ"}, "abr": {"value" : "abr-Latn-GH"}, "abq": {"value" : "abq-Cyrl-ZZ"}, "abt": {"value" : "abt-Latn-ZZ"}, "und-057": {"value" : "en-Latn-GU"}, "aby": {"value" : "aby-Latn-ZZ"}, "eka":
    {"value" : "eka-Latn-ZZ"}, "vls": {"value" : "vls-Latn-BE"}, "ace": {"value" : "ace-Latn-ID"}, "acd": {"value" : "acd-Latn-ZZ"}, "ach": {"value" : "ach-Latn-UG"}, "vmf": {"value" : "vmf-Latn-DE"}, "eky": {"value" : "eky-Kali-MM"}, "rej": {"value" : "rej-Latn-ID"}, "rel": {"value" : "rel-Latn-ZZ"}, "ada": {"value" : "ada-Latn-GH"}, "res": {"value" : "res-Latn-ZZ"}, "vmw": {"value" : "vmw-Latn-MZ"}, "ade": {"value" : "ade-Latn-ZZ"}, "adj": {"value" : "adj-Latn-ZZ"}, "und-Hira": {"value" : "ja-Hira-JP"}, "adz":
    {"value" : "adz-Latn-ZZ"}, "ady": {"value" : "ady-Cyrl-RU"}, "ema": {"value" : "ema-Latn-ZZ"}, "und-Deva": {"value" : "hi-Deva-IN"}, "aeb": {"value" : "aeb-Arab-TN"}, "emi": {"value" : "emi-Latn-ZZ"}, "und-009": {"value" : "en-Latn-AU"}, "aey": {"value" : "aey-Latn-ZZ"}, "und-002": {"value" : "en-Latn-NG"}, "und-003": {"value" : "en-Latn-US"}, "und-005": {"value" : "pt-Latn-BR"}, "rgn": {"value" : "rgn-Latn-IT"}, "vot": {"value" : "vot-Latn-RU"}, "enn": {"value" : "enn-Latn-ZZ"}, "enq": {"value" : "enq-Latn-ZZ"}
    , "und-011": {"value" : "en-Latn-NG"}, "rhg": {"value" : "rhg-Arab-MM"}, "und-017": {"value" : "sw-Latn-CD"}, "und-018": {"value" : "en-Latn-ZA"}, "und-019": {"value" : "en-Latn-US"}, "und-013": {"value" : "es-Latn-MX"}, "und-014": {"value" : "sw-Latn-TZ"}, "und-015": {"value" : "ar-Arab-EG"}, "agc": {"value" : "agc-Latn-ZZ"}, "und-Zanb": {"value" : "cmg-Zanb-MN"}, "iwm": {"value" : "iwm-Latn-ZZ"}, "agd": {"value" : "agd-Latn-ZZ"}, "agg": {"value" : "agg-Latn-ZZ"}, "iws": {"value" : "iws-Latn-ZZ"}, "agm":
    {"value" : "agm-Latn-ZZ"}, "ago": {"value" : "ago-Latn-ZZ"}, "agq": {"value" : "agq-Latn-CM"}, "ria": {"value" : "ria-Latn-IN"}, "rif": {"value" : "rif-Tfng-MA"}, "nac": {"value" : "nac-Latn-ZZ"}, "naf": {"value" : "naf-Latn-ZZ"}, "nak": {"value" : "nak-Latn-ZZ"}, "nan": {"value" : "nan-Hans-CN"}, "aha": {"value" : "aha-Latn-ZZ"}, "nap": {"value" : "nap-Latn-IT"}, "naq": {"value" : "naq-Latn-NA"}, "zza": {"value" : "zza-Latn-TR"}, "nas": {"value" : "nas-Latn-ZZ"}, "ahl": {"value" : "ahl-Latn-ZZ"}, "en-Shaw":
    {"value" : "en-Shaw-GB"}, "und-Copt": {"value" : "cop-Copt-EG"}, "aho": {"value" : "aho-Ahom-IN"}, "vro": {"value" : "vro-Latn-EE"}, "rjs": {"value" : "rjs-Deva-NP"}, "nca": {"value" : "nca-Latn-ZZ"}, "ncf": {"value" : "ncf-Latn-ZZ"}, "nce": {"value" : "nce-Latn-ZZ"}, "nch": {"value" : "nch-Latn-MX"}, "izh": {"value" : "izh-Latn-RU"}, "izi": {"value" : "izi-Latn-ZZ"}, "rkt": {"value" : "rkt-Beng-BD"}, "nco": {"value" : "nco-Latn-ZZ"}, "eri": {"value" : "eri-Latn-ZZ"}, "ajg": {"value" : "ajg-Latn-ZZ"}, "ncu":
    {"value" : "ncu-Latn-ZZ"}, "ndc": {"value" : "ndc-Latn-MZ"}, "esg": {"value" : "esg-Gonm-IN"}, "nds": {"value" : "nds-Latn-DE"}, "akk": {"value" : "akk-Xsux-IQ"}, "esu": {"value" : "esu-Latn-US"}, "neb": {"value" : "neb-Latn-ZZ"}, "rmf": {"value" : "rmf-Latn-FI"}, "und-061": {"value" : "sm-Latn-WS"}, "und-Limb": {"value" : "lif-Limb-IN"}, "vun": {"value" : "vun-Latn-TZ"}, "ff-Adlm": {"value" : "ff-Adlm-GN"}, "vut": {"value" : "vut-Latn-ZZ"}, "rmo": {"value" : "rmo-Latn-CH"}, "ala": {"value" : "ala-Latn-ZZ"}
    , "rmt": {"value" : "rmt-Arab-IR"}, "rmu": {"value" : "rmu-Latn-SE"}, "ali": {"value" : "ali-Latn-ZZ"}, "nex": {"value" : "nex-Latn-ZZ"}, "new": {"value" : "new-Deva-NP"}, "aln": {"value" : "aln-Latn-XK"}, "etr": {"value" : "etr-Latn-ZZ"}, "und-Rohg": {"value" : "rhg-Rohg-MM"}, "ett": {"value" : "ett-Ital-IT"}, "rna": {"value" : "rna-Latn-ZZ"}, "etu": {"value" : "etu-Latn-ZZ"}, "alt": {"value" : "alt-Cyrl-RU"}, "etx": {"value" : "etx-Latn-ZZ"}, "rng": {"value" : "rng-Latn-MZ"}, "und-Linb": {"value" : "grc-Linb-GR"}
    , "und-Lina": {"value" : "lab-Lina-GR"}, "und-Jpan": {"value" : "ja-Jpan-JP"}, "man-GN": {"value" : "man-Nkoo-GN"}, "nfr": {"value" : "nfr-Latn-ZZ"}, "amm": {"value" : "amm-Latn-ZZ"}, "und-Arab": {"value" : "ar-Arab-EG"}, "amo": {"value" : "amo-Latn-NG"}, "amn": {"value" : "amn-Latn-ZZ"}, "rob": {"value" : "rob-Latn-ID"}, "amp": {"value" : "amp-Latn-ZZ"}, "ngb": {"value" : "ngb-Latn-ZZ"}, "rof": {"value" : "rof-Latn-TZ"}, "nga": {"value" : "nga-Latn-ZZ"}, "ngl": {"value" : "ngl-Latn-MZ"}, "roo": {"value"
    : "roo-Latn-ZZ"}, "anc": {"value" : "anc-Latn-ZZ"}, "ank": {"value" : "ank-Latn-ZZ"}, "ann": {"value" : "ann-Latn-ZZ"}, "und-Bhks": {"value" : "sa-Bhks-IN"}, "nhb": {"value" : "nhb-Latn-ZZ"}, "nhe": {"value" : "nhe-Latn-MX"}, "any": {"value" : "any-Latn-ZZ"}, "und-Orya": {"value" : "or-Orya-IN"}, "ewo": {"value" : "ewo-Latn-CM"}, "nhw": {"value" : "nhw-Latn-MX"}, "aoj": {"value" : "aoj-Latn-ZZ"}, "aom": {"value" : "aom-Latn-ZZ"}, "zh-Hanb": {"value" : "zh-Hanb-TW"}, "jab": {"value" : "jab-Latn-ZZ"}, "nif":
    {"value" : "nif-Latn-ZZ"}, "aoz": {"value" : "aoz-Latn-ID"}, "nij": {"value" : "nij-Latn-ID"}, "nii": {"value" : "nii-Latn-ZZ"}, "zh-PH": {"value" : "zh-Hant-PH"}, "nin": {"value" : "nin-Latn-ZZ"}, "zh-Hant": {"value" : "zh-Hant-TW"}, "zh-PF": {"value" : "zh-Hant-PF"}, "und-Ahom": {"value" : "aho-Ahom-IN"}, "apd": {"value" : "apd-Arab-TG"}, "apc": {"value" : "apc-Arab-ZZ"}, "ape": {"value" : "ape-Latn-ZZ"}, "jam": {"value" : "jam-Latn-JM"}, "zh-PA": {"value" : "zh-Hant-PA"}, "niu": {"value" : "niu-Latn-NU"}
    , "niz": {"value" : "niz-Latn-ZZ"}, "niy": {"value" : "niy-Latn-ZZ"}, "ext": {"value" : "ext-Latn-ES"}, "apr": {"value" : "apr-Latn-ZZ"}, "aps": {"value" : "aps-Latn-ZZ"}, "apz": {"value" : "apz-Latn-ZZ"}, "rro": {"value" : "rro-Latn-ZZ"}, "njo": {"value" : "njo-Latn-IN"}, "jbo": {"value" : "jbo-Latn-001"}, "jbu": {"value" : "jbu-Latn-ZZ"}, "zh-MO": {"value" : "zh-Hant-MO"}, "nkg": {"value" : "nkg-Latn-ZZ"}, "zh-MY": {"value" : "zh-Hant-MY"}, "arc": {"value" : "arc-Armi-IR"}, "nko": {"value" : "nko-Latn-ZZ"}
    , "arh": {"value" : "arh-Latn-ZZ"}, "pa-Arab": {"value" : "pa-Arab-PK"}, "und-Mtei": {"value" : "mni-Mtei-IN"}, "arn": {"value" : "arn-Latn-CL"}, "aro": {"value" : "aro-Latn-BO"}, "und-Cyrl-RO": {"value" : "bg-Cyrl-RO"}, "arq": {"value" : "arq-Arab-DZ"}, "arz": {"value" : "arz-Arab-EG"}, "ary": {"value" : "ary-Arab-MA"}, "rtm": {"value" : "rtm-Latn-FJ"}, "asa": {"value" : "asa-Latn-TZ"}, "und-Grek-TR": {"value" : "bgx-Grek-TR"}, "ase": {"value" : "ase-Sgnw-US"}, "asg": {"value" : "asg-Latn-ZZ"}, "aso": {"value"
    : "aso-Latn-ZZ"}, "ast": {"value" : "ast-Latn-ES"}, "rue": {"value" : "rue-Cyrl-UA"}, "rug": {"value" : "rug-Latn-SB"}, "nmg": {"value" : "nmg-Latn-CM"}, "ata": {"value" : "ata-Latn-ZZ"}, "jen": {"value" : "jen-Latn-ZZ"}, "atg": {"value" : "atg-Latn-ZZ"}, "atj": {"value" : "atj-Latn-CA"}, "nmz": {"value" : "nmz-Latn-ZZ"}, "unr-Deva": {"value" : "unr-Deva-NP"}, "nnf": {"value" : "nnf-Latn-ZZ"}, "nnh": {"value" : "nnh-Latn-CM"}, "nnk": {"value" : "nnk-Latn-ZZ"}, "nnm": {"value" : "nnm-Latn-ZZ"}, "nnp": {"value"
    : "nnp-Wcho-IN"}, "az-IR": {"value" : "az-Arab-IR"}, "und-Adlm": {"value" : "ff-Adlm-GN"}, "az-IQ": {"value" : "az-Arab-IQ"}, "und-Nbat": {"value" : "arc-Nbat-JO"}, "sd-Khoj": {"value" : "sd-Khoj-IN"}, "nod": {"value" : "nod-Lana-TH"}, "auy": {"value" : "auy-Latn-ZZ"}, "noe": {"value" : "noe-Deva-IN"}, "rwk": {"value" : "rwk-Latn-TZ"}, "und-Cyrl-MD": {"value" : "uk-Cyrl-MD"}, "rwo": {"value" : "rwo-Latn-ZZ"}, "non": {"value" : "non-Runr-SE"}, "nop": {"value" : "nop-Latn-ZZ"}, "jgk": {"value" : "jgk-Latn-ZZ"}
    , "jgo": {"value" : "jgo-Latn-CM"}, "und-Vaii": {"value" : "vai-Vaii-LR"}, "nou": {"value" : "nou-Latn-ZZ"}, "avl": {"value" : "avl-Arab-ZZ"}, "avn": {"value" : "avn-Latn-ZZ"}, "wae": {"value" : "wae-Latn-CH"}, "avt": {"value" : "avt-Latn-ZZ"}, "avu": {"value" : "avu-Latn-ZZ"}, "waj": {"value" : "waj-Latn-ZZ"}, "wal": {"value" : "wal-Ethi-ET"}, "wan": {"value" : "wan-Latn-ZZ"}, "zh-HK": {"value" : "zh-Hant-HK"}, "war": {"value" : "war-Latn-PH"}, "awa": {"value" : "awa-Deva-IN"}, "und-Plrd": {"value" : "hmd-Plrd-CN"}
    , "awb": {"value" : "awb-Latn-ZZ"}, "awo": {"value" : "awo-Latn-ZZ"}, "und-Knda": {"value" : "kn-Knda-IN"}, "zh-ID": {"value" : "zh-Hant-ID"}, "jib": {"value" : "jib-Latn-ZZ"}, "awx": {"value" : "awx-Latn-ZZ"}, "wbp": {"value" : "wbp-Latn-AU"}, "und-Sidd": {"value" : "sa-Sidd-IN"}, "fab": {"value" : "fab-Latn-ZZ"}, "wbr": {"value" : "wbr-Deva-IN"}, "faa": {"value" : "faa-Latn-ZZ"}, "wbq": {"value" : "wbq-Telu-IN"}, "und-Kali": {"value" : "eky-Kali-MM"}, "fag": {"value" : "fag-Latn-ZZ"}, "nqo": {"value" :
    "nqo-Nkoo-GN"}, "fai": {"value" : "fai-Latn-ZZ"}, "ryu": {"value" : "ryu-Kana-JP"}, "fan": {"value" : "fan-Latn-GQ"}, "wci": {"value" : "wci-Latn-ZZ"}, "nrb": {"value" : "nrb-Latn-ZZ"}, "und-Phlp": {"value" : "pal-Phlp-CN"}, "ayb": {"value" : "ayb-Latn-ZZ"}, "und-Phli": {"value" : "pal-Phli-IR"}, "cu-Glag": {"value" : "cu-Glag-BG"}, "und-Cyrl-XK": {"value" : "sr-Cyrl-XK"}, "az-Arab": {"value" : "az-Arab-IR"}, "und-Thai": {"value" : "th-Thai-TH"}, "nsk": {"value" : "nsk-Cans-CA"}, "nsn": {"value" : "nsn-Latn-ZZ"}
    , "nso": {"value" : "nso-Latn-ZA"}, "und-Thaa": {"value" : "dv-Thaa-MV"}, "und-Nshu": {"value" : "zhx-Nshu-CN"}, "nss": {"value" : "nss-Latn-ZZ"}, "zh-VN": {"value" : "zh-Hant-VN"}, "und-Hmnp": {"value" : "mww-Hmnp-US"}, "und-Kana": {"value" : "ja-Kana-JP"}, "und-Hmng": {"value" : "hnj-Hmng-LA"}, "wer": {"value" : "wer-Latn-ZZ"}, "zh-TW": {"value" : "zh-Hant-TW"}, "ntm": {"value" : "ntm-Latn-ZZ"}, "ntr": {"value" : "ntr-Latn-ZZ"}, "zh-US": {"value" : "zh-Hant-US"}, "und-Xpeo": {"value" : "peo-Xpeo-IR"},
    "jmc": {"value" : "jmc-Latn-TZ"}, "nui": {"value" : "nui-Latn-ZZ"}, "jml": {"value" : "jml-Deva-NP"}, "nup": {"value" : "nup-Latn-ZZ"}, "und-Cyrl-SK": {"value" : "uk-Cyrl-SK"}, "nus": {"value" : "nus-Latn-SS"}, "nuv": {"value" : "nuv-Latn-ZZ"}, "nux": {"value" : "nux-Latn-ZZ"}, "zh-TH": {"value" : "zh-Hant-TH"}, "wgi": {"value" : "wgi-Latn-ZZ"}, "und-Phnx": {"value" : "phn-Phnx-LB"}, "und-Cyrl-TR": {"value" : "kbd-Cyrl-TR"}, "ffi": {"value" : "ffi-Latn-ZZ"}, "und-Elym": {"value" : "arc-Elym-IR"}, "ffm":
    {"value" : "ffm-Latn-ML"}, "und-Rjng": {"value" : "rej-Rjng-ID"}, "whg": {"value" : "whg-Latn-ZZ"}, "nwb": {"value" : "nwb-Latn-ZZ"}, "zh-SR": {"value" : "zh-Hant-SR"}, "wib": {"value" : "wib-Latn-ZZ"}, "und-Hebr": {"value" : "he-Hebr-IL"}, "saf": {"value" : "saf-Latn-GH"}, "sah": {"value" : "sah-Cyrl-RU"}, "saq": {"value" : "saq-Latn-KE"}, "wiu": {"value" : "wiu-Latn-ZZ"}, "sas": {"value" : "sas-Latn-ID"}, "wiv": {"value" : "wiv-Latn-ZZ"}, "nxq": {"value" : "nxq-Latn-CN"}, "sat": {"value" : "sat-Latn-IN"}
    , "nxr": {"value" : "nxr-Latn-ZZ"}, "sav": {"value" : "sav-Latn-SN"}, "saz": {"value" : "saz-Saur-IN"}, "wja": {"value" : "wja-Latn-ZZ"}, "sba": {"value" : "sba-Latn-ZZ"}, "sbe": {"value" : "sbe-Latn-ZZ"}, "wji": {"value" : "wji-Latn-ZZ"}, "mn-Mong": {"value" : "mn-Mong-CN"}, "und-419": {"value" : "es-Latn-419"}, "fia": {"value" : "fia-Arab-SD"}, "sbp": {"value" : "sbp-Latn-TZ"}, "und-NO": {"value" : "nb-Latn-NO"}, "nyn": {"value" : "nyn-Latn-UG"}, "nym": {"value" : "nym-Latn-TZ"}, "und-NL": {"value" : "nl-Latn-NL"}
    , "und-NP": {"value" : "ne-Deva-NP"}, "fil": {"value" : "fil-Latn-PH"}, "bal": {"value" : "bal-Arab-PK"}, "ban": {"value" : "ban-Latn-ID"}, "bap": {"value" : "bap-Deva-NP"}, "fit": {"value" : "fit-Latn-SE"}, "bar": {"value" : "bar-Latn-AT"}, "bas": {"value" : "bas-Latn-CM"}, "bav": {"value" : "bav-Latn-ZZ"}, "bax": {"value" : "bax-Bamu-CM"}, "jra": {"value" : "jra-Latn-ZZ"}, "sck": {"value" : "sck-Deva-IN"}, "nzi": {"value" : "nzi-Latn-GH"}, "scl": {"value" : "scl-Arab-ZZ"}, "sco": {"value" : "sco-Latn-GB"}
    , "scn": {"value" : "scn-Latn-IT"}, "aa": {"value" : "aa-Latn-ET"}, "bba": {"value" : "bba-Latn-ZZ"}, "und-MN": {"value" : "mn-Cyrl-MN"}, "ab": {"value" : "ab-Cyrl-GE"}, "und-MM": {"value" : "my-Mymr-MM"}, "und-Osma": {"value" : "so-Osma-SO"}, "bbc": {"value" : "bbc-Latn-ID"}, "scs": {"value" : "scs-Latn-CA"}, "und-ML": {"value" : "bm-Latn-ML"}, "bbb": {"value" : "bbb-Latn-ZZ"}, "und-MK": {"value" : "mk-Cyrl-MK"}, "ae": {"value" : "ae-Avst-IR"}, "und-MR": {"value" : "ar-Arab-MR"}, "af": {"value" : "af-Latn-ZA"}
    , "bbd": {"value" : "bbd-Latn-ZZ"}, "und-MQ": {"value" : "fr-Latn-MQ"}, "und-Wara": {"value" : "hoc-Wara-IN"}, "und-MO": {"value" : "zh-Hant-MO"}, "und-MV": {"value" : "dv-Thaa-MV"}, "und-MU": {"value" : "mfe-Latn-MU"}, "ak": {"value" : "ak-Latn-GH"}, "und-MT": {"value" : "mt-Latn-MT"}, "bbj": {"value" : "bbj-Latn-CM"}, "am": {"value" : "am-Ethi-ET"}, "und-MZ": {"value" : "pt-Latn-MZ"}, "und-MY": {"value" : "ms-Latn-MY"}, "und-MX": {"value" : "es-Latn-MX"}, "ar": {"value" : "ar-Arab-EG"}, "bbp": {"value"
    : "bbp-Latn-ZZ"}, "as": {"value" : "as-Beng-IN"}, "bbr": {"value" : "bbr-Latn-ZZ"}, "sdc": {"value" : "sdc-Latn-IT"}, "und-NC": {"value" : "fr-Latn-NC"}, "av": {"value" : "av-Cyrl-RU"}, "sdh": {"value" : "sdh-Arab-IR"}, "und-NA": {"value" : "af-Latn-NA"}, "ay": {"value" : "ay-Latn-BO"}, "az": {"value" : "az-Latn-AZ"}, "und-NE": {"value" : "ha-Latn-NE"}, "und-NI": {"value" : "es-Latn-NI"}, "ba": {"value" : "ba-Cyrl-RU"}, "wls": {"value" : "wls-Latn-WF"}, "und-Kore": {"value" : "ko-Kore-KR"}, "und-LK": {"value"
    : "si-Sinh-LK"}, "be": {"value" : "be-Cyrl-BY"}, "bcf": {"value" : "bcf-Latn-ZZ"}, "bg": {"value" : "bg-Cyrl-BG"}, "bch": {"value" : "bch-Latn-ZZ"}, "bi": {"value" : "bi-Latn-VU"}, "und-LU": {"value" : "fr-Latn-LU"}, "bci": {"value" : "bci-Latn-CI"}, "und-LT": {"value" : "lt-Latn-LT"}, "und-LS": {"value" : "st-Latn-LS"}, "bm": {"value" : "bm-Latn-ML"}, "bcn": {"value" : "bcn-Latn-ZZ"}, "bn": {"value" : "bn-Beng-BD"}, "und-LY": {"value" : "ar-Arab-LY"}, "bcm": {"value" : "bcm-Latn-ZZ"}, "bo": {"value" : "bo-Tibt-CN"}
    , "bco": {"value" : "bco-Latn-ZZ"}, "und-LV": {"value" : "lv-Latn-LV"}, "br": {"value" : "br-Latn-FR"}, "bcq": {"value" : "bcq-Ethi-ZZ"}, "bs": {"value" : "bs-Latn-BA"}, "bcu": {"value" : "bcu-Latn-ZZ"}, "sef": {"value" : "sef-Latn-CI"}, "und-MA": {"value" : "ar-Arab-MA"}, "sei": {"value" : "sei-Latn-MX"}, "seh": {"value" : "seh-Latn-MZ"}, "und-MF": {"value" : "fr-Latn-MF"}, "wmo": {"value" : "wmo-Latn-ZZ"}, "und-ME": {"value" : "sr-Latn-ME"}, "und-MD": {"value" : "ro-Latn-MD"}, "und-MC": {"value" : "fr-Latn-MC"}
    , "ca": {"value" : "ca-Latn-ES"}, "und-MG": {"value" : "mg-Latn-MG"}, "ses": {"value" : "ses-Latn-ML"}, "ce": {"value" : "ce-Cyrl-RU"}, "und-Cyrl-BA": {"value" : "sr-Cyrl-BA"}, "bdd": {"value" : "bdd-Latn-ZZ"}, "und-KP": {"value" : "ko-Kore-KP"}, "ch": {"value" : "ch-Latn-GU"}, "und-KM": {"value" : "ar-Arab-KM"}, "und-KR": {"value" : "ko-Kore-KR"}, "co": {"value" : "co-Latn-FR"}, "flr": {"value" : "flr-Latn-ZZ"}, "und-KW": {"value" : "ar-Arab-KW"}, "wnc": {"value" : "wnc-Latn-ZZ"}, "und-Dogr": {"value" :
    "doi-Dogr-IN"}, "cr": {"value" : "cr-Cans-CA"}, "cs": {"value" : "cs-Latn-CZ"}, "cu": {"value" : "cu-Cyrl-RU"}, "und-KZ": {"value" : "ru-Cyrl-KZ"}, "cv": {"value" : "cv-Cyrl-RU"}, "wni": {"value" : "wni-Arab-KM"}, "und-LA": {"value" : "lo-Laoo-LA"}, "cy": {"value" : "cy-Latn-GB"}, "und-LB": {"value" : "ar-Arab-LB"}, "und-LI": {"value" : "de-Latn-LI"}, "da": {"value" : "da-Latn-DK"}, "und-Cyrl-AL": {"value" : "mk-Cyrl-AL"}, "wnu": {"value" : "wnu-Latn-ZZ"}, "de": {"value" : "de-Latn-DE"}, "bef": {"value"
    : "bef-Latn-ZZ"}, "beh": {"value" : "beh-Latn-ZZ"}, "und-JO": {"value" : "ar-Arab-JO"}, "bej": {"value" : "bej-Arab-SD"}, "fmp": {"value" : "fmp-Latn-ZZ"}, "jut": {"value" : "jut-Latn-DK"}, "bem": {"value" : "bem-Latn-ZM"}, "und-JP": {"value" : "ja-Jpan-JP"}, "wob": {"value" : "wob-Latn-ZZ"}, "sga": {"value" : "sga-Ogam-IE"}, "bet": {"value" : "bet-Latn-ZZ"}, "dv": {"value" : "dv-Thaa-MV"}, "bex": {"value" : "bex-Latn-ZZ"}, "bew": {"value" : "bew-Latn-ID"}, "bez": {"value" : "bez-Latn-TZ"}, "dz": {"value"
    : "dz-Tibt-BT"}, "ms-ID": {"value" : "ms-Arab-ID"}, "wos": {"value" : "wos-Latn-ZZ"}, "und-KH": {"value" : "km-Khmr-KH"}, "und-KG": {"value" : "ky-Cyrl-KG"}, "sgs": {"value" : "sgs-Latn-LT"}, "und-KE": {"value" : "sw-Latn-KE"}, "ee": {"value" : "ee-Latn-GH"}, "bfd": {"value" : "bfd-Latn-CM"}, "sgw": {"value" : "sgw-Ethi-ZZ"}, "und-IN": {"value" : "hi-Deva-IN"}, "und-IL": {"value" : "he-Hebr-IL"}, "el": {"value" : "el-Grek-GR"}, "sgz": {"value" : "sgz-Latn-ZZ"}, "und-IR": {"value" : "fa-Arab-IR"}, "en": {"value"
    : "en-Latn-US"}, "und-IQ": {"value" : "ar-Arab-IQ"}, "und-Perm": {"value" : "kv-Perm-RU"}, "eo": {"value" : "eo-Latn-001"}, "bfq": {"value" : "bfq-Taml-IN"}, "es": {"value" : "es-Latn-ES"}, "und-IT": {"value" : "it-Latn-IT"}, "et": {"value" : "et-Latn-EE"}, "und-IS": {"value" : "is-Latn-IS"}, "eu": {"value" : "eu-Latn-ES"}, "bft": {"value" : "bft-Arab-PK"}, "bfy": {"value" : "bfy-Deva-IN"}, "shi": {"value" : "shi-Tfng-MA"}, "shk": {"value" : "shk-Latn-ZZ"}, "shn": {"value" : "shn-Mymr-MM"}, "fod": {"value"
    : "fod-Latn-ZZ"}, "fa": {"value" : "fa-Arab-IR"}, "bgc": {"value" : "bgc-Deva-IN"}, "ff": {"value" : "ff-Latn-SN"}, "shu": {"value" : "shu-Arab-ZZ"}, "fi": {"value" : "fi-Latn-FI"}, "fj": {"value" : "fj-Latn-FJ"}, "fon": {"value" : "fon-Latn-BJ"}, "und-HM": {"value" : "und-Latn-HM"}, "und-HK": {"value" : "zh-Hant-HK"}, "bgn": {"value" : "bgn-Arab-PK"}, "for": {"value" : "for-Latn-ZZ"}, "fo": {"value" : "fo-Latn-FO"}, "und-HN": {"value" : "es-Latn-HN"}, "fr": {"value" : "fr-Latn-FR"}, "und-HU": {"value" :
    "hu-Latn-HU"}, "und-HT": {"value" : "ht-Latn-HT"}, "ku-Arab": {"value" : "ku-Arab-IQ"}, "sid": {"value" : "sid-Latn-ET"}, "und-HR": {"value" : "hr-Latn-HR"}, "sig": {"value" : "sig-Latn-ZZ"}, "bgx": {"value" : "bgx-Grek-TR"}, "fy": {"value" : "fy-Latn-NL"}, "sim": {"value" : "sim-Latn-ZZ"}, "sil": {"value" : "sil-Latn-ZZ"}, "fpe": {"value" : "fpe-Latn-ZZ"}, "ga": {"value" : "ga-Latn-IE"}, "bhb": {"value" : "bhb-Deva-IN"}, "gd": {"value" : "gd-Latn-GB"}, "und-ID": {"value" : "id-Latn-ID"}, "und-IC": {"value"
    : "es-Latn-IC"}, "bhg": {"value" : "bhg-Latn-ZZ"}, "und-GH": {"value" : "ak-Latn-GH"}, "bhi": {"value" : "bhi-Deva-IN"}, "und-GF": {"value" : "fr-Latn-GF"}, "und-GE": {"value" : "ka-Geor-GE"}, "bhk": {"value" : "bhk-Latn-PH"}, "und-GL": {"value" : "kl-Latn-GL"}, "gl": {"value" : "gl-Latn-ES"}, "bhl": {"value" : "bhl-Latn-ZZ"}, "gn": {"value" : "gn-Latn-PY"}, "bho": {"value" : "bho-Deva-IN"}, "und-GP": {"value" : "fr-Latn-GP"}, "und-GN": {"value" : "fr-Latn-GN"}, "und-GT": {"value" : "es-Latn-GT"}, "und-GS":
    {"value" : "und-Latn-GS"}, "gu": {"value" : "gu-Gujr-IN"}, "und-GR": {"value" : "el-Grek-GR"}, "gv": {"value" : "gv-Latn-IM"}, "und-GQ": {"value" : "es-Latn-GQ"}, "und-Palm": {"value" : "arc-Palm-SY"}, "und-GW": {"value" : "pt-Latn-GW"}, "bhy": {"value" : "bhy-Latn-ZZ"}, "ha": {"value" : "ha-Latn-NG"}, "wrs": {"value" : "wrs-Latn-ZZ"}, "bib": {"value" : "bib-Latn-ZZ"}, "sjr": {"value" : "sjr-Latn-ZZ"}, "he": {"value" : "he-Hebr-IL"}, "big": {"value" : "big-Latn-ZZ"}, "hi": {"value" : "hi-Deva-IN"}, "und-Cyrl-GE":
    {"value" : "ab-Cyrl-GE"}, "bik": {"value" : "bik-Latn-PH"}, "bin": {"value" : "bin-Latn-NG"}, "und-Cham": {"value" : "cjm-Cham-VN"}, "und-FI": {"value" : "fi-Latn-FI"}, "bim": {"value" : "bim-Latn-ZZ"}, "ho": {"value" : "ho-Latn-PG"}, "tg-PK": {"value" : "tg-Arab-PK"}, "und-FO": {"value" : "fo-Latn-FO"}, "bio": {"value" : "bio-Latn-ZZ"}, "fqs": {"value" : "fqs-Latn-ZZ"}, "hr": {"value" : "hr-Latn-HR"}, "skc": {"value" : "skc-Latn-ZZ"}, "wsg": {"value" : "wsg-Gong-IN"}, "biq": {"value" : "biq-Latn-ZZ"}, "ht":
    {"value" : "ht-Latn-HT"}, "hu": {"value" : "hu-Latn-HU"}, "und-FR": {"value" : "fr-Latn-FR"}, "wsk": {"value" : "wsk-Latn-ZZ"}, "hy": {"value" : "hy-Armn-AM"}, "hz": {"value" : "hz-Latn-NA"}, "frc": {"value" : "frc-Latn-US"}, "ia": {"value" : "ia-Latn-001"}, "sks": {"value" : "sks-Latn-ZZ"}, "id": {"value" : "id-Latn-ID"}, "skr": {"value" : "skr-Arab-PK"}, "ig": {"value" : "ig-Latn-NG"}, "und-GA": {"value" : "fr-Latn-GA"}, "bji": {"value" : "bji-Ethi-ZZ"}, "ii": {"value" : "ii-Yiii-CN"}, "bjh": {"value"
    : "bjh-Latn-ZZ"}, "und-EE": {"value" : "et-Latn-EE"}, "ik": {"value" : "ik-Latn-US"}, "bjj": {"value" : "bjj-Deva-IN"}, "und-EC": {"value" : "es-Latn-EC"}, "und-Cprt": {"value" : "grc-Cprt-CY"}, "frp": {"value" : "frp-Latn-FR"}, "in": {"value" : "in-Latn-ID"}, "bjo": {"value" : "bjo-Latn-ZZ"}, "frs": {"value" : "frs-Latn-DE"}, "io": {"value" : "io-Latn-001"}, "und-EH": {"value" : "ar-Arab-EH"}, "bjn": {"value" : "bjn-Latn-ID"}, "frr": {"value" : "frr-Latn-DE"}, "und-EG": {"value" : "ar-Arab-EG"}, "is": {"value"
    : "is-Latn-IS"}, "sld": {"value" : "sld-Latn-ZZ"}, "bjr": {"value" : "bjr-Latn-ZZ"}, "it": {"value" : "it-Latn-IT"}, "iu": {"value" : "iu-Cans-CA"}, "und-ER": {"value" : "ti-Ethi-ER"}, "bjt": {"value" : "bjt-Latn-SN"}, "iw": {"value" : "iw-Hebr-IL"}, "und-Tirh": {"value" : "mai-Tirh-IN"}, "sli": {"value" : "sli-Latn-PL"}, "und-EU": {"value" : "en-Latn-GB"}, "wtm": {"value" : "wtm-Deva-IN"}, "sll": {"value" : "sll-Latn-ZZ"}, "und-ET": {"value" : "am-Ethi-ET"}, "bjz": {"value" : "bjz-Latn-ZZ"}, "und-ES": {"value"
    : "es-Latn-ES"}, "und-EZ": {"value" : "de-Latn-EZ"}, "ja": {"value" : "ja-Jpan-JP"}, "zh-GF": {"value" : "zh-Hant-GF"}, "bkc": {"value" : "bkc-Latn-ZZ"}, "zh-GB": {"value" : "zh-Hant-GB"}, "und-Cyrl-GR": {"value" : "mk-Cyrl-GR"}, "ji": {"value" : "ji-Hebr-UA"}, "und-DE": {"value" : "de-Latn-DE"}, "sly": {"value" : "sly-Latn-ID"}, "bkm": {"value" : "bkm-Latn-CM"}, "sma": {"value" : "sma-Latn-SE"}, "bkq": {"value" : "bkq-Latn-ZZ"}, "und-DK": {"value" : "da-Latn-DK"}, "und-DJ": {"value" : "aa-Latn-DJ"}, "bkv":
    {"value" : "bkv-Latn-ZZ"}, "jv": {"value" : "jv-Latn-ID"}, "bku": {"value" : "bku-Latn-PH"}, "jw": {"value" : "jw-Latn-ID"}, "und-DO": {"value" : "es-Latn-DO"}, "smj": {"value" : "smj-Latn-SE"}, "smn": {"value" : "smn-Latn-FI"}, "ka": {"value" : "ka-Geor-GE"}, "smq": {"value" : "smq-Latn-ZZ"}, "wuu": {"value" : "wuu-Hans-CN"}, "smp": {"value" : "smp-Samr-IL"}, "sms": {"value" : "sms-Latn-FI"}, "wuv": {"value" : "wuv-Latn-ZZ"}, "und-DZ": {"value" : "ar-Arab-DZ"}, "kg": {"value" : "kg-Latn-CD"}, "und-EA":
    {"value" : "es-Latn-EA"}, "ki": {"value" : "ki-Latn-KE"}, "kj": {"value" : "kj-Latn-NA"}, "kk": {"value" : "kk-Cyrl-KZ"}, "man-Nkoo": {"value" : "man-Nkoo-GN"}, "und-CD": {"value" : "sw-Latn-CD"}, "kl": {"value" : "kl-Latn-GL"}, "und-Telu": {"value" : "te-Telu-IN"}, "km": {"value" : "km-Khmr-KH"}, "kn": {"value" : "kn-Knda-IN"}, "ko": {"value" : "ko-Kore-KR"}, "und-CH": {"value" : "de-Latn-CH"}, "und-CG": {"value" : "fr-Latn-CG"}, "und-CF": {"value" : "fr-Latn-CF"}, "kr": {"value" : "kr-Latn-ZZ"}, "ks":
    {"value" : "ks-Arab-IN"}, "und-CL": {"value" : "es-Latn-CL"}, "snc": {"value" : "snc-Latn-ZZ"}, "ku": {"value" : "ku-Latn-TR"}, "blt": {"value" : "blt-Tavt-VN"}, "kv": {"value" : "kv-Cyrl-RU"}, "und-CI": {"value" : "fr-Latn-CI"}, "kw": {"value" : "kw-Latn-GB"}, "und-CP": {"value" : "und-Latn-CP"}, "und-CO": {"value" : "es-Latn-CO"}, "ky": {"value" : "ky-Cyrl-KG"}, "und-CN": {"value" : "zh-Hans-CN"}, "und-CM": {"value" : "fr-Latn-CM"}, "snk": {"value" : "snk-Latn-ML"}, "fub": {"value" : "fub-Arab-CM"}, "und-CR":
    {"value" : "es-Latn-CR"}, "fud": {"value" : "fud-Latn-WF"}, "snp": {"value" : "snp-Latn-ZZ"}, "la": {"value" : "la-Latn-VA"}, "und-CW": {"value" : "pap-Latn-CW"}, "fuf": {"value" : "fuf-Latn-GN"}, "lb": {"value" : "lb-Latn-LU"}, "und-CV": {"value" : "pt-Latn-CV"}, "fue": {"value" : "fue-Latn-ZZ"}, "und-CU": {"value" : "es-Latn-CU"}, "fuh": {"value" : "fuh-Latn-ZZ"}, "und-CZ": {"value" : "cs-Latn-CZ"}, "lg": {"value" : "lg-Latn-UG"}, "und-CY": {"value" : "el-Grek-CY"}, "bmh": {"value" : "bmh-Latn-ZZ"}, "snx":
    {"value" : "snx-Latn-ZZ"}, "li": {"value" : "li-Latn-NL"}, "sny": {"value" : "sny-Latn-ZZ"}, "wwa": {"value" : "wwa-Latn-ZZ"}, "bmk": {"value" : "bmk-Latn-ZZ"}, "und-Cher": {"value" : "chr-Cher-US"}, "fur": {"value" : "fur-Latn-IT"}, "ln": {"value" : "ln-Latn-CD"}, "und-BA": {"value" : "bs-Latn-BA"}, "fuq": {"value" : "fuq-Latn-NE"}, "lo": {"value" : "lo-Laoo-LA"}, "und-BG": {"value" : "bg-Cyrl-BG"}, "und-BF": {"value" : "fr-Latn-BF"}, "fuv": {"value" : "fuv-Latn-NG"}, "und-BE": {"value" : "nl-Latn-BE"}
    , "bmq": {"value" : "bmq-Latn-ML"}, "und-BD": {"value" : "bn-Beng-BD"}, "lt": {"value" : "lt-Latn-LT"}, "lu": {"value" : "lu-Latn-CD"}, "und-BJ": {"value" : "fr-Latn-BJ"}, "lv": {"value" : "lv-Latn-LV"}, "ogc": {"value" : "ogc-Latn-ZZ"}, "sog": {"value" : "sog-Sogd-UZ"}, "und-BI": {"value" : "rn-Latn-BI"}, "bmu": {"value" : "bmu-Latn-ZZ"}, "fuy": {"value" : "fuy-Latn-ZZ"}, "und-BH": {"value" : "ar-Arab-BH"}, "und-BO": {"value" : "es-Latn-BO"}, "und-BN": {"value" : "ms-Latn-BN"}, "sok": {"value" : "sok-Latn-ZZ"}
    , "und-BL": {"value" : "fr-Latn-BL"}, "und-BR": {"value" : "pt-Latn-BR"}, "und-BQ": {"value" : "pap-Latn-BQ"}, "soq": {"value" : "soq-Latn-ZZ"}, "und-BV": {"value" : "und-Latn-BV"}, "und-BT": {"value" : "dz-Tibt-BT"}, "sou": {"value" : "sou-Thai-TH"}, "bng": {"value" : "bng-Latn-ZZ"}, "mg": {"value" : "mg-Latn-MG"}, "und-BY": {"value" : "be-Cyrl-BY"}, "und-Glag": {"value" : "cu-Glag-BG"}, "mh": {"value" : "mh-Latn-MH"}, "mi": {"value" : "mi-Latn-NZ"}, "soy": {"value" : "soy-Latn-ZZ"}, "mk": {"value" : "mk-Cyrl-MK"}
    , "ml": {"value" : "ml-Mlym-IN"}, "bnm": {"value" : "bnm-Latn-ZZ"}, "mn": {"value" : "mn-Cyrl-MN"}, "und-Prti": {"value" : "xpr-Prti-IR"}, "fvr": {"value" : "fvr-Latn-SD"}, "und-AF": {"value" : "fa-Arab-AF"}, "bnp": {"value" : "bnp-Latn-ZZ"}, "mr": {"value" : "mr-Deva-IN"}, "und-AE": {"value" : "ar-Arab-AE"}, "ms": {"value" : "ms-Latn-MY"}, "spd": {"value" : "spd-Latn-ZZ"}, "und-AD": {"value" : "ca-Latn-AD"}, "mt": {"value" : "mt-Latn-MT"}, "my": {"value" : "my-Mymr-MM"}, "zh-BN": {"value" : "zh-Hant-BN"}
    , "und-AM": {"value" : "hy-Armn-AM"}, "spl": {"value" : "spl-Latn-ZZ"}, "und-AL": {"value" : "sq-Latn-AL"}, "und-AR": {"value" : "es-Latn-AR"}, "und-AQ": {"value" : "und-Latn-AQ"}, "na": {"value" : "na-Latn-NR"}, "und-AO": {"value" : "pt-Latn-AO"}, "nb": {"value" : "nb-Latn-NO"}, "nd": {"value" : "nd-Latn-ZW"}, "und-AT": {"value" : "de-Latn-AT"}, "ne": {"value" : "ne-Deva-NP"}, "sps": {"value" : "sps-Latn-ZZ"}, "und-AS": {"value" : "sm-Latn-AS"}, "und-AZ": {"value" : "az-Latn-AZ"}, "ng": {"value" : "ng-Latn-NA"}
    , "und-AX": {"value" : "sv-Latn-AX"}, "und-AW": {"value" : "nl-Latn-AW"}, "boj": {"value" : "boj-Latn-ZZ"}, "nl": {"value" : "nl-Latn-NL"}, "bon": {"value" : "bon-Latn-ZZ"}, "nn": {"value" : "nn-Latn-NO"}, "bom": {"value" : "bom-Latn-ZZ"}, "no": {"value" : "no-Latn-NO"}, "nr": {"value" : "nr-Latn-ZA"}, "arc-Nbat": {"value" : "arc-Nbat-JO"}, "und-Medf": {"value" : "mis-Medf-NG"}, "nv": {"value" : "nv-Latn-US"}, "kaa": {"value" : "kaa-Cyrl-UZ"}, "ny": {"value" : "ny-Latn-MW"}, "kac": {"value" : "kac-Latn-MM"}
    , "kab": {"value" : "kab-Latn-DZ"}, "kad": {"value" : "kad-Latn-ZZ"}, "kai": {"value" : "kai-Latn-ZZ"}, "oc": {"value" : "oc-Latn-FR"}, "zh-AU": {"value" : "zh-Hant-AU"}, "kaj": {"value" : "kaj-Latn-NG"}, "kam": {"value" : "kam-Latn-KE"}, "und-Tagb": {"value" : "tbw-Tagb-PH"}, "kao": {"value" : "kao-Latn-ML"}, "und-Ogam": {"value" : "sga-Ogam-IE"}, "om": {"value" : "om-Latn-ET"}, "srb": {"value" : "srb-Sora-IN"}, "or": {"value" : "or-Orya-IN"}, "tg-Arab": {"value" : "tg-Arab-PK"}, "os": {"value" : "os-Cyrl-GE"}
    , "und-Sogd": {"value" : "sog-Sogd-UZ"}, "bpy": {"value" : "bpy-Beng-IN"}, "kbd": {"value" : "kbd-Cyrl-RU"}, "srn": {"value" : "srn-Latn-SR"}, "pa": {"value" : "pa-Guru-IN"}, "srr": {"value" : "srr-Latn-SN"}, "bqc": {"value" : "bqc-Latn-ZZ"}, "und-Kthi": {"value" : "bho-Kthi-IN"}, "kbm": {"value" : "kbm-Latn-ZZ"}, "kbp": {"value" : "kbp-Latn-ZZ"}, "srx": {"value" : "srx-Deva-IN"}, "bqi": {"value" : "bqi-Arab-IR"}, "kbq": {"value" : "kbq-Latn-ZZ"}, "pl": {"value" : "pl-Latn-PL"}, "bqp": {"value" : "bqp-Latn-ZZ"}
    , "kbx": {"value" : "kbx-Latn-ZZ"}, "kby": {"value" : "kby-Arab-NE"}, "ps": {"value" : "ps-Arab-AF"}, "pt": {"value" : "pt-Latn-BR"}, "ssd": {"value" : "ssd-Latn-ZZ"}, "und-Nkoo": {"value" : "man-Nkoo-GN"}, "bqv": {"value" : "bqv-Latn-CI"}, "ssg": {"value" : "ssg-Latn-ZZ"}, "und-Mymr": {"value" : "my-Mymr-MM"}, "kcg": {"value" : "kcg-Latn-NG"}, "bra": {"value" : "bra-Deva-IN"}, "kck": {"value" : "kck-Latn-ZW"}, "kcl": {"value" : "kcl-Latn-ZZ"}, "okr": {"value" : "okr-Latn-ZZ"}, "ssy": {"value" : "ssy-Latn-ER"}
    , "brh": {"value" : "brh-Arab-PK"}, "okv": {"value" : "okv-Latn-ZZ"}, "kct": {"value" : "kct-Latn-ZZ"}, "und-Hani": {"value" : "zh-Hani-CN"}, "und-Bugi": {"value" : "bug-Bugi-ID"}, "und-Hang": {"value" : "ko-Hang-KR"}, "qu": {"value" : "qu-Latn-PE"}, "brx": {"value" : "brx-Deva-IN"}, "und-Samr": {"value" : "smp-Samr-IL"}, "brz": {"value" : "brz-Latn-ZZ"}, "stk": {"value" : "stk-Latn-ZZ"}, "und-Hano": {"value" : "hnn-Hano-PH"}, "kde": {"value" : "kde-Latn-TZ"}, "kdh": {"value" : "kdh-Arab-TG"}, "stq": {"value"
    : "stq-Latn-DE"}, "kdl": {"value" : "kdl-Latn-ZZ"}, "bsj": {"value" : "bsj-Latn-ZZ"}, "und-Hanb": {"value" : "zh-Hanb-TW"}, "kdt": {"value" : "kdt-Thai-TH"}, "rm": {"value" : "rm-Latn-CH"}, "rn": {"value" : "rn-Latn-BI"}, "ro": {"value" : "ro-Latn-RO"}, "sua": {"value" : "sua-Latn-ZZ"}, "und-Deva-BT": {"value" : "ne-Deva-BT"}, "bsq": {"value" : "bsq-Bass-LR"}, "bst": {"value" : "bst-Ethi-ZZ"}, "sue": {"value" : "sue-Latn-ZZ"}, "bss": {"value" : "bss-Latn-CM"}, "ru": {"value" : "ru-Cyrl-RU"}, "und-Buhd":
    {"value" : "bku-Buhd-PH"}, "rw": {"value" : "rw-Latn-RW"}, "kea": {"value" : "kea-Latn-CV"}, "suk": {"value" : "suk-Latn-TZ"}, "grc-Linb": {"value" : "grc-Linb-GR"}, "sa": {"value" : "sa-Deva-IN"}, "sc": {"value" : "sc-Latn-IT"}, "sus": {"value" : "sus-Latn-GN"}, "sd": {"value" : "sd-Arab-PK"}, "sur": {"value" : "sur-Latn-ZZ"}, "se": {"value" : "se-Latn-NO"}, "sg": {"value" : "sg-Latn-CF"}, "ken": {"value" : "ken-Latn-CM"}, "si": {"value" : "si-Sinh-LK"}, "und-Hant": {"value" : "zh-Hant-TW"}, "und-Hans":
    {"value" : "zh-Hans-CN"}, "sk": {"value" : "sk-Latn-SK"}, "sl": {"value" : "sl-Latn-SI"}, "sm": {"value" : "sm-Latn-WS"}, "sn": {"value" : "sn-Latn-ZW"}, "bto": {"value" : "bto-Latn-PH"}, "so": {"value" : "so-Latn-SO"}, "sq": {"value" : "sq-Latn-AL"}, "sr": {"value" : "sr-Cyrl-RS"}, "ss": {"value" : "ss-Latn-ZA"}, "kez": {"value" : "kez-Latn-ZZ"}, "st": {"value" : "st-Latn-ZA"}, "su": {"value" : "su-Latn-ID"}, "btt": {"value" : "btt-Latn-ZZ"}, "sv": {"value" : "sv-Latn-SE"}, "sw": {"value" : "sw-Latn-TZ"}
    , "btv": {"value" : "btv-Deva-PK"}, "ong": {"value" : "ong-Latn-ZZ"}, "ta": {"value" : "ta-Taml-IN"}, "onn": {"value" : "onn-Latn-ZZ"}, "bua": {"value" : "bua-Cyrl-RU"}, "bud": {"value" : "bud-Latn-ZZ"}, "buc": {"value" : "buc-Latn-YT"}, "te": {"value" : "te-Telu-IN"}, "tg": {"value" : "tg-Cyrl-TJ"}, "th": {"value" : "th-Thai-TH"}, "und-Gong": {"value" : "wsg-Gong-IN"}, "bug": {"value" : "bug-Latn-ID"}, "kfo": {"value" : "kfo-Latn-CI"}, "ons": {"value" : "ons-Latn-ZZ"}, "ti": {"value" : "ti-Ethi-ET"}, "kfr":
    {"value" : "kfr-Deva-IN"}, "tk": {"value" : "tk-Latn-TM"}, "tl": {"value" : "tl-Latn-PH"}, "und-Lisu": {"value" : "lis-Lisu-CN"}, "buk": {"value" : "buk-Latn-ZZ"}, "tn": {"value" : "tn-Latn-ZA"}, "bum": {"value" : "bum-Latn-CM"}, "to": {"value" : "to-Latn-TO"}, "buo": {"value" : "buo-Latn-ZZ"}, "swc": {"value" : "swc-Latn-CD"}, "tr": {"value" : "tr-Latn-TR"}, "und-Gonm": {"value" : "esg-Gonm-IN"}, "kfy": {"value" : "kfy-Deva-IN"}, "swb": {"value" : "swb-Arab-YT"}, "ts": {"value" : "ts-Latn-ZA"}, "tt": {"value"
    : "tt-Cyrl-RU"}, "bus": {"value" : "bus-Latn-ZZ"}, "swg": {"value" : "swg-Latn-DE"}, "buu": {"value" : "buu-Latn-ZZ"}, "ty": {"value" : "ty-Latn-PF"}, "kge": {"value" : "kge-Latn-ID"}, "kgf": {"value" : "kgf-Latn-ZZ"}, "swp": {"value" : "swp-Latn-ZZ"}, "bvb": {"value" : "bvb-Latn-GQ"}, "ug": {"value" : "ug-Arab-CN"}, "swv": {"value" : "swv-Deva-IN"}, "kgp": {"value" : "kgp-Latn-BR"}, "uk": {"value" : "uk-Cyrl-UA"}, "ur": {"value" : "ur-Arab-PK"}, "kk-IR": {"value" : "kk-Arab-IR"}, "khb": {"value" : "khb-Talu-CN"}
    , "kha": {"value" : "kha-Latn-IN"}, "uz": {"value" : "uz-Latn-UZ"}, "sxn": {"value" : "sxn-Latn-ID"}, "xav": {"value" : "xav-Latn-BR"}, "opm": {"value" : "opm-Latn-ZZ"}, "bwd": {"value" : "bwd-Latn-ZZ"}, "und-Mlym": {"value" : "ml-Mlym-IN"}, "ve": {"value" : "ve-Latn-ZA"}, "khn": {"value" : "khn-Deva-IN"}, "sxw": {"value" : "sxw-Latn-ZZ"}, "vi": {"value" : "vi-Latn-VN"}, "khq": {"value" : "khq-Latn-ML"}, "kht": {"value" : "kht-Mymr-IN"}, "khs": {"value" : "khs-Latn-ZZ"}, "vo": {"value" : "vo-Latn-001"},
    "khw": {"value" : "khw-Arab-PK"}, "bwr": {"value" : "bwr-Latn-ZZ"}, "khz": {"value" : "khz-Latn-ZZ"}, "und-ZW": {"value" : "sn-Latn-ZW"}, "xbi": {"value" : "xbi-Latn-ZZ"}, "gaa": {"value" : "gaa-Latn-GH"}, "syl": {"value" : "syl-Beng-BD"}, "wa": {"value" : "wa-Latn-BE"}, "gag": {"value" : "gag-Latn-MD"}, "gaf": {"value" : "gaf-Latn-ZZ"}, "kij": {"value" : "kij-Latn-ZZ"}, "syr": {"value" : "syr-Syrc-IQ"}, "und-YE": {"value" : "ar-Arab-YE"}, "gah": {"value" : "gah-Latn-ZZ"}, "gaj": {"value" : "gaj-Latn-ZZ"}
    , "gam": {"value" : "gam-Latn-ZZ"}, "bxh": {"value" : "bxh-Latn-ZZ"}, "gan": {"value" : "gan-Hans-CN"}, "kiu": {"value" : "kiu-Latn-TR"}, "kiw": {"value" : "kiw-Latn-ZZ"}, "wo": {"value" : "wo-Latn-SN"}, "gaw": {"value" : "gaw-Latn-ZZ"}, "und-Sarb": {"value" : "xsa-Sarb-YE"}, "gay": {"value" : "gay-Latn-ID"}, "und-YT": {"value" : "fr-Latn-YT"}, "kjd": {"value" : "kjd-Latn-ZZ"}, "szl": {"value" : "szl-Latn-PL"}, "xcr": {"value" : "xcr-Cari-TR"}, "gba": {"value" : "gba-Latn-ZZ"}, "und-Mult": {"value" : "skr-Mult-PK"}
    , "kjg": {"value" : "kjg-Laoo-LA"}, "gbf": {"value" : "gbf-Latn-ZZ"}, "oro": {"value" : "oro-Latn-ZZ"}, "und-Hatr": {"value" : "mis-Hatr-IQ"}, "bye": {"value" : "bye-Latn-ZZ"}, "xh": {"value" : "xh-Latn-ZA"}, "gbm": {"value" : "gbm-Deva-IN"}, "oru": {"value" : "oru-Arab-ZZ"}, "kjs": {"value" : "kjs-Latn-ZZ"}, "byn": {"value" : "byn-Ethi-ER"}, "und-XK": {"value" : "sq-Latn-XK"}, "yue-CN": {"value" : "yue-Hans-CN"}, "und-Lepc": {"value" : "lep-Lepc-IN"}, "byr": {"value" : "byr-Latn-ZZ"}, "kjy": {"value" :
    "kjy-Latn-ZZ"}, "osa": {"value" : "osa-Osge-US"}, "bys": {"value" : "bys-Latn-ZZ"}, "byv": {"value" : "byv-Latn-CM"}, "gbz": {"value" : "gbz-Arab-IR"}, "gby": {"value" : "gby-Latn-ZZ"}, "byx": {"value" : "byx-Latn-ZZ"}, "kkc": {"value" : "kkc-Latn-ZZ"}, "und-VU": {"value" : "bi-Latn-VU"}, "bza": {"value" : "bza-Latn-ZZ"}, "und-Goth": {"value" : "got-Goth-UA"}, "kkj": {"value" : "kkj-Latn-CM"}, "bze": {"value" : "bze-Latn-ML"}, "und-Avst": {"value" : "ae-Avst-IR"}, "bzf": {"value" : "bzf-Latn-ZZ"}, "yi":
    {"value" : "yi-Hebr-001"}, "bzh": {"value" : "bzh-Latn-ZZ"}, "und-WF": {"value" : "fr-Latn-WF"}, "yo": {"value" : "yo-Latn-NG"}, "gcr": {"value" : "gcr-Latn-GF"}, "ota": {"value" : "ota-Arab-ZZ"}, "und-WS": {"value" : "sm-Latn-WS"}, "bzw": {"value" : "bzw-Latn-ZZ"}, "und-UZ": {"value" : "uz-Latn-UZ"}, "und-UY": {"value" : "es-Latn-UY"}, "otk": {"value" : "otk-Orkh-MN"}, "xes": {"value" : "xes-Latn-ZZ"}, "za": {"value" : "za-Latn-CN"}, "gde": {"value" : "gde-Latn-ZZ"}, "kln": {"value" : "kln-Latn-KE"}, "und-VA":
    {"value" : "it-Latn-VA"}, "zh": {"value" : "zh-Hans-CN"}, "gdn": {"value" : "gdn-Latn-ZZ"}, "klq": {"value" : "klq-Latn-ZZ"}, "und-Saur": {"value" : "saz-Saur-IN"}, "klt": {"value" : "klt-Latn-ZZ"}, "und-VE": {"value" : "es-Latn-VE"}, "gdr": {"value" : "gdr-Latn-ZZ"}, "klx": {"value" : "klx-Latn-ZZ"}, "und-VN": {"value" : "vi-Latn-VN"}, "kk-MN": {"value" : "kk-Arab-MN"}, "zu": {"value" : "zu-Latn-ZA"}, "und-Armn": {"value" : "hy-Armn-AM"}, "kmb": {"value" : "kmb-Latn-AO"}, "und-TR": {"value" : "tr-Latn-TR"}
    , "geb": {"value" : "geb-Latn-ZZ"}, "und-TW": {"value" : "zh-Hant-TW"}, "kmh": {"value" : "kmh-Latn-ZZ"}, "und-TV": {"value" : "tvl-Latn-TV"}, "und-TZ": {"value" : "sw-Latn-TZ"}, "kmo": {"value" : "kmo-Latn-ZZ"}, "gej": {"value" : "gej-Latn-ZZ"}, "und-UA": {"value" : "uk-Cyrl-UA"}, "gel": {"value" : "gel-Latn-ZZ"}, "kms": {"value" : "kms-Latn-ZZ"}, "kmu": {"value" : "kmu-Latn-ZZ"}, "kmw": {"value" : "kmw-Latn-ZZ"}, "und-Tibt": {"value" : "bo-Tibt-CN"}, "und-UG": {"value" : "sw-Latn-UG"}, "und-Armi": {"value"
    : "arc-Armi-IR"}, "gez": {"value" : "gez-Ethi-ET"}, "und-ST": {"value" : "pt-Latn-ST"}, "knf": {"value" : "knf-Latn-GW"}, "und-SR": {"value" : "nl-Latn-SR"}, "und-SV": {"value" : "es-Latn-SV"}, "und-SY": {"value" : "ar-Arab-SY"}, "knp": {"value" : "knp-Latn-ZZ"}, "gfk": {"value" : "gfk-Latn-ZZ"}, "und-TD": {"value" : "fr-Latn-TD"}, "und-TH": {"value" : "th-Thai-TH"}, "und-TG": {"value" : "fr-Latn-TG"}, "und-TF": {"value" : "fr-Latn-TF"}, "und-TM": {"value" : "tk-Latn-TM"}, "und-TL": {"value" : "pt-Latn-TL"}
    , "und-TK": {"value" : "tkl-Latn-TK"}, "und-TJ": {"value" : "tg-Cyrl-TJ"}, "und-TO": {"value" : "to-Latn-TO"}, "und-TN": {"value" : "ar-Arab-TN"}, "und-RS": {"value" : "sr-Cyrl-RS"}, "koi": {"value" : "koi-Cyrl-RU"}, "und-RW": {"value" : "rw-Latn-RW"}, "kok": {"value" : "kok-Deva-IN"}, "und-RU": {"value" : "ru-Cyrl-RU"}, "kol": {"value" : "kol-Latn-ZZ"}, "kos": {"value" : "kos-Latn-FM"}, "ggn": {"value" : "ggn-Deva-NP"}, "und-SD": {"value" : "ar-Arab-SD"}, "und-SC": {"value" : "fr-Latn-SC"}, "und-SA": {"value"
    : "ar-Arab-SA"}, "koz": {"value" : "koz-Latn-ZZ"}, "und-SE": {"value" : "sv-Latn-SE"}, "und-SK": {"value" : "sk-Latn-SK"}, "und-SJ": {"value" : "nb-Latn-SJ"}, "und-SI": {"value" : "sl-Latn-SI"}, "taj": {"value" : "taj-Deva-NP"}, "und-SO": {"value" : "so-Latn-SO"}, "tal": {"value" : "tal-Latn-ZZ"}, "und-SN": {"value" : "fr-Latn-SN"}, "und-Osge": {"value" : "osa-Osge-US"}, "und-SM": {"value" : "it-Latn-SM"}, "kpf": {"value" : "kpf-Latn-ZZ"}, "tan": {"value" : "tan-Latn-ZZ"}, "kpe": {"value" : "kpe-Latn-LR"}
    , "und-QO": {"value" : "en-Latn-DG"}, "taq": {"value" : "taq-Latn-ZZ"}, "kpo": {"value" : "kpo-Latn-ZZ"}, "kpr": {"value" : "kpr-Latn-ZZ"}, "kpx": {"value" : "kpx-Latn-ZZ"}, "ghs": {"value" : "ghs-Latn-ZZ"}, "und-Lana": {"value" : "nod-Lana-TH"}, "tbc": {"value" : "tbc-Latn-ZZ"}, "und-RE": {"value" : "fr-Latn-RE"}, "tbd": {"value" : "tbd-Latn-ZZ"}, "tbg": {"value" : "tbg-Latn-ZZ"}, "tbf": {"value" : "tbf-Latn-ZZ"}, "und-RO": {"value" : "ro-Latn-RO"}, "kqb": {"value" : "kqb-Latn-ZZ"}, "tbo": {"value" : "tbo-Latn-ZZ"}
    , "kqf": {"value" : "kqf-Latn-ZZ"}, "und-PT": {"value" : "pt-Latn-PT"}, "und-PS": {"value" : "ar-Arab-PS"}, "und-PR": {"value" : "es-Latn-PR"}, "tbw": {"value" : "tbw-Latn-PH"}, "und-PY": {"value" : "gn-Latn-PY"}, "gim": {"value" : "gim-Latn-ZZ"}, "und-PW": {"value" : "pau-Latn-PW"}, "gil": {"value" : "gil-Latn-KI"}, "kqs": {"value" : "kqs-Latn-ZZ"}, "tbz": {"value" : "tbz-Latn-ZZ"}, "und-Laoo": {"value" : "lo-Laoo-LA"}, "can": {"value" : "can-Latn-ZZ"}, "und-QA": {"value" : "ar-Arab-QA"}, "kqy": {"value"
    : "kqy-Ethi-ZZ"}, "ms-CC": {"value" : "ms-Arab-CC"}, "tci": {"value" : "tci-Latn-ZZ"}, "krc": {"value" : "krc-Cyrl-RU"}, "krj": {"value" : "krj-Latn-PH"}, "kri": {"value" : "kri-Latn-SL"}, "ozm": {"value" : "ozm-Latn-ZZ"}, "und-OM": {"value" : "ar-Arab-OM"}, "krl": {"value" : "krl-Latn-RU"}, "gjk": {"value" : "gjk-Arab-PK"}, "cbj": {"value" : "cbj-Latn-ZZ"}, "gjn": {"value" : "gjn-Latn-ZZ"}, "tcy": {"value" : "tcy-Knda-IN"}, "xla": {"value" : "xla-Latn-ZZ"}, "krs": {"value" : "krs-Latn-ZZ"}, "xlc": {"value"
    : "xlc-Lyci-TR"}, "kru": {"value" : "kru-Deva-IN"}, "und-PA": {"value" : "es-Latn-PA"}, "xld": {"value" : "xld-Lydi-TR"}, "gju": {"value" : "gju-Arab-PK"}, "und-PE": {"value" : "es-Latn-PE"}, "tdd": {"value" : "tdd-Tale-CN"}, "tdg": {"value" : "tdg-Deva-NP"}, "tdh": {"value" : "tdh-Deva-NP"}, "und-PH": {"value" : "fil-Latn-PH"}, "und-PG": {"value" : "tpi-Latn-PG"}, "ksb": {"value" : "ksb-Latn-TZ"}, "und-PF": {"value" : "fr-Latn-PF"}, "und-PM": {"value" : "fr-Latn-PM"}, "ksd": {"value" : "ksd-Latn-ZZ"}, "und-PL":
    {"value" : "pl-Latn-PL"}, "und-PK": {"value" : "ur-Arab-PK"}, "ksf": {"value" : "ksf-Latn-CM"}};
}
function otciu_CLDRHelper_getDefaultLocale$$create() {
    return {"value" : "en_GB"};
}
function otciu_CLDRHelper_getNumberFormatMap$$create() {
    return {"root": {"value" : "#,##0.###"}, "en": {"value" : "#,##0.###"}};
}
function otciu_CLDRHelper_getDecimalDataMap$$create() {
    return {"root": {"exponentSeparator" : "E", "minusSign" : 45, "perMille" : 8240, "decimalSeparator" : 46, "listSeparator" : 59, "infinity" : "∞", "naN" : "NaN", "groupingSeparator" : 44, "percent" : 37}, "en": {"exponentSeparator" : "E", "minusSign" : 45, "perMille" : 8240, "decimalSeparator" : 46, "listSeparator" : 59, "infinity" : "∞", "naN" : "NaN", "groupingSeparator" : 44, "percent" : 37}};
}
function ovncv_Palete16() {
    jl_Object.call(this);
}
var ovncv_Palete16_color = null;
function ovncv_Palete16__clinit_() {
    var var$1, var$2;
    var$1 = $rt_createArray(jl_String, 16);
    var$2 = var$1.data;
    var$2[0] = $rt_s(66);
    var$2[1] = $rt_s(67);
    var$2[2] = $rt_s(68);
    var$2[3] = $rt_s(69);
    var$2[4] = $rt_s(70);
    var$2[5] = $rt_s(71);
    var$2[6] = $rt_s(72);
    var$2[7] = $rt_s(73);
    var$2[8] = $rt_s(66);
    var$2[9] = $rt_s(74);
    var$2[10] = $rt_s(75);
    var$2[11] = $rt_s(76);
    var$2[12] = $rt_s(77);
    var$2[13] = $rt_s(78);
    var$2[14] = $rt_s(79);
    var$2[15] = $rt_s(80);
    ovncv_Palete16_color = var$1;
}
function ovncvc_HorizontalLayout$getWidth$lambda$_1_0() {
    jl_Object.call(this);
}
function ovncvc_HorizontalLayout$getWidth$lambda$_1_0_apply(var$0, var$1) {
    return jl_Integer_valueOf0(var$1.$getWidth());
}
function juf_BiFunction() {
}
function juf_BinaryOperator() {
}
function ovncvc_HorizontalLayout$getWidth$lambda$_1_1() {
    jl_Object.call(this);
}
function ovncvc_HorizontalLayout$getWidth$lambda$_1_1_apply(var$0, var$1, var$2) {
    var$1 = var$1;
    var$2 = var$2;
    return jl_Integer_valueOf0(var$1.$value + var$2.$value | 0);
}
function ovncvc_VerticalLayout$getWidth$lambda$_1_0() {
    jl_Object.call(this);
}
function ovncvc_VerticalLayout$getWidth$lambda$_1_0_apply(var$0, var$1) {
    return jl_Integer_valueOf0(var$1.$getWidth());
}
function ovncvc_VerticalLayout$getWidth$lambda$_1_1() {
    jl_Object.call(this);
}
function ovncvc_VerticalLayout$getWidth$lambda$_1_1_apply(var$0, var$1, var$2) {
    var$1 = var$1;
    var$2 = var$2;
    if (var$1.$value > var$2.$value)
        var$2 = var$1;
    return var$2;
}
function ovncvc_HorizontalLayout$getHeight$lambda$_2_0() {
    jl_Object.call(this);
}
function ovncvc_HorizontalLayout$getHeight$lambda$_2_0_apply(var$0, var$1) {
    return jl_Integer_valueOf0(var$1.$getHeight());
}
function ovncvc_HorizontalLayout$getHeight$lambda$_2_1() {
    jl_Object.call(this);
}
function ovncvc_HorizontalLayout$getHeight$lambda$_2_1_apply(var$0, var$1, var$2) {
    var$1 = var$1;
    var$2 = var$2;
    if (var$1.$value > var$2.$value)
        var$2 = var$1;
    return var$2;
}
function ovncvc_VerticalLayout$getHeight$lambda$_2_0() {
    jl_Object.call(this);
}
function ovncvc_VerticalLayout$getHeight$lambda$_2_0_apply(var$0, var$1) {
    return jl_Integer_valueOf0(var$1.$getHeight());
}
function ovncvc_VerticalLayout$getHeight$lambda$_2_1() {
    jl_Object.call(this);
}
function ovncvc_VerticalLayout$getHeight$lambda$_2_1_apply(var$0, var$1, var$2) {
    var$1 = var$1;
    var$2 = var$2;
    return jl_Integer_valueOf0(var$1.$value + var$2.$value | 0);
}
function ju_Formatter$FormatWriter() {
    var a = this; jl_Object.call(a);
    a.$formatter = null;
    a.$out2 = null;
    a.$locale0 = null;
    a.$format1 = null;
    a.$args = null;
    a.$index0 = 0;
    a.$formatSpecifierStart = 0;
    a.$defaultArgumentIndex = 0;
    a.$argumentIndex = 0;
    a.$previousArgumentIndex = 0;
    a.$width2 = 0;
    a.$precision = 0;
    a.$flags = 0;
}
function ju_Formatter$FormatWriter__init_(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new ju_Formatter$FormatWriter();
    ju_Formatter$FormatWriter__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function ju_Formatter$FormatWriter__init_0($this, $formatter, $out, $locale, $format, $args) {
    $this.$formatter = $formatter;
    $this.$out2 = $out;
    $this.$locale0 = $locale;
    $this.$format1 = $format;
    $this.$args = $args;
}
function ju_Formatter$FormatWriter_write($this) {
    var $next, $specifier, var$3;
    a: while (true) {
        $next = jl_String_indexOf($this.$format1, 37, $this.$index0);
        if ($next < 0) {
            jl_StringBuilder_append4($this.$out2, jl_String_substring0($this.$format1, $this.$index0));
            return;
        }
        jl_StringBuilder_append4($this.$out2, jl_String_substring($this.$format1, $this.$index0, $next));
        $this.$index0 = $next + 1 | 0;
        $this.$formatSpecifierStart = $this.$index0;
        $specifier = ju_Formatter$FormatWriter_parseFormatSpecifier($this);
        if ($this.$flags & 256)
            $this.$argumentIndex = jl_Math_max(0, $this.$previousArgumentIndex);
        if ($this.$argumentIndex == (-1)) {
            var$3 = $this.$defaultArgumentIndex;
            $this.$defaultArgumentIndex = var$3 + 1 | 0;
            $this.$argumentIndex = var$3;
        }
        b: {
            $this.$previousArgumentIndex = $this.$argumentIndex;
            switch ($specifier) {
                case 66:
                    break;
                case 67:
                    ju_Formatter$FormatWriter_formatChar($this, $specifier, 1);
                    break b;
                case 68:
                    ju_Formatter$FormatWriter_formatDecimalInt($this, $specifier, 1);
                    break b;
                case 69:
                case 70:
                case 71:
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                case 80:
                case 81:
                case 82:
                case 84:
                case 85:
                case 86:
                case 87:
                case 89:
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                case 97:
                case 101:
                case 102:
                case 103:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 112:
                case 113:
                case 114:
                case 116:
                case 117:
                case 118:
                case 119:
                    break a;
                case 72:
                    ju_Formatter$FormatWriter_formatHex($this, $specifier, 1);
                    break b;
                case 79:
                    ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 3, 1);
                    break b;
                case 83:
                    ju_Formatter$FormatWriter_formatString($this, $specifier, 1);
                    break b;
                case 88:
                    ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 4, 1);
                    break b;
                case 98:
                    ju_Formatter$FormatWriter_formatBoolean($this, $specifier, 0);
                    break b;
                case 99:
                    ju_Formatter$FormatWriter_formatChar($this, $specifier, 0);
                    break b;
                case 100:
                    ju_Formatter$FormatWriter_formatDecimalInt($this, $specifier, 0);
                    break b;
                case 104:
                    ju_Formatter$FormatWriter_formatHex($this, $specifier, 0);
                    break b;
                case 111:
                    ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 3, 0);
                    break b;
                case 115:
                    ju_Formatter$FormatWriter_formatString($this, $specifier, 0);
                    break b;
                case 120:
                    ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 4, 0);
                    break b;
                default:
                    break a;
            }
            ju_Formatter$FormatWriter_formatBoolean($this, $specifier, 1);
        }
    }
    $rt_throw(ju_UnknownFormatConversionException__init_(jl_String_valueOf0($specifier)));
}
function ju_Formatter$FormatWriter_formatBoolean($this, $specifier, $upperCase) {
    var $arg;
    ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat($this, $specifier);
    $arg = $this.$args.data[$this.$argumentIndex];
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, !($arg instanceof jl_Boolean ? $arg.$booleanValue() : $arg === null ? 0 : 1) ? $rt_s(81) : $rt_s(82));
}
function ju_Formatter$FormatWriter_formatHex($this, $specifier, $upperCase) {
    var $arg;
    ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat($this, $specifier);
    $arg = $this.$args.data[$this.$argumentIndex];
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $arg === null ? $rt_s(2) : jl_Integer_toHexString(jl_Integer_hashCode($arg)));
}
function ju_Formatter$FormatWriter_formatString($this, $specifier, $upperCase) {
    var $arg, $flagsToPass;
    ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat($this, $specifier);
    $arg = $this.$args.data[$this.$argumentIndex];
    if (!$rt_isInstance($arg, ju_Formattable))
        ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, jl_String_valueOf($arg));
    else {
        $flagsToPass = $this.$flags & 7;
        if ($upperCase)
            $flagsToPass = $flagsToPass | 2;
        $arg.$formatTo($this.$formatter, $flagsToPass, $this.$width2, $this.$precision);
    }
}
function ju_Formatter$FormatWriter_formatChar($this, $specifier, $upperCase) {
    var $arg, $c, var$5, var$6, var$7;
    ju_Formatter$FormatWriter_verifyFlags($this, $specifier, 259);
    $arg = $this.$args.data[$this.$argumentIndex];
    if ($this.$precision >= 0)
        $rt_throw(ju_IllegalFormatPrecisionException__init_($this.$precision));
    if ($arg instanceof jl_Character)
        $c = $arg.$charValue();
    else if ($arg instanceof jl_Byte)
        $c = $arg.$byteValue() & 65535;
    else if ($arg instanceof jl_Short)
        $c = $arg.$shortValue() & 65535;
    else {
        if (!($arg instanceof jl_Integer)) {
            if ($arg === null) {
                ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $rt_s(2));
                return;
            }
            $rt_throw(ju_IllegalFormatConversionException__init_($specifier, jl_Object_getClass($arg)));
        }
        $c = $arg.$value;
        if (!($c >= 0 && $c <= 1114111 ? 1 : 0)) {
            var$5 = new ju_IllegalFormatCodePointException;
            jl_Throwable__init_(var$5, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(83)), $c), $rt_s(84))));
            var$5.$codePoint = $c;
            $rt_throw(var$5);
        }
    }
    $arg = new jl_String;
    if ($c < 65536) {
        var$6 = $rt_createCharArray(1);
        var$6.data[0] = $c & 65535;
    } else {
        var$6 = $rt_createCharArray(2);
        var$7 = var$6.data;
        var$7[0] = jl_Character_highSurrogate($c);
        var$7[1] = jl_Character_lowSurrogate($c);
    }
    jl_String__init_0($arg, var$6);
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $arg);
}
function ju_Formatter$FormatWriter_formatDecimalInt($this, $specifier, $upperCase) {
    var $arg, $value, $str, $negative, $value_0, $additionalSymbols, $sb, $valueSb, $separator, var$12, var$13, var$14, var$15, var$16, var$17, var$18, $size, $i, $prev, $i_0;
    ju_Formatter$FormatWriter_verifyFlags($this, $specifier, 507);
    ju_Formatter$FormatWriter_verifyIntFlags($this);
    $arg = $this.$args.data[$this.$argumentIndex];
    if ($arg instanceof jl_Long) {
        $value = $arg.$longValue();
        $specifier = Long_compare($value, Long_ZERO);
        if ($specifier <= 0)
            $value = Long_neg($value);
        $str = jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder__init_(), $value));
        $negative = $specifier >= 0 ? 0 : 1;
    } else {
        if (!($arg instanceof jl_Integer) && !($arg instanceof jl_Byte) && !($arg instanceof jl_Short))
            $rt_throw(ju_IllegalFormatConversionException__init_($specifier, $arg === null ? null : jl_Object_getClass($arg)));
        $value_0 = jl_Integer_intValue($arg);
        $str = jl_Integer_toString(jl_Math_abs($value_0));
        $negative = $value_0 >= 0 ? 0 : 1;
    }
    $additionalSymbols = 0;
    $sb = jl_StringBuilder__init_();
    if ($negative) {
        if (!($this.$flags & 128)) {
            jl_StringBuilder_append2($sb, 45);
            $additionalSymbols = 1;
        } else {
            jl_StringBuilder_append2($sb, 40);
            $additionalSymbols = 2;
        }
    } else if ($this.$flags & 8) {
        jl_StringBuilder_append2($sb, 43);
        $additionalSymbols = 1;
    } else if ($this.$flags & 16) {
        jl_StringBuilder_append2($sb, 32);
        $additionalSymbols = 1;
    }
    $valueSb = jl_StringBuilder__init_();
    if (!($this.$flags & 64))
        jl_StringBuilder_append($valueSb, $str);
    else {
        $separator = jt_DecimalFormatSymbols__init_($this.$locale0).$groupingSeparator;
        var$12 = $this.$locale0;
        var$13 = var$12.$languageCode;
        var$14 = var$12.$countryCode;
        if (otciu_CLDRHelper_$$metadata$$17 === null)
            otciu_CLDRHelper_$$metadata$$17 = otciu_CLDRHelper_getNumberFormatMap$$create();
        var$15 = otciu_CLDRHelper_$$metadata$$17;
        $arg = otciu_CLDRHelper_getCode(var$13, var$14);
        $arg = var$15.hasOwnProperty($rt_ustr($arg)) ? var$15[$rt_ustr($arg)] : var$15.hasOwnProperty($rt_ustr(var$13)) ? var$15[$rt_ustr(var$13)] : var$15.root;
        var$15 = ($arg.value !== null ? $rt_str($arg.value) : null);
        var$16 = new jt_DecimalFormat;
        var$17 = jt_DecimalFormatSymbols__init_(var$12);
        var$16.$groupingUsed = 1;
        var$16.$maximumIntegerDigits = 40;
        var$16.$minimumIntegerDigits = 1;
        var$16.$maximumFractionDigits = 3;
        var$16.$roundingMode = jm_RoundingMode_HALF_EVEN;
        $arg = ju_Locale_defaultLocale;
        if ($arg === null)
            $rt_throw(jl_NullPointerException__init_());
        var$14 = $arg.$languageCode;
        $arg = $arg.$countryCode;
        if (jl_String_isEmpty($arg)) {
            if (otciu_CLDRHelper_$$metadata$$0 === null)
                otciu_CLDRHelper_$$metadata$$0 = otciu_CLDRHelper_getLikelySubtagsMap$$create();
            $arg = otciu_CLDRHelper_$$metadata$$0;
            if ($arg.hasOwnProperty($rt_ustr(var$14)))
                var$14 = ($arg[$rt_ustr(var$14)].value !== null ? $rt_str($arg[$rt_ustr(var$14)].value) : null);
            $value_0 = jl_String_lastIndexOf0(var$14, 95);
            $arg = $value_0 <= 0 ? $rt_s(16) : jl_String_substring0(var$14, $value_0 + 1 | 0);
        }
        var$14 = otcic_CurrencyHelper_getCountryToCurrencyMap();
        var$16.$currency = !var$14.hasOwnProperty($rt_ustr($arg)) ? null : ju_Currency_getInstance((var$14[$rt_ustr($arg)].value !== null ? $rt_str(var$14[$rt_ustr($arg)].value) : null));
        var$16.$positivePrefix = $rt_createArray(jt_DecimalFormat$FormatField, 0);
        var$18 = $rt_createArray(jt_DecimalFormat$FormatField, 1);
        var$18.data[0] = jt_DecimalFormat$TextField__init_($rt_s(65));
        var$16.$negativePrefix = var$18;
        var$16.$positiveSuffix = $rt_createArray(jt_DecimalFormat$FormatField, 0);
        var$16.$negativeSuffix = $rt_createArray(jt_DecimalFormat$FormatField, 0);
        var$16.$multiplier = 1;
        var$16.$symbols = jt_DecimalFormatSymbols_clone(var$17);
        jt_DecimalFormat_applyPattern(var$16, var$15);
        $size = jt_DecimalFormat_getGroupingSize(var$16);
        $i = jl_String_length($str) % $size | 0;
        if (!$i)
            $i = $size;
        $prev = 0;
        while ($i < jl_String_length($str)) {
            jl_StringBuilder_append($valueSb, jl_String_substring($str, $prev, $i));
            jl_StringBuilder_append2($valueSb, $separator);
            $i_0 = $i + $size | 0;
            $prev = $i;
            $i = $i_0;
        }
        jl_StringBuilder_append($valueSb, jl_String_substring0($str, $prev));
    }
    a: {
        if ($this.$flags & 32) {
            $i = jl_StringBuilder_length($valueSb) + $additionalSymbols | 0;
            while (true) {
                if ($i >= $this.$width2)
                    break a;
                jl_StringBuilder_append2($sb, jl_Character_forDigit(0, 10));
                $i = $i + 1 | 0;
            }
        }
    }
    jl_StringBuilder_append4($sb, $valueSb);
    if ($negative && $this.$flags & 128)
        jl_StringBuilder_append2($sb, 41);
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, jl_StringBuilder_toString($sb));
}
function ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, $radixLog2, $upperCase) {
    var $arg, $str, var$6, $i, var$8, var$9, var$10, var$11, var$12, var$13, var$14, $sb, $prefix;
    ju_Formatter$FormatWriter_verifyFlags($this, $specifier, 423);
    ju_Formatter$FormatWriter_verifyIntFlags($this);
    $arg = $this.$args.data[$this.$argumentIndex];
    if (!($arg instanceof jl_Long)) {
        if ($arg instanceof jl_Integer)
            $str = otci_IntegerUtil_toUnsignedLogRadixString($arg.$value, $radixLog2);
        else if ($arg instanceof jl_Short)
            $str = otci_IntegerUtil_toUnsignedLogRadixString($arg.$shortValue() & 65535, $radixLog2);
        else {
            if (!($arg instanceof jl_Byte))
                $rt_throw(ju_IllegalFormatConversionException__init_($specifier, $arg === null ? null : jl_Object_getClass($arg)));
            $str = otci_IntegerUtil_toUnsignedLogRadixString($arg.$byteValue() & 255, $radixLog2);
        }
    } else {
        var$6 = $arg.$longValue();
        $specifier = Long_compare(var$6, Long_ZERO);
        if (!$specifier)
            $str = $rt_s(10);
        else {
            $i = 1 << $radixLog2;
            var$8 = $i - 1 | 0;
            if (!$specifier)
                $specifier = 64;
            else {
                var$9 = 0;
                var$10 = Long_shru(var$6, 32);
                if (Long_ne(var$10, Long_ZERO))
                    var$9 = 32;
                else
                    var$10 = var$6;
                var$11 = Long_shru(var$10, 16);
                if (Long_eq(var$11, Long_ZERO))
                    var$11 = var$10;
                else
                    var$9 = var$9 | 16;
                var$10 = Long_shru(var$11, 8);
                if (Long_eq(var$10, Long_ZERO))
                    var$10 = var$11;
                else
                    var$9 = var$9 | 8;
                var$11 = Long_shru(var$10, 4);
                if (Long_eq(var$11, Long_ZERO))
                    var$11 = var$10;
                else
                    var$9 = var$9 | 4;
                var$10 = Long_shru(var$11, 2);
                if (Long_eq(var$10, Long_ZERO))
                    var$10 = var$11;
                else
                    var$9 = var$9 | 2;
                if (Long_ne(Long_shru(var$10, 1), Long_ZERO))
                    var$9 = var$9 | 1;
                $specifier = (64 - var$9 | 0) - 1 | 0;
            }
            $specifier = (((64 - $specifier | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
            var$12 = $rt_createCharArray($specifier);
            var$13 = var$12.data;
            var$10 = Long_fromInt($rt_imul($specifier - 1 | 0, $radixLog2));
            $specifier = 0;
            var$14 = Long_fromInt($radixLog2);
            while (Long_ge(var$10, Long_ZERO)) {
                var$9 = $specifier + 1 | 0;
                var$13[$specifier] = jl_Character_forDigit(Long_shru(var$6, var$10.lo).lo & var$8, $i);
                var$10 = Long_sub(var$10, var$14);
                $specifier = var$9;
            }
            $str = jl_String__init_(var$12);
        }
    }
    $sb = jl_StringBuilder__init_();
    if ($this.$flags & 4) {
        $prefix = $radixLog2 != 4 ? $rt_s(10) : $rt_s(85);
        $str = jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $prefix), $str));
    }
    a: {
        if ($this.$flags & 32) {
            $i = jl_String_length($str);
            while (true) {
                if ($i >= $this.$width2)
                    break a;
                jl_StringBuilder_append2($sb, jl_Character_forDigit(0, 10));
                $i = $i + 1 | 0;
            }
        }
    }
    jl_StringBuilder_append($sb, $str);
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, jl_AbstractStringBuilder_toString($sb));
}
function ju_Formatter$FormatWriter_verifyIntFlags($this) {
    var var$1, var$2;
    if ($this.$flags & 8 && $this.$flags & 16)
        $rt_throw(ju_IllegalFormatFlagsException__init_($rt_s(86)));
    if ($this.$flags & 32 && $this.$flags & 1)
        $rt_throw(ju_IllegalFormatFlagsException__init_($rt_s(87)));
    if ($this.$precision >= 0)
        $rt_throw(ju_IllegalFormatPrecisionException__init_($this.$precision));
    if ($this.$flags & 1 && $this.$width2 < 0) {
        var$1 = new ju_MissingFormatWidthException;
        var$2 = jl_String_substring($this.$format1, $this.$formatSpecifierStart, $this.$index0);
        jl_Throwable__init_(var$1, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(88)), var$2)));
        var$1.$formatSpecifier = var$2;
        $rt_throw(var$1);
    }
}
function ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $str) {
    if ($this.$precision > 0)
        $str = jl_String_substring($str, 0, $this.$precision);
    if ($upperCase)
        $str = jl_String_toUpperCase($str);
    if (!($this.$flags & 1)) {
        ju_Formatter$FormatWriter_mayBeAppendSpaces($this, $str);
        jl_StringBuilder_append4($this.$out2, $str);
    } else {
        jl_StringBuilder_append4($this.$out2, $str);
        ju_Formatter$FormatWriter_mayBeAppendSpaces($this, $str);
    }
}
function ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat($this, $conversion) {
    ju_Formatter$FormatWriter_verifyFlags($this, $conversion, 263);
}
function ju_Formatter$FormatWriter_verifyFlags($this, $conversion, $mask) {
    var var$3, var$4, var$5, var$6, var$7;
    if (($this.$flags | $mask) == $mask)
        return;
    var$3 = new ju_FormatFlagsConversionMismatchException;
    $mask = $this.$flags & ($mask ^ (-1));
    if (!$mask)
        $mask = 32;
    else {
        var$4 = 0;
        var$5 = $mask << 16;
        if (var$5)
            var$4 = 16;
        else
            var$5 = $mask;
        var$6 = var$5 << 8;
        if (!var$6)
            var$6 = var$5;
        else
            var$4 = var$4 | 8;
        var$5 = var$6 << 4;
        if (!var$5)
            var$5 = var$6;
        else
            var$4 = var$4 | 4;
        var$6 = var$5 << 2;
        if (!var$6)
            var$6 = var$5;
        else
            var$4 = var$4 | 2;
        if (var$6 << 1)
            var$4 = var$4 | 1;
        $mask = (32 - var$4 | 0) - 1 | 0;
    }
    var$7 = jl_String_valueOf0(jl_String_charAt($rt_s(89), $mask));
    jl_Throwable__init_(var$3, jl_AbstractStringBuilder_toString(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(90)), var$7), $rt_s(91)), $conversion)));
    var$3.$flags0 = var$7;
    var$3.$conversion = $conversion;
    $rt_throw(var$3);
}
function ju_Formatter$FormatWriter_mayBeAppendSpaces($this, $str) {
    var $diff, $sb, $i;
    if ($this.$width2 > jl_String_length($str)) {
        $diff = $this.$width2 - jl_String_length($str) | 0;
        $sb = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_0($sb, $diff);
        $i = 0;
        while ($i < $diff) {
            jl_StringBuilder_append2($sb, 32);
            $i = $i + 1 | 0;
        }
        jl_StringBuilder_append4($this.$out2, $sb);
    }
}
function ju_Formatter$FormatWriter_parseFormatSpecifier($this) {
    var $c, $n, var$3, var$4;
    $this.$flags = 0;
    $this.$argumentIndex = (-1);
    $this.$width2 = (-1);
    $this.$precision = (-1);
    $c = jl_String_charAt($this.$format1, $this.$index0);
    if ($c != 48 && ju_Formatter$FormatWriter_isDigit($c)) {
        $n = ju_Formatter$FormatWriter_readInt($this);
        if ($this.$index0 < jl_String_length($this.$format1) && jl_String_charAt($this.$format1, $this.$index0) == 36) {
            $this.$index0 = $this.$index0 + 1 | 0;
            $this.$argumentIndex = $n - 1 | 0;
        } else
            $this.$width2 = $n;
    }
    a: {
        b: {
            while (true) {
                if ($this.$index0 >= jl_String_length($this.$format1))
                    break a;
                c: {
                    $c = jl_String_charAt($this.$format1, $this.$index0);
                    switch ($c) {
                        case 32:
                            break;
                        case 33:
                        case 34:
                        case 36:
                        case 37:
                        case 38:
                        case 39:
                        case 41:
                        case 42:
                        case 46:
                        case 47:
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                        case 58:
                        case 59:
                            break b;
                        case 35:
                            $n = 4;
                            break c;
                        case 40:
                            $n = 128;
                            break c;
                        case 43:
                            $n = 8;
                            break c;
                        case 44:
                            $n = 64;
                            break c;
                        case 45:
                            $n = 1;
                            break c;
                        case 48:
                            $n = 32;
                            break c;
                        case 60:
                            $n = 256;
                            break c;
                        default:
                            break b;
                    }
                    $n = 16;
                }
                if ($this.$flags & $n)
                    break;
                $this.$flags = $this.$flags | $n;
                $this.$index0 = $this.$index0 + 1 | 0;
            }
            var$3 = new ju_DuplicateFormatFlagsException;
            var$4 = jl_String_valueOf0($c);
            jl_Throwable__init_(var$3, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(92)), var$4)));
            var$3.$flags1 = var$4;
            $rt_throw(var$3);
        }
    }
    if ($this.$width2 < 0 && $this.$index0 < jl_String_length($this.$format1) && ju_Formatter$FormatWriter_isDigit(jl_String_charAt($this.$format1, $this.$index0)))
        $this.$width2 = ju_Formatter$FormatWriter_readInt($this);
    if ($this.$index0 < jl_String_length($this.$format1) && jl_String_charAt($this.$format1, $this.$index0) == 46) {
        $this.$index0 = $this.$index0 + 1 | 0;
        if ($this.$index0 < jl_String_length($this.$format1) && ju_Formatter$FormatWriter_isDigit(jl_String_charAt($this.$format1, $this.$index0)))
            $this.$precision = ju_Formatter$FormatWriter_readInt($this);
        else
            $rt_throw(ju_UnknownFormatConversionException__init_(jl_String_valueOf0(jl_String_charAt($this.$format1, $this.$index0 - 1 | 0))));
    }
    if ($this.$index0 < jl_String_length($this.$format1)) {
        var$3 = $this.$format1;
        $n = $this.$index0;
        $this.$index0 = $n + 1 | 0;
        return jl_String_charAt(var$3, $n);
    }
    $rt_throw(ju_UnknownFormatConversionException__init_(jl_String_valueOf0(jl_String_charAt($this.$format1, jl_String_length($this.$format1) - 1 | 0))));
}
function ju_Formatter$FormatWriter_readInt($this) {
    var $result, var$2, var$3, var$4;
    $result = 0;
    while ($this.$index0 < jl_String_length($this.$format1) && ju_Formatter$FormatWriter_isDigit(jl_String_charAt($this.$format1, $this.$index0))) {
        var$2 = $result * 10 | 0;
        var$3 = $this.$format1;
        var$4 = $this.$index0;
        $this.$index0 = var$4 + 1 | 0;
        $result = var$2 + (jl_String_charAt(var$3, var$4) - 48 | 0) | 0;
    }
    return $result;
}
function ju_Formatter$FormatWriter_isDigit($c) {
    return $c >= 48 && $c <= 57 ? 1 : 0;
}
function ju_FormatterClosedException() {
    jl_IllegalStateException.call(this);
}
function jus_BaseStream() {
}
function jus_Stream() {
}
function jusi_SimpleStreamImpl() {
    jl_Object.call(this);
}
var jusi_SimpleStreamImpl_$assertionsDisabled = 0;
function jusi_SimpleStreamImpl_map($this, $mapper) {
    var var$2;
    var$2 = new jusi_MappingStreamImpl;
    var$2.$sourceStream = $this;
    var$2.$mapper = $mapper;
    return var$2;
}
function jusi_SimpleStreamImpl_reduce($this, $identity, $accumulator) {
    var $consumer, $wantsMore;
    $consumer = new jusi_ReducingConsumer;
    $consumer.$accumulator = $accumulator;
    $consumer.$result = $identity;
    $consumer.$initialized = 1;
    $wantsMore = jusi_WrappingStreamImpl_next($this, $consumer);
    if (!jusi_SimpleStreamImpl_$assertionsDisabled && $wantsMore) {
        $identity = new jl_AssertionError;
        jl_Throwable__init_($identity, jl_String_valueOf($rt_s(93)));
        $rt_throw($identity);
    }
    return $consumer.$result;
}
function jusi_SimpleStreamImpl__clinit_() {
    jusi_SimpleStreamImpl_$assertionsDisabled = 0;
}
function jusi_StreamOverSpliterator() {
    jusi_SimpleStreamImpl.call(this);
    this.$spliterator = null;
}
function jusi_StreamOverSpliterator_next($this, $consumer) {
    var $action;
    $action = new jusi_StreamOverSpliterator$AdapterAction;
    $action.$consumer = $consumer;
    while (jusi_SpliteratorOverCollection_tryAdvance($this.$spliterator, $action)) {
        if ($action.$wantsMore)
            continue;
        else
            return 1;
    }
    return 0;
}
function ju_IllegalFormatException() {
    jl_IllegalArgumentException.call(this);
}
function ju_UnknownFormatConversionException() {
    ju_IllegalFormatException.call(this);
    this.$conversion0 = null;
}
function ju_UnknownFormatConversionException__init_(var_0) {
    var var_1 = new ju_UnknownFormatConversionException();
    ju_UnknownFormatConversionException__init_0(var_1, var_0);
    return var_1;
}
function ju_UnknownFormatConversionException__init_0($this, $conversion) {
    jl_Throwable__init_($this, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(94)), $conversion)));
    $this.$conversion0 = $conversion;
}
function ju_DuplicateFormatFlagsException() {
    ju_IllegalFormatException.call(this);
    this.$flags1 = null;
}
function ju_IllegalFormatPrecisionException() {
    ju_IllegalFormatException.call(this);
    this.$precision0 = 0;
}
function ju_IllegalFormatPrecisionException__init_(var_0) {
    var var_1 = new ju_IllegalFormatPrecisionException();
    ju_IllegalFormatPrecisionException__init_0(var_1, var_0);
    return var_1;
}
function ju_IllegalFormatPrecisionException__init_0($this, $precision) {
    jl_Throwable__init_($this, jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(95)), $precision)));
    $this.$precision0 = $precision;
}
function jl_Byte() {
    jl_Number.call(this);
}
var jl_Byte_TYPE = null;
function jl_Byte__clinit_() {
    jl_Byte_TYPE = $rt_cls($rt_bytecls());
}
function jl_Short() {
    jl_Number.call(this);
}
var jl_Short_TYPE = null;
function jl_Short__clinit_() {
    jl_Short_TYPE = $rt_cls($rt_shortcls());
}
function ju_IllegalFormatCodePointException() {
    ju_IllegalFormatException.call(this);
    this.$codePoint = 0;
}
function ju_IllegalFormatConversionException() {
    var a = this; ju_IllegalFormatException.call(a);
    a.$conversion1 = 0;
    a.$argumentClass = null;
}
function ju_IllegalFormatConversionException__init_(var_0, var_1) {
    var var_2 = new ju_IllegalFormatConversionException();
    ju_IllegalFormatConversionException__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_IllegalFormatConversionException__init_0($this, $conversion, $argumentClass) {
    jl_Throwable__init_($this, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append5(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(96)), $argumentClass), $rt_s(97)), $conversion), $rt_s(98))));
    $this.$conversion1 = $conversion;
    $this.$argumentClass = $argumentClass;
}
function jl_Long() {
    jl_Number.call(this);
}
var jl_Long_TYPE = null;
function jl_Long__clinit_() {
    jl_Long_TYPE = $rt_cls($rt_longcls());
}
function jt_DecimalFormatSymbols() {
    var a = this; jl_Object.call(a);
    a.$locale1 = null;
    a.$zeroDigit = 0;
    a.$groupingSeparator = 0;
    a.$decimalSeparator = 0;
    a.$perMill = 0;
    a.$percent = 0;
    a.$digit = 0;
    a.$patternSeparator = 0;
    a.$nan = null;
    a.$infinity = null;
    a.$minusSign = 0;
    a.$monetaryDecimalSeparator = 0;
    a.$exponentSeparator = null;
}
function jt_DecimalFormatSymbols__init_(var_0) {
    var var_1 = new jt_DecimalFormatSymbols();
    jt_DecimalFormatSymbols__init_0(var_1, var_0);
    return var_1;
}
function jt_DecimalFormatSymbols__init_0($this, $locale) {
    var var$2, var$3, var$4;
    $this.$locale1 = $locale;
    var$2 = $this.$locale1.$languageCode;
    var$3 = $this.$locale1.$countryCode;
    if (otciu_CLDRHelper_$$metadata$$20 === null)
        otciu_CLDRHelper_$$metadata$$20 = otciu_CLDRHelper_getDecimalDataMap$$create();
    var$4 = otciu_CLDRHelper_$$metadata$$20;
    $locale = otciu_CLDRHelper_getCode(var$2, var$3);
    var$4 = var$4.hasOwnProperty($rt_ustr($locale)) ? var$4[$rt_ustr($locale)] : var$4.hasOwnProperty($rt_ustr(var$2)) ? var$4[$rt_ustr(var$2)] : var$4.root;
    $this.$zeroDigit = 48;
    $this.$groupingSeparator = var$4.groupingSeparator & 65535;
    $this.$decimalSeparator = var$4.decimalSeparator & 65535;
    $this.$perMill = var$4.perMille & 65535;
    $this.$percent = var$4.percent & 65535;
    $this.$digit = 35;
    $this.$patternSeparator = 59;
    $this.$nan = (var$4.naN !== null ? $rt_str(var$4.naN) : null);
    $this.$infinity = (var$4.infinity !== null ? $rt_str(var$4.infinity) : null);
    $this.$minusSign = var$4.minusSign & 65535;
    $this.$monetaryDecimalSeparator = var$4.decimalSeparator & 65535;
    $this.$exponentSeparator = (var$4.exponentSeparator !== null ? $rt_str(var$4.exponentSeparator) : null);
}
function jt_DecimalFormatSymbols_getGroupingSeparator($this) {
    return $this.$groupingSeparator;
}
function jt_DecimalFormatSymbols_clone($this) {
    var var$1, $e, var$3, $$je;
    a: {
        try {
            var$1 = jl_Object_clone($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_CloneNotSupportedException) {
                $e = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return var$1;
    }
    var$3 = new jl_AssertionError;
    var$3.$suppressionEnabled = 1;
    var$3.$writableStackTrace = 1;
    var$3.$message = $rt_s(99);
    var$3.$cause = $e;
    $rt_throw(var$3);
}
function jt_Format() {
    jl_Object.call(this);
}
function jt_NumberFormat() {
    var a = this; jt_Format.call(a);
    a.$groupingUsed = 0;
    a.$maximumIntegerDigits = 0;
    a.$minimumIntegerDigits = 0;
    a.$maximumFractionDigits = 0;
    a.$minimumFractionDigits = 0;
    a.$roundingMode = null;
    a.$currency = null;
}
function jt_NumberFormat_setGroupingUsed($this, $value) {
    $this.$groupingUsed = $value;
}
function jt_NumberFormat_setMaximumFractionDigits($this, $value) {
    if ($value < 0)
        $value = 0;
    $this.$maximumFractionDigits = $value;
    if ($this.$maximumFractionDigits < $this.$minimumFractionDigits)
        $this.$minimumFractionDigits = $this.$maximumFractionDigits;
}
function jt_NumberFormat_setMaximumIntegerDigits($this, $value) {
    if ($value < 0)
        $value = 0;
    $this.$maximumIntegerDigits = $value;
    if ($this.$maximumIntegerDigits < $this.$minimumIntegerDigits)
        $this.$minimumIntegerDigits = $this.$maximumIntegerDigits;
}
function jt_NumberFormat_setMinimumFractionDigits($this, $value) {
    if ($value < 0)
        $value = 0;
    $this.$minimumFractionDigits = $value;
    if ($this.$maximumFractionDigits < $this.$minimumFractionDigits)
        $this.$maximumFractionDigits = $this.$minimumFractionDigits;
}
function jt_NumberFormat_setMinimumIntegerDigits($this, $value) {
    if ($value < 0)
        $value = 0;
    $this.$minimumIntegerDigits = $value;
    if ($this.$maximumIntegerDigits < $this.$minimumIntegerDigits)
        $this.$maximumIntegerDigits = $this.$minimumIntegerDigits;
}
function ju_Formattable() {
}
function ju_FormatFlagsConversionMismatchException() {
    var a = this; ju_IllegalFormatException.call(a);
    a.$flags0 = null;
    a.$conversion = 0;
}
function ju_IllegalFormatFlagsException() {
    ju_IllegalFormatException.call(this);
    this.$flags2 = null;
}
function ju_IllegalFormatFlagsException__init_(var_0) {
    var var_1 = new ju_IllegalFormatFlagsException();
    ju_IllegalFormatFlagsException__init_0(var_1, var_0);
    return var_1;
}
function ju_IllegalFormatFlagsException__init_0($this, $flags) {
    jl_Throwable__init_($this, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(100)), $flags)));
    $this.$flags2 = $flags;
}
function ju_MissingFormatWidthException() {
    ju_IllegalFormatException.call(this);
    this.$formatSpecifier = null;
}
function jt_DecimalFormat() {
    var a = this; jt_NumberFormat.call(a);
    a.$symbols = null;
    a.$positivePrefix = null;
    a.$negativePrefix = null;
    a.$positiveSuffix = null;
    a.$negativeSuffix = null;
    a.$multiplier = 0;
    a.$groupingSize = 0;
    a.$decimalSeparatorAlwaysShown = 0;
    a.$exponentDigits = 0;
    a.$pattern = null;
}
var jt_DecimalFormat_POW10_ARRAY = null;
var jt_DecimalFormat_POW10_INT_ARRAY = null;
var jt_DecimalFormat_POW10_FRAC_ARRAY = null;
var jt_DecimalFormat_POWM10_FRAC_ARRAY = null;
function jt_DecimalFormat_applyPattern($this, $pattern) {
    var $parser;
    $parser = new jt_DecimalFormatParser;
    jt_DecimalFormatParser_parse($parser, $pattern);
    jt_DecimalFormatParser_apply($parser, $this);
    $this.$pattern = $pattern;
}
function jt_DecimalFormat_setMultiplier($this, $newValue) {
    $this.$multiplier = $newValue;
}
function jt_DecimalFormat_getGroupingSize($this) {
    return $this.$groupingSize;
}
function jt_DecimalFormat_setGroupingSize($this, $newValue) {
    $this.$groupingSize = $newValue;
}
function jt_DecimalFormat_setDecimalSeparatorAlwaysShown($this, $newValue) {
    $this.$decimalSeparatorAlwaysShown = $newValue;
}
function jt_DecimalFormat__clinit_() {
    var var$1, var$2;
    var$1 = $rt_createLongArray(19);
    var$2 = var$1.data;
    var$2[0] = Long_fromInt(1);
    var$2[1] = Long_fromInt(10);
    var$2[2] = Long_fromInt(100);
    var$2[3] = Long_fromInt(1000);
    var$2[4] = Long_fromInt(10000);
    var$2[5] = Long_fromInt(100000);
    var$2[6] = Long_fromInt(1000000);
    var$2[7] = Long_fromInt(10000000);
    var$2[8] = Long_fromInt(100000000);
    var$2[9] = Long_fromInt(1000000000);
    var$2[10] = new Long(1410065408, 2);
    var$2[11] = new Long(1215752192, 23);
    var$2[12] = new Long(3567587328, 232);
    var$2[13] = new Long(1316134912, 2328);
    var$2[14] = new Long(276447232, 23283);
    var$2[15] = new Long(2764472320, 232830);
    var$2[16] = new Long(1874919424, 2328306);
    var$2[17] = new Long(1569325056, 23283064);
    var$2[18] = new Long(2808348672, 232830643);
    jt_DecimalFormat_POW10_ARRAY = var$1;
    var$1 = $rt_createIntArray(10);
    var$2 = var$1.data;
    var$2[0] = 1;
    var$2[1] = 10;
    var$2[2] = 100;
    var$2[3] = 1000;
    var$2[4] = 10000;
    var$2[5] = 100000;
    var$2[6] = 1000000;
    var$2[7] = 10000000;
    var$2[8] = 100000000;
    var$2[9] = 1000000000;
    jt_DecimalFormat_POW10_INT_ARRAY = var$1;
    var$1 = $rt_createDoubleArray(9);
    var$2 = var$1.data;
    var$2[0] = 10.0;
    var$2[1] = 100.0;
    var$2[2] = 10000.0;
    var$2[3] = 1.0E8;
    var$2[4] = 1.0E16;
    var$2[5] = 1.0E32;
    var$2[6] = 1.0E64;
    var$2[7] = 1.0E128;
    var$2[8] = 1.0E256;
    jt_DecimalFormat_POW10_FRAC_ARRAY = var$1;
    var$1 = $rt_createDoubleArray(9);
    var$2 = var$1.data;
    var$2[0] = 0.1;
    var$2[1] = 0.01;
    var$2[2] = 1.0E-4;
    var$2[3] = 1.0E-8;
    var$2[4] = 1.0E-16;
    var$2[5] = 1.0E-32;
    var$2[6] = 1.0E-64;
    var$2[7] = 1.0E-128;
    var$2[8] = 1.0E-256;
    jt_DecimalFormat_POWM10_FRAC_ARRAY = var$1;
}
function jt_DecimalFormat$FormatField() {
}
function jt_DecimalFormat$TextField() {
    jl_Object.call(this);
    this.$text = null;
}
function jt_DecimalFormat$TextField__init_(var_0) {
    var var_1 = new jt_DecimalFormat$TextField();
    jt_DecimalFormat$TextField__init_0(var_1, var_0);
    return var_1;
}
function jt_DecimalFormat$TextField__init_0($this, $text) {
    $this.$text = $text;
}
function jl_Enum() {
    var a = this; jl_Object.call(a);
    a.$name3 = null;
    a.$ordinal = 0;
}
function jm_RoundingMode() {
    jl_Enum.call(this);
    this.$bigDecimalRM = 0;
}
var jm_RoundingMode_UP = null;
var jm_RoundingMode_DOWN = null;
var jm_RoundingMode_CEILING = null;
var jm_RoundingMode_FLOOR = null;
var jm_RoundingMode_HALF_UP = null;
var jm_RoundingMode_HALF_DOWN = null;
var jm_RoundingMode_HALF_EVEN = null;
var jm_RoundingMode_UNNECESSARY = null;
var jm_RoundingMode_$VALUES = null;
function jm_RoundingMode__init_(var_0, var_1, var_2) {
    var var_3 = new jm_RoundingMode();
    jm_RoundingMode__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jm_RoundingMode__init_0($this, var$1, var$2, $rm) {
    $this.$name3 = var$1;
    $this.$ordinal = var$2;
    $this.$bigDecimalRM = $rm;
}
function jm_RoundingMode__clinit_() {
    var var$1, var$2;
    jm_RoundingMode_UP = jm_RoundingMode__init_($rt_s(101), 0, 0);
    jm_RoundingMode_DOWN = jm_RoundingMode__init_($rt_s(102), 1, 1);
    jm_RoundingMode_CEILING = jm_RoundingMode__init_($rt_s(103), 2, 2);
    jm_RoundingMode_FLOOR = jm_RoundingMode__init_($rt_s(104), 3, 3);
    jm_RoundingMode_HALF_UP = jm_RoundingMode__init_($rt_s(105), 4, 4);
    jm_RoundingMode_HALF_DOWN = jm_RoundingMode__init_($rt_s(106), 5, 5);
    jm_RoundingMode_HALF_EVEN = jm_RoundingMode__init_($rt_s(107), 6, 6);
    jm_RoundingMode_UNNECESSARY = jm_RoundingMode__init_($rt_s(108), 7, 7);
    var$1 = $rt_createArray(jm_RoundingMode, 8);
    var$2 = var$1.data;
    var$2[0] = jm_RoundingMode_UP;
    var$2[1] = jm_RoundingMode_DOWN;
    var$2[2] = jm_RoundingMode_CEILING;
    var$2[3] = jm_RoundingMode_FLOOR;
    var$2[4] = jm_RoundingMode_HALF_UP;
    var$2[5] = jm_RoundingMode_HALF_DOWN;
    var$2[6] = jm_RoundingMode_HALF_EVEN;
    var$2[7] = jm_RoundingMode_UNNECESSARY;
    jm_RoundingMode_$VALUES = var$1;
}
function ju_Currency() {
    jl_Object.call(this);
    this.$resource = null;
}
var ju_Currency_currencies = null;
function ju_Currency_getInstance($currencyCode) {
    var var$2, var$3, var$4, var$5, var$6, $currency;
    if ($currencyCode === null) {
        $currencyCode = new jl_NullPointerException;
        jl_Exception__init_($currencyCode);
        $rt_throw($currencyCode);
    }
    if (ju_Currency_currencies === null) {
        ju_Currency_currencies = ju_HashMap__init_();
        if (otcic_CurrencyHelper_$$metadata$$0 === null)
            otcic_CurrencyHelper_$$metadata$$0 = otcic_CurrencyHelper_getCurrencies$$create();
        var$2 = otcic_CurrencyHelper_$$metadata$$0;
        var$3 = 0;
        while (var$3 < var$2.length) {
            var$4 = var$2[var$3];
            var$5 = ju_Currency_currencies;
            var$6 = (var$4.code !== null ? $rt_str(var$4.code) : null);
            $currency = new ju_Currency;
            $currency.$resource = var$4;
            ju_HashMap_putImpl(var$5, var$6, $currency);
            var$3 = var$3 + 1 | 0;
        }
    }
    $currency = ju_HashMap_get(ju_Currency_currencies, $currencyCode);
    if ($currency !== null)
        return $currency;
    var$4 = new jl_IllegalArgumentException;
    jl_Throwable__init_(var$4, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(109)), $currencyCode)));
    $rt_throw(var$4);
}
function otcic_CurrencyHelper() {
    jl_Object.call(this);
}
var otcic_CurrencyHelper_$$metadata$$0 = null;
var otcic_CurrencyHelper_$$metadata$$1 = null;
function otcic_CurrencyHelper_getCountryToCurrencyMap() {
    if (otcic_CurrencyHelper_$$metadata$$1 === null)
        otcic_CurrencyHelper_$$metadata$$1 = otcic_CurrencyHelper_getCountryToCurrencyMap$$create();
    return otcic_CurrencyHelper_$$metadata$$1;
}
function otcic_CurrencyHelper_getCurrencies$$create() {
    return [{"code" : "AFN", "fractionDigits" : 2, "numericCode" : 971}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "ALL", "fractionDigits" : 2, "numericCode" : 8}, {"code" : "DZD", "fractionDigits" : 2, "numericCode" : 12}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "AOA", "fractionDigits" : 2, "numericCode" : 973}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" : 951}, {"code" : null,
    "fractionDigits" : 0, "numericCode" : 0}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" : 951}, {"code" : "ARS", "fractionDigits" : 2, "numericCode" : 32}, {"code" : "AMD", "fractionDigits" : 2, "numericCode" : 51}, {"code" : "AWG", "fractionDigits" : 2, "numericCode" : 533}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "AZN", "fractionDigits" : 2, "numericCode" : 944}, {"code" : "BSD", "fractionDigits" : 2, "numericCode"
    : 44}, {"code" : "BHD", "fractionDigits" : 3, "numericCode" : 48}, {"code" : "BDT", "fractionDigits" : 2, "numericCode" : 50}, {"code" : "BBD", "fractionDigits" : 2, "numericCode" : 52}, {"code" : "BYR", "fractionDigits" : 0, "numericCode" : 974}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "BZD", "fractionDigits" : 2, "numericCode" : 84}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "BMD", "fractionDigits" : 2, "numericCode" : 60}, {"code" : "BTN", "fractionDigits"
    : 2, "numericCode" : 64}, {"code" : "INR", "fractionDigits" : 2, "numericCode" : 356}, {"code" : "BOB", "fractionDigits" : 2, "numericCode" : 68}, {"code" : "BOV", "fractionDigits" : 2, "numericCode" : 984}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "BAM", "fractionDigits" : 2, "numericCode" : 977}, {"code" : "BWP", "fractionDigits" : 2, "numericCode" : 72}, {"code" : "NOK", "fractionDigits" : 2, "numericCode" : 578}, {"code" : "BRL", "fractionDigits" : 2, "numericCode" : 986}
    , {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "BND", "fractionDigits" : 2, "numericCode" : 96}, {"code" : "BGN", "fractionDigits" : 2, "numericCode" : 975}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "BIF", "fractionDigits" : 0, "numericCode" : 108}, {"code" : "KHR", "fractionDigits" : 2, "numericCode" : 116}, {"code" : "XAF", "fractionDigits" : 0, "numericCode" : 950}, {"code" : "CAD", "fractionDigits" : 2, "numericCode" : 124}, {"code" : "CVE", "fractionDigits"
    : 2, "numericCode" : 132}, {"code" : "KYD", "fractionDigits" : 2, "numericCode" : 136}, {"code" : "XAF", "fractionDigits" : 0, "numericCode" : 950}, {"code" : "XAF", "fractionDigits" : 0, "numericCode" : 950}, {"code" : "CLF", "fractionDigits" : 4, "numericCode" : 990}, {"code" : "CLP", "fractionDigits" : 0, "numericCode" : 152}, {"code" : "CNY", "fractionDigits" : 2, "numericCode" : 156}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}
    , {"code" : "COP", "fractionDigits" : 2, "numericCode" : 170}, {"code" : "COU", "fractionDigits" : 2, "numericCode" : 970}, {"code" : "KMF", "fractionDigits" : 0, "numericCode" : 174}, {"code" : "XAF", "fractionDigits" : 0, "numericCode" : 950}, {"code" : "CDF", "fractionDigits" : 2, "numericCode" : 976}, {"code" : "NZD", "fractionDigits" : 2, "numericCode" : 554}, {"code" : "CRC", "fractionDigits" : 2, "numericCode" : 188}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "HRK", "fractionDigits"
    : 2, "numericCode" : 191}, {"code" : "CUC", "fractionDigits" : 2, "numericCode" : 931}, {"code" : "CUP", "fractionDigits" : 2, "numericCode" : 192}, {"code" : "ANG", "fractionDigits" : 2, "numericCode" : 532}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "CZK", "fractionDigits" : 2, "numericCode" : 203}, {"code" : "DKK", "fractionDigits" : 2, "numericCode" : 208}, {"code" : "DJF", "fractionDigits" : 0, "numericCode" : 262}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" :
    951}, {"code" : "DOP", "fractionDigits" : 2, "numericCode" : 214}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "EGP", "fractionDigits" : 2, "numericCode" : 818}, {"code" : "SVC", "fractionDigits" : 2, "numericCode" : 222}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "XAF", "fractionDigits" : 0, "numericCode" : 950}, {"code" : "ERN", "fractionDigits" : 2, "numericCode" : 232}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "ETB",
    "fractionDigits" : 2, "numericCode" : 230}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "FKP", "fractionDigits" : 2, "numericCode" : 238}, {"code" : "DKK", "fractionDigits" : 2, "numericCode" : 208}, {"code" : "FJD", "fractionDigits" : 2, "numericCode" : 242}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "XPF", "fractionDigits" : 0,
    "numericCode" : 953}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "XAF", "fractionDigits" : 0, "numericCode" : 950}, {"code" : "GMD", "fractionDigits" : 2, "numericCode" : 270}, {"code" : "GEL", "fractionDigits" : 2, "numericCode" : 981}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "GHS", "fractionDigits" : 2, "numericCode" : 936}, {"code" : "GIP", "fractionDigits" : 2, "numericCode" : 292}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}
    , {"code" : "DKK", "fractionDigits" : 2, "numericCode" : 208}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" : 951}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "GTQ", "fractionDigits" : 2, "numericCode" : 320}, {"code" : "GBP", "fractionDigits" : 2, "numericCode" : 826}, {"code" : "GNF", "fractionDigits" : 0, "numericCode" : 324}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "GYD", "fractionDigits"
    : 2, "numericCode" : 328}, {"code" : "HTG", "fractionDigits" : 2, "numericCode" : 332}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "HNL", "fractionDigits" : 2, "numericCode" : 340}, {"code" : "HKD", "fractionDigits" : 2, "numericCode" : 344}, {"code" : "HUF", "fractionDigits" : 2, "numericCode" : 348}, {"code" : "ISK", "fractionDigits" : 0, "numericCode" : 352}
    , {"code" : "INR", "fractionDigits" : 2, "numericCode" : 356}, {"code" : "IDR", "fractionDigits" : 2, "numericCode" : 360}, {"code" : "XDR", "fractionDigits" : -1, "numericCode" : 960}, {"code" : "IRR", "fractionDigits" : 2, "numericCode" : 364}, {"code" : "IQD", "fractionDigits" : 3, "numericCode" : 368}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "GBP", "fractionDigits" : 2, "numericCode" : 826}, {"code" : "ILS", "fractionDigits" : 2, "numericCode" : 376}, {"code" : "EUR", "fractionDigits"
    : 2, "numericCode" : 978}, {"code" : "JMD", "fractionDigits" : 2, "numericCode" : 388}, {"code" : "JPY", "fractionDigits" : 0, "numericCode" : 392}, {"code" : "GBP", "fractionDigits" : 2, "numericCode" : 826}, {"code" : "JOD", "fractionDigits" : 3, "numericCode" : 400}, {"code" : "KZT", "fractionDigits" : 2, "numericCode" : 398}, {"code" : "KES", "fractionDigits" : 2, "numericCode" : 404}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}, {"code" : "KPW", "fractionDigits" : 2, "numericCode" : 408}
    , {"code" : "KRW", "fractionDigits" : 0, "numericCode" : 410}, {"code" : "KWD", "fractionDigits" : 3, "numericCode" : 414}, {"code" : "KGS", "fractionDigits" : 2, "numericCode" : 417}, {"code" : "LAK", "fractionDigits" : 2, "numericCode" : 418}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "LBP", "fractionDigits" : 2, "numericCode" : 422}, {"code" : "LSL", "fractionDigits" : 2, "numericCode" : 426}, {"code" : "ZAR", "fractionDigits" : 2, "numericCode" : 710}, {"code" : "LRD", "fractionDigits"
    : 2, "numericCode" : 430}, {"code" : "LYD", "fractionDigits" : 3, "numericCode" : 434}, {"code" : "CHF", "fractionDigits" : 2, "numericCode" : 756}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "MOP", "fractionDigits" : 2, "numericCode" : 446}, {"code" : "MKD", "fractionDigits" : 2, "numericCode" : 807}, {"code" : "MGA", "fractionDigits" : 2, "numericCode" : 969}, {"code" : "MWK", "fractionDigits" : 2, "numericCode" :
    454}, {"code" : "MYR", "fractionDigits" : 2, "numericCode" : 458}, {"code" : "MVR", "fractionDigits" : 2, "numericCode" : 462}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "MRO", "fractionDigits" : 2, "numericCode" : 478}, {"code" : "MUR", "fractionDigits" : 2, "numericCode" : 480}, {"code" : "EUR",
    "fractionDigits" : 2, "numericCode" : 978}, {"code" : "XUA", "fractionDigits" : -1, "numericCode" : 965}, {"code" : "MXN", "fractionDigits" : 2, "numericCode" : 484}, {"code" : "MXV", "fractionDigits" : 2, "numericCode" : 979}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "MDL", "fractionDigits" : 2, "numericCode" : 498}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "MNT", "fractionDigits" : 2, "numericCode" : 496}, {"code" : "EUR", "fractionDigits" : 2,
    "numericCode" : 978}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" : 951}, {"code" : "MAD", "fractionDigits" : 2, "numericCode" : 504}, {"code" : "MZN", "fractionDigits" : 2, "numericCode" : 943}, {"code" : "MMK", "fractionDigits" : 2, "numericCode" : 104}, {"code" : "NAD", "fractionDigits" : 2, "numericCode" : 516}, {"code" : "ZAR", "fractionDigits" : 2, "numericCode" : 710}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}, {"code" : "NPR", "fractionDigits" : 2, "numericCode" : 524},
    {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "XPF", "fractionDigits" : 0, "numericCode" : 953}, {"code" : "NZD", "fractionDigits" : 2, "numericCode" : 554}, {"code" : "NIO", "fractionDigits" : 2, "numericCode" : 558}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "NGN", "fractionDigits" : 2, "numericCode" : 566}, {"code" : "NZD", "fractionDigits" : 2, "numericCode" : 554}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}, {"code" : "USD", "fractionDigits"
    : 2, "numericCode" : 840}, {"code" : "NOK", "fractionDigits" : 2, "numericCode" : 578}, {"code" : "OMR", "fractionDigits" : 3, "numericCode" : 512}, {"code" : "PKR", "fractionDigits" : 2, "numericCode" : 586}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : null, "fractionDigits" : 0, "numericCode" : 0}, {"code" : "PAB", "fractionDigits" : 2, "numericCode" : 590}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "PGK", "fractionDigits" : 2, "numericCode" : 598}
    , {"code" : "PYG", "fractionDigits" : 0, "numericCode" : 600}, {"code" : "PEN", "fractionDigits" : 2, "numericCode" : 604}, {"code" : "PHP", "fractionDigits" : 2, "numericCode" : 608}, {"code" : "NZD", "fractionDigits" : 2, "numericCode" : 554}, {"code" : "PLN", "fractionDigits" : 2, "numericCode" : 985}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "QAR", "fractionDigits" : 2, "numericCode" : 634}, {"code" : "EUR", "fractionDigits"
    : 2, "numericCode" : 978}, {"code" : "RON", "fractionDigits" : 2, "numericCode" : 946}, {"code" : "RUB", "fractionDigits" : 2, "numericCode" : 643}, {"code" : "RWF", "fractionDigits" : 0, "numericCode" : 646}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "SHP", "fractionDigits" : 2, "numericCode" : 654}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" : 951}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" : 951}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" :
    978}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "XCD", "fractionDigits" : 2, "numericCode" : 951}, {"code" : "WST", "fractionDigits" : 2, "numericCode" : 882}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "STD", "fractionDigits" : 2, "numericCode" : 678}, {"code" : "SAR", "fractionDigits" : 2, "numericCode" : 682}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "RSD", "fractionDigits" : 2, "numericCode" : 941}, {"code" : "SCR",
    "fractionDigits" : 2, "numericCode" : 690}, {"code" : "SLL", "fractionDigits" : 2, "numericCode" : 694}, {"code" : "SGD", "fractionDigits" : 2, "numericCode" : 702}, {"code" : "ANG", "fractionDigits" : 2, "numericCode" : 532}, {"code" : "XSU", "fractionDigits" : -1, "numericCode" : 994}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "SBD", "fractionDigits" : 2, "numericCode" : 90}, {"code" : "SOS", "fractionDigits" : 2,
    "numericCode" : 706}, {"code" : "ZAR", "fractionDigits" : 2, "numericCode" : 710}, {"code" : null, "fractionDigits" : 0, "numericCode" : 0}, {"code" : "SSP", "fractionDigits" : 2, "numericCode" : 728}, {"code" : "EUR", "fractionDigits" : 2, "numericCode" : 978}, {"code" : "LKR", "fractionDigits" : 2, "numericCode" : 144}, {"code" : "SDG", "fractionDigits" : 2, "numericCode" : 938}, {"code" : "SRD", "fractionDigits" : 2, "numericCode" : 968}, {"code" : "NOK", "fractionDigits" : 2, "numericCode" : 578}, {"code"
    : "SZL", "fractionDigits" : 2, "numericCode" : 748}, {"code" : "SEK", "fractionDigits" : 2, "numericCode" : 752}, {"code" : "CHE", "fractionDigits" : 2, "numericCode" : 947}, {"code" : "CHF", "fractionDigits" : 2, "numericCode" : 756}, {"code" : "CHW", "fractionDigits" : 2, "numericCode" : 948}, {"code" : "SYP", "fractionDigits" : 2, "numericCode" : 760}, {"code" : "TWD", "fractionDigits" : 2, "numericCode" : 901}, {"code" : "TJS", "fractionDigits" : 2, "numericCode" : 972}, {"code" : "TZS", "fractionDigits"
    : 2, "numericCode" : 834}, {"code" : "THB", "fractionDigits" : 2, "numericCode" : 764}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "XOF", "fractionDigits" : 0, "numericCode" : 952}, {"code" : "NZD", "fractionDigits" : 2, "numericCode" : 554}, {"code" : "TOP", "fractionDigits" : 2, "numericCode" : 776}, {"code" : "TTD", "fractionDigits" : 2, "numericCode" : 780}, {"code" : "TND", "fractionDigits" : 3, "numericCode" : 788}, {"code" : "TRY", "fractionDigits" : 2, "numericCode" :
    949}, {"code" : "TMT", "fractionDigits" : 2, "numericCode" : 934}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "AUD", "fractionDigits" : 2, "numericCode" : 36}, {"code" : "UGX", "fractionDigits" : 0, "numericCode" : 800}, {"code" : "UAH", "fractionDigits" : 2, "numericCode" : 980}, {"code" : "AED", "fractionDigits" : 2, "numericCode" : 784}, {"code" : "GBP", "fractionDigits" : 2, "numericCode" : 826}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "USN",
    "fractionDigits" : 2, "numericCode" : 997}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "UYI", "fractionDigits" : 0, "numericCode" : 940}, {"code" : "UYU", "fractionDigits" : 2, "numericCode" : 858}, {"code" : "UZS", "fractionDigits" : 2, "numericCode" : 860}, {"code" : "VUV", "fractionDigits" : 0, "numericCode" : 548}, {"code" : "VEF", "fractionDigits" : 2, "numericCode" : 937}, {"code" : "VND", "fractionDigits" : 0, "numericCode" : 704}, {"code" : "USD", "fractionDigits" : 2,
    "numericCode" : 840}, {"code" : "USD", "fractionDigits" : 2, "numericCode" : 840}, {"code" : "XPF", "fractionDigits" : 0, "numericCode" : 953}, {"code" : "MAD", "fractionDigits" : 2, "numericCode" : 504}, {"code" : "YER", "fractionDigits" : 2, "numericCode" : 886}, {"code" : "ZMW", "fractionDigits" : 2, "numericCode" : 967}, {"code" : "ZWL", "fractionDigits" : 2, "numericCode" : 932}, {"code" : "XBA", "fractionDigits" : -1, "numericCode" : 955}, {"code" : "XBB", "fractionDigits" : -1, "numericCode" : 956}
    , {"code" : "XBC", "fractionDigits" : -1, "numericCode" : 957}, {"code" : "XBD", "fractionDigits" : -1, "numericCode" : 958}, {"code" : "XTS", "fractionDigits" : -1, "numericCode" : 963}, {"code" : "XXX", "fractionDigits" : -1, "numericCode" : 999}, {"code" : "XAU", "fractionDigits" : -1, "numericCode" : 959}, {"code" : "XPD", "fractionDigits" : -1, "numericCode" : 964}, {"code" : "XPT", "fractionDigits" : -1, "numericCode" : 962}, {"code" : "XAG", "fractionDigits" : -1, "numericCode" : 961}];
}
function otcic_CurrencyHelper_getCountryToCurrencyMap$$create() {
    return {"": {"value" : "CYP"}, "PR": {"value" : "USD"}, "PT": {"value" : "EUR"}, "PW": {"value" : "USD"}, "PY": {"value" : "PYG"}, "QA": {"value" : "QAR"}, "AC": {"value" : "SHP"}, "AD": {"value" : "EUR"}, "AE": {"value" : "AED"}, "AF": {"value" : "AFN"}, "AG": {"value" : "XCD"}, "AI": {"value" : "XCD"}, "AL": {"value" : "ALL"}, "AM": {"value" : "AMD"}, "AN": {"value" : "ANG"}, "AO": {"value" : "AOA"}, "242": {"value" : "Brazzaville"}, "AQ": {"value" : ""}, "AR": {"value" : "ARS"}, "243": {"value" : "Kinshasa"}
    , "AS": {"value" : "USD"}, "AT": {"value" : "EUR"}, "RE": {"value" : "EUR"}, "AU": {"value" : ""}, "AW": {"value" : "AWG"}, "AX": {"value" : "EUR"}, "AZ": {"value" : "AMD"}, "RO": {"value" : "RON"}, "BA": {"value" : "BAM"}, "BB": {"value" : "BBD"}, "RS": {"value" : "RSD"}, "BD": {"value" : "BDT"}, "BE": {"value" : "EUR"}, "RU": {"value" : "RUB"}, "BF": {"value" : "XOF"}, "BG": {"value" : "BGN"}, "RW": {"value" : "RWF"}, "27": {"value" : ""}, "BH": {"value" : "BHD"}, "BI": {"value" : "BIF"}, "BJ": {"value"
    : "XOF"}, "BM": {"value" : "BMD"}, "BN": {"value" : "BND"}, "BO": {"value" : "BOB"}, "SA": {"value" : "SAR"}, "SB": {"value" : "SBD"}, "BR": {"value" : "BRL"}, "SC": {"value" : "SCR"}, "SD": {"value" : "SDD"}, "BT": {"value" : "BTN"}, "SE": {"value" : "SEK"}, "SG": {"value" : "SGD"}, "BV": {"value" : ""}, "BW": {"value" : "BWP"}, "SH": {"value" : "SHP"}, "SI": {"value" : "EUR"}, "BY": {"value" : "BYR"}, "SJ": {"value" : "NOK"}, "BZ": {"value" : "BZD"}, "SK": {"value" : "SKK"}, "SL": {"value" : "SLL"}, "SM":
    {"value" : "EUR"}, "SN": {"value" : "XOF"}, "SO": {"value" : ""}, "CA": {"value" : "CAD"}, "SR": {"value" : "SRD"}, "CC": {"value" : "AUD"}, "ST": {"value" : "STD"}, "CF": {"value" : "XAF"}, "SV": {"value" : "USD"}, "CH": {"value" : "CHF"}, "CI": {"value" : "XOF"}, "SY": {"value" : "SYP"}, "SZ": {"value" : "SZL"}, "CK": {"value" : "NZD"}, "CL": {"value" : "CLP"}, "CM": {"value" : "XAF"}, "CO": {"value" : "COP"}, "TA": {"value" : "SHP"}, "CR": {"value" : "CRC"}, "TC": {"value" : "USD"}, "TD": {"value" : "XAF"}
    , "CU": {"value" : "CUP"}, "TF": {"value" : ""}, "CV": {"value" : "CVE"}, "TG": {"value" : "XOF"}, "TH": {"value" : "THB"}, "CX": {"value" : "AUD"}, "CY": {"value" : "TRY"}, "TJ": {"value" : "TJS"}, "CZ": {"value" : "CZK"}, "TK": {"value" : "NZD"}, "TL": {"value" : "USD"}, "TM": {"value" : "TMM"}, "TN": {"value" : "TND"}, "TO": {"value" : "TOP"}, "TR": {"value" : "TRY"}, "TT": {"value" : "TTD"}, "DE": {"value" : "EUR"}, "TV": {"value" : "AUD"}, "DJ": {"value" : "DJF"}, "TZ": {"value" : "TZS"}, "DK": {"value"
    : "DKK"}, "DM": {"value" : "XCD"}, "DO": {"value" : "DOP"}, "UA": {"value" : "UAH"}, "UG": {"value" : "UGX"}, "DZ": {"value" : "DZD"}, "UM": {"value" : ""}, "EC": {"value" : "USD"}, "US": {"value" : "USD"}, "EE": {"value" : "EEK"}, "EG": {"value" : "EGP"}, "UY": {"value" : "UYU"}, "UZ": {"value" : "UZS"}, "VA": {"value" : "EUR"}, "ER": {"value" : "ERN"}, "VC": {"value" : "XCD"}, "ES": {"value" : "EUR"}, "ET": {"value" : "ETB"}, "VE": {"value" : "VEB"}, "VG": {"value" : "USD"}, "VI": {"value" : "USD"}, "VN":
    {"value" : "VND"}, "VU": {"value" : "VUV"}, "FI": {"value" : "EUR"}, "FJ": {"value" : "FJD"}, "FK": {"value" : "FKP"}, "FM": {"value" : "USD"}, "FO": {"value" : "DKK"}, "FR": {"value" : "EUR"}, "WF": {"value" : "XPF"}, "850": {"value" : "Pyongyang"}, "GA": {"value" : "XAF"}, "GB": {"value" : "GBP"}, "WS": {"value" : "WST"}, "GD": {"value" : "XCD"}, "GE": {"value" : "RUB and GEL"}, "GF": {"value" : "EUR"}, "GG": {"value" : "GGP"}, "GH": {"value" : "GHC"}, "GI": {"value" : "GIP"}, "GL": {"value" : "DKK"},
    "GN": {"value" : "GNF"}, "GP": {"value" : "EUR"}, "GQ": {"value" : "XAF"}, "GR": {"value" : "EUR"}, "GS": {"value" : ""}, "GT": {"value" : "GTQ"}, "GU": {"value" : "USD"}, "GW": {"value" : "XOF"}, "GY": {"value" : "GYD"}, "-241": {"value" : "Nassau"}, "82": {"value" : "Seoul"}, "86": {"value" : "Beijing"}, "HK": {"value" : "HKD"}, "HM": {"value" : ""}, "HN": {"value" : "HNL"}, "HR": {"value" : "HRK"}, "HT": {"value" : "HTG"}, "YE": {"value" : "YER"}, "HU": {"value" : "HUF"}, "ID": {"value" : "IDR"}, "YT":
    {"value" : "EUR"}, "IE": {"value" : "EUR"}, "IL": {"value" : "ILS"}, "IM": {"value" : "IMP"}, "IN": {"value" : "INR"}, "IO": {"value" : ""}, "IQ": {"value" : "IQD"}, "IR": {"value" : "IRR"}, "IS": {"value" : "ISK"}, "IT": {"value" : "EUR"}, "ZM": {"value" : "ZMK"}, "886": {"value" : "Taipei"}, "JE": {"value" : "JEP"}, "ZW": {"value" : "ZWD"}, "JM": {"value" : "JMD"}, "JO": {"value" : "JOD"}, "JP": {"value" : "JPY"}, "KE": {"value" : "KES"}, "KG": {"value" : "KGS"}, "KH": {"value" : "KHR"}, "KI": {"value"
    : "AUD"}, "KM": {"value" : "KMF"}, "KN": {"value" : "XCD"}, "KW": {"value" : "KWD"}, "KY": {"value" : "KYD"}, "KZ": {"value" : "KZT"}, "LA": {"value" : "LAK"}, "LB": {"value" : "LBP"}, "LC": {"value" : "XCD"}, "LI": {"value" : "CHF"}, "LK": {"value" : "LKR"}, "LR": {"value" : "LRD"}, "LS": {"value" : "LSL"}, "LT": {"value" : "LTL"}, "LU": {"value" : "EUR"}, "LV": {"value" : "LVL"}, "LY": {"value" : "LYD"}, "MA": {"value" : "MAD"}, "MC": {"value" : "EUR"}, "MD": {"value" : ""}, "ME": {"value" : "EUR"}, "MG":
    {"value" : "MGA"}, "MH": {"value" : "USD"}, "MK": {"value" : "MKD"}, "ML": {"value" : "XOF"}, "MM": {"value" : "MMK"}, "MN": {"value" : "MNT"}, "MO": {"value" : "MOP"}, "MP": {"value" : "USD"}, "MQ": {"value" : "EUR"}, "MR": {"value" : "MRO"}, "MS": {"value" : "XCD"}, "MT": {"value" : "MTL"}, "MU": {"value" : "MUR"}, "MV": {"value" : "MVR"}, "MW": {"value" : "MWK"}, "MX": {"value" : "MXN"}, "MY": {"value" : "MYR"}, "MZ": {"value" : "MZM"}, "NA": {"value" : "NAD"}, "NC": {"value" : "XPF"}, "NE": {"value"
    : "XOF"}, "NF": {"value" : "AUD"}, "NG": {"value" : "NGN"}, "NI": {"value" : "NIO"}, "NL": {"value" : "EUR"}, "NO": {"value" : "NOK"}, "NP": {"value" : "NPR"}, "NR": {"value" : "AUD"}, "NU": {"value" : "NZD"}, "NZ": {"value" : "NZD"}, "OM": {"value" : "OMR"}, "220": {"value" : "Banjul"}, "PA": {"value" : "PAB"}, "PE": {"value" : "PEN"}, "PF": {"value" : ""}, "PG": {"value" : "PGK"}, "PH": {"value" : "PHP"}, "PK": {"value" : "PKR"}, "PL": {"value" : "PLN"}, "PM": {"value" : "EUR"}, "PN": {"value" : "NZD"}
    };
}
function jusi_WrappingStreamImpl() {
    jusi_SimpleStreamImpl.call(this);
    this.$sourceStream = null;
}
function jusi_WrappingStreamImpl_next($this, $consumer) {
    return jusi_StreamOverSpliterator_next($this.$sourceStream, jusi_MappingStreamImpl_wrap($this, $consumer));
}
function jusi_MappingStreamImpl() {
    jusi_WrappingStreamImpl.call(this);
    this.$mapper = null;
}
function jusi_MappingStreamImpl_wrap($this, $consumer) {
    var var$2;
    var$2 = new jusi_MappingStreamImpl$wrap$lambda$_1_0;
    var$2.$_014 = $this;
    var$2.$_13 = $consumer;
    return var$2;
}
function ju_Spliterator() {
}
function jusi_SpliteratorOverCollection() {
    var a = this; jl_Object.call(a);
    a.$collection = null;
    a.$iterator0 = null;
}
function jusi_SpliteratorOverCollection_tryAdvance($this, $action) {
    if ($this.$iterator0 === null)
        $this.$iterator0 = ju_AbstractList_iterator($this.$collection);
    if (!ju_AbstractList$1_hasNext($this.$iterator0))
        return 0;
    jusi_StreamOverSpliterator$AdapterAction_accept($action, ju_AbstractList$1_next($this.$iterator0));
    return 1;
}
function jl_AssertionError() {
    jl_Error.call(this);
}
function jt_DecimalFormatParser() {
    var a = this; jl_Object.call(a);
    a.$positivePrefix0 = null;
    a.$positiveSuffix0 = null;
    a.$negativePrefix0 = null;
    a.$negativeSuffix0 = null;
    a.$groupSize = 0;
    a.$minimumIntLength = 0;
    a.$intLength = 0;
    a.$minimumFracLength = 0;
    a.$fracLength = 0;
    a.$exponentLength = 0;
    a.$decimalSeparatorRequired = 0;
    a.$string = null;
    a.$index1 = 0;
    a.$multiplier0 = 0;
}
function jt_DecimalFormatParser_parse($this, $string) {
    var var$2, var$3;
    $this.$groupSize = 0;
    $this.$minimumFracLength = 0;
    $this.$fracLength = 0;
    $this.$exponentLength = 0;
    $this.$decimalSeparatorRequired = 0;
    $this.$multiplier0 = 1;
    $this.$string = $string;
    $this.$index1 = 0;
    $this.$positivePrefix0 = jt_DecimalFormatParser_parseText($this, 0, 0);
    if ($this.$index1 == jl_String_length($string)) {
        var$2 = new jl_IllegalArgumentException;
        jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(110)), $string)));
        $rt_throw(var$2);
    }
    jt_DecimalFormatParser_parseNumber($this, 1);
    $this.$negativePrefix0 = null;
    $this.$negativeSuffix0 = null;
    if ($this.$index1 < jl_String_length($string) && jl_String_charAt($string, $this.$index1) != 59)
        $this.$positiveSuffix0 = jt_DecimalFormatParser_parseText($this, 1, 0);
    if ($this.$index1 < jl_String_length($string)) {
        var$3 = $this.$index1;
        $this.$index1 = var$3 + 1 | 0;
        if (jl_String_charAt($string, var$3) != 59) {
            var$2 = new jl_IllegalArgumentException;
            jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(111)), $this.$index1), $rt_s(112)), $string)));
            $rt_throw(var$2);
        }
        $this.$negativePrefix0 = jt_DecimalFormatParser_parseText($this, 0, 1);
        jt_DecimalFormatParser_parseNumber($this, 0);
        $this.$negativeSuffix0 = jt_DecimalFormatParser_parseText($this, 1, 1);
    }
}
function jt_DecimalFormatParser_apply($this, $format) {
    var var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    a: {
        $format.$positivePrefix = $this.$positivePrefix0;
        $format.$positiveSuffix = $this.$positiveSuffix0;
        if ($this.$negativePrefix0 !== null)
            $format.$negativePrefix = $this.$negativePrefix0;
        else {
            $format.$negativePrefix = $rt_createArray(jt_DecimalFormat$FormatField, $this.$positivePrefix0.data.length + 1 | 0);
            var$2 = $this.$positivePrefix0;
            var$3 = $format.$negativePrefix;
            var$4 = $this.$positivePrefix0.data.length;
            if (var$2 !== null && var$3 !== null) {
                if (var$4 >= 0 && (0 + var$4 | 0) <= jlr_Array_getLength(var$2) && (1 + var$4 | 0) <= jlr_Array_getLength(var$3)) {
                    b: {
                        c: {
                            if (var$2 !== var$3) {
                                var$5 = jl_Class_getComponentType(jl_Object_getClass(var$2));
                                var$6 = jl_Class_getComponentType(jl_Object_getClass(var$3));
                                if (var$5 !== null && var$6 !== null) {
                                    if (var$5 === var$6)
                                        break c;
                                    if (!jl_Class_isPrimitive(var$5) && !jl_Class_isPrimitive(var$6)) {
                                        var$7 = var$2;
                                        var$8 = 0;
                                        var$9 = 0;
                                        while (true) {
                                            if (var$8 >= var$4) {
                                                jl_System_doArrayCopy(var$2, 0, var$3, 1, var$4);
                                                break b;
                                            }
                                            var$10 = var$7.data;
                                            var$11 = var$9 + 1 | 0;
                                            if (!jl_Class_isInstance(var$6, var$10[var$9]))
                                                break;
                                            var$8 = var$8 + 1 | 0;
                                            var$9 = var$11;
                                        }
                                        jl_System_doArrayCopy(var$2, 0, var$3, 1, var$8);
                                        $format = new jl_ArrayStoreException;
                                        jl_Exception__init_($format);
                                        $rt_throw($format);
                                    }
                                    if (jl_Class_isPrimitive(var$5) && jl_Class_isPrimitive(var$6))
                                        break c;
                                    $format = new jl_ArrayStoreException;
                                    jl_Exception__init_($format);
                                    $rt_throw($format);
                                }
                                $format = new jl_ArrayStoreException;
                                jl_Exception__init_($format);
                                $rt_throw($format);
                            }
                        }
                        jl_System_doArrayCopy(var$2, 0, var$3, 1, var$4);
                    }
                    $format.$negativePrefix.data[0] = new jt_DecimalFormat$MinusField;
                    break a;
                }
                $format = new jl_IndexOutOfBoundsException;
                jl_Exception__init_($format);
                $rt_throw($format);
            }
            var$5 = new jl_NullPointerException;
            jl_Throwable__init_(var$5, $rt_s(113));
            $rt_throw(var$5);
        }
    }
    $format.$negativeSuffix = $this.$negativeSuffix0 === null ? $this.$positiveSuffix0 : $this.$negativeSuffix0;
    $format.$groupingSize = $this.$groupSize;
    $format.$groupingUsed = $this.$groupSize <= 0 ? 0 : 1;
    jt_NumberFormat_setMinimumIntegerDigits($format, !$this.$decimalSeparatorRequired ? $this.$minimumIntLength : jl_Math_max(1, $this.$minimumIntLength));
    jt_NumberFormat_setMaximumIntegerDigits($format, $this.$intLength);
    jt_NumberFormat_setMinimumFractionDigits($format, $this.$minimumFracLength);
    jt_NumberFormat_setMaximumFractionDigits($format, $this.$fracLength);
    $format.$decimalSeparatorAlwaysShown = $this.$decimalSeparatorRequired;
    $format.$exponentDigits = $this.$exponentLength;
    $format.$multiplier = $this.$multiplier0;
}
function jt_DecimalFormatParser_parseText($this, $suffix, $end) {
    var $fields, $sb, $c, $next;
    $fields = ju_ArrayList__init_();
    $sb = jl_StringBuilder__init_();
    a: {
        b: {
            c: while (true) {
                if ($this.$index1 >= jl_String_length($this.$string))
                    break a;
                d: {
                    $c = jl_String_charAt($this.$string, $this.$index1);
                    switch ($c) {
                        case 35:
                        case 48:
                            if (!$suffix)
                                break a;
                            $fields = new jl_IllegalArgumentException;
                            jl_Throwable__init_($fields, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(114)), $this.$index1), $rt_s(112)), $this.$string)));
                            $rt_throw($fields);
                        case 37:
                            if (jl_StringBuilder_length($sb) > 0) {
                                ju_ArrayList_add($fields, jt_DecimalFormat$TextField__init_(jl_AbstractStringBuilder_toString($sb)));
                                jl_StringBuilder_setLength($sb, 0);
                            }
                            ju_ArrayList_add($fields, new jt_DecimalFormat$PercentField);
                            $this.$index1 = $this.$index1 + 1 | 0;
                            $this.$multiplier0 = 100;
                            break d;
                        case 39:
                            $this.$index1 = $this.$index1 + 1 | 0;
                            $next = jl_String_indexOf($this.$string, 39, $this.$index1);
                            if ($next < 0) {
                                $fields = new jl_IllegalArgumentException;
                                jl_Throwable__init_($fields, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(115)), $this.$index1), $rt_s(116)), $this.$string)));
                                $rt_throw($fields);
                            }
                            if ($next == $this.$index1)
                                jl_StringBuilder_append2($sb, 39);
                            else
                                jl_StringBuilder_append($sb, jl_String_substring($this.$string, $this.$index1, $next));
                            $this.$index1 = $next + 1 | 0;
                            break d;
                        case 45:
                            if (jl_StringBuilder_length($sb) > 0) {
                                ju_ArrayList_add($fields, jt_DecimalFormat$TextField__init_(jl_AbstractStringBuilder_toString($sb)));
                                jl_StringBuilder_setLength($sb, 0);
                            }
                            ju_ArrayList_add($fields, new jt_DecimalFormat$MinusField);
                            $this.$index1 = $this.$index1 + 1 | 0;
                            break d;
                        case 46:
                        case 69:
                            break c;
                        case 59:
                            break b;
                        case 164:
                            if (jl_StringBuilder_length($sb) > 0) {
                                ju_ArrayList_add($fields, jt_DecimalFormat$TextField__init_(jl_AbstractStringBuilder_toString($sb)));
                                jl_StringBuilder_setLength($sb, 0);
                            }
                            ju_ArrayList_add($fields, new jt_DecimalFormat$CurrencyField);
                            $this.$index1 = $this.$index1 + 1 | 0;
                            break d;
                        case 8240:
                            if (jl_StringBuilder_length($sb) > 0) {
                                ju_ArrayList_add($fields, jt_DecimalFormat$TextField__init_(jl_AbstractStringBuilder_toString($sb)));
                                jl_StringBuilder_setLength($sb, 0);
                            }
                            ju_ArrayList_add($fields, new jt_DecimalFormat$PerMillField);
                            $this.$index1 = $this.$index1 + 1 | 0;
                            $this.$multiplier0 = 1000;
                            break d;
                        default:
                    }
                    jl_StringBuilder_append2($sb, $c);
                    $this.$index1 = $this.$index1 + 1 | 0;
                }
            }
            $fields = new jl_IllegalArgumentException;
            jl_Throwable__init_($fields, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(114)), $this.$index1), $rt_s(112)), $this.$string)));
            $rt_throw($fields);
        }
        if ($end) {
            $fields = new jl_IllegalArgumentException;
            jl_Throwable__init_($fields, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(114)), $this.$index1), $rt_s(112)), $this.$string)));
            $rt_throw($fields);
        }
    }
    if (jl_StringBuilder_length($sb) > 0)
        ju_ArrayList_add($fields, jt_DecimalFormat$TextField__init_(jl_AbstractStringBuilder_toString($sb)));
    return ju_AbstractCollection_toArray($fields, $rt_createArray(jt_DecimalFormat$FormatField, $fields.$size));
}
function jt_DecimalFormatParser_parseNumber($this, $apply) {
    var var$2, var$3, var$4, var$5, var$6;
    jt_DecimalFormatParser_parseIntegerPart($this, $apply);
    if ($this.$index1 < jl_String_length($this.$string) && jl_String_charAt($this.$string, $this.$index1) == 46) {
        $this.$index1 = $this.$index1 + 1 | 0;
        var$2 = 0;
        var$3 = 0;
        var$4 = 0;
        a: {
            b: while (true) {
                if ($this.$index1 >= jl_String_length($this.$string))
                    break a;
                c: {
                    switch (jl_String_charAt($this.$string, $this.$index1)) {
                        case 35:
                            break;
                        case 44:
                            var$5 = new jl_IllegalArgumentException;
                            jl_Throwable__init_(var$5, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(117)), $this.$index1), $rt_s(112)), $this.$string)));
                            $rt_throw(var$5);
                        case 46:
                            var$6 = new jl_IllegalArgumentException;
                            jl_Throwable__init_(var$6, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(118)), $this.$index1), $rt_s(112)), $this.$string)));
                            $rt_throw(var$6);
                        case 48:
                            if (var$2)
                                break b;
                            var$3 = var$3 + 1 | 0;
                            var$4 = var$4 + 1 | 0;
                            break c;
                        default:
                            break a;
                    }
                    var$3 = var$3 + 1 | 0;
                    var$2 = 1;
                }
                $this.$index1 = $this.$index1 + 1 | 0;
            }
            var$6 = new jl_IllegalArgumentException;
            jl_Throwable__init_(var$6, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(119)), $this.$index1), $rt_s(112)), $this.$string)));
            $rt_throw(var$6);
        }
        if ($apply) {
            $this.$fracLength = var$3;
            $this.$minimumFracLength = var$4;
            $this.$decimalSeparatorRequired = var$3 ? 0 : 1;
        }
    }
    if ($this.$index1 < jl_String_length($this.$string) && jl_String_charAt($this.$string, $this.$index1) == 69) {
        $this.$index1 = $this.$index1 + 1 | 0;
        var$2 = 0;
        d: {
            e: while (true) {
                if ($this.$index1 >= jl_String_length($this.$string))
                    break d;
                switch (jl_String_charAt($this.$string, $this.$index1)) {
                    case 35:
                    case 44:
                    case 46:
                    case 69:
                        break e;
                    case 48:
                        break;
                    default:
                        break d;
                }
                var$2 = var$2 + 1 | 0;
                $this.$index1 = $this.$index1 + 1 | 0;
            }
            var$6 = new jl_IllegalArgumentException;
            jl_Throwable__init_(var$6, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(120)), $this.$index1), $rt_s(112)), $this.$string)));
            $rt_throw(var$6);
        }
        if (!var$2) {
            var$5 = new jl_IllegalArgumentException;
            jl_Throwable__init_(var$5, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(121)), $this.$index1), $rt_s(112)), $this.$string)));
            $rt_throw(var$5);
        }
        if ($apply)
            $this.$exponentLength = var$2;
    }
}
function jt_DecimalFormatParser_parseIntegerPart($this, $apply) {
    var $start, $lastGroup, $optionalDigits, $length, $minimumLength, var$7;
    $start = $this.$index1;
    $lastGroup = $this.$index1;
    $optionalDigits = 1;
    $length = 0;
    $minimumLength = 0;
    a: {
        b: while (true) {
            if ($this.$index1 >= jl_String_length($this.$string))
                break a;
            c: {
                d: {
                    switch (jl_String_charAt($this.$string, $this.$index1)) {
                        case 35:
                            if (!$optionalDigits)
                                break b;
                            $length = $length + 1 | 0;
                            break c;
                        case 44:
                            break d;
                        case 48:
                            break;
                        default:
                            break a;
                    }
                    $optionalDigits = 0;
                    $length = $length + 1 | 0;
                    $minimumLength = $minimumLength + 1 | 0;
                    break c;
                }
                if ($lastGroup == $this.$index1) {
                    var$7 = new jl_IllegalArgumentException;
                    jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(122)), $this.$index1), $rt_s(112)), $this.$string)));
                    $rt_throw(var$7);
                }
                if ($apply)
                    $this.$groupSize = $this.$index1 - $lastGroup | 0;
                $lastGroup = $this.$index1 + 1 | 0;
            }
            $this.$index1 = $this.$index1 + 1 | 0;
        }
        var$7 = new jl_IllegalArgumentException;
        jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(123)), $this.$index1), $rt_s(112)), $this.$string)));
        $rt_throw(var$7);
    }
    if (!$length) {
        var$7 = new jl_IllegalArgumentException;
        jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(124)), $this.$index1), $rt_s(112)), $this.$string)));
        $rt_throw(var$7);
    }
    if ($lastGroup == $this.$index1) {
        var$7 = new jl_IllegalArgumentException;
        jl_Throwable__init_(var$7, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(125)), $this.$index1), $rt_s(112)), $this.$string)));
        $rt_throw(var$7);
    }
    if ($apply && $lastGroup > $start)
        $this.$groupSize = $this.$index1 - $lastGroup | 0;
    if ($apply) {
        $this.$intLength = $length;
        $this.$minimumIntLength = $minimumLength;
    }
}
function otjc_JSString() {
    jl_Object.call(this);
}
function juf_Predicate() {
}
function jusi_ReducingConsumer() {
    var a = this; jl_Object.call(a);
    a.$accumulator = null;
    a.$result = null;
    a.$initialized = 0;
}
function jusi_ReducingConsumer_test($this, $t) {
    if (!$this.$initialized) {
        $this.$result = $t;
        $this.$initialized = 1;
    } else
        $this.$result = $this.$accumulator.$apply1($this.$result, $t);
    return 1;
}
function jt_DecimalFormat$MinusField() {
    jl_Object.call(this);
}
function jl_ArrayStoreException() {
    jl_RuntimeException.call(this);
}
function jt_DecimalFormat$PerMillField() {
    jl_Object.call(this);
}
function jt_DecimalFormat$CurrencyField() {
    jl_Object.call(this);
}
function jt_DecimalFormat$PercentField() {
    jl_Object.call(this);
}
function jusi_MappingStreamImpl$wrap$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_014 = null;
    a.$_13 = null;
}
function jusi_MappingStreamImpl$wrap$lambda$_1_0_test(var$0, var$1) {
    var var$2;
    var$2 = var$0.$_014;
    return jusi_ReducingConsumer_test(var$0.$_13, var$2.$mapper.$apply(var$1));
}
function jusi_StreamOverSpliterator$AdapterAction() {
    var a = this; jl_Object.call(a);
    a.$consumer = null;
    a.$wantsMore = 0;
}
function jusi_StreamOverSpliterator$AdapterAction_accept($this, $t) {
    $this.$wantsMore = jusi_MappingStreamImpl$wrap$lambda$_1_0_test($this.$consumer, $t);
}
$rt_packages([-1, "java", 0, "lang", -1, "org", 2, "vaadin", 3, "nikolay", 4, "client", 5, "vcommander", 6, "components"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, ["$hashCode0", function() { return jl_Object_hashCode(this); }, "$equals", function(var_1) { return jl_Object_equals(this, var_1); }],
ovnc_Client, 0, jl_Object, [], 0, 3, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0,
jl_Class, "Class", 1, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, ["$charAt", function(var_1) { return jl_String_charAt(this, var_1); }, "$length", function() { return jl_String_length(this); }, "$toString", function() { return jl_String_toString(this); }, "$equals", function(var_1) { return jl_String_equals(this, var_1); }, "$hashCode0", function() { return jl_String_hashCode(this); }],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$ensureCapacity", function(var_1) { jl_AbstractStringBuilder_ensureCapacity(this, var_1); }, "$toString", function() { return jl_AbstractStringBuilder_toString(this); }],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, ["$charAt", function(var_1) { return jl_StringBuilder_charAt(this, var_1); }, "$length", function() { return jl_StringBuilder_length(this); }, "$toString", function() { return jl_StringBuilder_toString(this); }, "$ensureCapacity", function(var_1) { jl_StringBuilder_ensureCapacity(this, var_1); }],
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, ["$toString", function() { return jl_Integer_toString0(this); }],
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
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, ["$iterator", function() { return ju_AbstractList_iterator(this); }],
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
ovncv_VCommander$VAPIBridge, 0, jl_Object, [ovncv_APIBridge], 0, 0, 0, ["$setItem", function(var_1, var_2, var_3) { ovncv_VCommander$VAPIBridge_setItem(this, var_1, var_2, var_3); }],
juf_Consumer, 0, jl_Object, [], 3, 3, 0, 0,
ovncv_VCommander$init$lambda$_3_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { ovncv_VCommander$init$lambda$_3_0_accept(this, var_1); }],
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
ovncvc_Component, 0, jl_Object, [], 1, 3, 0, ["$getWidth", function() { return ovncvc_Component_getWidth(this); }, "$getHeight", function() { return ovncvc_Component_getHeight(this); }],
ovncvc_Layout, 0, ovncvc_Component, [], 1, 3, 0, 0,
ovncvc_HorizontalLayout, 0, ovncvc_Layout, [], 0, 3, 0, ["$getWidth", function() { return ovncvc_HorizontalLayout_getWidth(this); }, "$getHeight", function() { return ovncvc_HorizontalLayout_getHeight(this); }, "$render", function(var_1) { ovncvc_HorizontalLayout_render(this, var_1); }],
ovncvc_Panel, 0, ovncvc_Component, [], 0, 3, 0, ["$render", function(var_1) { ovncvc_Panel_render(this, var_1); }],
ovncvc_Label, 0, ovncvc_Component, [], 0, 3, 0, ["$getWidth", function() { return ovncvc_Label_getWidth(this); }, "$getHeight", function() { return ovncvc_Label_getHeight(this); }, "$render", function(var_1) { ovncvc_Label_render(this, var_1); }],
ovncvc_Button, 0, ovncvc_Component, [], 0, 3, 0, ["$getWidth", function() { return ovncvc_Button_getWidth(this); }, "$getHeight", function() { return ovncvc_Button_getHeight(this); }, "$render", function(var_1) { ovncvc_Button_render(this, var_1); }],
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0,
ovncv_Main$exec$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0,
ovncvc_CheckBox, 0, ovncvc_Component, [], 0, 3, 0, ["$getWidth", function() { return ovncvc_CheckBox_getWidth(this); }, "$getHeight", function() { return ovncvc_CheckBox_getHeight(this); }, "$render", function(var_1) { ovncvc_CheckBox_render(this, var_1); }],
ovncvc_ValueChangeListener, 0, jl_Object, [], 3, 3, 0, 0,
ovncv_Main$exec$lambda$_1_1, 0, jl_Object, [ovncvc_ValueChangeListener], 0, 3, 0, ["$onChange", function(var_1) { ovncv_Main$exec$lambda$_1_1_onChange(this, var_1); }],
ovncvc_TextField, 0, ovncvc_Component, [], 0, 3, 0, ["$getHeight", function() { return ovncvc_TextField_getHeight(this); }, "$render", function(var_1) { ovncvc_TextField_render(this, var_1); }],
ovncv_Main$exec$lambda$_1_2, 0, jl_Object, [ovncvc_ValueChangeListener], 0, 3, 0, ["$onChange", function(var_1) { ovncv_Main$exec$lambda$_1_2_onChange(this, var_1); }],
ovncvc_VerticalLayout, 0, ovncvc_Layout, [], 0, 3, 0, ["$getWidth", function() { return ovncvc_VerticalLayout_getWidth(this); }, "$getHeight", function() { return ovncvc_VerticalLayout_getHeight(this); }, "$render", function(var_1) { ovncvc_VerticalLayout_render(this, var_1); }],
ovncvc_Component$Style, 0, jl_Object, [], 0, 3, 0, 0,
ovncv_Plugin, 0, jl_Object, [], 1, 3, 0, 0,
ovncvc_EventBus, "EventBus", 7, ovncv_Plugin, [], 0, 3, 0, 0,
ovncvc_EventBus$ComponentEvent, 0, jl_Object, [], 3, 3, 0, 0,
ovncvc_Button$_init_$lambda$_0_0, 0, jl_Object, [ovncvc_EventBus$ComponentEvent], 0, 3, 0, ["$call", function(var_1) { ovncvc_Button$_init_$lambda$_0_0_call(this, var_1); }]]);
$rt_metadata([ovncvc_CheckBox$_init_$lambda$_0_0, 0, jl_Object, [ovncvc_EventBus$ComponentEvent], 0, 3, 0, ["$call", function(var_1) { ovncvc_CheckBox$_init_$lambda$_0_0_call(this, var_1); }],
ovncvc_TextField$_init_$lambda$_0_0, 0, jl_Object, [ovncvc_EventBus$ComponentEvent], 0, 3, 0, ["$call", function(var_1) { ovncvc_TextField$_init_$lambda$_0_0_call(this, var_1); }],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0,
juf_Function, 0, jl_Object, [], 3, 3, 0, 0,
ovncvc_EventBus$_clinit_$lambda$_5_0, 0, jl_Object, [juf_Function], 0, 3, 0, ["$apply", function(var_1) { return ovncvc_EventBus$_clinit_$lambda$_5_0_apply(this, var_1); }],
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", function() { return ju_AbstractList$1_hasNext(this); }, "$next", function() { return ju_AbstractList$1_next(this); }],
ovncv_RenderRegistry, "RenderRegistry", 6, ovncv_Plugin, [], 0, 3, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0,
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, 0,
jl_ConsoleOutputStreamStderr, 0, ji_OutputStream, [], 0, 0, 0, 0,
ovncv_RenderRegistry$_clinit_$lambda$_5_0, 0, jl_Object, [juf_Function], 0, 3, 0, ["$apply", function(var_1) { return ovncv_RenderRegistry$_clinit_$lambda$_5_0_apply(this, var_1); }],
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0,
jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, 0,
jnc_IllegalCharsetNameException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0,
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0,
jn_Buffer, 0, jl_Object, [], 1, 3, 0, 0,
jl_Readable, 0, jl_Object, [], 3, 3, 0, 0,
jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, 0,
jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0,
jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, 0, 0,
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0,
jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, 0,
jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, 0,
jnc_CoderResult, 0, jl_Object, [], 0, 3, 0, 0,
jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, 0,
jn_ByteOrder, 0, jl_Object, [], 4, 3, 0, 0,
jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, 0,
jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0,
ji_IOException, 0, jl_Exception, [], 0, 3, 0, 0,
otjde_EventListener, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
ovncvc_EventBus$_init_$lambda$_0_0, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent$exported$0", function(var_1) { return ovncvc_EventBus$_init_$lambda$_0_0_handleEvent$exported$0(this, var_1); }],
ju_Timer, 0, jl_Object, [], 0, 3, 0, 0,
ju_TimerTask, 0, jl_Object, [jl_Runnable], 1, 3, 0, 0,
ovncv_RenderRegistry$1, 0, ju_TimerTask, [], 0, 0, 0, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0,
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0,
ovncvc_EventBus$lambda$new$1$lambda$_3_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { ovncvc_EventBus$lambda$new$1$lambda$_3_0_accept(this, var_1); }],
jl_IllegalStateException, 0, jl_Exception, [], 0, 3, 0, 0,
jnc_CoderMalfunctionError, 0, jl_Error, [], 0, 3, 0, 0]);
$rt_metadata([otjb_TimerHandler, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
ju_Timer$schedule$lambda$_3_0, 0, jl_Object, [otjb_TimerHandler], 0, 3, 0, ["$onTimer$exported$0", function() { return ju_Timer$schedule$lambda$_3_0_onTimer$exported$0(this); }],
ju_HashMap$1, 0, ju_AbstractSet, [], 0, 0, 0, ["$iterator", function() { return ju_HashMap$1_iterator(this); }],
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, ["$hasNext", function() { return ju_HashMap$AbstractMapIterator_hasNext(this); }],
ju_HashMap$KeyIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, ["$next", function() { return ju_HashMap$KeyIterator_next(this); }],
jl_UnsupportedOperationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0,
ju_Timer$lambda$schedule$1$lambda$_6_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0,
jn_ReadOnlyBufferException, 0, jl_UnsupportedOperationException, [], 0, 3, 0, 0,
jn_BufferOverflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jn_BufferUnderflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Thread$start$lambda$_4_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Thread$start$lambda$_4_0_run(this); }],
jl_Boolean, 0, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, 0,
ju_NoSuchElementException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_IllegalMonitorStateException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0,
otp_PlatformQueue, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
jl_Object$monitorExit$lambda$_8_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$monitorExit$lambda$_8_0_run(this); }],
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0,
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, ["$complete", function(var_1) { otpp_AsyncCallbackWrapper_complete(this, var_1); }, "$error", function(var_1) { otpp_AsyncCallbackWrapper_error(this, var_1); }],
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0,
ovncvc_HorizontalLayout$HLAPIWrapper, 0, jl_Object, [ovncv_APIBridge], 0, 0, 0, ["$setItem", function(var_1, var_2, var_3) { ovncvc_HorizontalLayout$HLAPIWrapper_setItem(this, var_1, var_2, var_3); }],
ovncvc_Panel$PAPIWrapper, 0, jl_Object, [ovncv_APIBridge], 0, 0, 0, ["$setItem", function(var_1, var_2, var_3) { ovncvc_Panel$PAPIWrapper_setItem(this, var_1, var_2, var_3); }],
ovncvc_VerticalLayout$VLAPIWrapper, 0, jl_Object, [ovncv_APIBridge], 0, 0, 0, ["$setItem", function(var_1, var_2, var_3) { ovncvc_VerticalLayout$VLAPIWrapper_setItem(this, var_1, var_2, var_3); }],
ju_Formatter, 0, jl_Object, [ji_Closeable, ji_Flushable], 4, 3, 0, 0,
ju_Locale, 0, jl_Object, [jl_Cloneable, ji_Serializable], 4, 3, 0, 0,
otciu_CLDRHelper, 0, jl_Object, [], 4, 3, 0, 0,
ovncv_Palete16, 0, jl_Object, [], 0, 3, 0, 0,
ovncvc_HorizontalLayout$getWidth$lambda$_1_0, 0, jl_Object, [juf_Function], 0, 3, 0, ["$apply", function(var_1) { return ovncvc_HorizontalLayout$getWidth$lambda$_1_0_apply(this, var_1); }],
juf_BiFunction, 0, jl_Object, [], 3, 3, 0, 0,
juf_BinaryOperator, 0, jl_Object, [juf_BiFunction], 3, 3, 0, 0,
ovncvc_HorizontalLayout$getWidth$lambda$_1_1, 0, jl_Object, [juf_BinaryOperator], 0, 3, 0, ["$apply1", function(var_1, var_2) { return ovncvc_HorizontalLayout$getWidth$lambda$_1_1_apply(this, var_1, var_2); }],
ovncvc_VerticalLayout$getWidth$lambda$_1_0, 0, jl_Object, [juf_Function], 0, 3, 0, ["$apply", function(var_1) { return ovncvc_VerticalLayout$getWidth$lambda$_1_0_apply(this, var_1); }],
ovncvc_VerticalLayout$getWidth$lambda$_1_1, 0, jl_Object, [juf_BinaryOperator], 0, 3, 0, ["$apply1", function(var_1, var_2) { return ovncvc_VerticalLayout$getWidth$lambda$_1_1_apply(this, var_1, var_2); }],
ovncvc_HorizontalLayout$getHeight$lambda$_2_0, 0, jl_Object, [juf_Function], 0, 3, 0, ["$apply", function(var_1) { return ovncvc_HorizontalLayout$getHeight$lambda$_2_0_apply(this, var_1); }],
ovncvc_HorizontalLayout$getHeight$lambda$_2_1, 0, jl_Object, [juf_BinaryOperator], 0, 3, 0, ["$apply1", function(var_1, var_2) { return ovncvc_HorizontalLayout$getHeight$lambda$_2_1_apply(this, var_1, var_2); }],
ovncvc_VerticalLayout$getHeight$lambda$_2_0, 0, jl_Object, [juf_Function], 0, 3, 0, ["$apply", function(var_1) { return ovncvc_VerticalLayout$getHeight$lambda$_2_0_apply(this, var_1); }],
ovncvc_VerticalLayout$getHeight$lambda$_2_1, 0, jl_Object, [juf_BinaryOperator], 0, 3, 0, ["$apply1", function(var_1, var_2) { return ovncvc_VerticalLayout$getHeight$lambda$_2_1_apply(this, var_1, var_2); }],
ju_Formatter$FormatWriter, 0, jl_Object, [], 0, 0, 0, 0,
ju_FormatterClosedException, 0, jl_IllegalStateException, [], 0, 3, 0, 0,
jus_BaseStream, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0,
jus_Stream, 0, jl_Object, [jus_BaseStream], 3, 3, 0, 0,
jusi_SimpleStreamImpl, 0, jl_Object, [jus_Stream], 1, 3, 0, 0,
jusi_StreamOverSpliterator, 0, jusi_SimpleStreamImpl, [], 0, 3, 0, 0,
ju_IllegalFormatException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0,
ju_UnknownFormatConversionException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0,
ju_DuplicateFormatFlagsException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0,
ju_IllegalFormatPrecisionException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0]);
$rt_metadata([jl_Byte, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0,
jl_Short, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0,
ju_IllegalFormatCodePointException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0,
ju_IllegalFormatConversionException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0,
jt_DecimalFormatSymbols, 0, jl_Object, [jl_Cloneable], 0, 3, 0, 0,
jt_Format, 0, jl_Object, [ji_Serializable, jl_Cloneable], 1, 3, 0, 0,
jt_NumberFormat, 0, jt_Format, [], 1, 3, 0, 0,
ju_Formattable, 0, jl_Object, [], 3, 3, 0, 0,
ju_FormatFlagsConversionMismatchException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0,
ju_IllegalFormatFlagsException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0,
ju_MissingFormatWidthException, 0, ju_IllegalFormatException, [], 0, 3, 0, 0,
jt_DecimalFormat, 0, jt_NumberFormat, [], 0, 3, 0, 0,
jt_DecimalFormat$FormatField, 0, jl_Object, [], 3, 0, 0, 0,
jt_DecimalFormat$TextField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0,
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, 0,
jm_RoundingMode, 0, jl_Enum, [], 12, 3, 0, 0,
ju_Currency, 0, jl_Object, [ji_Serializable], 4, 3, 0, 0,
otcic_CurrencyHelper, 0, jl_Object, [], 4, 3, 0, 0,
jusi_WrappingStreamImpl, 0, jusi_SimpleStreamImpl, [], 1, 3, 0, 0,
jusi_MappingStreamImpl, 0, jusi_WrappingStreamImpl, [], 0, 3, 0, 0,
ju_Spliterator, 0, jl_Object, [], 3, 3, 0, 0,
jusi_SpliteratorOverCollection, 0, jl_Object, [ju_Spliterator], 0, 3, 0, 0,
jl_AssertionError, 0, jl_Error, [], 0, 3, 0, 0,
jt_DecimalFormatParser, 0, jl_Object, [], 0, 0, 0, 0,
otjc_JSString, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
juf_Predicate, 0, jl_Object, [], 3, 3, 0, 0,
jusi_ReducingConsumer, 0, jl_Object, [juf_Predicate], 0, 0, 0, 0,
jt_DecimalFormat$MinusField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0,
jl_ArrayStoreException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jt_DecimalFormat$PerMillField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0,
jt_DecimalFormat$CurrencyField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0,
jt_DecimalFormat$PercentField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0,
jusi_MappingStreamImpl$wrap$lambda$_1_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, 0,
jusi_StreamOverSpliterator$AdapterAction, 0, jl_Object, [juf_Consumer], 0, 0, 0, 0]);
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
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "@", "null", "Index out of bounds", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for int type: ", "String is null or empty", "Illegal radix: ", "0", "ch", "Register plugin: ", "Hello, World!", "Label2", "Press enter", "", "Check box", "Text Field test. This value should be very long!", "Pressed button", "Unchecked", "Checked", "CursorPos: %d, valueSize: %d, renderValuePos: %d",
"Enter", "ArrowRight", "ArrowLeft", "Backspace", "Delete", "keydown", "UTF-8", "Replacement preconditions do not hold", "New position ", " is outside of range [0;", "]", "The last char in dst ", " is outside of array of size ", "Length ", " must be non-negative", "Offset ", ")", "The last byte in src ", "IGNORE", "REPLACE", "REPORT", "Action must be non-null", "BIG_ENDIAN", "LITTLE_ENDIAN", "main", "en", "CA", "fr", "zh", "CN", "FR", "de", "DE", "it", "IT", "ja", "JP", "ko", "KR", "TW", "GB", "US", "-", "#000000",
"#0000c9", "#c90000", "#c900c9", "#00c900", "#00c9c9", "#c9c900", "#c9c9c9", "#0000ff", "#ff0000", "#ff00ff", "#00ff00", "#00ffff", "#ffff00", "#ffffff", "false", "true", "Can\'t convert code point ", " to char", "0x", "+ ", "0-", "Missing format with for specifier ", "--#+ 0,(<", "Illegal format flags ", " for conversion ", "Duplicate format flags: ", "next() should have returned true", "Unknown format conversion: ", "Illegal precision: ", "Can\'t format argument of ", " using ", " conversion", "This exception should not been thrown",
"Illegal format flags: ", "UP", "DOWN", "CEILING", "FLOOR", "HALF_UP", "HALF_DOWN", "HALF_EVEN", "UNNECESSARY", "Currency not found: ", "Positive number pattern not found in ", "Expected \';\' at ", " in ", "Either src or dest is null", "Prefix contains special character at ", "Quote opened at ", " was not closed in ", "Group separator found at fractional part at ", "Unexpected second decimal separator at ", "Unexpected \'0\' at optional digit part at ", "Unexpected char at exponent at ", "Pattern does not specify exponent digits at ",
"Two group separators at ", "Unexpected \'#\' at non-optional digit part at ", "Pattern does not specify integer digits at ", "Group separator at the end of number at "]);
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
    c = ovncvc_EventBus$_init_$lambda$_0_0.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = ju_Timer$schedule$lambda$_3_0.prototype;
    c.onTimer = c.$onTimer$exported$0;
})();
})();

//# sourceMappingURL=classes.js.map