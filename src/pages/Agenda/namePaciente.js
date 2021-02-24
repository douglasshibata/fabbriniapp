import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { TableCell } from "@material-ui/core";

function NomePaciente(props) {
    const idUsuario = props.dados.usuarioPaciente;
    const [dadosUsuario, setDataUsuario] = useState()
    useEffect(() => {
        const getDataUsuario = async () => {
            try {
                const response = await api.get('/perfil', { headers: { _id: idUsuario } });
                setDataUsuario(response.data.user)
            } catch (error) {
                console.log(error.response);
                alert("Erro em carregar os dados")
            }
        }
        getDataUsuario()
    }, []);

    return (
        <>
          
                {dadosUsuario && 
                  <TableCell>{dadosUsuario.firstName} {dadosUsuario.familyName}</TableCell>
                }
        </>
    )
}

export default NomePaciente;