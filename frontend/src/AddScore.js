// AddScore.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './AddScore.css';

// Conexión al servidor (ajusta la URL si es necesario)
const socket = io('http://localhost:4000');

const AddScore = () => {
  const [equipos, setEquipos] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    // Recibe la lista inicial de equipos
    socket.on('conexionInicial', (data) => {
      setEquipos(data);
    });
    // Actualiza los equipos cuando se emite 'puntajeActualizado'
    socket.on('puntajeActualizado', (data) => {
      setEquipos(data);
    });

    return () => {
      socket.off('conexionInicial');
      socket.off('puntajeActualizado');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validamos que se haya seleccionado un proyecto
    if (!selectedProject) {
      alert('Por favor, selecciona un proyecto.');
      return;
    }

    // Buscar el índice del equipo seleccionado (se compara por nombre)
    const index = equipos.findIndex(
      (equipo) => equipo.name.toLowerCase() === selectedProject.toLowerCase()
    );

    if (index === -1) {
      alert('Proyecto no encontrado. Asegúrate de que el nombre esté escrito correctamente.');
      return;
    }

    // Se envía el índice y el puntaje a sumar (valor máximo 40)
    socket.emit('aumentarPuntaje', { index, puntaje: parseInt(sliderValue, 10) });

    // Reiniciamos el formulario
    setSelectedProject('');
    setSliderValue(0);
  };

  return (
    <div className="form-container">
      <h3>Agregar Puntaje</h3>
      <form onSubmit={handleSubmit}>
        {/* Selección de proyecto */}
        <div className="form-group">
          <label htmlFor="projectSelect">Proyecto:</label>
          <select
            id="projectSelect"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">-- Selecciona un proyecto --</option>
            {equipos.map((equipo) => (
              <option key={equipo.name} value={equipo.name}>
                {equipo.name}
              </option>
            ))}
          </select>
        </div>

        {/* Slider de puntaje */}
        <div className="form-group">
          <label htmlFor="puntajeSlider">Puntaje (máx 40):</label>
          <div className="range-container">
            <input
              id="puntajeSlider"
              type="range"
              min="0"
              max="40"
              value={sliderValue}
              onChange={(e) => setSliderValue(e.target.value)}
            />
            <span className="range-value">{sliderValue}</span>
          </div>
        </div>

        {/* Botón de enviar */}
        <button type="submit" className="submit-btn">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddScore;
