package org.vaadin.nikolay.client.vcommander;

import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;

public class Main extends Application {

    public Main(APIBridge apiBridge) {
        super(apiBridge);
    }

    @Override
    public void exec() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);

        Label abc = new Label("ABC");
        abc.getStyle().setBgcolor(Palette16.DARK_GREEN);

        Label def = new Label("DEF");
        def.getStyle().setBgcolor(Palette16.DARK_BLUE);

        layout.setExspandRatio(abc, 100f);

        layout.add(abc);
        layout.add(def);

        setContent(layout);

        /*
        Panel panel = new Panel();
        panel.setTitle("Demo");
        panel.getStyle().setBgcolor(Palette16.DARK_BLUE);
        panel.setWidth(18);
        panel.setHeight(10);

        VerticalLayout layout = new VerticalLayout();
        ComboBox<TextItem> combobox = new ComboBox<>();
        combobox.addItem(new TextItem("Item 1"));
        combobox.addItem(new TextItem("Item 2"));
        combobox.addItem(new TextItem("Item 3"));
        combobox.setValue(new TextItem("Item 1"));

        Label label1 = new Label("Label 1");
        label1.getStyle().setColor(Palette16.DARK_RED);
        Label label2 = new Label("Label 2");
        label2.getStyle().setColor(Palette16.DARK_PINK);
        label2.setWidth(16);
        label2.getStyle().setTextAlign(Component.Style.TextAlign.CENTER);
        Label label3 = new Label("Label 3");
        label3.getStyle().setColor(Palette16.DARK_GREEN);
        label3.setWidth(16);
        label3.getStyle().setTextAlign(Component.Style.TextAlign.RIGHT);

        layout.add(combobox);
        layout.add(label1);
        layout.add(label2);
        layout.add(label3);

        VerticalLayout footerLayout = new VerticalLayout();
        HorizontalLayout footer = new HorizontalLayout();
        footer.setSpacing(true);

        Button clickMe = new Button("Click me");

        Label justLabel = new Label("abc");

        clickMe.setClickListener(() -> justLabel.setValue("123"));

        footer.add(clickMe);
        footer.add(justLabel);
        footerLayout.add(footer);

        layout.add(footerLayout);
        panel.setContent(layout);

        setContent(panel);
         */
    }
}
