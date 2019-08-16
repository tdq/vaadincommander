package org.vaadin.nikolay.client;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.html.HTMLElement;

public abstract class CustomElementJSObject implements JSObject, HTMLElement {
    @JSBody(params = {"_tag", "_connect"},
            script = "window.registerCustomElement(_tag, _connect);\n")
    public static native void registerElement(String _tag, CustomElementCreator _connect);

    @JSFunctor
    public interface CustomElementCreator extends JSObject{
        JSObject create(CustomElementJSObject customElementInstance);
    }
}
