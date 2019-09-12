import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => ( //export LoginPage for testing purposes. destructuring startLogin
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>Tag line for app.</p>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>        
    </div>    
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage); //since we now have default export we need to remove the brace in the LoginPage on AppRouter.js