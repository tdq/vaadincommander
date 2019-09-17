package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Navigation;
import org.vaadin.nikolay.client.vcommander.Palette;
import org.vaadin.nikolay.client.vcommander.Palette16;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.Objects;

/**
 *
 */
public class TextField extends Component {

    private StringBuilder value = new StringBuilder();
    private String placeHolder = "";
    private int renderValuePos = 0;
    private int cursorPos = 0;
    private int carretPos = 0;
    private boolean editMode;
    private ValueChangeListener<String> changeListener;
    private ValueChangeListener<String> editListener;

    {
        VCommander.getPlugin(Navigation.class).registerComponent(this);
        VCommander.getPlugin(EventBus.class).registerEvent(this, e -> {
            if("Enter".equals(e.getKey())) {
                this.editMode = !this.editMode;
                setPreventDefault(!isPreventDefault());

                // TODO check if value was changed
                if(!this.editMode && this.changeListener != null) {
                    this.changeListener.onChange(this.value.toString());
                }

                if(this.editMode) {
                    //this.cursorPos = Math.min(this.value.length(), getWidth() - 1);
                    setCarretPos(0);
                }

                this.renderValuePos = 0;

                super.markAsDirty();
            }

            if(this.editMode) {
                if("ArrowRight".equals(e.getKey())) {
                    this.setCarretPos(this.carretPos + 1);

                    super.markAsDirty();
                } else if("ArrowLeft".equals(e.getKey())) {
                    this.setCarretPos(this.carretPos - 1);

                    super.markAsDirty();
                } else if("Home".equals(e.getKey())) {
                    this.setCarretPos(0);

                    super.markAsDirty();
                } else if("End".equals(e.getKey())) {
                    this.setCarretPos(this.value.length());

                    super.markAsDirty();
                } else if("Backspace".equals(e.getKey())) {
                    if(this.carretPos > 0) {
                        this.value.deleteCharAt(this.carretPos - 1);
                        this.setCarretPos(this.carretPos - 1);

                        super.markAsDirty();

                        if(editListener != null) {
                            editListener.onChange(getValue());
                        }
                    }
                } else if("Delete".equals(e.getKey())) {
                    if(this.value.length() > 0) {
                        this.value.deleteCharAt(this.carretPos);

                        super.markAsDirty();

                        if(editListener != null) {
                            editListener.onChange(getValue());
                        }
                    }
                } else if(e.getKey().length() == 1) {
                    // Printable symbol, add it into value
                    this.value.insert(this.carretPos, e.getKey());
                    this.setCarretPos(this.carretPos + 1);

                    super.markAsDirty();

                    if(editListener != null) {
                        editListener.onChange(getValue());
                    }
                }
            }
        });

        setWidth(10);
        getStyle().setColor(Palette16.WHITE);
        getStyle().setBgcolor(Palette16.DARK_CYAN);
    }

    /**
     *
     * @param value
     */
    public void setValue(String value) {
        this.value = new StringBuilder(Objects.requireNonNull(value));

        super.markAsDirty();
    }

    /**
     *
     * @return
     */
    public String getValue() {
        return this.value.toString();
    }

    /**
     *
     * @param placeHolder
     */
    public void setPlaceHolder(String placeHolder) {
        this.placeHolder = Objects.requireNonNull(placeHolder);
    }

    /**
     *
     * @param listener
     */
    public void setValueChangeListener(ValueChangeListener<String> listener) {
        this.changeListener = Objects.requireNonNull(listener);
    }

    /**
     *
     * @param listener
     */
    public void setValueEditListener(ValueChangeListener<String> listener) {
        this.editListener = Objects.requireNonNull(listener);
    }

    private void setCarretPos(int pos) {
        if(pos < 0) {
            this.carretPos = 0;
        } else if(pos > this.value.length()) {
            this.carretPos = this.value.length();
        } else {
            this.carretPos = pos;
        }

        int width = getWidth();

        // Carret stil in the window
        if(this.carretPos >= this.renderValuePos && this.carretPos < this.renderValuePos + width) {
            this.cursorPos = this.carretPos - this.renderValuePos;
        } else if(this.carretPos < this.renderValuePos) {
            // Carret pos before window
            this.cursorPos = 0;
            this.renderValuePos = this.carretPos;
        } else {
            // Carret pos after window
            this.cursorPos = width - 1;
            this.renderValuePos = this.carretPos - width + 1;
        }
    }

    @Override
    public int getHeight() {
        return 1;
    }

    @Override
    public void render(APIBridge api) {
        String text = value.length() == 0 && !editMode ? placeHolder : value.toString();

        int width = getWidth();
        int valueSize = text.length();
        Palette color = editMode ? Palette16.WHITE : isFocused() ? Palette16.BLACK : getStyle().getColor();
        Palette bgcolor = editMode ? Palette16.BLACK : isFocused() ? Palette16.DARK_WHITE : getStyle().getBgcolor();

        for(int i = 0; i < width; ++i) {
            int currentPos = renderValuePos + i;

            if(currentPos < valueSize && currentPos >= 0) {
                api.setItem(i, 0, new VCommander.Item(text.charAt(currentPos), color, i == cursorPos && editMode ? Palette16.DARK_RED : bgcolor));
            } else {
                api.setItem(i, 0, new VCommander.Item((char) 0, color, i == cursorPos && editMode ? Palette16.DARK_RED : bgcolor));
            }
        }
    }
}
