import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink, Navigate, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftButton from "../../components/SoftButton";

// Soft UI Dashboard React examples
import SidenavCollapse from "./SidenavCollapse";
import SidenavCard from "./SidenavCard";
import {Button,Modal} from 'react-bootstrap';
// Custom styles for the Sidenav
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";
import { useSelector, useDispatch } from 'react-redux'

// Soft UI Dashboard React context
import { useSoftUIController, setMiniSidenav } from "../../context";
import { auth, db } from "../../firebase";
import { updateAuthId } from "../../redux/dataSlice";
import SignIn from "../Navbars/DashboardNavbar/SignIn";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignUp from "../Navbars/DashboardNavbar/SignUp";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AppBar from "@mui/material/AppBar";


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


function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const history = useNavigate("")
  const dispatch1 = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const closeSidenav = () => setMiniSidenav(dispatch, true);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const authId = localStorage.getItem('currentUserId')
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    db.collection('users').doc(`${authId}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const logout = () => {
    auth.signOut();
    history("/")
    window.location.reload();
    localStorage.removeItem('currentUserId');
}
  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }
    

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            color={color}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink to={route} key={key}>
          <SidenavCollapse
            color={color}
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <SoftTypography
          key={key}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </SoftTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} />;
    }

    return returnValue;
  });

  return (
    <SidenavRoot 
     style={{zIndex:1}}
    {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SoftBox pt={3} pb={1} px={4} textAlign="center"
      >
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SoftTypography>
        </SoftBox>
        <SoftBox component={NavLink} to="/" display="block" alignItems="center">
          {brand && <SoftBox component="img" src={brand} alt="EBESA Logo" style={{height:100}}/>}
          <SoftBox
          >
            <SoftTypography component="h6" variant="button" fontWeight="medium">
              {currentUser?.firstName} {currentUser?.lastName}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Divider />
      <List     style={{zIndex:1}}
      >{renderRoutes}</List>
      <SoftBox mx={2} mt="auto">
        <SoftBox     style={{zIndex:1}}
        >
        {authId ?(
          <>
          {authId === 'okqWWYx5g4XL9EUO6dlEzCviT8f2' || authId === 'pOFRuB1n8WgCGwNiIApqQ0NLki33' || authId === 'F8goySbp0AWFiLELKHXct6KRRlF3' || authId === "fSFwugbC01VUJxSpyBk1y5qTHAF3" ?(
            <SoftButton
            component={NavLink} to="/admin"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
          >
            Admin
          </SoftButton>
          ):(
            <>
            <Link
            to='/'>
            <SoftButton
            component="a"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
            onClick={logout}
          >
            Logout
          </SoftButton>
            </Link>
          </>
          )}
          </>
        ):(
          <div></div>
        )}

        </SoftBox>
      </SoftBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
