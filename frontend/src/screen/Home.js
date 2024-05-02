import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'
function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let result = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await result.json();
        console.log(data[0], data[1]);

        setFoodItem(data[0]);
        setFoodCat(data[1])
    }

    useEffect(() => {
        loadData()
    }, []);


    return (
        <div>           
            <div>
                <div id="carouselExampleControls" className="carousel slide carousel-fade;" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner">
                        <div className='carousel-caption' style={{ "zIndex": "10" }}>
                            <div>
                                <p className='m-5 text-success'  style={{height:"100px", fontSize:"100px", fontWeight:"bolder",fontStyle:"italic"}} >Restro</p>
                            </div>
                            
                            <div className="d-flex justify-content-center" style={{boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)", borderRadius: "5px"}}>
                            
                                <input className="form-control fs-4 " id='seacrh' type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white bg fs-4" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x400/?burger" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x400/?french-fries" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x400/?chocolate-cake" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container  overflow-hidden'>
                {
                    foodCat != [] ?
                        foodCat.map((data) => {
                            return (
                                <div className='row mb-3 g-1'>
                                    <div key={data._id} className='fs-3 m-3 '>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem != [] ?
                                        foodItem.filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodItems={filterItems}
                                                            options={filterItems.options[0]}
                                                            // imgSrc={filterItems.img}
                                                        ></Card>

                                                    </div>
                                                )
                                            }) : <div>No such Data Found</div>
                                    }
                                </div>
                            )
                        }) : <div>""""""""""</div>
                }




            </div>

        </div>

    )
}

export default Home