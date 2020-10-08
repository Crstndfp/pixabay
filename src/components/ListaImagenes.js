import React from 'react';
import Imagen from './Imagen';

const ListaImagenes = ({ listaImagenes }) => {
    return (
        <div className="col-12 p-5 row">
            {
                listaImagenes.map(li => <Imagen key={li.id} imagen={li} />)
            }
        </div>
    );
}

export default ListaImagenes;