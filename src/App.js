import './App.css';
import axios from 'axios';
import Main from './Main';
import React, {useState, useEffect} from 'react';
import './css/style.css';
import MainSearch from "./MainSearch";
import Map from "./Map";
import Emergency from "./Emergency";


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const App = () => {
   /* const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${API_END_POINT}/store/cafe`).then((res) => {
            setData(
                res.data.elements[0].elements[1].elements[0].elements[0].elements[0]
                    .elements[0].text
            );
        });
    }, []);
    console.log(data); */
   // axios.post(`${API_END_POINT}/sanmoa/route`, {params:{name:'dayooneee' }});

    return (
        <div>
            <Map/>
        </div>
    );
};
export default App;