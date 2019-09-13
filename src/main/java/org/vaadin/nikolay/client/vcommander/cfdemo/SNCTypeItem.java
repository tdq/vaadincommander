package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.ListBox;

import java.util.Objects;

/**
 *
 */
class SNCTypeItem implements ListBox.ListBoxItem<SNCTypeItem.SNCType> {

    private SNCType type;

    SNCTypeItem(SNCType type) {
        this.type = Objects.requireNonNull(type);
    }

    @Override
    public String getCaption() {
        return type.name();
    }

    @Override
    public SNCType getValue() {
        return type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SNCTypeItem that = (SNCTypeItem) o;
        return type == that.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(type);
    }

    /**
     *
     */
    enum SNCType {
        S, N, C
    }
}
