package org.vaadin.nikolay.client;

import org.vaadin.nikolay.client.vcommander.VCommander;

public class Client {

    public static void main(String[] args) {
        CustomElement.registerCustomComponent("v-commander", VCommander::new);
    }
}
