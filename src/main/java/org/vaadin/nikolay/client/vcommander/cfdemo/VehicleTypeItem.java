package org.vaadin.nikolay.client.vcommander.cfdemo;

import org.vaadin.nikolay.client.vcommander.components.ListBox;

import java.util.Objects;

/**
 *
 */
class VehicleTypeItem implements ListBox.ListBoxItem<VehicleTypeItem.VehicleType> {

    private VehicleType vehicleType;

    /**
     *
     * @param vehicleType
     */
    VehicleTypeItem(VehicleType vehicleType) {
        this.vehicleType = Objects.requireNonNull(vehicleType);
    }

    @Override
    public String getCaption() {
        return vehicleType.getCaption();
    }

    @Override
    public VehicleType getValue() {
        return vehicleType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VehicleTypeItem that = (VehicleTypeItem) o;
        return vehicleType == that.vehicleType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(vehicleType);
    }

    /**
     *
     */
    enum VehicleType {
        CAR("AUTOCA"), MOTOCICLE("MOTOCICLETA"), BUS("AUTOBÚS"), TRUCK("CAMIÓN");

        private String caption;

        VehicleType(String caption) {
            this.caption = caption;
        }

        /**
         *
         * @return
         */
        String getCaption() {
            return caption;
        }
    }
}
