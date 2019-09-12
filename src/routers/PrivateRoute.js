import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,  //destructuring component on AppRouter page and renaming it to Component
    ...rest //its refers to the other properties on AppRouter like path, exact  
}) => (
    <Route {...rest}  component={(props) => ( //component property is one of the properties of Route component and pass in arrow function where we write the conditional logic
        isAuthenticated ? (
            <div>
               <Header />
               <Component {...props} />  
            </div>            
        ) : (
            <Redirect to="/" />
        )
    )}
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);