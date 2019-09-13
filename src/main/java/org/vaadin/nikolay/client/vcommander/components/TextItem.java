package org.vaadin.nikolay.client.vcommander.components;

import java.util.Objects;

/**
 *
 */
public class TextItem implements ListBox.ListBoxItem<String> {

    private String value;

    public TextItem(String value) {
        this.value = Objects.requireNonNull(value);
    }

    @Override
    public String getCaption() {
        return value;
    }

    @Override
    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TextItem textItem = (TextItem) o;
        return value.equals(textItem.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
