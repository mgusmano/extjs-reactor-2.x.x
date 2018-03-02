import React, { Component } from 'react';
import { Grid, Toolbar, Container, Button } from '@extjs/ext-react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Employees from './Employees';
import { reducer } from './reducer';

const store = createStore(reducer);

export default class ReduxGridExample extends Component {

    render() {
        return (
            <Provider store={store}>
                <Container layout="fit" padding="10">
                    <Employees/>
                </Container>
            </Provider>
        )
    }

}