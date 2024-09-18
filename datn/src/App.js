import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements,  Outlet,  Navigate  } from "react-router-dom";
//admin
import Dashboard from "./component/admin/dashboard/index";
import Profile from "./component/admin/profile/index";
import Categories from "./component/admin/categories/list";
import EditCategories from "./component/admin/categories/edit";
import AddCategories from "./component/admin/categories/add";
import Product from "./component/admin/products/list";
import EditProduct from "./component/admin/products/edit";
import AddProduct from "./component/admin/products/add";
import User from "./component/admin/users/list";
import EditUser from "./component/admin/users/edit";
import AddUser from "./component/admin/users/add";
import Layout from './component/admin/index';
import Authentication from "./component/admin/authentication";
import Authentication2 from "./component/client/authentication";
import ListOrder from "./component/admin/order/list";

//import css
import './assets/plugins/chartist-js/dist/chartist.min.css';
import './assets/plugins/chartist-js/dist/chartist-init.css';
import './assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css';
import "./assets/plugins/c3-master/c3.min.css";
import './assets/plugins/c3-master/c3.min.css';
import "./assets/css/style.min.css";

import React from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements,  Outlet,  Navigate  } from "react-router-dom";
import Home from "./component/client/home";
import Blog from './component/client/blog';
import Cart from "./component/client/cart";
import CheckoutSection from "./component/client/check-out";
import './assets/css/bootstrap.min.css'
import './assets/css/elegant-icons.css'
import './assets/css/font-awesome.min.css'
// import './assets/css/jquery-ui.min.css'
import './assets/css/nice-select.css'
// import './assets/css/owl.carousel.min.css'
import './assets/css/slicknav.min.css'
import './assets/css/style.css'
import Product from "./component/client/shop";
import ProductDetail from "./component/client/shop/detail";
import Contact from "./component/client/contact";
import BlogDetails from "./component/client/blog/detail";

// import './assets/css/all.min.css'
// import './assets/css/animate.css'
// import './assets/css/magnific-popup.css'
// import './assets/css/main.css'
// import './assets/css/owl.carousel.css'
// import './assets/css/meanmenu.min.css'
// import './assets/css/responsive.css'

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;