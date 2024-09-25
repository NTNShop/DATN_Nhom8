import React, { useState } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from '../../../assets/images/users/avt.png';

const forgotPassword = () => {
 
  return (
    <>
      <Header />
    <div className="container pb-5 col-6">
        <div className="border p-5 m-5 formLogin">
            <div className="col-lg-12 col-12">                 
                    <div className="col-12">
                        <div className="col-12 text-center pb-2">
                        <span className=" text-danger">Quên mật khẩu? Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận được liên kết để tạo mật khẩu mới qua email.</span>
                        </div>
                    <form className="d-flex justify-content-center row">
                        <div className="form-group col-7">
                            <label className=" form-label col-12 p-0">Email <span className="text-danger">*</span></label>
                            <input type="email" className="border-inputs" placeholder="Nhập email của bạn"/>
                        </div>
                        <div className="col-12 p-0 text-center"> <button type="submit" className="btn btn-danger text-light ">Xác nhận</button></div> 
                    </form>
                    </div>
                
            </div>
        </div>
    </div>

    </>
  );
};

export default forgotPassword;
