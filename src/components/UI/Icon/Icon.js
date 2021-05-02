import classes from './Icon.module.css';


const Icon = (props) => {
    return (
        <div className={classes.Icon}>
            {props.children}
        </div>
    );
};

export default Icon;