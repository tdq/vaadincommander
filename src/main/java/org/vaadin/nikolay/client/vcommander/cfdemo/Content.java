package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.BooleanItem;
import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.Panel;
import org.vaadin.nikolay.client.vcommander.components.TextField;
import org.vaadin.nikolay.client.vcommander.components.TextItem;
import org.vaadin.nikolay.client.vcommander.components.VerticalLayout;

import java.util.stream.Stream;

class Content extends Panel {

    Content(int width, int height) {
        this.getStyle().setBgcolor(1);
        this.setWidth(width);
        this.setHeight(height);

        VerticalLayout contentLayout = new VerticalLayout();

        contentLayout.add(numeroLine());
        contentLayout.add(tipoLine());
        contentLayout.add(matriculaLine());

        this.setContent(contentLayout);
    }

    private Component numeroLine() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);

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

        Label esReserva = new Label("ES RESERVA:");

        ComboBox<BooleanItem> esReservaValue = new ComboBox<>();
        esReservaValue.addItem(yesValue);
        esReservaValue.addItem(noValue);
        esReservaValue.setValue(noValue);
        esReservaValue.setWidth(4);

        layout.add(numeroDeBus);
        layout.add(numeroDeBusValue);
        layout.add(esGenerico);
        layout.add(esGenericoValue);
        layout.add(esReserva);
        layout.add(esReservaValue);

        return layout;
    }

    private Component tipoLine() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);

        Label tipo = new Label("TIPO.:");
        tipo.setWidth(8);
        tipo.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        ComboBox<VehicleTypeItem> tipoValue = new ComboBox<>();
        Stream.of(VehicleTypeItem.VehicleType.values()).forEach(type -> tipoValue.addItem(new VehicleTypeItem(type)));
        tipoValue.setValue(new VehicleTypeItem(VehicleTypeItem.VehicleType.CAR));

        Label base = new Label("BASE.:");
        base.getStyle().setTextAlign(Style.TextAlign.RIGHT);
        base.setWidth(28);

        TextField baseValue = new TextField();
        baseValue.setValue("0800");
        baseValue.setWidth(4);

        Label nadaDep = new Label("9999=Nada/9000=Dep.");
        Label baseLibres = new Label("BASE LIBRES:");

        TextField baseLibresValue = new TextField();
        baseLibresValue.setValue("0800");
        baseLibresValue.setWidth(4);

        layout.add(tipo);
        layout.add(tipoValue);
        layout.add(base);
        layout.add(baseValue);
        layout.add(nadaDep);
        layout.add(baseLibres);
        layout.add(baseLibresValue);

        return layout;
    }

    private Component matriculaLine() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);

        Label matricula = new Label("MATRICULA.......");
        matricula.setWidth(18);
        matricula.getStyle().setTextAlign(Style.TextAlign.RIGHT);

        TextField matriculaValue = new TextField();
        matriculaValue.setValue("3671-FMX");

        Label bato = new Label("BATO:");

        ComboBox<TextItem> batoValue = new ComboBox<>();
        batoValue.addItem(new TextItem("S"));
        batoValue.addItem(new TextItem("N"));
        batoValue.addItem(new TextItem("O"));
        batoValue.setValue(new TextItem("S"));
        batoValue.setWidth(4);

        Label dobleTanque = new Label("DOBLE TANQUE:");

        BooleanItem yesValue = new BooleanItem(true);
        BooleanItem noValue = new BooleanItem(false);

        ComboBox<BooleanItem> dobleTanqueValue = new ComboBox<>();
        dobleTanqueValue.addItem(yesValue);
        dobleTanqueValue.addItem(noValue);
        dobleTanqueValue.setValue(noValue);
        dobleTanqueValue.setWidth(4);

        Label esBus = new Label("ES BUS:");

        ComboBox<TextItem> esBusValue = new ComboBox<>();
        esBusValue.addItem(new TextItem("S"));
        esBusValue.addItem(new TextItem("N"));
        esBusValue.addItem(new TextItem("O"));
        esBusValue.setValue(new TextItem("S"));
        esBusValue.setWidth(4);

        Label esBusDesc = new Label("S/N/O");

        layout.add(matricula);
        layout.add(matriculaValue);
        layout.add(bato);
        layout.add(batoValue);
        layout.add(dobleTanque);
        layout.add(dobleTanqueValue);
        layout.add(esBus);
        layout.add(esBusValue);
        layout.add(esBusDesc);

        return layout;
    }
}
