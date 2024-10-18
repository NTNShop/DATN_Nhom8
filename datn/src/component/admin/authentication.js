import React from 'react';

const Authentication = () => {
  return (
    <div className="">
      <section className="vh-100" style={{ backgroundColor: 'black' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 ">
  
                  <h3 className="mb-5">Đăng nhập</h3>
  
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2">Tên đăng nhập</label>
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" />
                  </div>
  
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">Mật khẩu</label>
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                  </div>
  
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3"> Ghi nhớ mật khẩu </label>
                  </div>
  
                  <button className="btn btn-lg btn-block text-light" style={{'background': '#198754'}} type="submit">Đăng nhập</button>
  
                  <hr className="my-4"/>
  
                  <button className="btn btn-lg col-12 text-light" style={{'background': '#ea4335'}} type="submit">
                    <i className="fab fa-google me-2 text-light"></i> Đăng nhập bằng Google
                  </button>
                  <button className="btn btn-lg mb-2 col-12 text-light mt-1" style={{'background': '#3b5998'}} type="submit">
                    <i className="fab fa-facebook-f me-2 text-light"></i> Đăng nhập bằng Facebook
                  </button>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authentication;
