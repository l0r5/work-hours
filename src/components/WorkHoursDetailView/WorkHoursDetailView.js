import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

const WorkHoursDetailView = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <div>ID: {props.item.id}</div>
            <div>Date: {props.item.date}</div>
            <div>Customer: {props.item.customer}</div>
            <div>Location: {props.item.location}</div>
            <div>Token: {props.item.token}</div>
            <div>Task: {props.item.task}</div>
            <div>Comment: {props.item.comment}</div>
            <div>Employee: {props.item.employee}</div>
            <div>WorkHours: {props.item.workHours}</div>
            <div>ChainsawHours: {props.item.chainsawHours}</div>
            <div>MachineHours: {props.item.machineHours}</div>
            <Button onClick={props.onBackClick}>Zurück</Button>
            <Button onClick={() => props.onEditClick(props.item)}>Bearbeiten</Button>
        </Modal>
    );
};

export default WorkHoursDetailView;