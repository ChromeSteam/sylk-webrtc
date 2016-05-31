'use strict';

const React      = require('react');
const sylkrtc    = require('sylkrtc');
const classNames = require('classnames');

const EnrollmentModal = require('./EnrollmentModal');


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        let state = {
            accountId: '',
            password: '',
            registering: false,
            showEnrollmentModal: false
        };
        let data = window.localStorage.getItem('blinkAccount');
        if (data) {
            let accountData = JSON.parse(data);
            Object.assign(state, accountData);
        }
        this.state = state;
        // ES6 classes no longer autobind
        this.handleAccountIdChange = this.handleAccountIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnrollment = this.handleEnrollment.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    handleAccountIdChange(event) {
        this.setState({accountId: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleRegistration(this.state.accountId, this.state.password, false);
    }

    handleEnrollment(account) {
        this.setState({showEnrollmentModal: false});
        if (account !== null) {
            this.setState({accountId: account.accountId, password: account.password, registering: true});
            this.props.handleRegistration(account.accountId, account.password, false);
        }
    }

    createAccount() {
        this.setState({showEnrollmentModal: true});
    }

    render() {
        let validInput = this.state.accountId.indexOf('@') !== -1 && this.state.password !== 0;
        let classes = classNames({
            'capitalize' : true,
            'btn'        : true,
            'btn-lg'     : true,
            'btn-block'  : true,
            'btn-default': !validInput,
            'btn-primary': validInput && !this.state.registering,
            'btn-info'   : this.state.registering
        });

        return (
            <div>
                <p className="lead">Sign in to continue</p>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <label htmlFor="inputEmail" className="sr-only">Sip Account</label>
                    <div className="input-group">
                        <span className="input-group-addon first"><i className="fa fa-globe fa-fw"></i></span>
                        <input type="email" id="inputUser" className="form-control" placeholder="Enter your SIP address" value={this.state.accountId} onChange={this.handleAccountIdChange} required autoFocus/>
                    </div>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <div className="input-group">
                        <span className="input-group-addon second"><i className="fa fa-lock fa-fw"></i></span>
                        <input type="password" id="inputPassword" ref="pass" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} required />
                    </div>
                    <button type="submit" className={classes} disabled={this.props.registrationInProgress || !validInput}>Sign In</button>
                </form>
                <p>No SIP account? <button className="btn-link" onClick={this.createAccount}>Create an account</button></p>
                <EnrollmentModal show={this.state.showEnrollmentModal} handleEnrollment={this.handleEnrollment} />
            </div>
        );
    }
}

RegisterForm.propTypes = {
    handleRegistration     : React.PropTypes.func.isRequired,
    registrationInProgress : React.PropTypes.bool.isRequired
};


module.exports = RegisterForm;
