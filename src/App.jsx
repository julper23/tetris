import './App.css'

import { useState, useEffect,useRef } from 'react'
import PropTypes from 'prop-types';
function App() {

  const colorPiezaRef = useRef('O');
  const posPiezaRef = useRef([1,6]);
  const nuevaPiezaRef = useRef(true);
  const gameOverRef = useRef(false);
  const tableroOriginal = [
    ['B','B','B','B','B','B','B','B','B','B','B','B','B'],/*0*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*1*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*2*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*3*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*4*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*5*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*6*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*7*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*8*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*9*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*10*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*11*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*12*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*13*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*14*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*15*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*16*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*17*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*18*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*19*/
    ['B','O','O','O','O','O','O','O','O','O','O','O','B'],/*20*/
    ['B','B','B','B','B','B','B','B','B','B','B','B','B'],/*21*/
  ]

  const [tablero,setTablero] = useState(tableroOriginal)
  
  const colores = ['R','N','A','L','V','M']
  const clases = {
    'B' : 'borde',
    'O' : 'vacio',
    'R' : 'rojo',
    'N' : 'naranja',
    'A' : 'amarillo',
    'L' : 'azul',
    'V' : 'verde',
    'M' : 'morado',

  }
  //B = Borde

  //R = rojo
  //N = naranja
  //A = amarillo
  //L = azul
  //V = verde
  //M = morado

  //O = vacio
  //La pieza iniciara en la posicion 1(fila),7(columna)
  //Si la 1/7 esta ocupada revisar las de al lado si todo esta ocupado pierdes
  //Hay 22 filas y 13 columnas por fila
  const Celda = ({color}) => {
    return (<div className={'celda '+clases[color]}></div>)
  }
  
  Celda.propTypes = {color: PropTypes.string.isRequired,};
  const comprobarPosicionInicial = () => {
    console.log(".............");
    console.log(tablero);
    if(tablero[1][6]==='O'){
      return [1,6]
    }else{
      for(let c in tablero[1]){
        if(tablero[1][c]==='O'){return([1,parseInt(c)])}
      }
    }
    return 'GameOver'
  }

  const comprobarPosicion = (tab,posiciones) => {

  }

  const moverPieza = (tab,posiciones) => {

  }

  const addPieza = (pos,color) => {
    let newTablero = [...tablero]
    newTablero[pos[0]][pos[1]] = color
    posPiezaRef.current = [pos[0],pos[1]]
    nuevaPiezaRef.current = false
    setTablero(newTablero)
  }

  const moverJuego = () => {
    console.log("entra");
    console.log(gameOverRef.current);
    console.log(nuevaPiezaRef.current);
    if(!gameOverRef.current){
      console.log(posPiezaRef.current);
      if(nuevaPiezaRef.current){
        let color = colores[Math.floor(Math.random() * 6)]
        colorPiezaRef.current = color
        let posInicial = comprobarPosicionInicial()
        if(posInicial==='GameOver'){
          console.log('Perdiste')
          gameOverRef.current=true
        }else{
          console.log(posInicial);
          addPieza(posInicial,color)
          
        }
      }else{
        console.log("AAAAAAAAAAAAAAA");
      }
    }
  }

  useEffect(()=>{
    //EMPIEZA PARTIDA
    let tick = setInterval(() => {
      moverJuego();
    }, 5000);
    return() => { 
      clearInterval(tick)
    }
  },[])


  return (<main>
    <div className='tablero'>
      {tablero.map((fila,index)=>{
        return(<div className='fila' key={index}>
          {fila.map((celda,index)=>{
            return(<Celda key={index} color={celda}/>)
          })}
        </div>)
      })}
    </div>
    <div className='Botonera'>
      <button>IZQUIERDA</button>
      <button>ABAJO</button>
      <button>DERECHA</button>
    </div>

  </main>)
}

export default App
