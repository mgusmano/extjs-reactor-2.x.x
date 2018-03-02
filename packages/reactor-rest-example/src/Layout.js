import React from 'react';
import PropTypes from 'prop-types';
import { TitleBar, Button, Container } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { toggleOptions } from './actions';
import EmployeesGrid from './EmployeesGrid';
import SearchOptions from './SearchOptions';

function Layout({ dispatch, showOptions }) {
    return (
        <Container layout="fit">
            <TitleBar title="ExtReact REST Example" docked="top">
                <Button align="left" iconCls="x-fa fa-bars" handler={() => dispatch(toggleOptions())}/>
            </TitleBar>
            <SearchOptions docked="left" hidden={!showOptions}/>
            <EmployeesGrid shadow/>
        </Container>
    )
}

Layout.propTypes = {
    showOptions: PropTypes.bool
};

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(Layout);
