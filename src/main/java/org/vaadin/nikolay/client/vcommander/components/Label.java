package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

/**
 *
 */
public class Label extends Component {

    private String value;

    {
        getStyle().setColor(7);
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

        for(int i = 0; i < getWidth(); ++i) {
            api.setItem(i, 0, new VCommander.Item(value.charAt(i), getStyle().getColor(), getStyle().getBgcolor(), false));
        }
    }
}
