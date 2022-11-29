import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './index.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 'center',
  color: theme.palette.text.secondary,
}));

export default function Mapper() {
  const data = [
    [1,2,3,4,5],
    [6,7,8,9]
  ]
  const m = 10
  const n = 10

  let arr = new Array(m).fill(null)
  arr = arr.map(y => Array(n).fill(null))

  console.log(arr)

  return (
    arr.map((row,i) => {
      <div className='row'>
        return({
          row.map((cell,j) => {
            const idx = (m*(i)+j)+1
            return (
              <div key={idx} className='cell'>{idx}</div>
            )
          })
        })
      </div>
    }


      
    )
  );
}


// export default Mapper;
