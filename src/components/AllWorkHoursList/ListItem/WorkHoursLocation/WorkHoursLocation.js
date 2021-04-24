import Place from '@material-ui/icons/Place';

import classes from './WorkHoursLocation.module.css';


const WorkHoursLocation = (props) => {

    return (
        <div className={classes.WorkHoursLocation}>
            <Place className={classes.WorkHoursLocation__icon}/>
            <div className={classes.WorkHoursLocation__location}>{props.location}</div>
        </div>
    );
};

export default WorkHoursLocation;