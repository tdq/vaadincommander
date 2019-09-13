package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.BooleanItem;
import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;

class NumeroLine extends HorizontalLayout {

    NumeroLine(CFDemoModel model) {
        this.setSpacing(true);

        Label numeroDeBus = new Label("NUMERO DE BUS...");
        numeroDeBus.setWidth(18);
        numeroDeBus.getStyle().setTextAlign(Component.Style.TextAlign.RIGHT);

        Label numeroDeBusValue = new Label("422");
        numeroDeBusValue.setWidth(41);

        Label esGenerico = new Label("ES GENERICO.:");

        BooleanItem yesValue = new BooleanItem(true);
        BooleanItem noValue = new BooleanItem(false);

        ComboBox<BooleanItem> esGenericoValue = new ComboBox<>();
        esGenericoValue.addItem(yesValue);
        esGenericoValue.addItem(noValue);
        esGenericoValue.setValue(noValue);
        esGenericoValue.setWidth(4);
        esGenericoValue.setValueChangeLister(item -> model.setEsGenerico(item.getValue()));

        Label esReserva = new Label("ES RESERVA:");

        ComboBox<BooleanItem> esReservaValue = new ComboBox<>();
        esReservaValue.addItem(yesValue);
        esReservaValue.addItem(noValue);
        esReservaValue.setValue(noValue);
        esReservaValue.setWidth(4);
        esReservaValue.setValueChangeLister(item -> model.setEsReserva(item.getValue()));

        this.add(numeroDeBus);
        this.add(numeroDeBusValue);
        this.add(esGenerico);
        this.add(esGenericoValue);
        this.add(esReserva);
        this.add(esReservaValue);
    }
}
