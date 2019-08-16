package org.vaadin.nikolay.client.vcommander;

import java.util.Objects;

/**
 *
 */
public abstract class Plugin {

    private APIBridge apiBridge;

    public Plugin(APIBridge apiBridge) {
        this.apiBridge = Objects.requireNonNull(apiBridge);
    }

    protected APIBridge getApi() {
        return this.apiBridge;
    }
}
