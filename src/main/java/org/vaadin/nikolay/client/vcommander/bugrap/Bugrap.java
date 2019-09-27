package org.vaadin.nikolay.client.vcommander.bugrap;

import org.vaadin.nikolay.client.vcommander.APIBridge;
import org.vaadin.nikolay.client.vcommander.Application;
import org.vaadin.nikolay.client.vcommander.Palette16;
import org.vaadin.nikolay.client.vcommander.components.Button;
import org.vaadin.nikolay.client.vcommander.components.ComboBox;
import org.vaadin.nikolay.client.vcommander.components.Component;
import org.vaadin.nikolay.client.vcommander.components.HorizontalLayout;
import org.vaadin.nikolay.client.vcommander.components.Label;
import org.vaadin.nikolay.client.vcommander.components.Panel;
import org.vaadin.nikolay.client.vcommander.components.TextField;
import org.vaadin.nikolay.client.vcommander.components.TextItem;
import org.vaadin.nikolay.client.vcommander.components.VerticalLayout;

public class Bugrap extends Application {

    /**
     * @param api
     */
    public Bugrap(APIBridge api) {
        super(api);
    }

    @Override
    public void exec() {
        Panel panel = new Panel();
        panel.setWidth(getApi().getBufferWidth());
        panel.setHeight(getApi().getBufferHeight());
        panel.getStyle().setBgcolor(Palette16.GRAPHITE);
        panel.getStyle().setColor(Palette16.SNOW);

        VerticalLayout content = new VerticalLayout();
        content.setSpacing(true);

        content.add(prepareHeader());
        content.add(prepareBar());
        content.add(projectInfo());
        content.add(filtersBar());

        panel.setContent(content);

        setContent(panel);
    }

    private Component prepareHeader() {
        HorizontalLayout layout = new HorizontalLayout();

        ComboBox<TextItem> projectSelect = new ComboBox<>();
        projectSelect.setPlaceHolder("Select project");
        projectSelect.addItem(new TextItem("Item 1"));
        projectSelect.addItem(new TextItem("Item 2"));
        projectSelect.addItem(new TextItem("Item 3"));
        projectSelect.addItem(new TextItem("Item 4"));
        projectSelect.addItem(new TextItem("Item 5"));
        projectSelect.addItem(new TextItem("Item 6"));
        projectSelect.addItem(new TextItem("Item 7"));
        projectSelect.setWidth(50);

        Button accountBtn = new Button("Marc Manager");

        Button logoutBtn = new Button("Logout");

        layout.setExspandRatio(projectSelect, 100);

        layout.add(projectSelect);
        layout.add(accountBtn);
        layout.add(logoutBtn);

        return layout;
    }

    private Component prepareBar() {
        HorizontalLayout layout = new HorizontalLayout();

        Button reportBug = new Button("Report a bug");
        Button requestFeature = new Button("Request a feature");
        Label delimiter = new Label("|");
        Button manageProject = new Button("Manage project");

        Label projectsCounter = new Label("123");
        projectsCounter.getStyle().setBgcolor(Palette16.SAND);
        projectsCounter.getStyle().setColor(Palette16.BLACK);

        TextField reportSearch = new TextField();
        reportSearch.setPlaceHolder("Search reports...");
        reportSearch.setWidth(30);
        layout.setExspandRatio(reportSearch, 100);

        Button clearSearch = new Button("x");
        clearSearch.setWidth(3);

        HorizontalLayout reportSearchLayout = new HorizontalLayout();
        reportSearchLayout.add(reportSearch);
        reportSearchLayout.add(clearSearch);
        layout.setExspandRatio(reportSearchLayout, 100f);

        layout.add(reportBug);
        layout.add(requestFeature);
        layout.add(delimiter);
        layout.add(manageProject);
        layout.add(projectsCounter);
        layout.add(reportSearchLayout);

        return layout;
    }

    private Component projectInfo() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);

        Label reportsFor = new Label("Reports for");

        TextItem currentBranch = new TextItem("1.2.3-pre12");
        ComboBox<TextItem> branches = new ComboBox<>();
        branches.addItem(currentBranch);
        branches.addItem(new TextItem("1.2.3-pre11"));
        branches.addItem(new TextItem("1.2.3-pre10"));
        branches.addItem(new TextItem("1.2.3-pre9"));
        branches.addItem(new TextItem("1.2.3-pre8"));
        branches.addItem(new TextItem("1.2.2"));
        branches.addItem(new TextItem("1.2.1"));
        branches.addItem(new TextItem("1.2.0"));
        branches.setValue(currentBranch);

        DistributionBar distributionBar = new DistributionBar();
        distributionBar.setClosedAmount(5);
        distributionBar.setAssignedAmount(15);
        distributionBar.setUnassignedAmount(180);

        layout.setExspandRatio(distributionBar, 100f);

        layout.add(reportsFor);
        layout.add(branches);
        layout.add(distributionBar);

        return layout;
    }

    private Component filtersBar() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);

        Label assignees = new Label("Assignees");
        Button onlyMeBtn = new Button("Only me");
        Button everyoneBtn = new Button("Everyone");

        HorizontalLayout assigneesLayout = new HorizontalLayout();
        assigneesLayout.add(onlyMeBtn);
        assigneesLayout.add(everyoneBtn);

        Label status = new Label("Status");
        Button openBtn = new Button("Open");
        Button allKindsBtn = new Button("All kinds");
        ComboBox<TextItem> custom = new ComboBox<>();

        HorizontalLayout statusLayout = new HorizontalLayout();
        statusLayout.add(openBtn);
        statusLayout.add(allKindsBtn);
        statusLayout.add(custom);

        layout.add(assignees);
        layout.add(assigneesLayout);
        layout.add(status);
        layout.add(statusLayout);

        return layout;
    }
}
