package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.RenderRegistry;
import org.vaadin.nikolay.client.vcommander.VCommander;

/**
 *
 */
public abstract class Component {

    private int width;
    private int height;
    private boolean focused;

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
    }

    /**
     *
     */
    protected void markAsDirty() {
        VCommander.getPlugin(RenderRegistry.class).invokeRender();
    }
}
