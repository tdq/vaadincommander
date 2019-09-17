package org.vaadin.nikolay.client.vcommander.bugrap;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Application;
import org.vaadin.nikolay.client.vcommander.Palette16;
import org.vaadin.nikolay.client.vcommander.components.Button;
import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.Panel;
import org.vaadin.nikolay.client.vcommander.components.TextItem;
import org.vaadin.nikolay.client.vcommander.components.VerticalLayout;

public class Bugrap extends Application {

    /**
     * @param api
     */
    public Bugrap(APIBridge api) {
        super(api);
    }

    @Override
    public void exec() {
        Panel panel = new Panel();
        panel.setWidth(getApi().getBufferWidth());
        panel.setHeight(getApi().getBufferHeight());
        panel.getStyle().setBgcolor(Palette16.GRAPHITE);
        panel.getStyle().setColor(Palette16.SNOW);

        VerticalLayout content = new VerticalLayout();

        Label label1 = new Label("Test");
        label1.getStyle().setColor(Palette16.SNOW);

        Label label2 = new Label("Test");
        label2.getStyle().setColor(Palette16.WATER);

        Label label3 = new Label("Test");
        label3.getStyle().setColor(Palette16.RASPBERRY);

        Label label4 = new Label("Test");
        label4.getStyle().setColor(Palette16.LAVA);

        Label label5 = new Label("Test");
        label5.getStyle().setColor(Palette16.SAND);

        content.add(prepareHeader());
        content.add(label1);
        content.add(label2);
        content.add(label3);
        content.add(label4);
        content.add(label5);

        panel.setContent(content);

        setContent(panel);
    }

    private Component prepareHeader() {
        HorizontalLayout layout = new HorizontalLayout();

        ComboBox<TextItem> projectSelect = new ComboBox<>();
        projectSelect.setWidth(50);

        Button accountBtn = new Button("Marc Manager");

        Button logoutBtn = new Button("Logout");

        layout.add(projectSelect);
        layout.add(accountBtn);
        layout.add(logoutBtn);

        return layout;
    }
}
