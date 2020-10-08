import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListaImagenes from './components/ListaImagenes';
function App() {

  const [busqueda, setBusqueda] = useState(false);
  const [texto, setTexto] = useState('');
  const [listaImagenes, setListaImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  //inicializa paginas
  //setTotalPaginas(1);

  useEffect(() => {

    const consulta = async () => {
      if (busqueda) {
        const paginasMostrar = 30;
        const key = '18617655-90117960eda1ea8afb2a195b5';
        const url = `https://pixabay.com/api/?key=${key}&q=${texto}&per_page=${paginasMostrar}&page=${paginaActual}&pretty=true`;
        const request = await fetch(url);
        const response = await request.json();
        setListaImagenes(response.hits);
        setTotalPaginas(Math.ceil(response.totalHits / paginasMostrar));
        setBusqueda(false);

        // Mover la pantalla hacia arriba
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({ behavior: 'smooth' })
      }
    }

    consulta();
  }, [busqueda, paginaActual]
  );

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
      setBusqueda(true);
    }
  }

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
      setBusqueda(true);
    }
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario
          texto={texto}
          setTexto={setTexto}
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListaImagenes listaImagenes={listaImagenes} />
        {
          (paginaActual === 1)
            ? (<button
              type="button"
              className="bbtn btn-secunday mr-1"
              disabled
            >&laquo; Anterior</button>)
            : (<button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior</button>)
        }
        {
          (paginaActual === totalPaginas)
            ? (
              <button
                type="button"
                className="bbtn btn-secunday mr-1"
                disabled
              >Siguiente &raquo;</button>
            )
            : (
              <button
                type="button"
                className="bbtn btn-info"
                onClick={paginaSiguiente}
              >Siguiente &raquo; </button>
            )
        }
      </div>
    </div>
  );
}

export default App;
