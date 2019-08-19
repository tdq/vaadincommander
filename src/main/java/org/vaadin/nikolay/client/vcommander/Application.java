package org.vaadin.nikolay.client.vcommander;

import org.vaadin.nikolay.client.vcommander.components.Component;

import java.util.Objects;

/**
 *
 */
public abstract class Application {

    private APIBridge api;
    private Component content;

    /**
     *
     * @param api
     */
    protected Application(APIBridge api) {
        this.api = api;
    }

    /**
     *
     * @param content
     */
    protected void setContent(Component content) {
        this.content = Objects.requireNonNull(content);

        VCommander.getPlugin(RenderRegistry.class).registerApplication(this);
    }

    /**
     *
     * @return
     */
    protected APIBridge getApi() {
        return this.api;
    }

    /**
     *
     */
    public abstract void exec();

    /**
     *
     */
    public void render() {
        if(this.content != null && this.api != null) {
            this.content.render(api);
        }
    }
}
