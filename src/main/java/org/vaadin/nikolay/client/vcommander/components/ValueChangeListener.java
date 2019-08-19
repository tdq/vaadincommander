package org.vaadin.nikolay.client.vcommander.components;

/**
 *
 * @param <T>
 */
public interface ValueChangeListener<T> {

    /**
     *
     * @param value
     */
    void onChange(T value);
}
