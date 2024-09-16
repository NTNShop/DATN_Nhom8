import React from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/css/styleEdit.css"

const EditProduct = () => {
    
    return (
<div>
<Header />
        <div class="col-sm-11" style={{position: "relative", left: "241px"}}>
    <div className="card">
        <div className="card-body">
        <h4 className="card-title">Edit Product</h4>
            <form class="form-horizontal form-material mx-2">
                <div className="form-group mb-3">
                    <label className="col-md-12 mb-0">Name</label>
                    <div class="col-md-12">
                    <input type="text" id="fullname" placeholder=""
                        className=" form-control-line border-input"/>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="example-email" class="col-md-12">Image</label>
                    <div class="col-md-12">
                        <input type="file" placeholder="johnathan@admin.com"
                            class="form-control-line border-input" name="example-email"
                            id="example-email"/>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label class="col-md-12 mb-0">Price</label>
                    <div class="col-md-12">
                        <input type="text"class="form-control-line border-input"/>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label class="col-md-12 mb-0">ID category</label>
                    <div class="col-md-12">
                        <input type="text" 
                            class="form-control-line border-input"/>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label class="col-md-12 mb-0">Description</label>
                    <div class="col-md-12">
                        <textarea rows="5" class=" border-input2 form-control-line"></textarea>
                    </div>
                </div>
                {/* <div class="form-group">
                    <label class="col-sm-12">Select Country</label>
                    <div class="col-sm-12 border-bottom">
                        <select class="form-select shadow-none ps-0 border-0 form-control-line">
                            <option>London</option>
                            <option>India</option>
                            <option>Usa</option>
                            <option>Canada</option>
                            <option>Thailand</option>
                        </select>
                    </div>
                </div> */}
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
);
};

export default EditProduct;