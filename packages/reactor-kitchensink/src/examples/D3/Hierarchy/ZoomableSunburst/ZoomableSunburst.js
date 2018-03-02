import React, { Component } from 'react';
import { Panel } from '@extjs/ext-react';
import { D3_Sunburst } from '@extjs/ext-react-d3';

export default class ZoomableSunburst extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        defaultRootText: 'd3',
        fields: [
            'name',
            'path',
            'size',
            {
                name: 'leaf',
                calculate: function (data) {
                    return data.root ? false : !data.children;
                }
            },
            {
                name: 'text',
                calculate: function (data) {
                    return data.name;
                }
            }
        ],
        proxy: {
            type: 'ajax',
            url: 'resources/data/tree/tree.json'
        },
        idProperty: 'path'
    })

    onTooltip = (component, tooltip, node) => {
        const record = node.data,
            size = record.get('size'),
            n = record.childNodes.length;

        tooltip.setHtml(size ?
            Ext.util.Format.fileSize(size) :
            n + ' file' + (n === 1 ? '' : 's') + ' inside.'
        );
    }

    render() {
        return (
            <Panel shadow layout="fit">
                <D3_Sunburst
                    padding={20}
                    store={this.store}
                    tooltip={{ renderer: this.onTooltip }}
                    transitions={{ select: false }}
                    onSelectionChange={(sunburst, node) => sunburst.zoomInNode(node)}
                    expandEventName={false}
                />
            </Panel>
        )
    }
}