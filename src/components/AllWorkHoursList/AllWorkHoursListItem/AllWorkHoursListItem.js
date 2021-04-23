import Card from '../../UI/Card/Card';
import classes from './AllWorkHoursListItem.module.css';

const AllWorkHoursListItem = (props) => {
    console.log(props)

    if (props.length === 0) {
        return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
    }
    return (
        <li>
            <Card className={classes.ExpenseItem}>
                {/*<div>{props.date}</div>*/}
                <div className={classes.ExpenseItemDescription}>
                    <h2>{props.title}</h2>
                    <div className={classes.ExpenseItemPrice}>${props.amount}</div>
                </div>
            </Card>
        </li>
    );
};

export default AllWorkHoursListItem;