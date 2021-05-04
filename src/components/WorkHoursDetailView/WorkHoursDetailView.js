import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import classes from './WorkHoursDetailView.module.css';
import WorkHoursEmployee from './WorkHoursEmployee/WorkHoursEmployee';
import WorkHoursLocation from './WorkHoursLocation/WorkHoursLocation';
import WorkHoursDate from './WorkHoursDate/WorkHoursDate';

const WorkHoursDetailView = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <div className={classes.DetailView}>
                <div className={classes.DetailViewHeader}>
                    <h2>{props.item.customer} - {props.item.task}</h2>
                    <div className={classes.Hours}>{props.item.workHours}h</div>
                </div>
                <div className={classes.DetailViewBody}>
                    {props.item.comment}
                    <div className={classes.DetailViewBodyRight}>
                        <span>Chainsaw Hours: {props.item.chainsawHours}</span>
                        <span>Machine Hours: {props.item.machineHours}</span>
                        <WorkHoursEmployee
                            employee={props.item.employee}
                            token={props.item.token}/>
                        <WorkHoursLocation location={props.item.location}/>
                    </div>
                </div>
                <div className={classes.DetailViewFooter}>
                    <WorkHoursDate date={props.item.date}/>
                    <Button onClick={props.onBackClick}>Zurück</Button>
                    <Button onClick={() => props.onEditClick(props.item)}>Bearbeiten</Button>
                </div>
            </div>
        </Modal>
    );
};

export default WorkHoursDetailView;