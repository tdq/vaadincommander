package org.vaadin.nikolay.client.vcommander.components;

import org.teavm.jso.dom.events.KeyboardEvent;
import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Plugin;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 *
 */
public class EventBus extends Plugin {

    private final Map<Component, ComponentEvent> events = new HashMap<>();

    static {
        VCommander.registerPlugin(EventBus::new);
    }

    /**
     * @param api
     */
    public EventBus(APIBridge api) {
        super(api);

        api.addEventListener("keydown", e -> {
            this.events.keySet().forEach(component -> {
                if(component.isFocused()) {
                    e.preventDefault();
                    this.events.get(component).call((KeyboardEvent) e);
                }
            });
        });
    }

    /**
     *
     */
    public void registerEvent(Component component, ComponentEvent action) {
        Objects.requireNonNull(component);
        Objects.requireNonNull(action);

        this.events.put(component, action);
    }

    /**
     *
     */
    public void removeEvent(Component component) {
        this.events.remove(Objects.requireNonNull(component));
    }

    /**
     *
     */
    public interface ComponentEvent {
        void call(KeyboardEvent event);
    }
}
