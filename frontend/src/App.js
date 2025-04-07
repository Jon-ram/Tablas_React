import React from "react";
import Grafica from "./Grafica";
import AddScore from "./AddScore";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-800 to-zinc-900 text-white flex flex-col items-center justify-center px-4 py-8">
      {/* El formulario se muestra arriba */}
      <AddScore />
      {/* La gráfica se muestra debajo */}
      <Grafica />
    </div>
  );
}

export default App;
// src/App.js   