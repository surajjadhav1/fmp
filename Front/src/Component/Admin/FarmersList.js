import { useEffect, useState } from 'react';
import farmerServices from '../../Services/farmer.services';
import { useNavigate} from "react-router-dom";
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';

function FarmersList() {

    const [farmers, setFarmers] = useState([]);
    const navigate = useNavigate();

    const init = () => {
        farmerServices.farmersList()
            .then(response => {
                console.log('Printing farmers data', response.data);
                setFarmers(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        farmerServices.removeFarmer(id)
            .then(response => {
                console.log('employee deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 class="my-1 mt-5 text-center text-primary fw-bold">List of Farmers</h3>
                <hr />
                <div>
                    <button type="button" className="btn btn-info mb-3 " onClick={() => { navigate("/admin") }}> <i class="fa fa-home" aria-hidden="true"></i> Go To Back Page</button>
                    <button type="button" className="btn btn-primary mb-3 float-end" onClick={() => navigate('/admin/addnewfarmer')}> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Farmer</button>
                    
                    <table className="table table-bordered table-striped text-center">
                        <thead className="thead-dark">
                        <tr className="table-primary">
                                <th>Farmer Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone No.</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th className='text-center'>Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                farmers.map(f => (
                                    <tr key={f.farmerId}>
                                        <td>{farmers.indexOf(f) + 1}</td>
                                        <td>{f.firstname}</td>
                                        <td>{f.lastname}</td>
                                        <td>{f.phoneNo}</td>
                                        <td>{f.email}</td>
                                        <td>{f.address}</td>
                                        <td className='text-center'>
                                            <button type="button" className="btn btn-info mx-1" onClick={() =>
                                                navigate(`/admin/updatefarmer/${f.farmerId}`)}>Update</button>

                                            <button type="button" className="btn btn btn-success mx-3" onClick={() =>
                                                navigate(`/admin/addproduct/${f.farmerId}`)}>Add Product</button>

                                            <button className="btn btn-danger ml-2" onClick={() => {
                                                handleDelete(f.farmerId);
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default FarmersList;