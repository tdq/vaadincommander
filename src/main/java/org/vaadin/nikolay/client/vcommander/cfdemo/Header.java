package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.Panel;

class Header extends Panel {
    Header(int width) {
        this.getStyle().setBgcolor(1);
        this.setWidth(width);
        this.setHeight(3);

        Label headerLabel = new Label();
        headerLabel.setValue("MAINTENIMIENTO DE COCHES");
        headerLabel.setWidth(width - 2);
        headerLabel.getStyle().setTextAlign(Component.Style.TextAlign.CENTER);
        this.setContent(headerLabel);
    }
}
