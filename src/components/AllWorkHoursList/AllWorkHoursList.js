import classes from './AllWorkHoursList.module.css';
import AllWorkHoursListItem from './AllWorkHoursListItem/AllWorkHoursListItem';


const AllWorkHoursList = (props) => {
    return(<ul className={classes.AllWorkHoursList}>
        {props.items.map((expense) => (
            <AllWorkHoursListItem
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
            />
        ))}
    </ul>);
};

export default AllWorkHoursList;