import React from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements,  Outlet,  Navigate  } from "react-router-dom";
import Home from "./component/client/home";

import './assets/css/bootstrap.min.css'
import './assets/css/elegant-icons.css'
import './assets/css/font-awesome.min.css'
// import './assets/css/jquery-ui.min.css'
import './assets/css/nice-select.css'
// import './assets/css/owl.carousel.min.css'
import './assets/css/slicknav.min.css'
import './assets/css/style.css'

// import './assets/css/all.min.css'
// import './assets/css/animate.css'
// import './assets/css/magnific-popup.css'
// import './assets/css/main.css'
// import './assets/css/owl.carousel.css'
// import './assets/css/meanmenu.min.css'
// import './assets/css/responsive.css'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
 

      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App;
