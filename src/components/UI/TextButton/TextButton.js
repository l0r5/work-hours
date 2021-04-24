import classes from './TextButton.module.css';

const TextButton = (props) => {
    return (
        <button
            onClick={props.clicked}
            className={classes.TextButton}>
            {props.children}
        </button>
    );
};

export default TextButton;
