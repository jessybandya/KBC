import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {Button,Modal } from 'react-bootstrap';
import Allmembers from './Allmembers';
import { auth, db } from '../../../firebase';
import DashboardLayout from '../../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../../examples/Navbars/DashboardNavbar';
import SoftTypography from '../../../components/SoftTypography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import axios from 'axios';

function Bookings() {
  const [modalShow, setModalShow] = React.useState(false);
  const [posts1, setPosts1] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [fUsers, setFUsers] = React.useState([]);


  React.useEffect(() => {
      getUsers();
  }, []);
  function getUsers() {
      axios.get('http://localhost/Tutorial/events/').then(function(response) {
          console.log(response.data);
          setUsers(response.data);
      });
  }

  const finalPosts1 = users.filter(res => {
    return res?.category === 'Television'
  })


  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (users !== undefined) {
      const finalPosts = finalPosts1.filter(res => {
        return res?.title?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      })

      setFilteredPosts(finalPosts)
    }else {
      return <div>No results3</div>
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
  }

  return (
    <SoftTypography>
    <div>
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >
  <IconButton type="button" sx={{ p: '10px' }} aria-label="pdf">
</IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search booking by title..."
    />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton> 
  </Paper>  
  
  <Allmembers filteredPosts={filteredPosts} searchTerm={searchTerm}/>
    </div>
    </SoftTypography>
  )
}

export default Bookings