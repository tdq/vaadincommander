package org.vaadin.nikolay.client.vcommander;

import org.teavm.jso.dom.events.KeyboardEvent;
import org.vaadin.nikolay.client.vcommander.components.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 *
 */
public class Navigation extends Plugin {

    private List<Component> focusableComponents = new ArrayList<>();
    private int focusId = 0;

    static {
        VCommander.registerPlugin(Navigation::new);
    }

    /**
     * @param apiBridge
     */
    public Navigation(APIBridge apiBridge) {
        super(apiBridge);

        // Should be implemented in some navigation plugin
        apiBridge.addEventListener("keydown", e -> {
            KeyboardEvent event = (KeyboardEvent) e;

            if(focusableComponents.isEmpty()) {
                return;
            }

            Component currentComponent = focusableComponents.get(focusId);

            if(currentComponent.isPreventDefault()) {
                return;
            }

            if("ArrowRight".equals(event.getKey()) || "Tab".equals(event.getKey())) {
                if(currentComponent.isFocused()) {
                    currentComponent.setFocused(false);
                    focusId++;

                    if(focusId >= focusableComponents.size()) {
                        focusId = 0;
                    }

                    focusableComponents.get(focusId).setFocused(true);
                } else {
                    currentComponent.setFocused(true);
                }
            } else if("ArrowLeft".equals(event.getKey())) {
                if(currentComponent.isFocused()) {
                    currentComponent.setFocused(false);
                    focusId--;

                    if(focusId < 0) {
                        focusId = focusableComponents.size() - 1;
                    }

                    focusableComponents.get(focusId).setFocused(true);
                } else {
                    currentComponent.setFocused(true);
                }
            }
        });
    }

    /**
     * Register component for navigation
     * @param component
     */
    public void registerComponent(Component component) {
        focusableComponents.add(Objects.requireNonNull(component));
    }

    /**
     * Unregister component
     * @param component
     */
    public void unregisterComponent(Component component) {
        focusableComponents.remove(Objects.requireNonNull(component));
    }
}
