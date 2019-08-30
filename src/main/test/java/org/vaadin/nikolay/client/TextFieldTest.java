package org.vaadin.nikolay.client;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.TeaVMTestRunner;
import org.vaadin.nikolay.client.vcommander.components.TextField;

@RunWith(TeaVMTestRunner.class)
public class TextFieldTest {

    @Test
    public void testSetValue_valid() {
        TextField textField = new TextField();
        textField.setValue("Test value");

        Assert.assertEquals("Test value", textField.getValue());
    }

    //@Test
    //public void
}
