import './App.css';
import PhoneForm from "./components/PhoneForm";
import PhoneList from "./components/PhoneList";
import axios from "axios";
import {setPhoneNumberList, setRegionCodes} from "./redux/actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch();
    const getPhoneNumbers = () => {
        axios.get('http://localhost:3001/list')
            .then((response) => {
                dispatch(setPhoneNumberList(response.data))
            })
    }
    const addPhoneNumber = (region, value) => {
        const phoneNumber = "+" + region + value;
        axios.post('http://localhost:3001/add', {phoneNumber: phoneNumber})
            .then(() => {
                getPhoneNumbers();
            })
    }
    const getRegionCodes = () => {
        axios.get('http://localhost:3001/regions')
            .then((response) => {
                const regions = Object.values(response.data)
                dispatch(setRegionCodes(regions));
            })
    }
    const deletePhoneNumber = (id) => {
        axios.delete('http://localhost:3001/delete', {data: {id: id}})
            .then(() => {
                getPhoneNumbers();
            })
    }

    useEffect(()=> {
        getPhoneNumbers()
    },[])
    let timerId = setInterval(() => {getPhoneNumbers()}, 3000);

    return (
        <div className="App">
            <PhoneForm
                addPhoneNumber={addPhoneNumber}
                getRegionCodes={getRegionCodes}
            />
            <PhoneList
                deletePhoneNumber={deletePhoneNumber}
            />
        </div>
    );
}

export default App;
