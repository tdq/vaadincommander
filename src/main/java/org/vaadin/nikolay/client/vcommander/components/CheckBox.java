package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.Objects;

/**
 *
 */
public class CheckBox extends Component {

    private String caption = "";
    private boolean checked;
    private ValueChangeListener<Boolean> changeListener;

    {
        VCommander.getPlugin(EventBus.class).registerEvent(this, e -> {
            if("Enter".equals(e.getKey())) {
                this.setChecked(!this.checked);

                if(this.changeListener != null) {
                    this.changeListener.onChange(this.checked);
                }
            }
        });
    }

    /**
     *
     * @param caption
     */
    public void setCaption(String caption) {
        this.caption = Objects.requireNonNull(caption);

        super.markAsDirty();
    }

    /**
     *
     * @param listener
     */
    public void setValueChangeListener(ValueChangeListener<Boolean> listener) {
        this.changeListener = Objects.requireNonNull(listener);
    }

    /**
     *
     */
    public void setChecked(boolean checked) {
        this.checked = checked;

        super.markAsDirty();
    }

    public boolean isChecked() {
        return this.checked;
    }

    @Override
    public int getWidth() {
        return this.caption.length() + 4;
    }

    @Override
    public int getHeight() {
        return 1;
    }

    @Override
    public void render(APIBridge api) {
        Integer color = isFocused() ? (Integer) 0 : getStyle().getColor();
        Integer bgcolor = isFocused() ? (Integer) 7 : getStyle().getBgcolor();

        api.setItem(0, 0, new VCommander.Item('[', color, bgcolor, false));
        api.setItem(1, 0, new VCommander.Item(this.checked ? '\u25A0' : (char) 0, color, bgcolor, false));
        api.setItem(2, 0, new VCommander.Item(']', color, bgcolor, false));
        api.setItem(3, 0, new VCommander.Item((char) 0, color, bgcolor, false));

        for(int i = 0; i < this.caption.length(); ++i) {
            api.setItem(i + 4, 0, new VCommander.Item(this.caption.charAt(i), color, bgcolor, false));
        }
    }
}
