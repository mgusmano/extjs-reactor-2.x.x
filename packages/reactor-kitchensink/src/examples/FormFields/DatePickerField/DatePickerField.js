import React from 'react';
import { FormPanel, DatePickerField } from '@extjs/ext-react';

export default function DatePickerFieldExample() {
    return (
        <FormPanel shadow>
            <DatePickerField 
                width={150}
                value={new Date()}
                destroyPickerOnHide
                label="Date"
                picker={{
                    yearFrom: 1990
                }}
            />
        </FormPanel>
    )
}