import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
type Person = {
    name: string,
    age: number,
    city: string,
    volountary?: boolean,
    imglink?: string,
    id: number
}

const Profile = () => {
    const {id} = useParams();
    const [person, setPerson] = useState< Person| null>(null)
    const [serverUrl, setServerUrl] = useState('http://localhost:8000/people')
    useEffect(()=>{
        async function fetchData(){
            setServerUrl(`http://localhost:8000/people/${id}`)
            const response = await fetch(serverUrl);
            const responseObj = await response.json()
            console.log(responseObj)
            setPerson(responseObj)
        } 
        fetchData()
    },[serverUrl, id])

    return(
    <div>
        {person !== null ?(
            <div>
                <h2>{person.name}</h2>
                <ul>
                <li>{person.age}</li>
                <li>{person.city}</li>
                </ul>
            </div>
        ) : (
            <p>loading</p>
        )}
    </div>)
}

export default Profile