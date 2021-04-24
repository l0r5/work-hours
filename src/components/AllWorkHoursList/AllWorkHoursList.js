import classes from './AllWorkHoursList.module.css';
import ListItem from './ListItem/ListItem';
import {useState} from 'react';


const AllWorkHoursList = (props) => {

        const [list, setList] = useState(props.items.map(item => ({...item, isCollapsed: false})));

        const onItemClickedHandler = (id) => {
            const index = list.findIndex((item) => item.id === id);
            let newArray = [...list];
            newArray[index] = {...list[index], isCollapsed: !list[index].isCollapsed}
            setList(newArray);
            console.log("Clicked id:" + id + ", isCollapsed: " + newArray[index].isCollapsed);
        }

        if (props.items.length === 0) {
            return <h2 className={classes.AllWorkHoursList__fallback}>Found no Work Hours.</h2>;
        }
        return (
            <ul className={classes.AllWorkHoursList}>
                {list.map((workHoursEntry) => (
                    <ListItem
                        key={workHoursEntry.id}
                        date={workHoursEntry.date}
                        customer={workHoursEntry.customer}
                        location={workHoursEntry.location}
                        token={workHoursEntry.token}
                        task={workHoursEntry.task}
                        comment={workHoursEntry.comment}
                        employee={workHoursEntry.employee}
                        workHours={workHoursEntry.workHours}
                        chainsawHours={workHoursEntry.chainsawHours}
                        machineHours={workHoursEntry.machineHours}
                        isCollapsed={workHoursEntry.isCollapsed}
                        clicked={() => onItemClickedHandler(workHoursEntry.id)}
                    />))
                }
            </ul>);
    }
;

export default AllWorkHoursList;