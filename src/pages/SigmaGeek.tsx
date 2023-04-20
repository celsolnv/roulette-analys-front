import { Matriz } from "../components/Matriz";
import { getMatriz } from "../utils";



const evolucao = 30
const matriz  = getMatriz(evolucao)

export default function App() {
  return (
    <div>
      {
        matriz.map((evo, index) =>(
          <div style={{display:'inline-block', margin:'1rem'} }>
            <Matriz title={`Evolução ${index+1}`} matriz={evo}/>
          </div>

        ))
      }
    </div>
  );
}
