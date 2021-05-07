import classes from './ErrorModal.module.css'
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {Error,} from '@material-ui/icons';
import React from 'react';

const ErrorModal = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <div className={classes.Header}>
                <Icon><Error/></Icon>
            </div>
            <div className={classes.Body}>
                <h2>{props.header}</h2>
                <p>{props.children}</p>
            </div>
            <div className={classes.BackButton}>
                <Button onClick={props.onClose}>Zurück</Button>
            </div>
        </Modal>
    );
};

export default ErrorModal;