import Card from '../../UI/Card/Card';
import classes from './ListItem.module.css';
import WorkHoursDate from './WorkHoursDate/WorkHoursDate';
import WorkHoursLocation from './WorkHoursLocation/WorkHoursLocation';
import WorkHoursEmployee from './WorkHoursEmployee/WorkHoursEmployee';
import Button from '../../UI/Button/Button';
import {useHistory} from 'react-router-dom';
import Delete from '@material-ui/icons/Delete';


const ListItem = (props) => {
    const history = useHistory();

    const onEditHandler = () => {
        history.push({
            pathname: `/bearbeiten/${props.id}`,
            state: {
                id: props.id,
                date: props.date,
                customer: props.customer,
                location: props.location,
                token: props.token,
                task: props.task,
                comment: props.comment,
                employee: props.employee,
                workHours: props.workHours,
                chainsawHours: props.chainsawHours,
                machineHours: props.machineHours
            }
        });
    };

    const small =
        <Card className={classes.ListSmall} clicked={props.clicked}>
            <WorkHoursDate date={props.date}/>
            <div className={classes.ListSmallDescription}>
                <h2>{props.customer} - {props.task}</h2>
            </div>
            <WorkHoursLocation location={props.location}/>
            <WorkHoursEmployee
                employee={props.employee}
                token={props.token}/>
            <div className={classes.ListHours}>{props.workHours}h</div>
        </Card>;

    const collapsed =
        <Card className={classes.ListCollapsed} clicked={props.clicked}>
            <div className={classes.ListCollapsedHeader}>
                <h2>{props.customer} - {props.task}</h2>
                <div className={classes.ListHours}>{props.workHours}h</div>
            </div>
            <div className={classes.ListCollapsedBody}>
                {props.comment}
                <div className={classes.ListCollapsedBodyRight}>
                    <span>Chainsaw Hours: {props.chainsawHours}</span>
                    <span>Machine Hours: {props.machineHours}</span>
                    <WorkHoursEmployee
                        employee={props.employee}
                        token={props.token}/>
                    <WorkHoursLocation location={props.location}/>
                </div>
            </div>
            <div className={classes.ListCollapsedFooter}>
                <WorkHoursDate date={props.date}/>
                <Button onClick={onEditHandler}>Bearbeiten</Button>
                <Delete onClick={props.onDeleteHandler} className={classes.DeleteIcon}/>
            </div>
        </Card>;
    return (
        <li>
            {props.isCollapsed ? collapsed : small}
        </li>
    );
};

export default ListItem;