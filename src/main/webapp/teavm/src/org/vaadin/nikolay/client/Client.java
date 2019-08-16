package org.vaadin.nikolay.client;

import org.teavm.classlib.java.util.TTimer;
import org.teavm.classlib.java.util.TTimerTask;
import org.teavm.jso.core.JSObjects;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.xml.Text;
import org.vaadin.nikolay.client.vcommander.VCommander;

public class Client {
    private static int i = 0;

    public static void main(String[] args) {
        /*
        HTMLDocument document = HTMLDocument.current();
        HTMLElement div = document.createElement("div");

        Text textNode = document.createTextNode("TeaVM generated element");
        div.appendChild(textNode);
        document.getBody().appendChild(div);

        HTMLElement button = document.createElement("button");
        button.setInnerHTML("Click me");
        document.getBody().appendChild(button);

        TTimer timer = new TTimer();

         */

        CustomElement.registerCustomComponent("v-commander", VCommander.class, VCommander::new);

        /*
        button.addEventListener("click", event -> {
            i = 0;

            timer.schedule(new TTimerTask() {
                @Override
                public void run() {
                    textNode.setNodeValue("Value: " + ++i);

                    if(i > 100) {
                        timer.cancel();
                    }
                }
            }, 0, 100);
        });

         */
    }
}
