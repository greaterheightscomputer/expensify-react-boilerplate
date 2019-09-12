import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,  
    ...rest 
}) => (
    <Route {...rest}  component={(props) => ( 
        isAuthenticated ? (
            <Redirect to="/dashboard" />            
        ) : (
            <Component {...props} />  //its means all component properties on the AppRouter.js page which LoginPage is one of them
        )
    )}
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);