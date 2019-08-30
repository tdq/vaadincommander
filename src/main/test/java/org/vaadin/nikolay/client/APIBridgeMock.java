package org.vaadin.nikolay.client;

import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

public class APIBridgeMock implements APIBridge {



    @Override
    public int getBufferWidth() {
        return 0;
    }

    @Override
    public int getBufferHeight() {
        return 0;
    }

    @Override
    public VCommander.Item getItem(int x, int y) {
        return null;
    }

    @Override
    public void setItem(int x, int y, VCommander.Item item) {

    }

    @Override
    public <E extends Event> void addEventListener(String eventType, EventListener<E> action) {

    }

    @Override
    public <E extends Event> void removeEventListener(String eventType, EventListener<E> action) {

    }
}
