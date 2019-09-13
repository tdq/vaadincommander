package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.Objects;
import java.util.function.Function;

/**
 *
 */
public class Label extends Component {

    private String value;

    {
        getStyle().setColor(7);
    }

    public Label() {}

    public Label(String value) {
        this.value = Objects.requireNonNull(value);
    }

    /**
     *
     * @return
     */
    public String getValue() {
        return value;
    }

    /**
     *
     * @param value
     */
    public void setValue(String value) {
        this.value = value;

        super.markAsDirty();
    }

    @Override
    public int getWidth() {
        return super.getWidth() > 0 ? super.getWidth() : this.value != null ? this.value.length() : 0;
    }

    @Override
    public int getHeight() {
        return super.getHeight() > 0 ? super.getHeight() : 1;
    }

    @Override
    public void render(APIBridge api) {
        if(this.value == null) {
            return;
        }

        int width = getWidth();

        Function<Integer, Character> align;

        switch (getStyle().getTextAlign()) {
            case CENTER: align = (i) -> centerAlign(i, width, value); break;
            case RIGHT: align = (i) -> rightAlign(i, width, value); break;
            default: align = (i) -> leftAlign(i, width, value);
        }

        for(int i = 0; i < width; ++i) {
            api.setItem(i, 0, new VCommander.Item(align.apply(i), getStyle().getColor(), getStyle().getBgcolor()));
        }
    }

    private char leftAlign(int i, int width, String value) {
        return i < value.length() ? value.charAt(i) : 0;
    }

    private char rightAlign(int i, int width, String value) {
        int shift = width - value.length();

        return i < shift ? 0 : value.charAt(i - shift);
    }

    private char centerAlign(int i, int width, String value) {
        int shift = width / 2 - value.length() / 2;

        return i < shift || i >= shift + value.length() ? 0 : value.charAt(i - shift);
    }
}
