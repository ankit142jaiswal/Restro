import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const collectData = async (e) => {
    e.preventDefault();
    console.log({ email, password })
    let result = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"

      }

    });
    const data = await result.json();
    console.log(data)

    if (!data.success) {
      window.alert("Enter Valid Credentials")
    }

    if (data.success) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("authToken", data.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/home");
    }

  }


  return (
    <>

      <div className='container mt-5 p-5 rounded' style={{ boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)" }} >
        <form method='POST' >
          <h1>Login User</h1><hr />
          <div className='row'>
          <div className='col-4'>

          <label className='from-label'> Email : </label>
          </div>
          <div className='col-6'>

          <input className='form-control' type="text" placeholder="enter email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
          </div>

      </div>
      <div className='row'>
        <div className='col-4'>
          <label className='form-label'> Password : </label>

        </div>
        <div className='col-6'>

          <input className='form-control' type="password" placeholder="enter password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        </div>
      </div>

          <button className='m-2 btn btn-success' type="button" onClick={collectData} >Login</button>
          <Link to='/signup' className='m-2 btn btn-danger' type="button" >I am new User</Link><br />
          <span>Already User / New User</span> <br />

          <span>Terms and Conditions Applied </span><br />



        </form>

          </div>


    </>
  )
}

export default Login