package org.vaadin.nikolay.client.vcommander;

import org.vaadin.nikolay.client.vcommander.components.Label;

public class Main extends Application {

    public Main(APIBridge apiBridge) {
        super(apiBridge);
    }

    @Override
    public void exec() {
        Label label = new Label();
        label.setValue("Hello, World!");

        setContent(label);
    }
}
