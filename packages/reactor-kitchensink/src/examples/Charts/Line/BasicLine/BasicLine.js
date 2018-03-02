import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import data from './data';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.series.Line',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Time'
]);

export default class BasicScatterChartExample extends Component {
    
    store = Ext.create('Ext.data.Store', {
        data
    });

    state = {
        theme: 'default'
    };

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Cartesian
                    shadow
                    insetPadding="40 40 60 40"
                    store={this.store}
                    theme={theme}
                    series={{
                        type: 'line',
                        xField: 'time',
                        yField: 'value'
                    }}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: 'value',
                        title: 'USD to Euro'
                    }, {
                        type: 'time',
                        dateFormat: 'Y-m-d',
                        position: 'bottom',
                        fields: 'time',
                        title: 'Date'
                    }]}
                />
            </Container>
        )
    }
}