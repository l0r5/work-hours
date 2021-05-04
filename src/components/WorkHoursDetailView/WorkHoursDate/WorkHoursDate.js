import DateRange from '@material-ui/icons/DateRange';

import classes from './WorkHoursDate.module.css';


const WorkHoursDate = (props) => {
    const day = new Date(props.date).toLocaleString('de-DE', {day: '2-digit'});
    const month = new Date(props.date).toLocaleString('de-DE', {month: 'long'});
    const year =new Date(props.date).getFullYear();

    return (
        <div className={classes.WorkHoursDate}>
            <DateRange className={classes.WorkHoursDate__icon}/>
            <span className={classes.WorkHoursDate__day}>{day}</span>
            <span className={classes.WorkHoursDate__month}>{month}</span>
            <span>{year}</span>
        </div>
    );
};

export default WorkHoursDate;