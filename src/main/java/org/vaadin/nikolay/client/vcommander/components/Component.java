package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Palette;
import org.vaadin.nikolay.client.vcommander.Palette16;
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

        markAsDirty();
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
        private Palette color = Palette16.DARK_WHITE;
        private Palette bgcolor;
        private TextAlign textAlign = TextAlign.LEFT;
        private int zindex = 0;

        public Palette getColor() {
            return color;
        }

        public void setColor(Palette color) {
            this.color = color;
        }

        public Palette getBgcolor() {
            return bgcolor;
        }

        public void setBgcolor(Palette bgcolor) {
            this.bgcolor = bgcolor;
        }

        public void setTextAlign(TextAlign textAlign) {
            this.textAlign = Objects.requireNonNull(textAlign);
        }

        public TextAlign getTextAlign() {
            return textAlign;
        }

        public int getZindex() {
            return zindex;
        }

        public void setZindex(int zindex) {
            this.zindex = zindex;
        }

        /**
         * Text align
         */
        public static enum TextAlign {
            LEFT, CENTER, RIGHT
        }
    }
}
