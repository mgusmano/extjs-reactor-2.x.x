import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button } from '@extjs/reactor/modern';
import { generateData } from '../generateSaleData';
import SaleModel from '../SaleModel';

export default class OutlineLayout extends Component {

    store = Ext.create('Ext.data.Store', {
        model: SaleModel,
        data: generateData()
    });

    expandAll = () => { this.refs.pivotgrid.expandAll() }
    collapseAll = () => { this.refs.pivotgrid.collapseAll() }

    render() {
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    ref="pivotgrid"
                    shadow
                    selectable={{ cells: true }}
                    startRowGroupsCollapsed={false}
                    startColGroupsCollapsed={false}
                    matrix={{
                        type: 'local',
                        store: this.store,
                        viewLayoutType: 'outline',
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Total',
                            aggregator: 'sum',
                            width: 110
                        }],
                        leftAxis: [{
                            dataIndex: 'person',
                            header: 'Person',
                            width: 150
                        }, {
                            dataIndex: 'company',
                            header: 'Company',
                            sortable: false,
                            width: 150
                        }, {
                            dataIndex: 'country',
                            header: 'Country',
                            width: 150
                        }],
                        topAxis: [{
                            dataIndex: 'year',
                            header: 'Year'
                        }]
                    }}
                />
                <Toolbar
                    shadow={false}
                    docked="top"
                    padding="5 8"
                    layout={{
                        type: 'hbox',
                        align: 'stretch'
                    }}
                    ui="app-transparent-toolbar"
                    defaults={{
                        margin: '0 10 0 0',
                        shadow: true,
                        ui: "action"
                    }}
                >
                    <Button text="Expand all" handler={this.expandAll}/>
                    <Button text="Collapse all" handler={this.collapseAll}/>
                </Toolbar>
            </Container>
        )
    }
}