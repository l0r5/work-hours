import Card from '../../UI/Card/Card';
import classes from './AllWorkHoursListItem.module.css';
import WorkHoursDate from './WorkHoursDate/WorkHoursDate';
import WorkHoursLocation from './WorkHoursLocation/WorkHoursLocation';
import WorkHoursEmployee from './WorkHoursEmployee/WorkHoursEmployee';

const AllWorkHoursListItem = (props) => {
    return (
        <li>
            <Card className={classes.WorkHoursList}>
                <WorkHoursDate date={props.date}/>
                <div className={classes.WorkHoursListDescription}><h2>{props.customer} - {props.task}</h2></div>
                <WorkHoursLocation location={props.location}/>
                <WorkHoursEmployee
                    employee={props.employee}
                    token={props.token}/>
                <div className={classes.WorkHoursListHours}>{props.workHours}h</div>
            </Card>
        </li>
    );
};

export default AllWorkHoursListItem;