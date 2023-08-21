import './App.css'

import { useState, useEffect,useRef } from 'react'
import PropTypes from 'prop-types';
function App() {

  const colorPiezaRef = useRef('O');
  const posPiezaRef = useRef([1,6]);
  const nuevaPiezaRef = useRef(true);
  const primeraPiezaRef = useRef(true);
  const gameOverRef = useRef(false);
  const gameIntervalRef = useRef(null);
  const [juegoActualizado,setJuegoactualizado] = useState(false);
  const [primeraVez,setPrimeraVez] = useState(true)
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

  const [tablero,setTablero] = useState(tableroOriginal.map(subarray => [...subarray]))
  
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

  const reiniciarPartida = () => {
    clearInterval(gameIntervalRef.current)
    setTablero(tableroOriginal.map(subarray => [...subarray]))
    colorPiezaRef.current = 'O'
    posPiezaRef.current = [1,6]
    nuevaPiezaRef.current = true
    primeraPiezaRef.current = true
    gameOverRef.current = false
    setJuegoactualizado(!juegoActualizado)
  }

  useEffect(() => {
    if(primeraVez){
      setPrimeraVez(false)
    }else{
      empezarPartida()
    }
  },[juegoActualizado])

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

  const comprobarPosicion = (tab,pos1,pos2) => {
    return (tab[pos1][pos2]!=='O')
  }

  const bajarPieza = () => {
    if(!gameOverRef.current){
      let pos = posPiezaRef.current
      console.log(pos);
      let newTablero = [...tablero]
      let ocupado = comprobarPosicion(newTablero,[pos[0]+1],[pos[1]])
      if(ocupado){
      
        let posInicial = comprobarPosicionInicial()
        if(posInicial==='GameOver'){
          console.log('Perdiste')
          gameOverRef.current=true
        }else{
          console.log(posInicial);
          let color = colores[Math.floor(Math.random() * 6)]
          colorPiezaRef.current = color
          addPieza(posInicial,color)
          posPiezaRef.current = posInicial
          
        }
        nuevaPiezaRef.current = true
      }else{
        newTablero[pos[0]][pos[1]] = 'O'
        newTablero[pos[0]+1][pos[1]] = colorPiezaRef.current
        posPiezaRef.current = [pos[0]+1,pos[1]]
        setTablero(newTablero)
      }
    }
  }

  const moverLados = (izquierda) => {
    if(!gameOverRef.current){
      let pos = posPiezaRef.current
      console.log(pos);
      let newTablero = [...tablero]
      let ocupado = comprobarPosicion(newTablero,[pos[0]],[izquierda?pos[1]-1:pos[1]+1])
      if(!ocupado){
        newTablero[pos[0]][pos[1]] = 'O'
        newTablero[pos[0]][izquierda?pos[1]-1:pos[1]+1] = colorPiezaRef.current
        posPiezaRef.current = [pos[0],izquierda?pos[1]-1:pos[1]+1]
        setTablero(newTablero)
      }
    }
  }

  const addPieza = (pos,color) => {
    let newTablero = [...tablero]
    newTablero[pos[0]][pos[1]] = color
    posPiezaRef.current = [pos[0],pos[1]]
    nuevaPiezaRef.current = false
    setTablero(newTablero)
  }

  const moverJuego = () => {
    //console.log("entra");
    //console.log(gameOverRef.current);
    //console.log(nuevaPiezaRef.current);
    if(!gameOverRef.current){
      console.log(posPiezaRef.current);
      if(primeraPiezaRef.current){
        let color = colores[Math.floor(Math.random() * 6)]
        colorPiezaRef.current = color
        let posInicial = comprobarPosicionInicial()
        addPieza(posInicial,color)
        primeraPiezaRef.current = false

      }else{
        console.log("AAAAAAAAAAAAAAA");
        bajarPieza()
      }
    }else{
      clearInterval(gameIntervalRef.current)
      console.log("GAME OVER")
    }
  }
  const empezarPartida = () => {
    gameIntervalRef.current = setInterval(() => {
      moverJuego();
    }, 1000);
  }

  useEffect(()=>{
    //EMPIEZA PARTIDA
    empezarPartida()
    return() => { 
      clearInterval(gameIntervalRef.current)
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
      <button onClick={()=>{moverLados(true)}} >IZQUIERDA</button>
      <button onClick={()=>{bajarPieza()}} >ABAJO</button>
      <button onClick={()=>{moverLados(false)}} >DERECHA</button>
      <button onClick={()=>{reiniciarPartida()}} >REINICIAR</button>
    </div>

  </main>)
}

export default App
