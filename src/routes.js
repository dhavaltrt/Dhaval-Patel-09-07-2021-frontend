import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const MessageCompose = React.lazy(() => import("./views/message/Compose"));
const MessageList = React.lazy(() => import("./views/message/MessageList"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/message/compose",
    name: "Message Compose",
    component: MessageCompose,
  },
  {
    path: "/message/list",
    name: "Message List",
    component: MessageList,
  },
];

export default routes;
