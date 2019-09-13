package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.TextField;

class NumeroTarjetaLine extends HorizontalLayout {

    NumeroTarjetaLine(CFDemoModel model) {
        this.setSpacing(true);

        Label numeroTarjeta = new Label("NUMERO TARJETA..");
        numeroTarjeta.setWidth(18);
        numeroTarjeta.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        TextField numeroTarjetaValue = new TextField();
        numeroTarjetaValue.setValueChangeListener(model::setNumeroTarjeta);

        Label serieTarjeta = new Label("SERIE TARJETA:");

        TextField serieTarjetaValue = new TextField();
        serieTarjetaValue.setWidth(3);
        serieTarjetaValue.setValueChangeListener(model::setSerieTarjeta);

        this.add(numeroTarjeta);
        this.add(numeroTarjetaValue);
        this.add(serieTarjeta);
        this.add(serieTarjetaValue);
    }
}
