import Icon from "@mui/material/Icon";
import Account from "./pages/Account";
import Home from "./pages/Home";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Icon fontSize='small'>home</Icon>,
    component: <Home />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    route: "/account",
    icon: <Icon>account_circle</Icon>,
    component: <Account />,
    noCollapse: true,
  },
];

export default routes;
