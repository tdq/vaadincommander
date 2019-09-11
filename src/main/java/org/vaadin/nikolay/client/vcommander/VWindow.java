package org.vaadin.nikolay.client.vcommander;

/**
 *
 */
public class VWindow extends Plugin {

    static {
        VCommander.registerPlugin(VWindow::new);
    }

    public VWindow(APIBridge apiBridge) {
        super(apiBridge);
    }

    public void drawText(int x, int y, String text, int color, int bgcolor) {
        for(int i = 0; i < text.length(); ++i) {
            this.getApi().setItem(10 + i, 5, new VCommander.Item(text.charAt(i), 1, 15, false));
        }
    }
}
