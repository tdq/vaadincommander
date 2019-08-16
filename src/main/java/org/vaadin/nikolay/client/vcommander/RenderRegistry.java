package org.vaadin.nikolay.client.vcommander;

import java.util.Objects;
import java.util.Timer;
import java.util.TimerTask;

public class RenderRegistry extends Plugin {

    private Application application;
    private boolean invoke;

    static {
        VCommander.registerPlugin(RenderRegistry::new);
    }

    public RenderRegistry(APIBridge apiBridge) {
        super(apiBridge);
    }

    public void registerApplication(Application application) {
        this.application = Objects.requireNonNull(application);
    }

    public void invokeRender() {
        if(!this.invoke) {
            this.invoke = true;
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    if(application != null) {
                        application.render();
                    }

                    invoke = false;
                }
            }, 0);
        }
    }
}
