package org.vaadin.nikolay.client.vcommander;

import org.vaadin.nikolay.client.CustomElement;

//@WebComponent("v-commander")
public class VCommander extends CustomElement {

    @Override
    protected void init() {
        this.getElement().setInnerHTML("VCommnader web component test");

        System.err.println("Test: " + this.getElement().getAttribute("width") + ", " + this.getElement().getAttribute("height"));
    }
}
