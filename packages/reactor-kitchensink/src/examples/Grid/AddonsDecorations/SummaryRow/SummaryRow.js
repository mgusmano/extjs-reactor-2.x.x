import React, {Component} from 'react';
import { Grid, Column, RendererCell } from '@extjs/ext-react';
import model from '../../CompanyModel';
import { Template } from '@extjs/reactor';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Average',
    'Ext.data.summary.Max',
]);

export default class RowBodyGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json'
        } 
    });

    render() {
        return (
            <Grid
                title="Summary Row Grid"
                store={this.store}
                shadow
                plugins={{
                    gridsummaryrow: true
                }}
            >
                <Column 
                    text="Company" 
                    dataIndex="name" 
                    width="150"
                    summaryRenderer={this.summarizeCompanies}
                />
                <Column 
                    text="Price" 
                    width="75" 
                    dataIndex="price" 
                    formatter="usMoney" 
                    summary="average"
                />
                <Column 
                    text="Change" 
                    width="90" 
                    dataIndex="priceChange" 
                    renderer={this.renderSign.bind(this, '0.00')}
                    summary="max" 
                />
                <Column 
                    text="% Change" 
                    width="100"
                    dataIndex="priceChangePct" 
                    renderer={this.renderSign.bind(this, '0.00%')}
                    summary="average" 
                />
                <Column 
                    text="Last Updated" 
                    width="125" 
                    dataIndex="lastChange" 
                    formatter="date('m/d/Y')" 
                    summary="max"
                />
            </Grid>
        )
    }
    
    renderSign = (format, value) => (
        <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
            {Ext.util.Format.number(value, format)}
        </span>
    )

    summarizeCompanies = (grid, context) => context.records.length + ' Companies';
}