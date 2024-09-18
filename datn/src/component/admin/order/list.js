import React from 'react';
import Header from "../layouts/header";
const ListOrder = () => {
    
    return (
<div className="">
{/* <!-- Start Page Content --> */}
<Header />

<div className="row ">
    <div class="col-sm-10" style={{position: "relative", left: "241px"}}>
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">List Product</h4>
                <span><a href='/admin/product/add' className="btn btn-primary">Add Product</a></span>
                <div className="table-responsive">
                    <table className="table user-table text-center">
                        <thead>
                            <tr className='table-light'>
                                <th className="border-top-0">ID</th>
                                <th className="border-top-0">Name</th>
                                <th className="border-top-0">Price</th>
                                <th className="border-top-0">Image</th>
                                <th className="border-top-0">version</th>
                                <th className="border-top-0">Color</th>
                                <th className="border-top-0">Action</th>
                            </tr>
                        </thead>
                        <tbody className='align-middle'>
                            <tr>
                                <td >1</td>
                                <td>SH160i/125i</td>
                                <td>73.921.091 VNĐ</td>
                                <td><img width={"150px"} src={"https://cdn.honda.com.vn/motorbike-versions/August2023/dRxlGKvDbVFbdEyfzYVc.png"} alt="Example" /></td>
                                <td >SH125i Phiên bản Đặc Biệt</td>
                                <td>Đen</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td >1</td>
                                <td>SH160i/125i</td>
                                <td>73.921.091 VNĐ</td>
                                <td><img width={"150px"} src={"https://cdn.honda.com.vn/motorbike-versions/August2023/dRxlGKvDbVFbdEyfzYVc.png"} alt="Example" /></td>
                                <td >SH125i Phiên bản Đặc Biệt</td>
                                <td>Đen</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td >1</td>
                                <td>SH160i/125i</td>
                                <td>73.921.091 VNĐ</td>
                                <td><img width={"150px"} src={"https://cdn.honda.com.vn/motorbike-versions/August2023/dRxlGKvDbVFbdEyfzYVc.png"} alt="Example" /></td>
                                <td >SH125i Phiên bản Đặc Biệt</td>
                                <td>Đen</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td >1</td>
                                <td>SH160i/125i</td>
                                <td>73.921.091 VNĐ</td>
                                <td><img width={"150px"} src={"https://cdn.honda.com.vn/motorbike-versions/August2023/dRxlGKvDbVFbdEyfzYVc.png"} alt="Example" /></td>
                                <td >SH125i Phiên bản Đặc Biệt</td>
                                <td>Đen</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    </div>
</div>

{/* End PAge Content  */}

</div>
);
};

export default ListOrder;