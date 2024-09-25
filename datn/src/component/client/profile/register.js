import React, { useState } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from '../../../assets/images/users/avt.png';

const Register = () => {
 
  return (
    <>
      <Header />
    <div className="container pb-5">
        <div className="border p-5 m-5 formLogin">
            <div className="col-lg-12 col-12">
                <div className="row">
                    <div className="w-50 d-flex justify-content-center">
                    <img src={avt} className="rounded-circle" width={"350px"} height={"350px"} alt="User Avatar" />
                    </div>
                    <div className="col-6">
                        <h2 className="text-center text-danger col-lg-12 col-12">Đăng Kí</h2>
                    <form>
                        <div className="form-group">
                            <label>Tài khoản</label>
                            <input type="text" className="border-inputs"/>
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" className="border-inputs"/>
                        </div>
                        <div className="form-group">
                            <label>Nhập lại mật khẩu</label>
                            <input type="password" className="border-inputs"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="border-inputs"/>
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" className="border-inputs"/>
                        </div>
                        <div className="col-6 p-0"> <button type="submit" className="btn btn-danger text-light">Đăng Nhập</button></div> 
                        <div className="col-4 p-0 pt-2">  <a href="/login" className="quenmatkhau">Bạn đã có tài khoản?</a></div> 
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
  );
};

export default Register;
