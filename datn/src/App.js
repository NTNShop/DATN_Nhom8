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

//import css
  //
  // import './assets/authentication/main';
// import './assets/authentication/style.css';
import './assets/plugins/chartist-js/dist/chartist.min.css';
import './assets/plugins/chartist-js/dist/chartist-init.css';
import './assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css';
import "./assets/plugins/c3-master/c3.min.css";
import './assets/plugins/c3-master/c3.min.css';
import "./assets/css/style.min.css";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
      {/* Các route public */}


      {/* Các route admin */}
      <Route path="/admin" element={<Layout />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/category" element={<Categories />} />
      <Route path="/admin/category/edit" element={<EditCategories />} />
      <Route path="/admin/category/add" element={<AddCategories />} />
      <Route path="/admin/product" element={<Product />} />
      <Route path="/admin/product/add" element={<AddProduct />} />
      <Route path="/admin/product/edit" element={<EditProduct />} />
      <Route path="/admin//user" element={<User />} />
      <Route path="/admin/login" element={<Authentication />} />
      <Route path="/admin/addUser" element={<AddUser />} />
      <Route path="/admin/editUser" element={<EditUser />} />
    
    </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App;