import React, { Component } from 'react';
import { FormPanel, ComboBoxField } from '@extjs/ext-react';
import data from './data';

export default class ComboBoxFieldExample extends Component {

    render() {
        return (
            <FormPanel shadow>
                <ComboBoxField
                    width={200}
                    label="State"
                    store={data}
                    displayField="name"
                    valueField="abbrev"
                    queryMode="local"
                    labelAlign="placeholder"
                    clearable
                />
            </FormPanel>
        )
    }

}