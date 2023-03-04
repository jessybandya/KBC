import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';

function Post({ firstName, lastName, name, descriptions, startDate, endDate, statusD, category, id}) {
  const deleteEvent = (id,title) => {
    if(window.confirm(`Are you sure you want to delete this event:-> ${title}?`)){
      axios.delete(`http://localhost/Tutorial/events/${id}/delete`).then(function() {
      }).catch(function(error) {
          toast.error("Error removing order: ", error);
      }); 
      toast.success(`Event ${title} has been deleted successfully!\nRefresh Page`)   
    }
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell > 
        {firstName}         
        </TableCell>
        <TableCell align='right'>  
        {lastName}                
        </TableCell>
        <TableCell align='right'>
        {name}                   
        </TableCell>
        <TableCell align='right'>
        {category}                   
        </TableCell>
        <TableCell align='right'>
        {descriptions}                   
        </TableCell>
        <TableCell align='right'>
        {moment(startDate).format("ddd DD MMM YY LT")}                  
        </TableCell>
        <TableCell align='right'>
        {moment(endDate).format("ddd DD MMM YY LT")}                
        </TableCell>
        <TableCell align='right'>
        {statusD}                 
        </TableCell>
        <TableCell align='right'>
         <DeleteForeverIcon style={{color:'#43a047',cursor:'pointer'}} onClick={() => deleteEvent(id, name)} fontSize='medium'/>                  
        </TableCell>
  </TableRow>
  )
}

export default Post