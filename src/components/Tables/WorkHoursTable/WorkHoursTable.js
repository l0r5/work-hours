import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import WorkHoursTableRow from './WorkHoursTableRow/WorkHoursTableRow';
import EnhancedTable from '../../UI/EnhancedTable/EnhancedTable';


const headCells = [
    {id: 'view', numeric: false, label: ''},
    {id: 'edit', numeric: false, label: ''},
    {id: 'id', numeric: false, label: 'ID'},
    {id: 'date', numeric: false, label: 'Date'},
    {id: 'customer', numeric: false, label: 'Customer'},
    {id: 'location', numeric: false, label: 'Location'},
    {id: 'token', numeric: false, label: 'Token'},
    {id: 'comment', numeric: false, label: 'Comment'},
    {id: 'employee', numeric: false, label: 'Employee'},
    {id: 'workHours', numeric: true, label: 'Work Hours'},
    {id: 'chainsawHours', numeric: true, label: 'Chainsaw Hours'},
    {id: 'machineHours', numeric: true, label: 'Machine Hours'},
];


const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    }
}));

const WorkHoursTable = (props) => {

    const materialClasses = useStyles();
    // const table = useTable({rows: [...props.items]});

    let rows = null;
    if (props.items) {
        rows = [...props.items];
    }


    const createSpecificRow = (rowProps) => {
        return (
            <WorkHoursTableRow
                key={rowProps.id}
                click={rowProps.onCheckBoxClick}
                item={rowProps.row}
                isSelected={rowProps.isSelected}
                labelId={rowProps.labelId}

                //TODO Refactor
                onEditClick={props.onEditItemClick}
                onDetailViewClick={props.onDetailViewClick}
            />);
    };

    return (
        <EnhancedTable
            rows={props.items}
            headCells={headCells}
            createSpecificRow={createSpecificRow}
        />
        // <div className={classes.Root}>
        //     <Paper className={materialClasses.paper}>
        //         <TableToolbar numSelected={table.selected.length}/>
        //         <TableContainer>
        //             <Table
        //                 className={classes.Table}
        //                 aria-labelledby="tableTitle"
        //                 size="medium"
        //                 aria-label="Arbeitsstunden Tabelle"
        //             >
        //                 <EnhancedTableHead
        //                     hasCheckbox={true}
        //                     headCells={headCells}
        //                     numSelected={table.selected.length}
        //                     order={table.order}
        //                     orderBy={table.orderBy}
        //                     onSelectAllClick={table.onSelectAllCheckboxesHandler}
        //                     onRequestSort={table.onSortRequestHandler}
        //                     rowCount={rows ? rows.length : 0}
        //                 />
        //                 <TableBody>
        //                     {table.tableSort.stableSort(rows, table.tableSort.getComparator(table.order, table.orderBy))
        //                         .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
        //                         .map((row, index) => {
        //                             const isItemSelected = table.isSelected(row.id);
        //                             const labelId = `enhanced-table-checkbox-${index}`;
        //                             return (
        //                                 <WorkHoursTableRow
        //                                     key={row.id}
        //                                     click={table.onCheckBoxClickHandler}
        //                                     item={row}
        //                                     isSelected={isItemSelected}
        //                                     labelId={labelId}
        //                                     onEditClick={props.onEditItemClick}
        //                                     onDetailViewClick={props.onDetailViewClick}
        //                                 />
        //                             );
        //                         })}
        //                     {table.emptyRows > 0 && (
        //                         <TableRow style={{height: 53 * table.emptyRows}}>
        //                             <TableCell colSpan={6}/>
        //                         </TableRow>
        //                     )}
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>
        //         <TablePagination
        //             rowsPerPageOptions={[5, 10, 25]}
        //             component="div"
        //             count={rows ? rows.length : 0}
        //             rowsPerPage={table.rowsPerPage}
        //             page={table.page}
        //             onChangePage={table.onPageChangeHandler}
        //             onChangeRowsPerPage={table.onRowsPerPageChangeHandler}
        //         />
        //     </Paper>
        // </div>
    );
}

export default WorkHoursTable;