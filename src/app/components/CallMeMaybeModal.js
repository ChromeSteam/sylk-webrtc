'use strict';

const React          = require('react');
const ReactBootstrap = require('react-bootstrap');
const Modal          = ReactBootstrap.Modal;

const utils          = require('../utils');


class CallMeMaybeModal extends React.Component {
    constructor(props) {
        super(props);

        // ES6 classes no longer autobind
        this.handleClipboardButton = this.handleClipboardButton.bind(this);

        const sipUri = this.props.callUrl.split('/').slice(-1)[0];    // hack!
        const emailMessage = `You can call me using a Web browser at ${this.props.callUrl} or a SIP client at ${sipUri} ` +
                             'or by using the freely available Sylk WebRTC client app at http://sylkserver.com';
        const subject = 'Call me, maybe?';

        this.emailLink = `mailto:?subject=${encodeURI(subject)}&body=${encodeURI(emailMessage)}`;
    }

    handleClipboardButton(event) {
        utils.copyToClipboard(this.props.callUrl);
        this.props.notificationCenter().postSystemNotification('Call me, maybe?', {body: 'URL copied to the clipboard'});
        this.props.close();
    }

    render() {

        return (
            <Modal enforceFocus={false} show={this.props.show} onHide={this.props.close} aria-labelledby="cmodal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="cmodal-title-sm">Call me, maybe?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Share <strong><a href={this.props.callUrl} target="_blank" rel="noopener noreferrer">this link</a></strong> with others so they can easily call you.
                        <br />
                        You can copy it to the clipboard or send it via email.
                    </p>
                    <div className="text-center">
                        <div className="button-group-lg btn-group">
                            <button className="btn btn-lg btn-primary" onClick={this.handleClipboardButton} >
                                <i className="fa fa-clipboard"></i>
                            </button>
                            <a className="btn btn-lg btn-primary" href={this.emailLink} >
                                <i className="fa fa-envelope-o"></i>
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

CallMeMaybeModal.propTypes = {
    show               : React.PropTypes.bool.isRequired,
    close              : React.PropTypes.func.isRequired,
    callUrl            : React.PropTypes.string.isRequired,
    notificationCenter : React.PropTypes.func.isRequired
};


module.exports = CallMeMaybeModal;
