package org.vaadin.nikolay.client.vcommander;

import org.vaadin.nikolay.client.vcommander.components.Button;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;

public class Main extends Application {

    public Main(APIBridge apiBridge) {
        super(apiBridge);
    }

    @Override
    public void exec() {
        Label label1 = new Label();
        label1.setValue("Hello, World!");

        Label label2 = new Label();
        label2.setValue("Label2");
        label2.getStyle().setColor(1);
        label2.getStyle().setBgcolor(4);

        Button button = new Button();
        button.setCaption("Press enter");
        button.setFocused(true);
        button.setClickListener(() -> {
            label2.setValue("Pressed button");
            label2.getStyle().setBgcolor(1);
            label2.getStyle().setColor(4);
        });

        HorizontalLayout layout = new HorizontalLayout();
        layout.add(label1);
        layout.add(label2);
        layout.add(button);

        setContent(layout);
    }
}
