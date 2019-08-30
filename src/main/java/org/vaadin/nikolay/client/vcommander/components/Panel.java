package org.vaadin.nikolay.client.vcommander.components;

import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.Objects;

/**
 *
 */
public class Panel extends Component {

    private Component content;
    private String title;

    /**
     *
     * @param content
     */
    public void setContent(Component content) {
        this.content = Objects.requireNonNull(content);
    }

    /**
     *
     * @param title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public void render(APIBridge api) {
        int width = getWidth();
        int height = getHeight();
        int borderX = width - 1;
        int borderY = height - 1;
        int color = getStyle().getColor();
        int bgcolor = getStyle().getBgcolor();

        // TODO border style

        for(int j = 0; j < height; ++j) {
            for(int i = 0; i < width; ++i) {
                if(i == 0 && j == 0) {
                    api.setItem(i, j, new VCommander.Item('\u2554', color, bgcolor, false));
                } else if(i == borderX && j == 0) {
                    api.setItem(i, j, new VCommander.Item('\u2557', color, bgcolor, false));
                } else if(i ==0 && j == borderY) {
                    api.setItem(i, j, new VCommander.Item('\u255A', color, bgcolor, false));
                } else if(i == borderX && j == borderY) {
                    api.setItem(i, j, new VCommander.Item('\u255D', color, bgcolor, false));
                } else if(i > 0 && i < borderX && (j == 0 || j == borderY)) {
                    api.setItem(i, j, new VCommander.Item('\u2550', color, bgcolor, false));
                } else if(i == 0 || i == borderX) {
                    api.setItem(i, j, new VCommander.Item('\u2551', color, bgcolor, false));
                } else {
                    api.setItem(i, j, new VCommander.Item((char) 0, color, bgcolor, false));
                }
            }
        }

        if(this.title != null) {
            int length = Math.min(this.title.length(), width - 2);
            int start = Math.round(width / 2 - length / 2);

            this.drawText(api, start, this.title, color, bgcolor, length);
        }

        if(this.content != null) {
            this.content.render(new PAPIWrapper(api));
        }
    }

    private void drawText(APIBridge api, int start, String text, int color, int bgcolor, int length) {
        for(int i = 0; i < length; ++i) {
            api.setItem(start + i, 0, new VCommander.Item(text.charAt(i), color, bgcolor, false));
        }
    }

    private class PAPIWrapper implements APIBridge {

        private final APIBridge api;

        private PAPIWrapper(APIBridge api) {
            this.api = api;
        }

        @Override
        public int getBufferWidth() {
            return this.api.getBufferWidth() - 2;
        }

        @Override
        public int getBufferHeight() {
            return this.api.getBufferHeight() - 2;
        }

        @Override
        public VCommander.Item getItem(int x, int y) {
            return this.api.getItem(x + 1, y + 1);
        }

        @Override
        public void setItem(int x, int y, VCommander.Item item) {
            this.api.setItem(x + 1, y + 1, item);
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
