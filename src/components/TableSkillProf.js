import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Delete } from '@material-ui/icons';
import { selectTableSkill, tableSkillData } from '../features/tableSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';


export default function TableSkillProf() {
  const tabskill=useSelector(selectTableSkill)
  const dispatch=useDispatch()
  const[empid,setEmpId]=useState()
  const [tech,setTech] = useState()
  const columns = [
    { id: 'empid', label: 'Emp ID', minWidth: 60 },
    { id: 'name', label: 'Name', minWidth: 160 },
    { id: 'project', label: 'Project', minWidth: 80 },
    { id: 'team', label: 'Team', minWidth: 150 },
    { id: 'technology', label: 'Technology', minWidth: 100 },
    { id: 'expertise', label: 'Expertise', minWidth: 80 },
    { id: 'lastused', label: 'Last Used', minWidth: 80 },
    { id: 'certification', label: 'Certification', minWidth: 100 },
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
                    lineHeight: '130%'  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ backgroundColor:'#e85560',
                    color:'white',
                    lineHeight: '130%'   }}>
                <p>Action</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabskill.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                  <TableCell>
                        <Delete style={{cursor: 'pointer'}} onClick={()=>
                                db.collection('skillMat')
                                .where('empid','==',row.empid)
                                .where('technology','==',row.technology)
                                .get()
                                .then(querySnapshot => {
                                      querySnapshot.forEach(doc=>doc.ref.delete());
                                      db.collection('skillMat')
                                        .where('empid','==',row?.empid)
                                        .get()
                                        .then(querySnapshot =>  {
                                            const skillInfo = [];
                                            querySnapshot.forEach(async skillData => {
                                                skillInfo[skillData.id] = skillData.data();
                                            })
                                            dispatch(tableSkillData(Object.values(skillInfo)));
                                        })
                                      }
                                )} />
                  </TableCell>
                </TableRow>
              );
            })} 
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
