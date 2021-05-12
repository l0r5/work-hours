import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import {Edit, OpenInNew} from '@material-ui/icons';
import Icon from '../../../UI/Icon/Icon';

const WorkHoursTableRow = (props) => {

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={props.isSelected}
            tabIndex={-1}
            selected={props.isSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    onClick={(event) => props.click(event, props.item.id)}
                    checked={props.isSelected}
                    inputProps={{'aria-labelledby': props.labelId}}
                />
            </TableCell>
            <TableCell padding="none" align="center">
                <Icon click={() => props.onDetailViewClick(props.item)}>
                    <OpenInNew/>
                </Icon>
            </TableCell>
            <TableCell padding="none" align="center">
                <Icon click={() => props.onEditClick(props.item)}>
                    <Edit/>
                </Icon>
            </TableCell>
            <TableCell component="th"
                       id={props.labelId}
                       scope="row">{props.item.id}
            </TableCell>
            <TableCell align="left">{props.item.date}</TableCell>
            <TableCell align="left">{props.item.customer}</TableCell>
            <TableCell align="left">{props.item.location}</TableCell>
            <TableCell align="left">{props.item.token}</TableCell>
            <TableCell align="left">{props.item.comment}</TableCell>
            <TableCell align="left">{props.item.employee}</TableCell>
            <TableCell
                align="right">{props.item.workHours} </TableCell>
            <TableCell
                align="right">{props.item.chainsawHours}</TableCell>
            <TableCell
                align="right">{props.item.machineHours}</TableCell>
        </TableRow>
    );
};

export default WorkHoursTableRow;