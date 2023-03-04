import Icon from "@mui/material/Icon";
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
];

export default routes;
