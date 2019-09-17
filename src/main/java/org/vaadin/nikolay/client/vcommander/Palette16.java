package org.vaadin.nikolay.client.vcommander;

import org.teavm.jso.JSObject;

public enum Palette16 implements Palette {

    BLACK("#000000"), DARK_BLUE("#0000c9"), DARK_RED("#c90000"), DARK_PINK("#c900c9"),
    DARK_GREEN("#00c900"), DARK_CYAN("#00c9c9"), DARK_YELLOW("#c9c900"), DARK_WHITE("#c9c9c9"),
    BLUE("#0000ff"), RED("#ff0000"), PINK("#ff00ff"), GREEN("#00ff00"), CYAN("#00ffff"),
    YELLOW("#ffff00"), WHITE("#ffffff"), GRAPHITE("#33383a"), WATER("#00b4f0"),
    RASPBERRY("#ff3a49"), LAVA("#e61e6d"), SAND("#ffc13f"), SNOW("#e5e8e8");

    private String value;

    Palette16(String value) {
        this.value = value;
    }

    public String getColorValue() {
        return value;
    }
}
