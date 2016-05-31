'use strict';

const React      = require('react');
const classNames = require('classnames');


const StatusBox = (props) => {
    const classes = classNames({
        'alert' : true,
        'alert-warning' : props.level === 'warning',
        'alert-danger'  : props.level === 'danger',
        'alert-info'    : props.level === 'info'
    });

    const widthClasses = classNames({
        'form-signin' : props.width === 'small' || !props.width,
        'form-dial'   : props.width === 'medium',
        'halfWidth'   : props.width === 'large'
    });

    let message;
    if (props.title) {
        message = (<div><strong>{props.title}</strong><br/>{props.message}</div>);
    } else {
        message = (<div><strong>{props.message}</strong></div>);
    }

    return (
        <div className={widthClasses}>
            <div className={classes} role="alert">
                {message}
            </div>
        </div>
    );
};

StatusBox.propTypes = {
    level: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    width: React.PropTypes.oneOf(['small', 'medium','large'])
};


module.exports = StatusBox;
