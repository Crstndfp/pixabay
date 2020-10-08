import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({texto, setTexto, setBusqueda }) => {

    const [error, setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        if (texto.trim() === '') {
            setError(true);
            return;
        }
        setBusqueda(true);
        setError(false);

    };

    return (
        <form
            onSubmit={buscarImagenes}
        >
            {
                (error)
                    ? <Error mensaje="Debe ingresar una categoria" />
                    : null
            }
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="Busca una imagen Ej. café" 
                        onChange={e => setTexto(e.target.value)} />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block" 
                        placeholder="Buscar" />
                </div>
            </div>
        </form>
    );
}

export default Formulario;