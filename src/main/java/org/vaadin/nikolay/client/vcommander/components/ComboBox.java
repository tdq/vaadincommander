package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Navigation;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.Objects;
import java.util.Optional;

/**
 *
 */
public class ComboBox<T extends ListBox.ListBoxItem> extends Component {

    private ListBox<T> itemsList = new ListBox<>();
    private TextField captionField = new TextField();
    private boolean activeMode;

    {
        VCommander.getPlugin(Navigation.class).registerComponent(this);

        // FIXME the problem is that list box is in the same window with combobox.
        // Should be resolved after popup will be implemented
        VCommander.getPlugin(Navigation.class).unregisterComponent(itemsList);
        VCommander.getPlugin(Navigation.class).unregisterComponent(captionField);

        VCommander.getPlugin(EventBus.class).registerEvent(this, e -> {
            if("Enter".equals(e.getKey())) {
                this.activeMode = !activeMode;
                setPreventDefault(!isPreventDefault());

                // TODO use popup for items list
                itemsList.setVisible(activeMode);
            }
        });

        captionField.setValueEditListener(value -> {
            itemsList.getItems().stream()
                .filter(item -> value.equals(item.getCaption()))
                .findFirst().ifPresent(item -> itemsList.setSelectedItem(item));
        });

        itemsList.setValueChangeListener(value -> {
            captionField.setValue(value.getCaption());
        });

        getStyle().setColor(7);
        setWidth(15);
        captionField.setPlaceHolder("Type here");
        itemsList.setVisible(activeMode);
    }

    /**
     *
     * @param value
     */
    public void setValue(T value) {
        itemsList.setSelectedItem(Objects.requireNonNull(value));
        captionField.setValue(value.getCaption());
    }

    /**
     *
     * @return
     */
    public Optional<T> getValue() {
        return itemsList.getSelectedItem();
    }

    /**
     *
     * @param placeHolder
     */
    public void setPlaceHolder(String placeHolder) {
        captionField.setPlaceHolder(placeHolder);
    }

    /**
     *
     * @param item
     */
    public void addItem(T item) {
        itemsList.addItem(item);
    }

    @Override
    public void setFocused(boolean focused) {
        super.setFocused(focused);

        captionField.setFocused(focused);
        itemsList.setFocused(focused);
    }

    @Override
    public void setWidth(int width) {
        if(width < 3) {
            throw new IllegalArgumentException("ComboBox width can't be less than 3");
        }

        captionField.setWidth(width - 3);
        itemsList.setWidth(width);
    }

    @Override
    public int getWidth() {
        return captionField.getWidth() + 3;
    }

    @Override
    public int getHeight() {
        return 1;
    }

    @Override
    public void render(APIBridge api) {
        VerticalLayout content = new VerticalLayout();
        HorizontalLayout layout = new HorizontalLayout();

        Label dropDownIcon = new Label();
        dropDownIcon.setValue("[v]");
        dropDownIcon.getStyle().setColor(captionField.getStyle().getColor());
        dropDownIcon.getStyle().setBgcolor(captionField.getStyle().getBgcolor());

        layout.add(captionField);
        layout.add(dropDownIcon);

        content.add(layout);

        if(itemsList.isVisible()) {
            content.add(itemsList);
        }

        content.render(api);
    }
}
