package org.vaadin.nikolay.client.vcommander.components;

import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

public class HorizontalLayout extends Layout {

    @Override
    public int getWidth() {
        return getComponents().stream().map(Component::getWidth).reduce(0, (a, b) -> a + b);
    }

    @Override
    public int getHeight() {
        return getComponents().stream().map(Component::getHeight).reduce(0, (a, b) -> a > b ? a : b);
    }

    @Override
    public void render(APIBridge api) {
        int offset = 0;

        for(Component component : getComponents()) {
            int childWidth = component.getWidth();
            APIBridge wrapper= new HLAPIWrapper(api, childWidth, offset);
            offset += childWidth;

            component.render(wrapper);
        }
    }

    private class HLAPIWrapper implements APIBridge {

        private final APIBridge api;
        private final int width;
        private final int offset;

        private HLAPIWrapper(APIBridge api, int width, int offset) {
            this.api = api;
            this.width = width;
            this.offset = offset;
        }

        @Override
        public int getBufferWidth() {
            return this.width;
        }

        @Override
        public int getBufferHeight() {
            return this.api.getBufferHeight();
        }

        @Override
        public VCommander.Item getItem(int x, int y) {
            return this.api.getItem(x + this.offset, y);
        }

        @Override
        public void setItem(int x, int y, VCommander.Item item) {
            this.api.setItem(x + this.offset, y, item);
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
