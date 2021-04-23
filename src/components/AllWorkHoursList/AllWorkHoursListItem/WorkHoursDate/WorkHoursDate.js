import CalendarToday from '@material-ui/icons/CalendarToday';

import classes from './WorkHoursDate.module.css';


const WorkHoursDate = (props) => {
    const month = props.date.toLocaleString('de-DE', {month: 'long'});
    const day = props.date.toLocaleString('de-DE', {day: '2-digit'});
    const year = props.date.getFullYear();

    return (
        <div className={classes.WorkHoursDate}>
            <CalendarToday className={classes.WorkHoursDate__icon}/>
            <span className={classes.WorkHoursDate__day}>{day}</span>
            <span className={classes.WorkHoursDate__month}>{month}</span>
            <span className={classes.WorkHoursDate__year}>{year}</span>
        </div>
    );
};

export default WorkHoursDate;