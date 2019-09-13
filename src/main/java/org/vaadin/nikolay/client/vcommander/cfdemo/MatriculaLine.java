package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.BooleanItem;
import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.TextField;

import java.util.stream.Stream;

class MatriculaLine extends HorizontalLayout {

    MatriculaLine(CFDemoModel model) {
        this.setSpacing(true);

        Label matricula = new Label("MATRICULA.......");
        matricula.setWidth(18);
        matricula.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        TextField matriculaValue = new TextField();
        matriculaValue.setValue("3671-FMX");
        matriculaValue.setValueChangeListener(model::setMatricula);

        Label bato = new Label("BATO:");

        ComboBox<SNCTypeItem> batoValue = new ComboBox<>();
        Stream.of(SNCTypeItem.SNCType.values()).forEach(type -> batoValue.addItem(new SNCTypeItem(type)));
        batoValue.setValue(new SNCTypeItem(SNCTypeItem.SNCType.S));
        batoValue.setWidth(4);
        batoValue.setValueChangeLister(item -> model.setBato(item.getValue()));

        Label dobleTanque = new Label("DOBLE TANQUE:");

        BooleanItem yesValue = new BooleanItem(true);
        BooleanItem noValue = new BooleanItem(false);

        ComboBox<BooleanItem> dobleTanqueValue = new ComboBox<>();
        dobleTanqueValue.addItem(yesValue);
        dobleTanqueValue.addItem(noValue);
        dobleTanqueValue.setValue(noValue);
        dobleTanqueValue.setWidth(4);
        dobleTanqueValue.setValueChangeLister(item -> model.setDobleTanque(item.getValue()));

        Label esBus = new Label("ES BUS:");

        ComboBox<SNCTypeItem> esBusValue = new ComboBox<>();
        Stream.of(SNCTypeItem.SNCType.values()).forEach(type -> esBusValue.addItem(new SNCTypeItem(type)));
        esBusValue.setValue(new SNCTypeItem(SNCTypeItem.SNCType.S));
        esBusValue.setWidth(4);
        esBusValue.setValueChangeLister(item -> model.setEsBus(item.getValue()));

        Label esBusDesc = new Label("S/N/O");

        this.add(matricula);
        this.add(matriculaValue);
        this.add(bato);
        this.add(batoValue);
        this.add(dobleTanque);
        this.add(dobleTanqueValue);
        this.add(esBus);
        this.add(esBusValue);
        this.add(esBusDesc);
    }
}
