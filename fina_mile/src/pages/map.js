import * as React from 'react';
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import './style.css'
import './index.css'
const style={
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '10vh',
            }

const state = {"route": "signin"}
function Mapper() {
  const [data, setData] = useState(null);
  // const [address, setAddress] = useState("");
  // useEffect(()=>{
  //   setPriority(() =>1);
  // }, [])
  const [priority, setPriority] = useState(0);
  function checkSession(){
    fetch('http://127.0.0.1:5000/session', 
    {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
    'Content-Type': 'application/json'
      },
  }).then(function(response){
        console.log("AOIJIU", response)
        console.log(response.status)
        if (response.status == 200){
          console.log("valid user")
        }
        else{
          window.location = "/signin"
        }
      })
  }

  function getData(priority){
    // console.log("This button Clicked!")
    var blocks = []
    var cost = 0
    var path = []
    fetch('http://127.0.0.1:5000/mapper', 
    {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
    'Content-Type': 'application/json'
      },
      body: JSON.stringify(priority)
  })
    .then(function(response) {
      // console.log("here")
      // console.log(response)
      return(response.json())
    })
    .then((body) => {
      console.log("BRUH")
      // console.log(body)
      // console.log(body)
      setData(({blocks: body.block,
                  cost: body.cost,
                  path: body.route,}))
      console.log(body.cost)
      console.log(body.blocks)
    })

  }


  const Cell = ({data, i, j}) => {
    if (data){
      if(data.type === 'blocker'){
        return ( <div className='cell disabled'>        
          <div className='toolTip'>{i}, {j}</div>
          </div> )
      }
      return (  
        <div className={`cell`}>
          <div className={`route ${data.dirClass}`}></div>
          {
            data.terminal?(
              <div className={`terminal ${data.dirClass}`}>
                <div className='block'></div>
                <div className={`bob ${data.terminalType}`}></div>
              </div>
            ):('')
          }
          <div className='toolTip'>{i}, {j}</div> 
        </div>
      )
    }
    return(<div className='cell'>        
      <div className='toolTip'>{i}, {j}</div>
      </div> )
  }

  const routeDir = (cellIdxFrom, cellIdxTo, n) => {
    return(
      cellIdxFrom + 1 === cellIdxTo ? 'l' :
        cellIdxFrom - 1 === cellIdxTo ? 'r' :
          cellIdxFrom - n === cellIdxTo ? 'd' :
            cellIdxFrom + n === cellIdxTo ? 'u' : null
    )
  }

  const Grid = ({data, m, n}) => {
    console.log(data)
    const cells = data[1]
    const blockers = data[2]
    const cellDataMap = {}

    for(var i=0; i<cells.length; i+=1){
      const cellIdx = cells[i]
      const prevCellIdx = i>0 ? cells[i-1] : undefined
      const nextCellIdx = i<cells.length-1 ? cells[i+1] : undefined

      let cellData = {
        type:'route'
      }

      let fromDir = routeDir(prevCellIdx, cellIdx, n)
      let toDir = routeDir(nextCellIdx, cellIdx, n)

      if(fromDir === null){
        // console.log("ERROR! NO ROUTE")
        cellData.terminal = true
        cellData.terminalType = 'start'
        cellData.dirClass = toDir
      }
      else if(toDir === null){
        // console.log("ERROR! NO ROUTE @@@@@")
        cellData.terminal = true
        cellData.terminalType = 'end'
        cellData.dirClass = fromDir
      }
      else{
        console.log("This point is good")
        cellData.dirClass = `${fromDir}-${toDir}`
      }

      cellDataMap[cellIdx] = cellData
    }

    blockers.forEach(idx => {
      cellDataMap[idx] = {
        type:'blocker'
      }
    })

    return(
      <div className='grid-container'>
        {
          Array(m).fill(null).map( (x, i) => 
            <div key={i} className='row'>
              {
                Array(n).fill(null).map((y, j) => 
                  <Cell key={j} data={cellDataMap[(n*i)+j+1]} i={i} j={j} n={n}></Cell>
                )
              }
            </div>
          )
        }
      </div>
    )
  }

  function showMap(priority){
    checkSession()
    setTimeout(200)
    getData(priority)
    setPriority(priority)
    setTimeout(500)
    console.log("DATAS ARE:", data.cost, data.path, data.blocks)
    // return <Grid data={[13, [1,2,3,4,5,6], [11,25, 52]]} m={10} n={10}></Grid>  
  }
  if(data){
  if (priority == 1){return(
      <div>
      {/*<h1>Hello</h1>*/}
            <Navbar state={state} />
            <div>
            <Grid data={[data.cost, data.path, data.blocks]} m={10} n={10}></Grid>
            <div style = {style}><h2>The money cost is: ${data.cost}</h2></div>
            <button className="button" onClick={()=> showMap(1)}>Another Money Saving Route!</button><br/><br/><br/><br/>
            <button className="button" onClick={()=> showMap(0)}>Check Time Saving Route!</button>
            </div>
      </div>
      )} 
  else{
    return(
      <div>
      {/*<h1>Hello</h1>*/}
            <Navbar state={state} />
            <div>
            <Grid data={[data.cost, data.path, data.blocks]} m={10} n={10}></Grid>
            <div style = {style}><h2>The time cost is: {data.cost} min</h2></div>
            <button className="button" onClick={()=> showMap(0)}>Another Time Saving Route!</button><br/><br/><br/><br/>
            <button className="button" onClick={()=> showMap(1)}>Check Money Saving Route!</button>
            </div>
      </div>
      )

  }
  
}
else{
  return(
      <div>
      {/*<h1>Hello</h1>*/}
            <Navbar state={state} />
            <div style={style}>
            <button className="button" onClick={()=> showMap(1)}>Generate FinaMile Map!</button>
            </div>
      </div>
      )
}
}
// }


export default Mapper;
