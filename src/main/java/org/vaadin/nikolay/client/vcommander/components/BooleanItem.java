package org.vaadin.nikolay.client.vcommander.components;

import java.util.Objects;

/**
 *
 */
public class BooleanItem implements ListBox.ListBoxItem<Boolean> {

    private boolean value;

    /**
     *
     * @param value
     */
    public BooleanItem(boolean value) {
        this.value = value;
    }

    @Override
    public String getCaption() {
        return value ? "Yes" : "No";
    }

    @Override
    public Boolean getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BooleanItem that = (BooleanItem) o;
        return value == that.value;
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
