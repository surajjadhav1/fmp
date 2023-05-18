import { useEffect, useState } from 'react';
import adminServices from '../../Services/admin.services';
import { useNavigate } from "react-router-dom";
import AdminNavBar from './AdminNavBar';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../Footer';

function Category() {

    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [cat, setCat] = useState([]);

    const init = () => {
        adminServices.getCategory()
            .then(response => {
                console.log('Printing category data', response.data);
                setCategory(response.data);
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
        adminServices.removeCategory(id)
            .then(response => {
                console.log('Category deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const addcategory = (e) => {
        e.preventDefault();
        console.log(cat);

        adminServices.addCategory(cat)
            .then(response => {
                console.log("Category Added", response.data)
                toast.success('Category Added. Auto-Redirecting....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    window.location.reload();
                }, 2500)
            })
            .catch(error => {
                console.log('Something went wrong', error);
                toast.error('Something went wrong!',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
            })
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 class="my-1 mt-5 text-center text-primary fw-bold">List of Category</h3>
                <hr />
                <div>
                    {/* Modal Trigger */}
                    <button type="button" className="btn btn-primary mb-3 float-end" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Category
                    </button>

                    {/* Modal Component */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Category</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <label className="mb-2 text-muted" htmlFor="category">Enter Category Name</label>
                                        <input id="category" type="text" className="form-control" name="category" required
                                            maxLength={10}
                                            value={cat}
                                            onChange={(e) => setCat(e.target.value)}
                                        />
                                        <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Max Length Allowed 10</p>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={(e) => addcategory(e)}>Save Category</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn btn-info mb-3 " onClick={() => { navigate("/admin") }}> <i class="fa fa-home" aria-hidden="true"></i> Go To Back Page</button>

                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr className="table-primary">
                                <th>Category Id</th>
                                <th>Category Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                category.map(c => (
                                    <tr key={c.categoryId}>
                                        {/* <td>{c.categoryId}</td> */}
                                        <td>{(category.indexOf(c) + 1)}</td>
                                        <td>{c.categoryName}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => {
                                                handleDelete(c.categoryId);
                                            }}><i class="fa fa-trash" aria-hidden="true"></i></button>
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

export default Category;