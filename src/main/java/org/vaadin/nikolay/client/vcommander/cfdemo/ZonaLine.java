package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.TextField;

class ZonaLine extends HorizontalLayout {

    ZonaLine(CFDemoModel model) {
        this.setSpacing(true);

        Label zona = new Label("ZONA............");
        zona.setWidth(18);
        zona.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        TextField zonaValue = new TextField();
        zonaValue.setWidth(4);
        zonaValue.setValueChangeListener(model::setZona);

        Label subZona = new Label("SUBZONA.");

        TextField subZonaValue = new TextField();
        subZonaValue.setWidth(4);
        subZonaValue.setValueChangeListener(model::setSubZona);

        Label alq = new Label("ALQ:");

        TextField alqValue = new TextField();
        alqValue.setWidth(1);
        alqValue.setValueChangeListener(model::setAlq);

        Label aquien = new Label("AQUIEN:");

        TextField aquienValue = new TextField();
        aquienValue.setWidth(20);
        aquienValue.setValueChangeListener(model::setAquien);

        this.add(zona);
        this.add(zonaValue);
        this.add(subZona);
        this.add(subZonaValue);
        this.add(alq);
        this.add(alqValue);
        this.add(aquien);
        this.add(aquienValue);
    }
}
