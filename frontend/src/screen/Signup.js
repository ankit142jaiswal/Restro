import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");



    const navigate = useNavigate();
    const collectData = async (e) => {
        e.preventDefault();
        console.log(name, password, email, location);
        let result = await fetch("http://localhost:5001/api/createuser", {
            method: 'POST',
            body: JSON.stringify({ name, email, password, location }),
            headers: {
                'Content-Type': 'application/json'
            }

        });
        const data = await result.json();
        console.log(data);
        if (!data.success) {
            window.alert("Enter the valid Credential")

        }
        if (data.success){
            window.alert("Signup Successfull !!")
             navigate('/login')
        }



    }

    return (
        <> 
          
            <div className='container mt-5 p-5  rounded' style={{ boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)"  }} >
                <form method='POST' >
                    <h1>SignUp User</h1><hr />
                    <div className='row'>
                        <div className='col-4'>
                            <label className='form-label'>  Name :  </label>

                        </div>
                        <div className='col-6'>

                            <input className='form-control' type="text" placeholder="enter your name" id="name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                        </div>

                    </div>
                    <div className='row'>

                        <div className='col-4'>

                            <label className='form-label'> Email : </label>
                        </div>
                        <div className='col-6'>
                            <input className='form-control' type="text" placeholder="enter your email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />

                        </div>

                    </div>
                    <div className='row'>

                        <div className='col-4'>

                            <label className='form-label'> Password : </label>
                        </div>
                        <div className='col-6'>
                            <input className='form-control' type="password" placeholder="enter your password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

                        </div>
                    </div>
                    <div className='row'>

                        <div className='col-4'>

                            <label className='form-label'> Location : </label>
                        </div>
                        <div className='col-6'>
                            <input className='form-control' type="text" placeholder="enter your location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} /><br /><br />

                        </div>
                    </div>

                    <button className='m-3 btn btn-success ' type="button" onClick={collectData} >Signup</button>
                    <Link to='/login' className='m-3 btn btn-danger' type="button" >Login</Link><br />
                    <span> New User / Already User </span> <br />

                    <span>Terms and Conditions Applied </span><br />

                </form>

            </div>


        </>
    );
}

export default Signup;