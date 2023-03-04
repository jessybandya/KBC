import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";

// Authentication layout components
import BasicLayout from "../components/BasicLayout";
import Socials from "../components/Socials";
import Separator from "../components/Separator";

// Images
import curved6 from "../../../assets/images/curved-images/curved14.jpg";
import { Space, Spin } from 'antd';
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { auth, db } from "../../../firebase";
import { updateAuthId } from "../../../redux/dataSlice";
import { useSelector, useDispatch } from 'react-redux'


function SignUp({ setModalShow }) {
  const [agreement, setAgremment] = useState(true);
  const handleSetAgremment = () => setAgremment(!agreement);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [category, setCategory] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate("");
  const dispatch = useDispatch();


  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };


useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if(user){
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
          
        }
      })
      dispatch(updateAuthId(user?.uid))

    }
  })
  return () => unsubscribe()
}, [])

const completeRegistration = async() => {
  setLoading(true)

  if(!firstName){
    toast.error('First Name is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!lastName){
    toast.error('Last Name is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!email){
    toast.error('Email is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!username){
    toast.error('Username is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!category){
    toast.error('Category is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!phone){
    toast.error('Phone No. is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!password){
    toast.error('Password is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!cPassword){
    toast.error('Confirm Password is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(password.length <8){
    toast.error('Password must have atleast 8 characters!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(cPassword !== password){
    toast.error("Passwords don't match each other!", {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else{
    db.collection('users').where("username", "==", username).get().then(
      snap => {
          if(snap.docs.length > 0){
              toast.error("The username you entered is taken!")
              setLoading(false)
          }else{

              db.collection('users').where("email", "==", email).get().then((resultSnapShot) => {

                  // resultSnapShot is an array of docs where "email" === "user_mail"
          
                  if (resultSnapShot.size == 0) {
                      //Proceed
                    
                        auth
                        .createUserWithEmailAndPassword(email, password)
                        .then((auth) => {
                            if (auth.user) {
                                auth.user.updateProfile({
                                    displayName: username,
                                    photoURL: "https://www.seekpng.com/png/full/73-730482_existing-user-default-avatar.png"
                                }).then((s) => {
                                  db.collection('users').doc(auth.user.uid).set({
                                    uid: auth.user.uid,
                                    firstName,
                                    lastName,
                                    phone,
                                    username,
                                    category,
                                    email: auth.user.email,
                                    profilePhoto: "https://cdn.pngsumo.com/default-image-png-picture-710222-default-image-png-default-png-265_265.png",
                                    status:"active",
                                    type:"user",
                                    isApproved:true,
                                    timestamp: Date.now()
                                }).then((e) => {
                    //redirect
                    setLoading(false)
                    toast.success("Succefully created a member account!")
                   setModalShow(false)
                         }) 
                                })
                            }
                        })
                        .catch((e) => {
                                toast.error(e.message)
                                setLoading(false)
                        });
          
                  } else {
                      //Already registered
                      setLoading(false)
                      toast.error("The email you enterd already in use!")
                  }
          
              })
          }
      }
  )
    }
}


  return (

     
    <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Registration!
          </SoftTypography>
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox style={{display:'flex'}} mb={2}>
              <SoftInput style={{marginRight:3}}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="First Name" />
              <SoftInput style={{marginLeft:3}} 
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Last Name" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
            </SoftBox>
            <SoftBox style={{display:'flex'}} mb={2}>
            <SoftInput style={{marginRight:3}} 
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username" />
            <FormControl fullWidth size="small">
            <Select
            MenuProps={{
              style: {zIndex: 2001}
          }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChangeCategory}
              displayEmpty
            renderValue={category !== "" ? undefined : () => <span style={{color:'#9E9E9E'}}>Category</span>}
            >
              <MenuItem value="Television">Television</MenuItem>
              <MenuItem value="Radio">Radio</MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
            </Select>
          </FormControl>
          </SoftBox>

          <SoftBox style={{display:'flex'}} mb={2}>
          <SoftInput style={{marginRight:3}}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone No." />
        </SoftBox>

        <SoftBox style={{display:'flex'}} mb={2}>
        <SoftInput style={{marginRight:3}}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password" />
        <SoftInput style={{marginLeft:3}}
        value={cPassword}
        type="password"
        onChange={e => setCPassword(e.target.value)}
        placeholder="Confirm Password" />
      </SoftBox>
 
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={completeRegistration} variant="gradient" color="dark" fullWidth>
              {loading === true ?(
                <span><span style={{color:'#fff'}}>signing up...<Spin size="middle" /></span></span>
              ):(
                <span>Send</span>
              )}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
  );
}

export default SignUp;
