import React, { useState } from "react";

export function VistaConsulta() {
  const [cedula, setCedula] = useState("");
  const [cedulaInfo, setCedulaInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleConsultaClick = () => {
    fetch(`https://api.adamix.net/apec/cedula/${cedula}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setCedulaInfo(data);
          setError(null);
        } else {
          setError("No se encontraron datos para la cédula proporcionada.");
          setCedulaInfo(null);
        }
      })
      .catch((error) => {
        setError("Hubo un error al consultar la información.");
        setCedulaInfo(null);
      });
  };

  return (
    <div className="card">
      <h2>Consulta de Cédula</h2>
      <div className="celda">
        <input
          type="text"
          placeholder="Introduce la cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        <button onClick={handleConsultaClick}>Consultar</button>
        {error && <p className="error">{error}</p>}
        {cedulaInfo && (
          <div className="cedula-info">
            <img src={cedulaInfo.foto} alt="Foto" />
            <p>Nombres: {cedulaInfo.Nombres}</p>
            <p>Apellido1: {cedulaInfo.Apellido1}</p>
            <p>Apellido2: {cedulaInfo.Apellido2}</p>
            <p>Cédula: {cedulaInfo.Cedula}</p>
            <p>Sexo: {cedulaInfo.IdSexo === 'M' ? 'Masculino' : 'Femenino'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
