import { useState, useEffect, useMemo } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "./examples/Sidenav";

import theme from "./assets/theme";

import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

import routesAuth from "./routes";
import routesNoAuth from "./routes1";
import { useSelector } from 'react-redux'


// EBESA React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "./context";

import Admin from "./pages/Admin";
import Update from "./pages/Update";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const authId = localStorage.getItem('currentUserId')

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };


  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });


  return  (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {authId ?(
        <>
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={"images/ebesa2.png"}
              brandName="KBC"
              routes={routesAuth}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              style={{zIndex:1}}
            />

          </>
        )}
        <Routes>
          {getRoutes(routesAuth)} 
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/event/:bool/:id/update" element={<Update/>}/>
        </Routes>
        </>
      ):(
        <>
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={"images/ebesa2.png"}
              brandName="KBC"
              routes={routesNoAuth}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              style={{zIndex:1}}
            />

          </>
        )}
        <Routes>
          {getRoutes(routesNoAuth)}
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/event/:bool/:id/update" element={<Update/>}/>
        </Routes>
        </>
      )}
    </ThemeProvider>
  );
}
