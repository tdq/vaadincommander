package org.vaadin.nikolay.client.vcommander;

import org.vaadin.nikolay.client.vcommander.components.Button;
import org.vaadin.nikolay.client.vcommander.components.CheckBox;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.Panel;
import org.vaadin.nikolay.client.vcommander.components.TextField;
import org.vaadin.nikolay.client.vcommander.components.VerticalLayout;

public class Main extends Application {

    public Main(APIBridge apiBridge) {
        super(apiBridge);
    }

    @Override
    public void exec() {
        int width = getApi().getBufferWidth();
        int height = getApi().getBufferHeight();
        int middleX = width / 2;
        int middleY = height / 2;

        HorizontalLayout content = new HorizontalLayout();

        Panel leftPanel = new Panel();
        leftPanel.getStyle().setBgcolor(1);
        leftPanel.setWidth(middleX);
        leftPanel.setHeight(height - 2);

        Panel rightPanel = new Panel();
        rightPanel.setWidth(middleX);
        rightPanel.setHeight(height - 2);

        content.add(leftPanel);
        content.add(rightPanel);

        Label label1 = new Label();
        label1.setValue("Hello, World!");

        Label label2 = new Label();
        label2.setValue("Label2");
        label2.getStyle().setColor(1);
        label2.getStyle().setBgcolor(4);

        Button button = new Button();
        button.setCaption("Press enter");
        button.setClickListener(() -> {
            label2.setValue("Pressed button");
            label2.getStyle().setBgcolor(1);
            label2.getStyle().setColor(4);
        });

        CheckBox checkBox = new CheckBox();
        checkBox.setCaption("Check box");
        checkBox.setValueChangeListener(value -> label1.setValue(value ? "Checked" : "Unchecked"));

        TextField textField = new TextField();
        textField.setValue("Text Field test. This value should be very long!");
        textField.setWidth(20);
        textField.setFocused(true);
        textField.setValueChangeListener(label1::setValue);

        VerticalLayout leftContent = new VerticalLayout();

        HorizontalLayout layout1 = new HorizontalLayout();
        layout1.add(label1);
        layout1.add(label2);
        layout1.add(button);

        HorizontalLayout layout2 = new HorizontalLayout();
        layout2.add(checkBox);
        layout2.add(textField);

        leftContent.add(layout1);
        leftContent.add(layout2);

        leftPanel.setContent(leftContent);

        setContent(content);
    }
}
