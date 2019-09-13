package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.teavm.jso.JSObject;

class CFDemoModel implements JSObject {
    private Boolean esGenerico = false;
    private Boolean esReserva = false;
    private VehicleTypeItem.VehicleType tipo;
    private String base;
    private String baseLibres;
    private String matricula;
    private SNCTypeItem.SNCType bato;
    private Boolean dobleTanque;
    private SNCTypeItem.SNCType esBus;
    private String zona;
    private String subZona;
    private String alq;
    private String aquien;
    private String clasificador;
    private String escolar;
    private String fecha;
    private SNCTypeItem.SNCType discrecional;
    private SNCTypeItem.SNCType aSae;
    private String conFlex;
    private String numeroTarjeta;
    private String serieTarjeta;
    private String value1;
    private String value2;
    private String value3;
    private String value4;
    private String value5;

    public boolean isEsGenerico() {
        return esGenerico;
    }

    void setEsGenerico(Boolean esGenerico) {
        this.esGenerico = esGenerico;
    }

    public Boolean isEsReserva() {
        return esReserva;
    }

    void setEsReserva(boolean esReserva) {
        this.esReserva = esReserva;
    }

    public VehicleTypeItem.VehicleType getTipo() {
        return tipo;
    }

    void setTipo(VehicleTypeItem.VehicleType tipo) {
        this.tipo = tipo;
    }

    public String getBase() {
        return base;
    }

    void setBase(String base) {
        this.base = base;
    }

    public String getBaseLibres() {
        return baseLibres;
    }

    void setBaseLibres(String baseLibres) {
        this.baseLibres = baseLibres;
    }

    public String getMatricula() {
        return matricula;
    }

    void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public SNCTypeItem.SNCType getBato() {
        return bato;
    }

    void setBato(SNCTypeItem.SNCType bato) {
        this.bato = bato;
    }

    public Boolean getDobleTanque() {
        return dobleTanque;
    }

    void setDobleTanque(Boolean dobleTanque) {
        this.dobleTanque = dobleTanque;
    }

    public SNCTypeItem.SNCType getEsBus() {
        return esBus;
    }

    void setEsBus(SNCTypeItem.SNCType esBus) {
        this.esBus = esBus;
    }

    public String getZona() {
        return zona;
    }

    void setZona(String zona) {
        this.zona = zona;
    }

    public String getSubZona() {
        return subZona;
    }

    void setSubZona(String subZona) {
        this.subZona = subZona;
    }

    public String getAlq() {
        return alq;
    }

    void setAlq(String alq) {
        this.alq = alq;
    }

    public String getAquien() {
        return aquien;
    }

    void setAquien(String aquien) {
        this.aquien = aquien;
    }

    public String getClasificador() {
        return clasificador;
    }

    void setClasificador(String clasificador) {
        this.clasificador = clasificador;
    }

    public String getEscolar() {
        return escolar;
    }

    void setEscolar(String escolar) {
        this.escolar = escolar;
    }

    public String getFecha() {
        return fecha;
    }

    void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public SNCTypeItem.SNCType getDiscrecional() {
        return discrecional;
    }

    void setDiscrecional(SNCTypeItem.SNCType discrecional) {
        this.discrecional = discrecional;
    }

    public SNCTypeItem.SNCType getaSae() {
        return aSae;
    }

    void setaSae(SNCTypeItem.SNCType aSae) {
        this.aSae = aSae;
    }

    public String getConFlex() {
        return conFlex;
    }

    void setConFlex(String conFlex) {
        this.conFlex = conFlex;
    }

    public String getNumeroTarjeta() {
        return numeroTarjeta;
    }

    void setNumeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public String getSerieTarjeta() {
        return serieTarjeta;
    }

    void setSerieTarjeta(String serieTarjeta) {
        this.serieTarjeta = serieTarjeta;
    }

    public String getValue1() {
        return value1;
    }

    void setValue1(String value1) {
        this.value1 = value1;
    }

    public String getValue2() {
        return value2;
    }

    void setValue2(String value2) {
        this.value2 = value2;
    }

    public String getValue3() {
        return value3;
    }

    void setValue3(String value3) {
        this.value3 = value3;
    }

    public String getValue4() {
        return value4;
    }

    void setValue4(String value4) {
        this.value4 = value4;
    }

    public String getValue5() {
        return value5;
    }

    void setValue5(String value5) {
        this.value5 = value5;
    }
}
