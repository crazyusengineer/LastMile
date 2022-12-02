import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import './index.css'

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: 'center',
//   color: theme.palette.text.secondary,
// }));

export default function Mapper() {

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
    const cells = data[0]
    const blockers = data[1]
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
        console.log("ERROR! NO ROUTE")
        cellData.terminal = true
        cellData.terminalType = 'start'
        cellData.dirClass = toDir
      }
      else if(toDir === null){
        console.log("ERROR! NO ROUTE @@@@@")
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
  return(
    <Grid data={[[1,2,3,13,14,15,25,26], [4,5,16,31,32,44,45,46]]} m={10} n={10}></Grid>
    )
}


// export default Mapper;
