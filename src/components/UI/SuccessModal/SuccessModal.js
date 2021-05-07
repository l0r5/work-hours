import classes from './SuccessModal.module.css'
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {CheckCircle} from '@material-ui/icons';
import React from 'react';

const SuccessModal = (props) => {
    return (
        <Modal onClose={props.onNext}>
            <div className={classes.Header}>
                <Icon><CheckCircle/></Icon>
            </div>
            <div className={classes.Body}>
                <h2>{props.header}</h2>
                <p>{props.children}</p>
            </div>
            <div className={classes.ContinueButton}>
                <Button onClick={props.onNext}>Weiter</Button>
            </div>
        </Modal>
    );
};

export default SuccessModal;