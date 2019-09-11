package org.vaadin.nikolay.client.vcommander;

import org.teavm.jso.dom.events.KeyboardEvent;
import org.vaadin.nikolay.client.vcommander.components.Button;
import org.vaadin.nikolay.client.vcommander.components.CheckBox;
import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.ListBox;
import org.vaadin.nikolay.client.vcommander.components.Panel;
import org.vaadin.nikolay.client.vcommander.components.TextField;
import org.vaadin.nikolay.client.vcommander.components.TextItem;
import org.vaadin.nikolay.client.vcommander.components.VerticalLayout;

import java.util.ArrayList;
import java.util.List;

public class Main extends Application {

    // This should be done in some automatic way
    private List<Component> focusableComponents = new ArrayList<>();
    private int focusId = 0;

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
        rightPanel.getStyle().setBgcolor(0);
        rightPanel.setWidth(middleX);
        rightPanel.setHeight(height - 2);

        content.add(leftPanel);
        content.add(rightPanel);

        Label label1 = new Label();
        label1.setValue("Hello, World!");
        label1.setWidth(15);

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
        focusableComponents.add(button);

        CheckBox checkBox = new CheckBox();
        checkBox.setCaption("Check box");
        checkBox.setValueChangeListener(value -> label1.setValue(value ? "Checked" : "Unchecked"));
        focusableComponents.add(checkBox);

        TextField textField = new TextField();
        textField.setValue("Text Field test. This value should be very long!");
        textField.setWidth(20);
        focusableComponents.add(textField);

        ListBox<TextItem> listBox = new ListBox<>();
        listBox.addItem(new TextItem("Line 1"));
        listBox.addItem(new TextItem("Line 22"));
        listBox.addItem(new TextItem("Line 333"));
        listBox.addItem(new TextItem("Line 4444"));
        listBox.addItem(new TextItem("Line 55555"));
        listBox.addItem(new TextItem("Line 666666"));
        listBox.addItem(new TextItem("Line 7777777"));
        listBox.addItem(new TextItem("Line 88888888"));
        listBox.addItem(new TextItem("Line 999999999"));
        listBox.addItem(new TextItem("Line 0000000000"));
        listBox.setWidth(13);
        listBox.setHeight(8);
        focusableComponents.add(listBox);

        Panel listBoxPanel = new Panel();
        listBoxPanel.setContent(listBox);
        listBoxPanel.setWidth(listBox.getWidth() + 2);
        listBoxPanel.setHeight(listBox.getHeight() + 2);

        TextItem currentItem = new TextItem("Item 2");
        ComboBox<TextItem> comboBox = new ComboBox<>();
        comboBox.addItem(new TextItem("Item 1"));
        comboBox.addItem(currentItem);
        comboBox.addItem(new TextItem("Item 3"));
        comboBox.addItem(new TextItem("Item 4"));
        comboBox.addItem(new TextItem("Item 5"));
        comboBox.addItem(new TextItem("Item 6"));
        comboBox.addItem(new TextItem("Item 7"));
        comboBox.addItem(new TextItem("Item 8"));
        comboBox.addItem(new TextItem("Item 9"));
        comboBox.addItem(new TextItem("Item 10"));
        comboBox.setValue(currentItem);
        focusableComponents.add(comboBox);

        listBox.setValueChangeListener(value -> comboBox.setPlaceHolder(value.getCaption()));
        textField.setValueChangeListener(value -> {
            TextItem item = new TextItem(value);
            listBox.addItem(item);
            listBox.setSelectedItem(item);
        });

        VerticalLayout leftContent = new VerticalLayout();
        leftContent.setSpacing(true);

        HorizontalLayout layout1 = new HorizontalLayout();
        layout1.setSpacing(true);
        layout1.add(label1);
        layout1.add(label2);
        layout1.add(button);

        HorizontalLayout layout2 = new HorizontalLayout();
        layout2.setSpacing(true);
        layout2.add(checkBox);
        layout2.add(textField);

        HorizontalLayout layout3 = new HorizontalLayout();
        layout3.setSpacing(true);
        layout3.add(listBoxPanel);
        layout3.add(comboBox);

        leftContent.add(layout1);
        leftContent.add(layout2);
        leftContent.add(layout3);

        leftPanel.setContent(leftContent);

        setContent(content);

        // Should be implemented in some navigation plugin
        getApi().addEventListener("keydown", e -> {
            KeyboardEvent event = (KeyboardEvent) e;

            if(focusableComponents.isEmpty()) {
                return;
            }

            Component currentComponent = focusableComponents.get(focusId);

            if(currentComponent.isPreventDefault()) {
                return;
            }

            if("ArrowRight".equals(event.getKey()) || "Tab".equals(event.getKey())) {
                if(currentComponent.isFocused()) {
                    currentComponent.setFocused(false);
                    focusId++;

                    if(focusId >= focusableComponents.size()) {
                        focusId = 0;
                    }

                    focusableComponents.get(focusId).setFocused(true);
                } else {
                    currentComponent.setFocused(true);
                }
            } else if("ArrowLeft".equals(event.getKey())) {
                if(currentComponent.isFocused()) {
                    currentComponent.setFocused(false);
                    focusId--;

                    if(focusId < 0) {
                        focusId = focusableComponents.size() - 1;
                    }

                    focusableComponents.get(focusId).setFocused(true);
                } else {
                    currentComponent.setFocused(true);
                }
            }
        });
    }
}
