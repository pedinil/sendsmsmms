import MMS from "views/Pages/Mms";
import SMS from "views/Pages/Sms";
import WelcomePage from "views/Pages/WelcpmePage";



var routes = [
  {
    path: "/welcome",
    layout: "/admin",
    name: "welcome",
    component: WelcomePage
  },
  {
    path: "/SMS",
    layout: "/admin",
    name: "SMS",
    component: SMS
  },
  {
    path: "/MMS",
    layout: "/admin",
    name: "MMS",
    component: MMS
  }
];
export default routes;
