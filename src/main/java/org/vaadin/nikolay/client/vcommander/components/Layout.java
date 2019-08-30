package org.vaadin.nikolay.client.vcommander.components;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 *
 */
public abstract class Layout extends Component {

    private final List<Component> components = new ArrayList<>();
    private boolean spacing;

    /**
     *
     * @param component
     */
    public void add(Component component) {
        this.components.add(Objects.requireNonNull(component));
    }

    /**
     *
     * @param compoent
     */
    public void remove(Component compoent) {
        this.components.remove(Objects.requireNonNull(compoent));
    }

    /**
     *
     * @param spacing
     */
    public void setSpacing(boolean spacing) {
        this.spacing = spacing;
    }

    /**
     *
     * @return
     */
    protected List<Component> getComponents() {
        return this.components;
    }

    /**
     *
     * @return
     */
    protected boolean isSpacing() {
        return spacing;
    }
}
