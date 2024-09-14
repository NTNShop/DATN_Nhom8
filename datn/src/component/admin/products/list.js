import React from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
const listProduct = () => {
    
    return (
<div className="">
{/* <!-- Start Page Content --> */}
<Header />

<div className="row ">
    <div class="col-sm-10" style={{position: "relative", left: "241px"}}>
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">List Product</h4>
                <span><a href='/admin/addProduct' className="btn btn-primary">Add Product</a></span>
                <div className="table-responsive">
                    <table className="table user-table text-center">
                        <thead>
                            <tr className='table-light'>
                                <th className="border-top-0">ID</th>
                                <th className="border-top-0">Name</th>
                                <th className="border-top-0">Price</th>
                                <th className="border-top-0">Image</th>
                                <th className="border-top-0">ID category</th>
                                <th className="border-top-0">Description</th>
                                <th className="border-top-0">Action</th>
                            </tr>
                        </thead>
                        <tbody className='align-middle'>
                            <tr >
                                <td >1</td>
                                <td>táo xanh</td>
                                <td>trung123</td>
                                <td><img width={"150px"} src={"https://themewagon.github.io/fruitkha/assets/img/products/product-img-5.jpg"} alt="Example" /></td>
                                <td >Huynh Minh Trung</td>
                                <td>01665202865</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href='/admin/editProduct' className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>minhtrung</td>
                                <td>trung123</td>
                                <td><img width={"150px"} src={"https://themewagon.github.io/fruitkha/assets/img/products/product-img-5.jpg"} alt="Example" /></td>
                                <td>Huynh Minh Trung</td>
                                <td>01665202865</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href='/admin/editProduct' className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>minhtrung</td>
                                <td>trung123</td>
                                <td><img width={"150px"} src={"https://themewagon.github.io/fruitkha/assets/img/products/product-img-5.jpg"} alt="Example" /></td>
                                <td>Huynh Minh Trung</td>
                                <td>01665202865</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href='/admin/editProduct' className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>minhtrung</td>
                                <td>trung123</td>
                                <td><img width={"150px"} src={"https://themewagon.github.io/fruitkha/assets/img/products/product-img-5.jpg"} alt="Example" /></td>
                                <td>Huynh Minh Trung</td>
                                <td>01665202865</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href='/admin/editProduct' className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>minhtrung</td>
                                <td>trung123</td>
                                <td><img width={"150px"} src={"https://themewagon.github.io/fruitkha/assets/img/products/product-img-5.jpg"} alt="Example" /></td>
                                <td>Huynh Minh Trung</td>
                                <td>01665202865</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href='/admin/editProduct' className="btn btn-primary">Edit</a></span>
                                    <span><button href className="btn btn-danger">Delete</button></span>
                                     </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>minhtrung</td>
                                <td>trung123</td>
                                <td><img width={"150px"} src={"https://themewagon.github.io/fruitkha/assets/img/products/product-img-5.jpg"} alt="Example" /></td>
                                <td>Huynh Minh Trung</td>
                                <td>01665202865</td>
                                <td> 
                                    <div className="d-flex gap-2 justify-content-center">
                                    <span><a href='/admin/editProduct' className="btn btn-primary">Edit</a></span>
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

export default listProduct;