package org.vaadin.nikolay.client.vcommander.util;

/**
 *
 */
public class Helper {

    /**
     *
     * @param value
     * @param defaultValue
     * @param <T>
     * @return
     */
    public static <T> T orDefault(T value, T defaultValue) {
        return value != null ? value : defaultValue;
    }
}
