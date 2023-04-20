import { Card } from "./Card"

export function Matriz({matriz, title}){
  // console.log(title)
  // console.log(JSON.stringify(matriz, null, 4))

  return(
    <div>
      <h2>{title}</h2>
      {matriz.map((row, index)=> (
        <div>
          {row.map((item,j) => <Card content={`${index+1}-${j+1}`} isLife={item}></Card>)}
        </div>
      ))}
    </div>    
  )
}