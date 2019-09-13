package org.vaadin.nikolay.client.vcommander;

import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.Panel;
import org.vaadin.nikolay.client.vcommander.components.TextItem;
import org.vaadin.nikolay.client.vcommander.components.VerticalLayout;

public class Main extends Application {

    public Main(APIBridge apiBridge) {
        super(apiBridge);
    }

    @Override
    public void exec() {
        Panel panel = new Panel();
        panel.setTitle("Demo");
        panel.getStyle().setBgcolor(1);
        panel.setWidth(18);
        panel.setHeight(10);

        VerticalLayout layout = new VerticalLayout();
        ComboBox<TextItem> combobox = new ComboBox<>();
        combobox.addItem(new TextItem("Item 1"));
        combobox.addItem(new TextItem("Item 2"));
        combobox.addItem(new TextItem("Item 3"));

        Label label1 = new Label("Label 1");
        label1.getStyle().setColor(2);
        Label label2 = new Label("Label 2");
        label2.getStyle().setColor(3);
        label2.setWidth(16);
        label2.getStyle().setTextAlign(Component.Style.TextAlign.CENTER);
        Label label3 = new Label("Label 3");
        label3.getStyle().setColor(4);
        label3.setWidth(16);
        label3.getStyle().setTextAlign(Component.Style.TextAlign.RIGHT);

        layout.add(combobox);
        layout.add(label1);
        layout.add(label2);
        layout.add(label3);

        panel.setContent(layout);

        setContent(panel);
    }
}
