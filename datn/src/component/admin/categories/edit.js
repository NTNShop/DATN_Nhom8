import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css"

const EditCategory = () => {
    
    return (
<div className=''>
<Header />
        <div class="col-sm-11" style={{position: "relative", left: "241px"}}>
            <div className=''>
    <div className="card">
        <div className="card-body">
        <h4 className="card-title">Edit Category</h4>
            <form class="form-horizontal form-material mx-2">
                <div className="form-group mb-3">
                    <label className="col-md-12 mb-0">Username</label>
                    <div class="col-md-12">
                    <input type="text" id="fullname" placeholder=""
                        className=" form-control-line border-input"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12 d-flex">
                        <button class="btn btn-success mx-auto mx-md-0 text-white">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
</div>
);
};

export default EditCategory;