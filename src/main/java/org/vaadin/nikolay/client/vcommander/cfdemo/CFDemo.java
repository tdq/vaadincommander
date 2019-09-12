package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Application;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.VerticalLayout;

public class CFDemo extends Application {

    /**
     * @param api
     */
    public CFDemo(APIBridge api) {
        super(api);
    }

    @Override
    public void exec() {
        int width = getApi().getBufferWidth();
        int height = getApi().getBufferHeight();

        VerticalLayout page = new VerticalLayout();
        page.setWidth(width);
        page.setHeight(height);

        Component header = new Header(width);
        Component content = new Content(width, height - header.getHeight());

        page.add(header);
        page.add(content);

        setContent(page);
    }
}
