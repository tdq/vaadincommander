package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.TextField;

class CaracteristicasLine extends HorizontalLayout {

    CaracteristicasLine(CFDemoModel model) {
        this.setSpacing(true);

        Label caracteristicas = new Label("CARACTERISTICAS.");
        caracteristicas.setWidth(18);
        caracteristicas.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        TextField value1 = new TextField();
        value1.setValue("ESC");
        value1.setWidth(3);
        value1.setValueChangeListener(model::setValue1);

        TextField value2 = new TextField();
        value2.setWidth(3);
        value2.setValueChangeListener(model::setValue2);

        TextField value3 = new TextField();
        value3.setWidth(3);
        value3.setValueChangeListener(model::setValue3);

        TextField value4 = new TextField();
        value4.setWidth(3);
        value4.setValueChangeListener(model::setValue4);

        TextField value5 = new TextField();
        value5.setWidth(3);
        value5.setValueChangeListener(model::setValue5);

        this.add(caracteristicas);
        this.add(value1);
        this.add(value2);
        this.add(value3);
        this.add(value4);
        this.add(value5);
    }
}
