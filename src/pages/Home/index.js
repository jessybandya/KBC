import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import {useSelector,useDispatch} from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth, db } from '../../firebase'
import typography from '../../assets/theme/base/typography'
import reportsBarChartData from '../../layouts/dashboard/data/reportsBarChartData'
import Calendar from '../../sub-components/Calendar'
import { Button } from '@mui/material'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import AddEvents from '../../sub-components/AddEvents'
import axios from 'axios'


function Admin() {
  const authId = localStorage.getItem('currentUserId')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useNavigate("")
  const dispatch = useDispatch();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [membersData, setMembers] = React.useState(0)
  const [articlesData, setArticles] = React.useState(0)
  const [eventsData, setEvents] = React.useState(0)
  const [albumsData, setAlbums] = React.useState(0)


  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setMembers(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])


  React.useEffect(() => {
    db.collection('albums').onSnapshot((snapshot) => {
      setAlbums(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  const logout = () => {
    auth.signOut();
    history("/")
    dispatch(updateAuthId(''))
    window.location.reload();
}

  const myStyle={
      backgroundImage:"url(" +
  "images/bg/1.jpg"+")",
  height:'100px'
      };

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <nav className="navbar navbar-light bg-light">
     
    <div className="container-fluid align-items-center">
      <span className="navbar-brand mb-0 h2 ">
      {authId ?(
        <Button onClick={handleShow} variant="secondary">Add Event</Button>
      ):(
        <Button onClick={() => alert("Kindly sign in!")} variant="secondary">Add Event</Button>
      )}      
      </span>
    </div>

  </nav>
      <Calendar />


      <Modal show={show} onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <AddEvents />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
      <Footer />
    </DashboardLayout>
  )
}

export default Admin