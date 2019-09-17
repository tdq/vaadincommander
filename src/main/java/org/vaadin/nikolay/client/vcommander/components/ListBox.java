package org.vaadin.nikolay.client.vcommander.components;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Navigation;
import org.vaadin.nikolay.client.vcommander.Palette16;
import org.vaadin.nikolay.client.vcommander.VCommander;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class ListBox<T extends ListBox.ListBoxItem> extends Component {

    private List<T> items = new LinkedList<>();
    private int currentItemId = 0;
    private int scrollPos = 0;
    private boolean selectMode;
    private ValueChangeListener<T> changeListener;

    {
        VCommander.getPlugin(Navigation.class).registerComponent(this);
        VCommander.getPlugin(EventBus.class).registerEvent(this, e -> {
            if("Enter".equals(e.getKey())) {
                this.selectMode = !this.selectMode;
                setPreventDefault(!isPreventDefault());

                // TODO check if value was changed
                if(!this.selectMode && this.changeListener != null) {
                    this.getSelectedItem().ifPresent(this.changeListener::onChange);
                }

                super.markAsDirty();
            }

            if(this.selectMode) {
                if("ArrowDown".equals(e.getKey())) {
                    this.setCurrentItemId(currentItemId + 1);

                    super.markAsDirty();
                } else if("ArrowUp".equals(e.getKey())) {
                    this.setCurrentItemId(currentItemId - 1);

                    super.markAsDirty();
                }
            }
        });

        getStyle().setColor(Palette16.DARK_WHITE);
        setHeight(3);
    }

    /**
     *
     * @param item
     */
    public void addItem(T item) {
        items.add(Objects.requireNonNull(item));

        super.markAsDirty();
    }

    /**
     *
     * @return
     */
    public List<T> getItems() {
        return items;
    }

    /**
     *
     * @return
     */
    public Optional<T> getSelectedItem() {
        return Optional.ofNullable(!items.isEmpty() ? items.get(currentItemId) : null);
    }

    /**
     *
     */
    public void deleteSelectedItem() {
        if(!items.isEmpty()) {
            items.remove(currentItemId);

            super.markAsDirty();
        }
    }

    /**
     *
     * @param item
     */
    public void setSelectedItem(T item) {
        Objects.requireNonNull(item);

        for(int i = 0; i < items.size(); ++i) {
            if(items.get(i).equals(item)) {
                setCurrentItemId(i);

                super.markAsDirty();
                return;
            }
        }

        // TODO maybe we have to throgh an exception if such item was not found?
    }

    /**
     *
     * @param listener
     */
    public void setValueChangeListener(ValueChangeListener<T> listener) {
        this.changeListener = Objects.requireNonNull(listener);
    }

    private void setCurrentItemId(int id) {
        if(id >= 0 && id < items.size()) {
            currentItemId = id;
        }

        int height = getHeight();

        if(currentItemId < scrollPos) {
            scrollPos = currentItemId;
        } else if(currentItemId  - scrollPos >= height) {
            scrollPos = currentItemId - height + 1;
        }
    }

    @Override
    public int getWidth() {
        int width = super.getWidth();

        if(width > 0) {
            return width;
        }

        return items.stream().map(ListBoxItem::getCaption).max(String::compareTo).orElse("").length();
    }

    @Override
    public void render(APIBridge api) {
        int width = getWidth();
        int height = getHeight();

        VerticalLayout layout = new VerticalLayout();
        layout.setWidth(width);
        layout.setHeight(height);

        for(int i = 0; i < Math.min(items.size(), height); ++i) {
            int itemId = i + scrollPos;

            Label itemCaption = new Label();
            itemCaption.setValue(items.get(itemId).getCaption());
            itemCaption.setWidth(width);
            itemCaption.getStyle().setZindex(getStyle().getZindex());
            itemCaption.setVisible(isVisible());
            itemCaption.getStyle().setColor(getStyle().getColor());

            if(isFocused()) {
                itemCaption.getStyle().setColor(Palette16.BLACK);
                itemCaption.getStyle().setBgcolor(Palette16.DARK_WHITE);
            }

            if(i + scrollPos == currentItemId && selectMode) {
                itemCaption.getStyle().setBgcolor(Palette16.DARK_RED);
            }

            layout.add(itemCaption);
        }

        layout.render(api);
    }

    /**
     *
     */
    public interface ListBoxItem<T> {
        String getCaption();

        T getValue();
    }
}
