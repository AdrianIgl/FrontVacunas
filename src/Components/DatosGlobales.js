import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './datosg.css';

const Pricing = () => {
    const baseUrl = "http://localhost:5000/vacunas/";
    const [data, setData] = useState([]);
    const [entregadas, setEntregadas] = useState([0]);
    const [administradas, setAdministradas] = useState([0]);
    const [pauta, setPauta] = useState([0]);


    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                var dosisTotales = 0, dosisAdministradas = 0, pautaCompleta = 0;

                setData(response.data);
                //console.log(response.data);

                response.data.map(function (item, i) {
                    dosisTotales += item.pzifer;
                    dosisTotales += item.moderna;
                    dosisAdministradas += item.dosis_Administradas;
                    pautaCompleta += item.pauta_Completa;
                });

                console.log("Dosis entregadas en CC.AA: " + dosisTotales);
                console.log("Dosis Administradas: " + dosisAdministradas);
                console.log("Pauta Completa: " + pautaCompleta);

                setEntregadas(dosisTotales);
                setAdministradas(dosisAdministradas);
                setPauta(pautaCompleta);
      

                //setDosisEntregadas()
            }).catch(error => {
                console.log(error);
            })
    }//peticionGet
    useEffect(() => {
        peticionGet();
    }, [])
    return (
        <div className="App" style={{ textAlign: 'center' }}>
            <h1 className="gradient-text">Datos Globales</h1>
            <div className="global">
                <div className="bg-success rounded bg-custom-1 text-white align-middle">
                    <p>Dosis entregadas en CC.AA</p>
                    <p className="font-weight-bold font-size-xx-large">{entregadas.toLocaleString("es-ES")}</p>
                </div>
                <div className="bg-success rounded bg-custom-2 text-white align-middle">
                    <p>Dosis administradas</p>
                    <p className="font-weight-bold font-size-xx-large" >{administradas.toLocaleString("es-ES")}</p>
                </div>
                <div className="bg-success rounded bg-custom-1 text-white align-middle">
                    <p>Nº Personas con pauta completa</p>
                    <p className="font-weight-bold font-size-xx-large">{pauta.toLocaleString("es-ES")}</p>
                </div>
            </div>
        </div>
    )
}

export default Pricing;