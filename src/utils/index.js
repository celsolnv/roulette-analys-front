function getAmountVizinhos(estadoInicial,rowIndex,colIndex){

  if(rowIndex==0 && colIndex==0){
    return 0
  }
  if (rowIndex==6 && colIndex==7){
    return 0
  }

  let amount = 0
  let rowDecrement = rowIndex - 1
  let rowIncrement = rowIndex + 1

  let colDecrement = colIndex - 1
  let colIncrement = colIndex + 1
  // console.log(estadoInicial[rowIndex,colIndex])
  // console.log(rowDecrement, rowIncrement, rowIndex)

  if((rowDecrement)<0){
    rowDecrement++
  }
  else if((rowIncrement)>=estadoInicial.length){
    rowIncrement--
  }

  if(colIncrement >= estadoInicial[0].length){
    colIncrement--
  }
  else if(colDecrement <0){
    colDecrement++
  }
  console.log(colDecrement, colIncrement, colIndex)

  if (estadoInicial[rowIndex][colDecrement] == 1 && colDecrement != colIndex){
    amount ++
  }
  if (estadoInicial[rowIndex][colIncrement] == 1 && colIncrement != colIndex){
    amount ++
    // console.log("Vizinho da direita");
  }

  if (estadoInicial[rowDecrement][colIndex] == 1 && rowDecrement != rowIndex){
    amount ++
    // console.log('Vizinho de cima');
  }
  if (estadoInicial[rowIncrement][colIndex] == 1 && rowIncrement != rowIndex){
    amount ++
    // console.log('Vizinho de baixo');

  }

  if (estadoInicial[rowDecrement][colDecrement] == 1 && rowDecrement != rowIndex && colDecrement != colIndex){
    amount ++
  }
  if (estadoInicial[rowDecrement][colIncrement] == 1 && rowDecrement != rowIndex && colIncrement != colIndex){
    amount ++
  }

  if (estadoInicial[rowIncrement][colDecrement] == 1 && rowIncrement != rowIndex && colDecrement != colIndex){
    amount ++
  }
  if (estadoInicial[rowIncrement][colIncrement] == 1 && rowIncrement != rowIndex && colIncrement != colIndex){
    amount ++
  }

  return amount
}


export function getMatriz(max){
  let estadoInicial = 
  [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0],
    [0,0,1,0,1,1,0,0],
    [0,1,1,0,0,1,1,0],
    [0,0,1,0,1,1,0,0],
    [0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0],
  ]
  
  // const max = 2
  let i = 0
  const estadoInicialCopy = estadoInicial.map(function(arr) {
    return arr.slice();
  });

  const cache = estadoInicial.map(function(arr) {
    return arr.slice();
  });
  let evolucao = [
    [...cache]
  ]
  while (i<=max){
    const novoEstado = []
    estadoInicial.map((row, rowIndex)=>{
      row.map((item, colIndex) =>{
      // console.log("Iniciando",rowIndex,colIndex);
        const amountVizinhos = getAmountVizinhos(estadoInicial,rowIndex,colIndex)
        if (item ==1){
          if ( amountVizinhos <=3 || amountVizinhos>=7){
            estadoInicialCopy[rowIndex][colIndex] = 0
          }
          // else if (amountVizinhos >= 4){
          //   estadoInicialCopy[rowIndex][colIndex] = 1
          // }
        }
        else{
          if (amountVizinhos==3 || amountVizinhos==2){
            estadoInicialCopy[rowIndex][colIndex] = 1
          }
        }
      })
    })
    console.log("Primeiro ciclo completo");
    estadoInicial = estadoInicialCopy.map(function(arr) {
      return arr.slice();
    });
    const newCache = estadoInicialCopy.map(function(arr) {
      return arr.slice();
    });
    evolucao.push([...newCache])
    i++
  }

  // console.log(evolucao)
  return evolucao
}


function getNextEvolutionMatriz(matrizCurrent){
  const matrizCurrentCopy = matrizCurrent.map(function(arr) {
    return arr.slice();
  });

  const cache = matrizCurrent.map(function(arr) {
    return arr.slice();
  });
  let evolucao = [
    [...cache]
  ]
  matrizCurrent.map((row, rowIndex)=>{
    row.map((item, colIndex) =>{
    // console.log("Iniciando",rowIndex,colIndex);
      const amountVizinhos = getAmountVizinhos(matrizCurrent,rowIndex,colIndex)
      if (item ==1){
        if ( amountVizinhos <=3 || amountVizinhos>=7){
          matrizCurrentCopy[rowIndex][colIndex] = 0
        }
      }
      else{
        if (amountVizinhos==3 || amountVizinhos==2){
          matrizCurrentCopy[rowIndex][colIndex] = 1
        }
      }
    })
  })
  console.log("Primeiro ciclo completo");
  matrizCurrent = matrizCurrentCopy.map(function(arr) {
    return arr.slice();
  });
  const newCache = matrizCurrentCopy.map(function(arr) {
    return arr.slice();
  });
  evolucao.push([...newCache])
}