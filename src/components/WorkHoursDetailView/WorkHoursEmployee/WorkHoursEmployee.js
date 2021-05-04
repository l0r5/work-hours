import Person from '@material-ui/icons/Person';

import classes from './WorkHoursEmployee.module.css';


const WorkHoursEmployee = (props) => {

    return (
        <div className={classes.WorkHoursEmployee}>
            <Person className={classes.WorkHoursEmployee__icon}/>
            <div className={classes.WorkHoursEmployee__employee}>{props.employee} ({props.token})</div>
        </div>
    );
};

export default WorkHoursEmployee;