package org.vaadin.nikolay.client.vcommander;

import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;

/**
 *
 */
public interface APIBridge {

    /**
     *
     * @return
     */
    int getBufferWidth();

    /**
     *
     * @return
     */
    int getBufferHeight();

    /**
     *
     * @param x
     * @param y
     * @return
     */
    VCommander.Item getItem(int x, int y);

    /**
     *
     * @param x
     * @param y
     * @param item
     */
    void setItem(int x, int y, VCommander.Item item);

    /**
     *
     * @param eventType
     * @param action
     * @param <E>
     */
    <E extends Event> void addEventListener(String eventType, EventListener<E> action);

    /**
     *
     * @param eventType
     * @param action
     * @param <E>
     */
    <E extends Event> void removeEventListener(String eventType, EventListener<E> action);

    /**
     *
     */
    void clearBuffer();
}
