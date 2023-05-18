import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import Footer from '../Footer';

function Admin() {
    const navigate = useNavigate();
    return (
        <div>
            <AdminNavBar />
       
            <div className="container my-5">
                <div className="row">
                    <div className="col-xl-3">
                        <div class="card border-primary mb-3">
                            <div class="card-body">
                                <h1 class="card-title text-center text-primary fontbld">25</h1>
                                <h5 class="card-title text-center ">Total Farmer</h5>
                               <button type="button" className="btn btn-primary btn-md mx-2 form-control" onClick={() => navigate('/admin/farmer')}>All Farmers List</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div class="card border-success mb-3">
                            <div class="card-body">
                                <h1 class="card-title text-center text-success fontbld">10</h1>
                                <h5 class="card-title text-center ">Total Category</h5>
                                <button type="button" className="btn btn-success btn-md mx-2 form-control" onClick={() => navigate('/admin/category')}>Product Category</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div class="card border-danger mb-3">
                            <div class="card-body">
                                <h1 class="card-title text-center text-danger fontbld">52</h1>
                                <h5 class="card-title text-center ">Total Products</h5>
                                <button type="button" className="btn btn-danger btn-md mx-2 form-control" onClick={() => navigate('/admin/productslist')}>Products List</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div class="card border-warning mb-3">
                            <div class="card-body">
                                <h1 class="card-title text-center text-warning fontbld">103</h1>
                                <h5 class="card-title text-center">Total Orders</h5>
                                <button type="button" className="btn btn-warning btn-md mx-2 form-control" onClick={() => navigate('/admin/order')}>Orders List</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                   <div className="col-xl-4"></div>
                    <div className="col-xl-4">
                        <div class="card border-info mb-3">
                            <div class="card-body">
                                <h1 class="card-title text-center text-info fontbld">25</h1>
                                <h5 class="card-title text-center"> Total Users</h5>
                                <button type="button" className="btn btn-info btn-md mx-2 form-control" onClick={() => navigate('/admin/userslist')}>Registered Users List</button>
                            </div>
                        </div>
                    </div>
                   <div className="col-xl-4"></div>

                </div>
            </div>



            <Footer />
        </div>
    );
}

export default Admin;