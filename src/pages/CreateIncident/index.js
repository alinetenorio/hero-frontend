import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

import logoImg from "../../assets/logo.svg";

export default function AddIncident(){
    const ngoId = localStorage.getItem('ngoId');
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleAddIncident(e){
        e.preventDefault();

        const data = {title, description, value}; 

        try{
            await api.post('/incident', data, {headers: {Authorization: ngoId}}  );

            history.push('/profile');
        }catch(err){
            alert('Something went wrong. Try again');
        }
    }

    return (
        <div className="add-incident-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Create new incident</h1>

                    <p>Describe the incident with details to
                        find a hero.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Go back to Profile
                    </Link>

                </section>

                <form onSubmit={handleAddIncident}>

                    <input 
                        placeholder="Incident's title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}     
                    ></textarea>
                    <input 
                        placeholder="Value in Reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}  
                    />

                    <div className="input-group">
                        <button className="button">Cancel</button>
                        <button type="submit" className="button">Register</button>
                    </div>

                </form>
            </div>

        </div>
    );
}