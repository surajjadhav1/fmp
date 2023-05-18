import { useEffect, useState } from "react";
import userServices from "../../Services/user.services";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EmptyCart from "./EmptyCart";
import UserNavBar from "./UserNavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

function CheckOut() {
    const [cart, setCart] = useState([])
    const [totalAmount, setTotalAmout] = useState('')
    const [user, setUser] = useState([])
    const [empty, setEmpty] = useState(false)

    const navigate = useNavigate()
    const init = () => {

        var val = localStorage.getItem('user-token')
        var object = JSON.parse(val);
        setUser(object)

        userServices.checkOut()
            .then(response => {
                console.log("Got response from checkout", response.data)
                setCart(response.data)

                var sum = 0;
                response.data.forEach(data => {
                    sum += parseInt(data.amount)
                });

                setTotalAmout(sum);

                if (response.data.length === 0) {
                    setEmpty(true)
                }

            })
            .catch(error => {
                console.log("Something went wrong", error)
                setEmpty(true)
            })
    }

    const removeItem = (id) => {
        console.log(id)
        userServices.removeItem(id)
            .then(response => {
                console.log("Item Removed", response.data)
                init()
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    }

    useEffect(() => {
        init()
    }, [])

    const buyItems = () => {
        console.log("hi")
        userServices.placeOrder()
            .then(response => {
                console.log("Order Placed", response.data)
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    }

    return (
        <div>
            <UserNavBar />
            <div className="container">
                <h3 className='my-1 mt-5 text-center text-primary fw-bold'>Cart Details</h3>
                <hr />
                {

                    empty ? <EmptyCart /> : <div> <table className="table table-bordered table-striped text-center table-hover table-responsive" style={{ verticalAlign: 'middle' }}>
                        <thead className="thead-dark ">
                        <tr className="table-primary">
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Unit</th>
                                <th>Amount</th>
                                <th className='text-center'>Image</th>
                                <th className='text-center'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(c => (
                                    <tr key={cart.indexOf(c)}>
                                        <td>{c.item}</td>
                                        <td>{c.qty}</td>
                                        <td>{c.price}</td>
                                        <td>{c.amount}</td>
                                        <td className="text-center">
                                            <img src={`http://localhost:8080/FarmersMarketplace/admin/${c.id}`} alt='productImage' width={75} />
                                        </td>
                                        <td>
                                            <button className="btn btn-danger ml-2" onClick={() => { removeItem(cart.indexOf(c)) }}> <i class="fa fa-trash" aria-hidden="true"></i> </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <p className="fs-2 text-success">Total Amount: {totalAmount}</p>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end me-5 mb-5">
                            {/* <button className="btn btn-primary btn-lg" onClick={() => buyItems()}>Place Order</button> */}
                            <button className="btn btn-primary btn-lg" onClick={() => navigate('/user/payment', { state: {totalAmount} })}>Place Order</button>
                        </div>
                    </div>

                }



                <div>
                    <Row md={2} >
                        <Col>
                            <Card>
                                <Card.Body className="ms-4">
                                    <Card.Title className="text-success">Delivery Address: </Card.Title><hr/>
                                    <Card.Text>
                                        <b>Name:</b> {user.firstname + " " + user.lastname}
                                        <br />
                                        <b>Address:</b> {user.address}
                                        <br />
                                        <b>Email:</b> {user.email}
                                        <br />
                                        <b>Phone No.:</b> {user.phoneNo}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
                
            </div>
            <Footer/>
        </div>
    );
}

export default CheckOut;