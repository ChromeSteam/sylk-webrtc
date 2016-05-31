'use strict';

const React          = require('react');
const ReactBootstrap = require('react-bootstrap');
const Modal          = ReactBootstrap.Modal;


const IncomingCallModal = (props) => {
    let callType = 'Audio';
    if (props.call !== null && props.call.mediaTypes.video) {
        callType = 'Video';
    }

    let remoteIdentity = '';
    if (props.call !== null) {
        remoteIdentity = props.call.remoteIdentity.toString();
    }

    return (
        <Modal show={props.show} onHide={props.onHide} aria-labelledby="modal-title-sm">
            <Modal.Header closeButton>
                <Modal.Title id="modal-title-sm">Incoming {callType} call</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-3">
                        <i className="fa-3x fa fa-bell faa-ring animated"></i>
                    </div>
                    <div className="col-md-9 text-left">
                        <p className="lead">From: {remoteIdentity}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="btn-group btn-group-justified" role="group">
                    <div className="btn-group" role="group">
                        <button className="btn btn-danger" onClick={props.onHide}><i className="fa fa-phone rotate-135"></i></button>
                    </div>
                    <div className="btn-group" role="group">
                        <button className="btn btn-success" onClick={props.onAnswer}><i className="fa fa-phone"></i></button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

IncomingCallModal.propTypes = {
    show     : React.PropTypes.bool.isRequired,
    call     : React.PropTypes.object,
    onAnswer : React.PropTypes.func.isRequired,
    onHide   : React.PropTypes.func.isRequired
};


module.exports = IncomingCallModal;
