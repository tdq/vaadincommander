package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.RenderRegistry;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.Objects;

/**
 *
 */
public abstract class Component {

    private int width;
    private int height;
    private boolean focused;
    private boolean preventDefault;
    private boolean visible = true;
    private Style style = new Style();

    /**
     *
     * @param api
     */
    public abstract void render(APIBridge api);

    /**
     *
     * @return
     */
    public int getWidth() {
        return width;
    }

    /**
     *
     * @param width
     */
    public void setWidth(int width) {
        this.width = width;
    }

    /**
     *
     * @return
     */
    public int getHeight() {
        return height;
    }

    /**
     *
     * @param height
     */
    public void setHeight(int height) {
        this.height = height;
    }

    /**
     *
     * @return
     */
    public boolean isFocused() {
        return focused;
    }

    /**
     *
     * @param focused
     */
    public void setFocused(boolean focused) {
        this.focused = focused;

        this.markAsDirty();
    }

    /**
     *
     * @return
     */
    public Style getStyle() {
        return style;
    }

    /**
     *
     * @param visible
     */
    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    /**
     *
     * @return
     */
    public boolean isVisible() {
        return visible;
    }

    /**
     *
     * @return
     */
    public boolean isPreventDefault() {
        return preventDefault;
    }

    /**
     *
     * @param preventDefault
     */
    protected void setPreventDefault(boolean preventDefault) {
        this.preventDefault = preventDefault;
    }

    /**
     *
     */
    protected void markAsDirty() {
        VCommander.getPlugin(RenderRegistry.class).invokeRender();
    }

    /**
     *
     */
    public static class Style {
        private Integer color = 7;
        private Integer bgcolor;
        private TextAlign textAlign = TextAlign.LEFT;

        public Integer getColor() {
            return color;
        }

        public void setColor(Integer color) {
            this.color = color;
        }

        public Integer getBgcolor() {
            return bgcolor;
        }

        public void setBgcolor(Integer bgcolor) {
            this.bgcolor = bgcolor;
        }

        public void setTextAlign(TextAlign textAlign) {
            this.textAlign = Objects.requireNonNull(textAlign);
        }

        public TextAlign getTextAlign() {
            return textAlign;
        }

        /**
         * Text align
         */
        public static enum TextAlign {
            LEFT, CENTER, RIGHT
        }
    }
}
