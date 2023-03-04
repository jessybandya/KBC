import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth,db } from '../../firebase'
import { Grid } from '@mui/material'
import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard'
import BuildByDevelopers from '../../layouts/dashboard/components/BuildByDevelopers'
import WorkWithTheRockets from '../../layouts/dashboard/components/WorkWithTheRockets'
import ReportsBarChart from '../../examples/Charts/BarCharts/ReportsBarChart'
import GradientLineChart from '../../examples/Charts/LineCharts/GradientLineChart'
import gradientLineChartData from '../../layouts/dashboard/data/gradientLineChartData'
import SoftBox from '../../components/SoftBox'
import Icon from "@mui/material/Icon";
import typography from '../../assets/theme/base/typography'
import reportsBarChartData from '../../layouts/dashboard/data/reportsBarChartData'
import Projects from '../../layouts/dashboard/components/Projects'
import OrdersOverview from '../../layouts/dashboard/components/OrderOverview'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Members from './Members'
import Bookings from './Bookings'
import axios from 'axios'
import Radio from './Radio'
import Technical from './Technical'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Admin() {
  const authId = localStorage.getItem('currentUserId')
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
    db.collection('articles').onSnapshot((snapshot) => {
      setArticles(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    getUsers();
}, []);
function getUsers() {
    axios.get('http://localhost/Tutorial/events/').then(function(response) {
        console.log(response.data);
        setEvents(response.data);
    });
}

  React.useEffect(() => {
    db.collection('albums').onSnapshot((snapshot) => {
      setAlbums(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  // if(authId !== 'okqWWYx5g4XL9EUO6dlEzCviT8f2' || authId !== 'pOFRuB1n8WgCGwNiIApqQ0NLki33'){
  //    history("/")
  // }

  console.log("Data: ",eventsData)
  const logout = () => {
    auth.signOut();
    window.location.reload();
    localStorage.removeItem('currentUserId')
}

const theme = useTheme();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleChangeIndex = (index) => {
  setValue(index);
};

const date = new Date;
let hours = date.getHours();

let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <div>
    <span style={{fontWeight:'bold'}}>{status}, Admin</span>
    </div>
    <div>
    <span style={{cursor:'pointer',fontWeight:'bold'}} onClick={logout}>Logout</span>
    </div>
    </div>
    <SoftTypography>
    <SoftBox py={3}>
    <SoftBox mb={3}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Members" }}
            count={membersData.length}
            percentage={{ color: "success", text: "+55%" }}
            icon={{ color: "info", component: "group" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Articles" }}
            count={articlesData.length}
            percentage={{ color: "success", text: "+3%" }}
            icon={{ color: "info", component: "auto_stories" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Events" }}
            count={eventsData.length}
            percentage={{ color: "error", text: "-2%" }}
            icon={{ color: "info", component: "event" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Albums" }}
            count={albumsData.length}
            percentage={{ color: "success", text: "+5%" }}
            icon={{
              color: "info",
              component: "collections",
            }}
          />
        </Grid>
      </Grid>
    </SoftBox>



    {authId === 'okqWWYx5g4XL9EUO6dlEzCviT8f2' &&(
      <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{zIndex:1,backgroundColor:'#fff'}}

        >
          <Tab label="Members" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
          height: '70vh',
          overflowY: 'auto'
         }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Members />
        </TabPanel>
      </SwipeableViews>
    </Box>
    )}


    {authId === 'pOFRuB1n8WgCGwNiIApqQ0NLki33' &&(
      <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{zIndex:1,backgroundColor:'#fff'}}

        >
        {authId === 'pOFRuB1n8WgCGwNiIApqQ0NLki33' ?(
          <Tab label="Bookings Television" {...a11yProps(0)} />
        ):(
          <Tab label="Bookings" {...a11yProps(0)} />
        )}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
          height: '70vh',
          overflowY: 'auto'
         }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Bookings />
        </TabPanel>
      </SwipeableViews>
    </Box>
    )}


    {authId === 'F8goySbp0AWFiLELKHXct6KRRlF3' &&(
      <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{zIndex:1,backgroundColor:'#fff'}}

        >
        {authId === 'F8goySbp0AWFiLELKHXct6KRRlF3' ?(
          <Tab label="Bookings Radio" {...a11yProps(0)} />
        ):(
          <Tab label="Bookings" {...a11yProps(0)} />
        )}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
          height: '70vh',
          overflowY: 'auto'
         }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Radio />
        </TabPanel>
      </SwipeableViews>
    </Box>
    )}

    

    {authId === 'fSFwugbC01VUJxSpyBk1y5qTHAF3' &&(
      <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{zIndex:1,backgroundColor:'#fff'}}

        >
        {authId === 'fSFwugbC01VUJxSpyBk1y5qTHAF3' ?(
          <Tab label="Bookings Technical" {...a11yProps(0)} />
        ):(
          <Tab label="Bookings" {...a11yProps(0)} />
        )}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
          height: '70vh',
          overflowY: 'auto'
         }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Technical />
        </TabPanel>
      </SwipeableViews>
    </Box>
    )}


  </SoftBox>
    </SoftTypography>
    <Footer/>
    </DashboardLayout>
  )
}

export default Admin