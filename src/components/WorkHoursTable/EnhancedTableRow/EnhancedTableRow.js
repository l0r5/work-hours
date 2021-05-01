import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

const EnhancedTableRow = (props) => {
    return (
        <TableRow
            hover
            onClick={(event) => props.click(event, props.item.id)}
            role="checkbox"
            aria-checked={props.isSelected}
            tabIndex={-1}
            selected={props.isSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    checked={props.isSelected}
                    inputProps={{'aria-labelledby': props.labelId}}
                />
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

export default EnhancedTableRow;