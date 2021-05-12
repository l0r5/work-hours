import React from 'react';


const headCells = [
    {id: 'edit', numeric: false, label: ''},
    {id: 'delete', numeric: false, label: ''},
    {id: 'id', numeric: false, label: 'ID'},
    {id: 'email', numeric: false, label: 'E-Mail'},
    {id: 'role', numeric: false, label: 'Rolle'},
];

const UsersTable = (props) => {

    // const tableSort = useTableSort();
    // const [order, setOrder] = React.useState('asc');
    // const [orderBy, setOrderBy] = React.useState('calories');
    // const [selected, setSelected] = React.useState([]);
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);
    //
    // let rows = null;
    // if (props.items) {
    //     rows = [...props.items];
    // }
    //
    // const onCheckBoxClickHandler = (event, id) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];
    //
    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }
    //
    //     setSelected(newSelected);
    // };
    //
    // const isSelected = (id) => selected.indexOf(id) !== -1;
    //
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows ? rows.length : 0 - page * rowsPerPage);
    //
    // return (
    //     <TableContainer>
    //         <Table
    //             className={classes.Table}
    //             aria-labelledby="tableTitle"
    //             size="medium"
    //             aria-label="Benutzer Tabelle"
    //         >
    //             <EnhancedTableHead
    //                 hasCheckbox={false}
    //                 headCells={headCells}
    //                 numSelected={1}
    //                 onRequestSort={1}
    //                 onSelectAllClick={1}
    //                 order={1}
    //                 orderBy={1}
    //                 rowCount={1}/>
    //
    //             <TableBody>
    //                 {tableSort.stableSort(rows, tableSort.getComparator(order, orderBy))
    //                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //                     .map((row, index) => {
    //                         const isItemSelected = isSelected(row.id);
    //                         const labelId = `enhanced-table-checkbox-${index}`;
    //                         return (
    //                             <UsersTableRow
    //                                 key={row.id}
    //                                 click={onCheckBoxClickHandler}
    //                                 item={row}
    //                                 isSelected={isItemSelected}
    //                                 labelId={labelId}
    //                                 onEditClick={props.onEditItemClick}
    //                                 onDetailViewClick={props.onDetailViewClick}
    //                             />
    //                         );
    //                     })}
    //                 {emptyRows > 0 && (
    //                     <TableRow style={{height: 53 * emptyRows}}>
    //                         <TableCell colSpan={6}/>
    //                     </TableRow>
    //                 )}
    //             </TableBody>
    //         </Table>
    //     </TableContainer>
    // );

    return null;
};

export default UsersTable;