import './Card.css'

export function Card({isLife,content}){
  return (
    <div className={`card-container ${isLife ? 'life' : 'dead'}`}>
    {content}
    </div>
  )
}