import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {selectTableAsset} from "../features/tableSlice";
import { useSelector } from 'react-redux';

export default function TablePopulate() {
  const tabasset=useSelector(selectTableAsset)
  const columns = [
    { id: 'empid', label: 'Emp ID', minWidth: 60 },
    { id: 'name', label: 'Name', minWidth: 160 },
    { id: 'project', label: 'Project', minWidth: 80 },
    { id: 'team', label: 'Team', minWidth: 150 },
    { id: 'assetid', label: 'Asset Id', minWidth: 70 },
    { id: 'assetname', label: 'Asset Name', minWidth: 120 },
    { id: 'assetmodel', label: 'Asset Model', minWidth: 120 },
    { id: 'allocationdate', label: 'Allocation Date', minWidth: 120 },
    { id: 'comments', label: 'Comments', minWidth: 150 },
  ];
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead> 
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,
                      backgroundColor:'#e85560',
                      color:'white',
                      lineHeight: '130%'
                    }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tabasset.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}
                                style={{lineHeight:'100%',fontSize: '80%'}}
                      >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tabasset.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
