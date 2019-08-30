package org.vaadin.nikolay.client.vcommander.components;

import java.util.Objects;

/**
 *
 */
public class TextItem implements ListBox.ListBoxItem {

    private String value;

    public TextItem(String value) {
        this.value = Objects.requireNonNull(value);
    }

    @Override
    public String getCaption() {
        return value;
    }
}
