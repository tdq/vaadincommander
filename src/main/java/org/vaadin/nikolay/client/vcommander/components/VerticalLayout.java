package org.vaadin.nikolay.client.vcommander.components;

import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

/**
 *
 */
public class VerticalLayout extends Layout {

    @Override
    public int getWidth() {
        return getComponents().stream().map(Component::getWidth).reduce(0, (a, b) -> a > b ? a : b);
    }

    @Override
    public int getHeight() {
        return getComponents().stream().map(Component::getHeight).reduce(0, (a, b) -> a + b);
    }

    @Override
    public void render(APIBridge api) {
        int offset = 0;

        for(Component component : getComponents()) {
            int childHeight = component.getHeight();
            APIBridge wrapper = new VLAPIWrapper(api, childHeight, offset);
            offset += childHeight;

            if(isSpacing()) {
                offset += 1;
            }

            component.render(wrapper);
        }
    }

    private class VLAPIWrapper implements APIBridge {

        private final APIBridge api;
        private final int offset;
        private final int height;

        private VLAPIWrapper(APIBridge api, int height, int offset) {
            this.api = api;
            this.height = height;
            this.offset = offset;
        }

        @Override
        public int getBufferWidth() {
            return this.api.getBufferWidth();
        }

        @Override
        public int getBufferHeight() {
            return this.height;
        }

        @Override
        public VCommander.Item getItem(int x, int y) {
            return this.api.getItem(x, y + this.offset);
        }

        @Override
        public void setItem(int x, int y, VCommander.Item item) {
            this.api.setItem(x, y + this.offset, item);
        }

        @Override
        public <E extends Event> void addEventListener(String eventType, EventListener<E> action) {
            this.api.addEventListener(eventType, action);
        }

        @Override
        public <E extends Event> void removeEventListener(String eventType, EventListener<E> action) {
            this.api.removeEventListener(eventType, action);
        }
    }
}
