package org.vaadin.nikolay.client;

import org.teavm.platform.Platform;

import java.util.function.Supplier;

public abstract class CustomElement {
    private CustomElementJSObject jsInstance;

    public static <T extends CustomElement> void registerCustomComponent(String tag, Supplier<T> constructor) {
        CustomElementJSObject.registerElement(tag, (jsInstance) -> {
            CustomElement instance = constructor.get();
            instance.setElement(jsInstance);

            return Platform.getPlatformObject(instance);
        });
    }

    public CustomElementJSObject getElement() {
        return jsInstance;
    }

    private void setElement(CustomElementJSObject jsInstance) {
        this.jsInstance = jsInstance;
        init();
    }

    protected abstract void init();
}
