import classes from './AllWorkHoursList.module.css';
import AllWorkHoursListItem from './AllWorkHoursListItem/AllWorkHoursListItem';


const AllWorkHoursList = (props) => {
    if (props.items.length === 0) {
        return <h2 className={classes.AllWorkHoursList__fallback}>Found no Work Hours.</h2>;
    }
    return(<ul className={classes.AllWorkHoursList}>
        {props.items.map((workHoursEntry) => (
            <AllWorkHoursListItem
                key={workHoursEntry.id}
                date={workHoursEntry.date}
                customer={workHoursEntry.customer}
                location={workHoursEntry.location}
                token={workHoursEntry.token}
                task={workHoursEntry.task}
                employee={workHoursEntry.employee}
                workHours={workHoursEntry.workHours}
            />
        ))}
    </ul>);
};

export default AllWorkHoursList;