import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.series.Area',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class BasicAreaChartExample extends Component {

    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name'],
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData(25));
    }

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Cartesian
                    shadow
                    store={this.store}
                    theme={theme}
                    insetPadding="25 35 0 10"
                    platformConfig={{
                        phone: {
                            insetPadding: '15 5 0 0'
                        }
                    }}
                    legend={{
                        type: 'sprite',
                        position: 'bottom'
                    }}
                    interactions={[{
                        type: 'panzoom',
                        axes: {
                            left: {
                                allowPan: false,
                                allowZoom: false
                            },
                            bottom: {
                                allowPan: true,
                                allowZoom: true
                            }
                        }
                    }]}
                    series={[{
                        type: 'area',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5'],
                        title: ['G1', 'G2', 'G3', 'G4', 'G5'],
                        style: {
                            stroke: 'black',
                            lineWidth: 2,
                            fillOpacity: 0.8
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        },
                        grid: {
                            odd: {
                                fill: '#e8e8e8'
                            }
                        },
                        title: {
                            text: 'Summation of Data',
                            fontSize: 20
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: 'name',
                        grid: true,
                        visibleRange: [0, 0.25],
                        title: {
                            text: 'Item Names',
                            fontSize: 20
                        }
                    }]}
                />
            </Container>            
        )
    }
}