package org.vaadin.nikolay.client.vcommander;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.platform.Platform;
import org.teavm.platform.PlatformClass;
import org.vaadin.nikolay.client.CustomElement;
import org.vaadin.nikolay.client.vcommander.cfdemo.CFDemo;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

/**
 *
 */
//@WebComponent("v-commander")
public class VCommander extends CustomElement {

    private static List<Function<APIBridge, Plugin>> pluginsProviders = new ArrayList<>();
    private static Map<String, Plugin> plugins = new HashMap<>();

    private Item[][] buffer = new Item[0][0];
    private int width = 80;
    private int height = 25;
    private HTMLElement content;

    /**
     *
     * @param pluginProvider
     */
    public static void registerPlugin(Function<APIBridge, Plugin> pluginProvider) {
        pluginsProviders.add(Objects.requireNonNull(pluginProvider));
    }

    /**
     *
     * @param name
     * @return
     */
    public static <T extends Plugin> T getPlugin(Class<T> name) {
        return (T) plugins.get(name.getName());
    }

    @Override
    protected void init() {
        this.width = Integer.valueOf(this.getElement().getAttribute("width"));
        this.height = Integer.valueOf(this.getElement().getAttribute("height"));

        this.getElement().getStyle().setProperty("width", this.width + "ch");

        content = Window.current().getDocument().createElement("div");
        content.setClassName("commander");

        this.getElement().appendChild(content);

        this.buffer = new Item[this.height][this.width];

        HTMLDocument document = Window.current().getDocument();

        for(int j = 0; j < this.height; ++j) {
            for(int i = 0; i < this.width; ++i) {
                HTMLElement item = document.createElement("span");
                item.setInnerHTML("");
                this.buffer[j][i] = new Item('\0', 15, 0);

                this.content.appendChild(item);
            }
        }

        APIBridge apiBridge = new VAPIBridge(this);

        pluginsProviders.forEach(provider -> {
            Plugin plugin = provider.apply(apiBridge);
            plugins.put(plugin.getClass().getName(), plugin);

            System.err.println("Register plugin: " + plugin.getClass().getName());
        });

        Application application = new CFDemo(apiBridge);

        application.exec();
    }

    private Item getItem(int x, int y) {
        return this.buffer[y][x];
    }

    private void setItem(int x, int y, Item item) {
        Objects.requireNonNull(item);

        Item currentItem = getItem(x, y);

        if(Objects.equals(currentItem, item)) {
            return;
        }

        this.buffer[y][x] = item;

        HTMLElement cell = (HTMLElement) this.content.getChildNodes().get(y * this.width + x);
        String color = item.color == null ? null : item.shadowed ? Palete16.color[7] : Palete16.color[item.color];
        String bgcolor = item.bgcolor == null ? null :item.shadowed ? Palete16.color[0] : Palete16.color[item.bgcolor];

        cell.setInnerHTML(String.valueOf(item.value));

        if(color != null) {
            cell.getStyle().setProperty("color", color);
        }

        if(bgcolor != null) {
            cell.getStyle().setProperty("background-color", bgcolor);
        }
    }

    private void addEventListener(String type, EventListener listener) {
        Window.current().getDocument().addEventListener(type, listener);
    }

    private void removeEventListener(String type, EventListener listener) {
        Window.current().getDocument().removeEventListener(type, listener);
    }

    /**
     *
     */
    public static class Item {
        private char value;
        private Integer color;
        private Integer bgcolor;
        private boolean shadowed;
        private int zindex = 0;

        public Item(char value, Integer color, Integer bgcolor) {
            this.value = value;
            this.color = color;
            this.bgcolor = bgcolor;
        }

        public char getValue() {
            return value;
        }

        public Item setValue(char value) {
            this.value = value;

            return this;
        }

        public Integer getColor() {
            return color;
        }

        public Item setColor(Integer color) {
            this.color = color;

            return this;
        }

        public Integer getBgcolor() {
            return bgcolor;
        }

        public Item setBgcolor(Integer bgcolor) {
            this.bgcolor = bgcolor;

            return this;
        }

        public boolean isShadowed() {
            return shadowed;
        }

        public Item setShadowed(boolean shadowed) {
            this.shadowed = shadowed;

            return this;
        }

        public Item setZindex(int index) {
            this.zindex = index;

            return this;
        }

        public int getZindex() {
            return zindex;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Item item = (Item) o;
            return Objects.equals(color, item.color) &&
                    Objects.equals(bgcolor, item.bgcolor) &&
                    shadowed == item.shadowed &&
                    value == item.value;
        }

        @Override
        public int hashCode() {
            return Objects.hash(value, color, bgcolor, shadowed);
        }
    }

    /**
     *
     */
    private class VAPIBridge implements APIBridge {

        private VCommander commander;

        public VAPIBridge(VCommander commander) {
            this.commander = Objects.requireNonNull(commander);
        }

        @Override
        public int getBufferWidth() {
            return this.commander.width;
        }

        @Override
        public int getBufferHeight() {
            return this.commander.height;
        }

        @Override
        public Item getItem(int x, int y) {
            return this.commander.getItem(x, y);
        }

        @Override
        public void setItem(int x, int y, Item item) {
            this.commander.setItem(x, y, item);
        }

        @Override
        public <E extends Event> void addEventListener(String eventType, EventListener<E> action) {
            this.commander.addEventListener(eventType, action);
        }

        @Override
        public <E extends Event> void removeEventListener(String eventType, EventListener<E> action) {
            this.commander.removeEventListener(eventType, action);
        }
    }
}
