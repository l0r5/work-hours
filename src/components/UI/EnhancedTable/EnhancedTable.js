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

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    }
}));

const EnhancedTable = (props) => {
    const materialClasses = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('data');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    let rows = [];
    if (props.rows) {
        rows = [...props.rows];
    }

    const onSortRequestHandler = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onSelectAllCheckboxesHandler = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const onCheckBoxClickHandler = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const onPageChangeHandler = (event, newPage) => {
        setPage(newPage);
    };

    const onRowsPerPageChangeHandler = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows ? rows.length : 0 - page * rowsPerPage);


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
                            hasCheckbox={true}
                            headCells={props.headCells}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={onSelectAllCheckboxesHandler}
                            onRequestSort={onSortRequestHandler}
                            rowCount={rows ? rows.length : 0}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
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
                    count={rows ? rows.length : 0}
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