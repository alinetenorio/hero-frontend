import React, { useEffect , useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css';
import api from '../../services/api'

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const ngoId = localStorage.getItem('ngoId');
    const ngoName = localStorage.getItem('ngoName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ngoId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ngoId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incident/${id}`,  {
                headers: {
                    Authorization: ngoId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert("Error")
        }
    }

    function handleLougout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero"/>
                <span>Welcome {ngoName}</span>

                <Link className="button" to="/incident/create">Register new incident</Link>
                <button onClick={handleLougout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Registered incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ) )}
               
            </ul>

        </div>
    );
}