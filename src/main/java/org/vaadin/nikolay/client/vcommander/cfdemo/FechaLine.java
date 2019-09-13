package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.TextField;

import java.util.stream.Stream;

class FechaLine extends HorizontalLayout {

    FechaLine(CFDemoModel model) {
        this.setSpacing(true);

        Label fecha = new Label("FECHA MATRICULA.");
        fecha.setWidth(18);
        fecha.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        TextField fechaValue = new TextField();
        fechaValue.setValue("29/03/07");
        fechaValue.setWidth(8);
        fechaValue.setValueChangeListener(model::setFecha);

        Label discrecional = new Label("DISCRECIONAL:");

        ComboBox<SNCTypeItem> discrecionalValue = new ComboBox<>();
        Stream.of(SNCTypeItem.SNCType.values()).forEach(type -> discrecionalValue.addItem(new SNCTypeItem(type)));
        discrecionalValue.setValue(new SNCTypeItem(SNCTypeItem.SNCType.S));
        discrecionalValue.setWidth(4);
        discrecionalValue.setValueChangeLister(item -> model.setDiscrecional(item.getValue()));

        Label discrecionalDesc = new Label("S/N/C");

        Label asae = new Label("A SAE:");

        ComboBox<SNCTypeItem> aSaeValue = new ComboBox<>();
        Stream.of(SNCTypeItem.SNCType.values()).forEach(type -> aSaeValue.addItem(new SNCTypeItem(type)));
        aSaeValue.setValue(new SNCTypeItem(SNCTypeItem.SNCType.S));
        aSaeValue.setWidth(4);
        aSaeValue.setValueChangeLister(item -> model.setaSae(item.getValue()));

        Label conFlex = new Label("CON FLEX:");

        TextField conFlexValue = new TextField();
        conFlexValue.setWidth(1);
        conFlexValue.setValueChangeListener(model::setConFlex);

        this.add(fecha);
        this.add(fechaValue);
        this.add(discrecional);
        this.add(discrecionalValue);
        this.add(discrecionalDesc);
        this.add(asae);
        this.add(aSaeValue);
        this.add(conFlex);
        this.add(conFlexValue);
    }
}
