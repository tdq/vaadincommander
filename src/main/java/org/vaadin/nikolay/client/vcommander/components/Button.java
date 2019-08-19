package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.Objects;

/**
 *
 */
public class Button extends Component {

    private String caption;
    private Runnable clickListener;

    {
        VCommander.getPlugin(EventBus.class).registerEvent(this, e -> {
            if("Enter".equals(e.getKey()) && this.clickListener != null) {
                this.clickListener.run();
            }
        });
    }

    /**
     *
     * @param caption
     */
    public void setCaption(String caption) {
        this.caption = caption;

        super.markAsDirty();
    }

    /**
     *
     * @param listener
     */
    public void setClickListener(Runnable listener) {
        this.clickListener = Objects.requireNonNull(listener);
    }

    @Override
    public int getWidth() {
        return this.caption != null ? this.caption.length() + 4 : 1;
    }

    @Override
    public int getHeight() {
        return 1;
    }

    @Override
    public void render(APIBridge api) {
        int color = isFocused() ? 0 : getStyle().getColor();
        int bgcolor = isFocused() ? 7 : getStyle().getBgcolor();
        int width = getWidth();

        for(int i = 0; i < width; ++i) {
            if(i == 0 ) {
                api.setItem(i, 0, new VCommander.Item('[', color, bgcolor, false));
            } else if(i == width - 1) {
                api.setItem(i, 0, new VCommander.Item(']', color, bgcolor, false));
            } else if(i == 1 || i == width - 2) {
                api.setItem(i, 0, new VCommander.Item((char) 0, color, bgcolor, false));
            } else {
                api.setItem(i, 0, new VCommander.Item(this.caption.charAt(i - 2), color, bgcolor, false));
            }
        }
    }
}
