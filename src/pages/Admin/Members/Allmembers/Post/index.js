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
import { db } from '../../../../../firebase';
import { toast } from 'react-toastify';

function Post({ userId, firstName, lastName, email, phone, profilePhoto, timestamp, username, category}) {
  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);
 const deleteUser = () =>{
    if(window.confirm(`Are you sure you want to delete this users:-> ${firstName} ${lastName}?`)){
        db.collection("users").doc(userId).delete().then(function() {
        }).catch(function(error) {
            toast.error("Error removing order: ", error);
        }); 
        toast.success(`${firstName} ${lastName} has been deleted successfully!`)   
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
        {email}                   
        </TableCell>
        <TableCell align='right'>
        {username}                   
        </TableCell>
        <TableCell align='right'>
        {phone}                   
        </TableCell>
        <TableCell align='right'>
        {category}                   
        </TableCell>
        <TableCell align='right'>
        {date.toDateString()}                 
        </TableCell>
        <TableCell align='right'>
         <DeleteForeverIcon style={{color:'#43a047',cursor:'pointer'}} onClick={deleteUser} fontSize='medium'/>                  
        </TableCell>
  </TableRow>
  )
}

export default Post