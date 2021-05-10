import React from 'react';

import classes from './EnhancedTable.module.css';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, TableCell} from '@material-ui/core';
import TableToolbar from '../../Tables/WorkHoursTable/TableToolbar/TableToolbar';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead';
import useTable from '../../../hooks/use-table';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    }
}));

const EnhancedTable = (props) => {

    const materialClasses = useStyles();
    const {
        order,
        orderBy,
        selected,
        page,
        rowsPerPage,
        onSortRequestHandler,
        onSelectAllCheckboxesHandler,
        onCheckBoxClickHandler,
        onPageChangeHandler,
        onRowsPerPageChangeHandler,
        getComparator,
        stableSort,
        isSelected,
        emptyRows
    } = useTable({rows: [...props.rows]});

    return (
        <div className={classes.Root}>
            <Paper className={materialClasses.paper}>
                <TableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        className={classes.Table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="Arbeitsstunden Tabelle"
                    >
                        <EnhancedTableHead
                            hasCheckbox={props.headerHasCheckBox}
                            headCells={props.headCells}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={onSelectAllCheckboxesHandler}
                            onRequestSort={onSortRequestHandler}
                            rowCount={props.rows ? props.rows.length : 0}
                        />
                        <TableBody>
                            {stableSort(props.rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        props.createSpecificRow({
                                            id: row.id,
                                            onCheckBoxClick: onCheckBoxClickHandler,
                                            row,
                                            isSelected: isSelected(row.id),
                                            labelId: labelId,
                                        })
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.rows ? props.rows.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={onPageChangeHandler}
                    onChangeRowsPerPage={onRowsPerPageChangeHandler}
                />
            </Paper>
        </div>
    );
};

export default EnhancedTable;