import {Fragment} from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';


const ModalOverlay = (props) => {
    return (
        <div className={classes.Modal}>
            <div className={classes.Content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop show onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;
