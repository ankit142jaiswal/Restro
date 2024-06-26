import React from 'react'
import trash from '../trash.svg'
import { useCart, useDispatchCart } from '../components/ContextReducer'
function Cart() {
    let data=useCart();
    let dispatch = useDispatchCart();
    if ( data.length===0){
        return(
            <div>
                <div className='mt-5 w-100 text-center fs-1'>The Cart is Empty !!</div>
            </div>
        )
    }
    const handleCheckOut = async()=>{
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("https://restro-i14v.onrender.com/api/orderData",{
            method:"POST",           
            headers:{
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({
                email : userEmail,
                order_data : data,
                order_date : new Date().toDateString()
            })
        });
        console.log("Order Response: ",response)      
        if(response.status === 200){
            dispatch({type:"DROP"})
        }
        if ( response.status === false){
            window.alert("Order can't be place")
        }

    }
    let totalPrice = data.reduce((total, food)=>total + food.price, 0) 
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((food, index)=>(
                           <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type="button" className='btn p-0'><img src={trash}  alt='delete' onClick={()=>{dispatch({type:"REMOVE",index :index})
                            }} /></button></td>
                           </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                <h1 className='fs-2'>Total Price : ${totalPrice}/-</h1>
            </div>
            <dir>
                <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
            </dir>
        </div>


    </div>
  )
}

export default Cart