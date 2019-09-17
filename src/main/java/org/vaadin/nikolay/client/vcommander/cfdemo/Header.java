package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.Palette16;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.Panel;

class Header extends Panel {
    Header(int width) {
        this.getStyle().setBgcolor(Palette16.DARK_BLUE);
        this.setWidth(width);
        this.setHeight(3);

        Label headerLabel = new Label();
        headerLabel.setValue("MAINTENIMIENTO DE COCHES");
        headerLabel.setWidth(width - 2);
        headerLabel.getStyle().setTextAlign(Component.Style.TextAlign.CENTER);
        this.setContent(headerLabel);
    }
}
