import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "../style/model.scss"
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import { deleteEventApi, ShowEventsApi, closeEvent } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Popping = ({open, handleClose, event, deleteEventApi, renderStatus, rerender})=> {
   const navigate = useNavigate();
   
   const {id, describe, title, start, end, statusD, uid} = event;
   const authId = localStorage.getItem('currentUserId')

   const handleDelete =async () => {
     await deleteEventApi(event.id);
     rerender(!renderStatus)
   }

   

   const modal = ()=>{
     return (
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-capitalize">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{justifyContent:'space-between',display:'flex',alignItems:'center'}}>
          {describe? <p className="lead">{describe}</p>: "No Dsecriptions Yet"}
          
          {statusD === 0 ?(
            <h5>
            Unverified
            </h5>
          ):(
            <h5>
            Verified
            </h5>
          )}
          
          </div>
            <div className="row justify-content-between">
              <p className="col small text-muted text-center pb-0 mb-0">from: {start}</p>
              <p className="col small text-muted text-center pb-0 mb-0">to: {end}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
     
            <Button variant="warning" onClick={handleClose}>Close</Button>
            {/* <Link to={`/event/true/${id}/update`}><Button variant="success">Update</Button></Link> */}
            {uid === authId &&(
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            )}
        </Modal.Footer>
      </Modal>
     )
   }

   if(id){
     return modal()
   }else{
     <p>there is no modal to preview</p>
   }
   
  }

  function mapStateToProps({event}){
     return {
       event,
      //  modalStatus
     }
  }
  
  export default connect(mapStateToProps, {deleteEventApi, closeEvent})(Popping)