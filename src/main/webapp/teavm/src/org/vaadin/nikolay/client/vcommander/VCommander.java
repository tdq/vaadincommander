package org.vaadin.nikolay.client.vcommander;

import org.teavm.jso.JSBody;
import org.teavm.jso.dom.html.HTMLElement;
import org.vaadin.nikolay.client.CustomElement;

public class VCommander extends CustomElement {

    /*
    static {
        registerElement();
    }

     */


    @Override
    protected void init() {
        this.getElement().setInnerHTML("VCommnader web component test");
    }


}
