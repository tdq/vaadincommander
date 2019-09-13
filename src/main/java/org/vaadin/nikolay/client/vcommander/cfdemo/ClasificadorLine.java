package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.TextField;

import java.util.Date;

class ClasificadorLine extends HorizontalLayout {

    ClasificadorLine(CFDemoModel model) {
        this.setSpacing(true);

        Label clasificador = new Label("CLASIFICADOR....");
        clasificador.setWidth(18);
        clasificador.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        TextField clasificadorValue = new TextField();
        clasificadorValue.setValue("DIS");
        clasificadorValue.setWidth(3);
        clasificadorValue.setValueChangeListener(model::setClasificador);

        Label itv = new Label("ITV..:");

        Date today = new Date();

        Label itvValue = new Label(today.toGMTString());

        Label escolar = new Label("ESCOLAR.:");

        TextField escolarValue = new TextField();
        escolarValue.setValue("2022-2023");
        escolarValue.setValueChangeListener(model::setEscolar);

        this.add(clasificador);
        this.add(clasificadorValue);
        this.add(itv);
        this.add(itvValue);
        this.add(escolar);
        this.add(escolarValue);
    }
}
