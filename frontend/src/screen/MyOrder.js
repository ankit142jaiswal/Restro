import React, { useEffect, useState } from 'react'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
// import orderData from '../../backend/Routes/OrderData'
function MyOrder() {

    const [orderData, setOrderData] = useState([]);
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem("userEmail"));
        await fetch("http://localhost:5000/api/myorderData", {
            method: "POST",
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(async(resp) => {
            let response = await resp.json();
            await setOrderData(response)
        })



    }

    useEffect(() => {
        fetchMyOrder()
    }, [])



return (

    <div className='container '>
        <div className='row'>
            {
                orderData != [] ?
                    Array(orderData).map(data => {
                        return (

                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div>
                                                    {
                                                        arrayData.Order_data ?
                                                            <div className='m-auto mt-5'>
                                                                {data = arrayData.Order_data}


                                                                < hr />
                                                            </div>

                                                            :

                                                            <div className='col-12 col-md-6 col-lg-3'>
                                                                <div className='card mt-3' style={{ width: "16rem", maxHeight: '360px' }}>
                                                                    <img src={arrayData.img} className='card-img-top' alt="..." style={{ height: "120px" }} />
                                                                    <div className='card-body'>
                                                                        <h5 className='card-title'>{arrayData.name}</h5>
                                                                        <div className='container w-100 p-0' style={{ height: '38px' }}>
                                                                            <span className='m-1'>{arrayData.qty}</span>
                                                                            <span className='m-1'>{arrayData.size}</span>
                                                                            <span className='m-1'>{data}</span>
                                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                                ${arrayData.price}/-
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : ""
                        )
                    }) : ""}
        </div>




    </div >
)


}







export default MyOrder