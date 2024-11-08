
import React from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements,  Outlet,  Navigate  } from "react-router-dom";
import Home from "./component/client/home";
import Blog from './component/client/blog';
import Cart from "./component/client/cart";
import CheckoutSection from "./component/client/check-out";
import ProfileClient from "./component/client/profile/index";
import Login from "./component/client/profile/login";
import Register from "./component/client/profile/register";
import ForgotPassword from "./component/client/profile/forgetPassword";
import Product from "./component/client/shop";
import ProductDetail from "./component/client/shop/detail";
import Contact from "./component/client/contact";
import BlogDetails from "./component/client/blog/detail";
import Favourites from "./component/client/favourites";
import Introduce from "./component/client/introduce";

import './assets/css/bootstrap.min.css'
import './assets/css/elegant-icons.css'
import './assets/css/font-awesome.min.css'
import './assets/css/nice-select.css'
import './assets/css/slicknav.min.css'
import './assets/css/style2.css'

// import './assets/css/all.min.css'
// import './assets/css/animate.css'
// import './assets/css/magnific-popup.css'
// import './assets/css/main.css'
// import './assets/css/owl.carousel.css'
// import './assets/css/meanmenu.min.css'
// import './assets/css/responsive.css'
//admin
import Dashboard from "./component/admin/dashboard/index";
import Profile from "./component/admin/profile/index";
import Categories from "./component/admin/categories/list";
import EditCategories from "./component/admin/categories/edit";
import AddCategories from "./component/admin/categories/add";
import Product2 from "./component/admin/products/list";
import EditProduct from "./component/admin/products/edit";
import AddProduct from "./component/admin/products/add";
import User from "./component/admin/users/list";
import EditUser from "./component/admin/users/edit";
import AddUser from "./component/admin/users/add";
import Layout from './component/admin/index';
import Authentication from "./component/admin/authentication";
import ListOrder from "./component/admin/order/list";
import Comment from "./component/admin/comment/list";
import BlogAdmin from "./component/admin/blog/list";
import EditBlog from "./component/admin/blog/edit";
import AddBlog from "./component/admin/blog/add";

import AlternativePaymentPage from "./component/client/paypal";
//import css
import './assets/plugins/chartist-js/dist/chartist.min.css';
import './assets/plugins/chartist-js/dist/chartist-init.css';
// import './assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css';
import "./assets/plugins/c3-master/c3.min.css";
import './assets/plugins/c3-master/c3.min.css';
import "./assets/css/style.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import './assets/css/bootstrap.min.css'
import './assets/css/elegant-icons.css'
import './assets/css/font-awesome.min.css'
// import './assets/css/jquery-ui.min.css'
import './assets/css/nice-select.css'
// import './assets/css/owl.carousel.min.css'
import './assets/css/slicknav.min.css'
import './assets/css/style.css'
import Shop from "./component/client/shop";
import Detail from "./component/client/shop/detail";
import PaymentSuccessPage from "./component/client/paypal/success";
import Momo from "./component/client/paypal/momo";
import Atm from "./component/client/paypal/atm";
import Qratm from "./component/client/paypal/qratm";
import Qrmomo from "./component/client/paypal/qrmomo";
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutSection />} />
        <Route path="/product" element={<Product/>}/>
        <Route path="/product-details/:id" element={<ProductDetail/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/introduce" element={<Introduce />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProfileClient />} />

        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutSection />} />
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/alternative-payment" element={<AlternativePaymentPage/>}/>
        <Route path="/success" element={<PaymentSuccessPage/>}/>
        <Route path="/momo" element={<Momo/>}/>
        <Route path="/atm" element={<Atm/>}/>
        <Route path="/qratm" element={<Qratm/>}/>
        <Route path="/qrmomo" element={<Qrmomo/>}/>

      {/* Các route admin */}
      <Route path="/admin" element={<Layout />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/category" element={<Categories />} />
      <Route path="/admin/category/edit/:id" element={<EditCategories />} />
      <Route path="/admin/category/add" element={<AddCategories />} />
      <Route path="/admin/product" element={<Product2 />} />
      <Route path="/admin/product/add" element={<AddProduct />} />
      <Route path="/admin/product/edit/:id" element={<EditProduct />} />
      <Route path="/admin/user" element={<User />} />
      <Route path="/admin/login" element={<Authentication />} />
      <Route path="/admin/addUser" element={<AddUser />} />
      <Route path="/admin/editUser" element={<EditUser />} />
      <Route path="/admin/order" element={<ListOrder />} />
      <Route path="/admin/comment" element={<Comment />} />
      <Route path="/admin/blog" element={<BlogAdmin />} />
      <Route path="/admin/addBlog" element={<AddBlog />} />
      <Route path="/admin/editBlog" element={<EditBlog />} />

    
        

    </Route>
    )
  );
 
  return (
    <RouterProvider router={router} />
   
  );
}

export default App;