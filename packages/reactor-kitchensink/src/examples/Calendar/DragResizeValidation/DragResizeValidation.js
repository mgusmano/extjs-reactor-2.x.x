import React, { Component } from 'react';
import { Calendar_Day } from '@extjs/ext-react-calendar';
import { Panel } from '@extjs/ext-react';
import './data';

export default class CalendarValidationExample extends Component {

    store = Ext.create('Ext.calendar.store.Calendars', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/CalendarValidation'
        }
    })

    onBeforeDragStart = (view, o) => {
        var notAllowed = ['Not draggable', 'Not draggable/resizable'];
        return !Ext.Array.contains(notAllowed, o.event.getTitle());
    }

    onBeforeResizeStart = (view, o) => {
        var notAllowed = ['Not resizable', 'Not draggable/resizable'];
        return !Ext.Array.contains(notAllowed, o.event.getTitle());
    }

    confirmAction = (view, o) => {
        o.validate = o.validate.then(function () {
            return new Ext.Promise(function (resolve, reject) {
                Ext.Msg.confirm('Are you sure', 'Allow the action to go ahead?', function (btn) {
                    resolve(btn === 'yes');
                });
            });
        });
    }

    render() {
        return (
            <Panel
                layout="fit"
                shadow
            >
                <Calendar_Day
                    startTime={8}
                    endTime={18}
                    visibleDays={2}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    store={this.store}
                    value={new Date()}
                    listeners={{
                        beforeeventdragstart: this.onBeforeDragStart,
                        beforeeventresizestart: this.onBeforeResizeStart,
                        validateeventdrop: this.confirmAction,
                        validateeventresize: this.confirmAction,
                        validateeventerase: this.confirmAction
                    }} />
            </Panel>
        )
    }
}