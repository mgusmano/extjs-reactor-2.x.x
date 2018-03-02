import React, { Component } from 'react';
import { Spacer, ToggleField, Container, Panel, Button, Menu, MenuItem, MenuRadioItem } from '@extjs/ext-react';

export default class ButtonExample extends Component {
    
    state = {
        style: '',
        type: 'text',
        round: false
    };

    onStyleChange = (item) => this.setState({ style: item.value })
    onTypeChange = (item) => this.setState({ type: item.value })
    toggleRound = () => this.setState({ round: !this.state.round });

    render() {
        const { style, type, round } = this.state;
        const iconCls = type.indexOf('icon') !== -1 ? 'x-fa fa-heart' : null;
        const text = type.indexOf('text') !== -1;

        let menu, ui;

        if (style === 'menu') {
            menu = (
                <Menu indented={false}>
                    <MenuItem text="Item 1"/>
                    <MenuItem text="Item 2"/>
                    <MenuItem text="Item 3"/>
                </Menu>
            );
        } else {
            ui = style.toLowerCase();
        }

        if (round) {
            ui += ' round';
        }

        return (
            <Container padding="10">
                <Container 
                    layout={{ type: 'hbox', pack: Ext.os.is.Phone ? 'center' : 'left'}} 
                    margin="0 0 10 0" 
                    defaults={{ margin: "0 10 0 0" }}
                    width={Ext.isIE && 550}
                >
                    <Button ui="action raised" text="Style">
                        <Menu defaults={{ handler: this.onStyleChange, group: 'buttonstyle' }}>
                            <MenuItem text="None" value="" iconCls={style === '' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Action" value="action" iconCls={style === 'action' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Decline" value="decline" iconCls={style === 'decline' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Confirm" value="confirm" iconCls={style === 'confirm' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Menu" value="menu" iconCls={style === 'menu' && 'x-font-icon md-icon-check'}/>
                        </Menu>
                    </Button>
                    <Button ui="action raised" text="Type">
                        <Menu defaults={{ handler: this.onTypeChange, group: 'buttontype' }}>
                            <MenuItem text="Text" value="text" iconCls={type === 'text' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Icon" value="icon" iconCls={type === 'icon' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Text & Icon" value="texticon" iconCls={type === 'texticon' && 'x-font-icon md-icon-check'}/>
                        </Menu>
                    </Button>
                    <Button ui="action raised" iconCls={round ? 'x-fa fa-check' : null} enableToggle text="Round" handler={this.toggleRound}/>
                </Container>

                <Panel { ...layoutProps }>
                    <Container>
                        <div {...groupLabelProps}>Default</div>
                        <Container className="button-group" {...buttonGroupProps}>
                            <Button text={ text && "Normal" } ui={ui} iconCls={iconCls} arrowAlign="bottom">{menu}</Button>
                            <Button text={ text && "Badge" } ui={ui} iconCls={iconCls} badgeText="2">{menu}</Button>
                            <Button text={ text && "Disabled" } ui={ui} iconCls={iconCls} disabled>{menu}</Button>
                        </Container>
                    </Container>
                    <Container>
                        <div {...groupLabelProps}>Alt</div>
                        <Container className="button-group button-group-alt" {...buttonGroupProps}>
                            <Button text={ text && "Normal" } ui={ui + ' alt'} iconCls={iconCls}>{menu}</Button>
                            <Button text={ text && "Badge" } ui={ui + ' alt'} iconCls={iconCls} badgeText="2">{menu}</Button>
                            <Button text={ text && "Disabled" } ui={ui + ' alt'} iconCls={iconCls} disabled>{menu}</Button>
                        </Container>
                    </Container>
                    <Container>
                        <div {...groupLabelProps}>Raised</div>
                        <Container className="button-group" {...buttonGroupProps}>
                            <Button text={ text && "Normal" } ui={ui + ' raised'} iconCls={iconCls}>{menu}</Button>
                            <Button text={ text && "Badge" } ui={ui + ' raised'} iconCls={iconCls} badgeText="2">{menu}</Button>
                            <Button text={ text && "Disabled" } ui={ui + ' raised'} iconCls={iconCls} disabled>{menu}</Button>
                        </Container>
                    </Container>
                    <Container>
                        <div {...groupLabelProps}>Alt Raised</div>
                        <Container className="button-group button-group-alt" {...buttonGroupProps}>
                            <Button text={ text && "Normal" } ui={ui + ' alt raised'} iconCls={iconCls}>{menu}</Button>
                            <Button text={ text && "Badge" } ui={ui + ' alt raised'} iconCls={iconCls} badgeText="2">{menu}</Button>
                            <Button text={ text && "Disabled" } ui={ui + ' alt raised'} iconCls={iconCls} disabled>{menu}</Button>
                        </Container>
                    </Container>
                </Panel>
            </Container>
        )
    }
}


const layoutProps = Ext.os.is.Phone ? {
    height: '100%',
    width: '100%',
    className: 'demo-buttons',
    defaults: {
        margin: '20'
    }
} : {
    padding: 10,
    shadow: true,
    defaults: {
        layout: 'hbox',
        flex: 1,
        margin: '10',
        width: '100%'
    }        
}

const buttonGroupProps = Ext.os.is.Phone ? {
    padding: '20 0 0 20',
    defaults: {
        margin: '0 20 20 0',
        width: 'calc(50% - 20px)',
    }
} : {
    padding: '17 0 17 20',
    layout: { type: 'hbox', align: 'middle', pack: 'space-around' },
    flex: 1,
    margin: '0 20 0 0',
    width: 400,
    defaults: {
        margin: '0 20 0 0'
    }
}

const groupLabelProps = Ext.os.is.Phone ? {
    style: {
        margin: '0 0 5px 0'
    }
} : {
    style: {
        width: '70px',
        textAlign: 'right',
        margin: '24px 20px 0 0'
    }
};
