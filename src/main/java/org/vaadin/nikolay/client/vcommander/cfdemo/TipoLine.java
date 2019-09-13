package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.TextField;

import java.util.stream.Stream;

class TipoLine extends HorizontalLayout {

    TipoLine(CFDemoModel model) {
        this.setSpacing(true);

        Label tipo = new Label("TIPO.:");
        tipo.setWidth(8);
        tipo.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        ComboBox<VehicleTypeItem> tipoValue = new ComboBox<>();
        Stream.of(VehicleTypeItem.VehicleType.values()).forEach(type -> tipoValue.addItem(new VehicleTypeItem(type)));
        tipoValue.setValue(new VehicleTypeItem(VehicleTypeItem.VehicleType.CAR));
        tipoValue.setValueChangeLister(value -> model.setTipo(value.getValue()));

        Label base = new Label("BASE.:");
        base.getStyle().setTextAlign(Style.TextAlign.RIGHT);
        base.setWidth(28);

        TextField baseValue = new TextField();
        baseValue.setValue("0800");
        baseValue.setWidth(4);
        baseValue.setValueChangeListener(model::setBase);

        Label nadaDep = new Label("9999=Nada/9000=Dep.");
        Label baseLibres = new Label("BASE LIBRES:");

        TextField baseLibresValue = new TextField();
        baseLibresValue.setValue("0800");
        baseLibresValue.setWidth(4);
        baseLibresValue.setValueChangeListener(model::setBaseLibres);

        this.add(tipo);
        this.add(tipoValue);
        this.add(base);
        this.add(baseValue);
        this.add(nadaDep);
        this.add(baseLibres);
        this.add(baseLibresValue);
    }
}
