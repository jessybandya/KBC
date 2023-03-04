
import { event } from "../Axios/event"
import * as moment from "moment"
import { addError, removeError } from "./errorsAction"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { db } from "../../firebase"





export const showEvent = (event)=>{
    console.log("event to be shown on the modal: ", event)
    return{
        type: "SHOW_EVENT",
        payload: event
    }
}

export const showEvents = (events)=>{
    
    return{
        type: "SHOW_EVENTS",
        payload: events
    }
}

export const ShowEventApi = id => async dispatch => {
     
    //i won't get the event from redux store as it is safer to
    //keep updated with db.
    const result = await event.get(`http://localhost/Tutorial/events/${id}`);

    try{
        const {title, id, startData, endData, descriptions, statusD, uid} = await result.data;
        const convertedEvent = {
            title,
            describe:descriptions,
            statusD,
            id,
            start: moment(startData).format("ddd DD MMM YY LT"),
            end: moment(endData).format("ddd DD MMM YY LT"),
            uid,
        }
        await dispatch(showEvent(convertedEvent))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowEventsApi = () => async dispatch => {
     console.log("started fetching the api")
    //i won't get the event from redux store as it is safer to
    //keep updated with db.
    const result = await event.get("http://localhost/Tutorial/events/");

    try{
        const convertedDates = await result.data.map(event=>{
            return{
              title: event.title,
              statusD: event.statusD,
              start: new Date(event.startDate) ,
              end: new Date(event.endDate) ,
              id: event.id,
              describe: event.descriptions
            }
          })
        await dispatch(showEvents(convertedDates))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}


export const deleteEvent = (id)=>{
   return {
       type: "DELETE_EVENT",
       payload: id
   }
}

export const deleteEventApi = (id) =>  async dispatch=> {
    const result = await axios.delete(`http://localhost/Tutorial/events/${id}/delete`)

    try {
        const deleted = await result.data;
        await dispatch(deleteEvent(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addEvent = (newEvent)=>{
    return{
      type: "ADD_EVENT",
      payload: newEvent
    }
}


export const addEventApi = (values, firstName, lastName, category, uid) => async dispatch =>{


    const result = await event.post("http://localhost:80/Tutorial/events/save", {
         title: values.title,
         startDate: values.start,
         endDate: values.end,
         descriptions: values.describe,
         firstName:`${firstName}`,
         lastName:`${lastName}`,
         category:`${category}`,
         uid: `${uid}`
       })
       .then(res=>{
        
        if(res && res.data){
            console.log("event from the api going to the reducer: ", res.data)
            dispatch(addEvent(res.data)) 
            dispatch(removeError())
            
            return  "success";
        }
       })
       .catch(res=>{
        console.log("catch response, ", res)
        if(res.response.data){
            
            console.log(res.response.data)
            dispatch(addError(res.response.data));
        }
    })
       
}


const updateEvent = (updatedEvent)=>{
    return{
      type: "UPDATE_EVENT",
      payload: updatedEvent
    }
}


export const updateEventApi = (values, id) => async dispatch =>{
    try{
        const result = await axios.put(`http://localhost:80/Tutorial/events/${id}/update`, {
            title: values.title,
            startDate: values.start,
            endDate: values.end,
            descriptions: values.describe,
          })
         console.log(result)
          const response = result.data;
          dispatch(removeError())
          return "response was successful";
    }catch(err){
        console.log(err)
        dispatch(addError(err.response.data));
    }

    //    .then(res=>{
    //        console.log(res)
    //     if(res && res.data){
            
    //         console.log(res.data)
    //         
    //         return;
    //     }else{
    //         if(res.response.data){
    //             console.log(res.response.data)
    //         }
    //     }
    //    })
 
}