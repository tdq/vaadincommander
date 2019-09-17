package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.teavm.flavour.json.JSON;
import org.vaadin.nikolay.client.vcommander.Palette16;
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

class Content extends Panel {

    private CFDemoModel model = new CFDemoModel();

    Content(int width, int height) {
        this.getStyle().setBgcolor(Palette16.DARK_BLUE);
        this.setWidth(width);
        this.setHeight(height);

        VerticalLayout contentLayout = new VerticalLayout();

        contentLayout.add(new NumeroLine(model));
        contentLayout.add(new TipoLine(model));
        contentLayout.add(new MatriculaLine(model));
        contentLayout.add(new ZonaLine(model));
        contentLayout.add(new ClasificadorLine(model));
        contentLayout.add(new FechaLine(model));
        contentLayout.add(new NumeroTarjetaLine(model));
        contentLayout.add(new CaracteristicasLine(model));
        contentLayout.add(demoLine());

        this.setContent(contentLayout);
    }

    private Component demoLine() {
        VerticalLayout content = new VerticalLayout();
        content.setSpacing(true);

        Label label1 = new Label();
        label1.setValue("Hello, World!");
        label1.setWidth(15);

        Label label2 = new Label();
        label2.setValue("Label2");
        label2.getStyle().setColor(Palette16.DARK_BLUE);
        label2.getStyle().setBgcolor(Palette16.DARK_GREEN);

        Button button = new Button();
        button.setCaption("Press enter");
        button.setClickListener(() -> {
            label2.setValue("Pressed button");
            label2.getStyle().setBgcolor(Palette16.DARK_BLUE);
            label2.getStyle().setColor(Palette16.DARK_GREEN);
        });

        CheckBox checkBox = new CheckBox();
        checkBox.setCaption("Check box");
        checkBox.setValueChangeListener(value -> label1.setValue(value ? "Checked" : "Unchecked"));

        TextField textField = new TextField();
        textField.setValue("Text Field test. This value should be very long!");
        textField.setWidth(20);

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

        listBox.setValueChangeListener(value -> comboBox.setPlaceHolder(value.getCaption()));
        textField.setValueChangeListener(value -> {
            TextItem item = new TextItem(value);
            listBox.addItem(item);
            listBox.setSelectedItem(item);
        });

        Button commit = new Button("Commit");
        commit.setClickListener(() -> System.err.println("CFDemo model: " + JSON.serialize(model).stringify()));

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

        HorizontalLayout footer = new HorizontalLayout();
        footer.add(commit);

        content.add(layout1);
        content.add(layout2);
        content.add(layout3);
        content.add(footer);

        return content;
    }
}
