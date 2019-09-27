package org.vaadin.nikolay.client.vcommander.components;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 *
 */
public abstract class Layout extends Component {

    private final List<Component> components = new ArrayList<>();
    private boolean spacing;
    private final Map<Component, Float> ratios = new HashMap<>();

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

    /**
     *
     * @param component
     * @param ratio
     */
    public void setExspandRatio(Component component, float ratio) {
        Objects.requireNonNull(component);

        if(ratio <= 0) {
            throw new IllegalArgumentException("Ratio can't be negative or zero");
        }

        ratios.put(component, ratio);
    }

    /**
     *
     * @param component
     * @return
     */
    protected float getRatio(Component component) {
        Objects.requireNonNull(component);

        return ratios.getOrDefault(component, 0.0f);
    }
}
