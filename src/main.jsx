import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Board from './components/board';


function Game() {
  return (
      <div className="t-parent">
          <Board/>
      </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)
