package org.vaadin.nikolay.client.vcommander;

import java.util.Objects;

/**
 *
 */
public abstract class Plugin {

    private APIBridge apiBridge;

    /**
     *
     * @param apiBridge
     */
    public Plugin(APIBridge apiBridge) {
        this.apiBridge = Objects.requireNonNull(apiBridge);
    }

    /**
     *
     * @return
     */
    protected APIBridge getApi() {
        return this.apiBridge;
    }
}
