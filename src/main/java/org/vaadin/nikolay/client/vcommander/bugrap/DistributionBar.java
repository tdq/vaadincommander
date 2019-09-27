package org.vaadin.nikolay.client.vcommander.bugrap;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Palette16;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;

public class DistributionBar extends Component {

    private int closedAmount;
    private int assignedAmount;
    private int unassignedAmount;

    {
        setWidth(30);
    }

    public void setClosedAmount(int value) {
        if(value < 0) {
            throw new IllegalArgumentException("Value can't be negative");
        }

        closedAmount = value;
    }

    public void setAssignedAmount(int value) {
        if(value < 0) {
            throw new IllegalArgumentException("Value can't be negative");
        }

        assignedAmount = value;
    }

    public void setUnassignedAmount(int value) {
        if(value < 0) {
            throw new IllegalArgumentException("Value can't be negative");
        }

        unassignedAmount = value;
    }

    @Override
    public void render(APIBridge api) {
        int width = api.getBufferWidth();
        int totalAmount = closedAmount + assignedAmount + unassignedAmount;

        int closedWidth = Math.max(closedAmount * width / totalAmount, 3);
        int assignedWidth = Math.max(assignedAmount * width / totalAmount, 3);
        int unassignedWidth = Math.max(unassignedAmount * width / totalAmount, 3);

        HorizontalLayout layout = new HorizontalLayout();
        layout.setWidth(width);

        Label closed = new Label(String.valueOf(closedAmount));
        closed.setWidth(closedWidth);
        closed.getStyle().setBgcolor(Palette16.DARK_BLUE);

        Label assigned = new Label(String.valueOf(assignedAmount));
        assigned.setWidth(assignedWidth);
        assigned.getStyle().setBgcolor(Palette16.DARK_GREEN);
        assigned.getStyle().setColor(Palette16.GRAPHITE);

        Label unassigned = new Label(String.valueOf(unassignedAmount));
        unassigned.setWidth(unassignedWidth);
        unassigned.getStyle().setBgcolor(Palette16.DARK_WHITE);
        unassigned.getStyle().setColor(Palette16.GRAPHITE);

        layout.add(closed);
        layout.add(assigned);
        layout.add(unassigned);

        layout.render(api);
    }
}
