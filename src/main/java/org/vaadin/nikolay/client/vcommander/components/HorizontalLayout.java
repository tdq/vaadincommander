package org.vaadin.nikolay.client.vcommander.components;

import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class HorizontalLayout extends Layout {

    @Override
    public int getWidth() {
        return super.getWidth() != 0 ? super.getWidth() : getComponents().stream().map(Component::getWidth).reduce(0, (a, b) -> a + b);
    }

    @Override
    public int getHeight() {
        return getComponents().stream().map(Component::getHeight).reduce(0, (a, b) -> a > b ? a : b);
    }

    @Override
    public void render(APIBridge api) {
        int offset = 0;
        int width = api.getBufferWidth();
        float totalRatio = 0;

        List<Component> components = getComponents();

        if(isSpacing()) {
            width -= components.size() - 1;
        }

        Map<Component, Integer> widths = new HashMap<>();
        List<Component> sortedComponents = components.stream().sorted((o1, o2) -> Float.compare(getRatio(o1), getRatio(o2))).collect(Collectors.toList());

        for(Component component : components) {
            totalRatio += getRatio(component);
        }

        int availableWidth = width;
        for(Component component : sortedComponents) {
            int childWidth = Math.min(Math.max(totalRatio == 0 ? 0 : (int) (getRatio(component) * width / totalRatio), component.getWidth()), availableWidth);

            widths.put(component, childWidth);

            availableWidth -= childWidth;
        }

        for(Component component : components) {
            int childWidth = widths.get(component);

            APIBridge wrapper= new HLAPIWrapper(api, childWidth, offset);
            offset += childWidth;

            if(isSpacing()) {
                offset += 1;
            }

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

        @Override
        public void clearBuffer() {

        }
    }
}
