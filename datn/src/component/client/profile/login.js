import React, { useState } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from '../../../assets/images/users/avt.png';

const Login = () => {
 
  return (
    <>
      <Header />
    <div className="container pb-5">
        <div className="border p-5 m-5 formLogin">
            <div className="col-lg-12 col-12">
                <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                        <img src={avt} className="rounded-circle " alt="User Avatar" />
                    </div>
                    <div className="col-6">
                        <h2 className="text-center text-danger col-lg-12 col-12">Đăng Nhập</h2>
                        <form>
                            <div className="form-group">
                                <label>Tài khoản</label>
                                <input type="text" className="border-inputs"/>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input type="password" className="border-inputs"/>
                            </div>
                            <div className="col-6 p-0"> <button type="submit" className="btn btn-danger text-light">Đăng Nhập</button></div> 
                            <div className="row">
                                <div className="col-4 p-0 pt-2 ">  <a href="/register" className="quenmatkhau">Bạn chưa có tài khoản?</a></div>
                                <div className="col-4 p-0 pt-2 " >  <a href="forgotPassword" className="quenmatkhau">Quên mật khẩu?</a></div> 
                            </div>
                            <div className="form-group">
                                <div className="bg-primary loginGG mt-3">
                                    <i style={{ fontSize:"20px"}} class="bi bi-facebook text-light"></i>
                                    <span className="text-loginGG">Đăng nhập bằng Facebook</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="bg-danger loginGG">
                                    <i style={{ fontSize:"20px"}} class="bi bi-google text-light"></i>
                                    <span className="text-loginGG">Đăng nhập bằng Google</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
