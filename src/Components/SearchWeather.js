import React, { useState } from 'react';

export default function SearchWeather() {
    const [search, setSearch] = useState("");
    const [placeInfo, setPlaceInfo] = useState({});
    const handleSubmit=(e)=>{e.preventDefault()}
    const handleFetch = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5eadc8e08cbd557f581186e7a80fd8ac&units=metric`).then((response) => response.json())
            .then((data) => setPlaceInfo({
                temp:data.main.temp,
                main:data.weather[0].main,
                temp_min:data.main.temp_min,
                temp_max:data.main.temp_max,
                country:data.sys.country

            }));
    }
    console.log(placeInfo)

    // let emoji =null;
    // if(typeof placeInfo.main != "undefined"){
    //     if(placeInfo.main === "Clouds"){
    //         emoji= "fa-cloud"
    //     }else if(placeInfo.main === "Thunderstorm"){
    //             emoji= "fa-bolt"
    //     }else if(placeInfo.main === "Drizzle"){
    //         emoji= "fa-cloud-rain"
    //     }else if(placeInfo.main === "Rain"){
    //         emoji= "fa-cloud-shower-heavy"
    //     }else if(placeInfo.main === "Snow"){
    //         emoji= "fa-snow-flake"
    //     }else{
    //         emoji="fa-smog"
    //     }    
    // }else{
    //      return(
    //         <div>...Loading</div>
    //      )
    // }
    
    // Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default" ,{month:'short'});
    let day = d.toLocaleString("default",{weekday:'long'});

    // Time
    let time = d.toLocaleString([],{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
    });

    return (
        <div>
            <div className="container mt-5" >
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/random/600x900/?${placeInfo.main}`} className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input type="search" className="form-control" value={search} placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2" onChange={(e) => setSearch(e.target.value)} />
                                        <button onClick={handleFetch} className="input-group-text" id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 className="card-title">{search}{","}{placeInfo.country}</h2>
                                    <p className="card-text lead">
                                        {day}, {month} {date},{year}
                                        <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas fa-cloud fa-4x`}></i>
                                    <h1 className="fw-bolder mb-5"><i className="fa fa-thermometer-full" aria-hidden="true"></i> {placeInfo.temp}&deg;C</h1>
                                    <p className="lead fw-bolder mb-0">{placeInfo.main}</p>
                                    <p className="lead">{placeInfo.temp_min} &deg;C | {placeInfo.temp_max} &deg;C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
