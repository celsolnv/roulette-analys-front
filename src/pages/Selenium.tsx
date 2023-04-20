import { useState } from "react"

export default function Selenium() {
  const [element, setElement] = useState([1, 2, 3])

  const handleClick = () => {
    const newNumber = Math.floor(Math.random() * 100)

    const newElement = [...element]
    newElement.unshift(newNumber)

    // console.log(newElement)
    setElement([...newElement])
  }
  return (
    <>
      <div className="main-container p-6 flex flex-wrap">
        {element.map((item, index) =>
          <div key={index} className="p-10 m-4 children-container rounded bg-white">
            <p className="result">
              {item}

            </p>
          </div>
        )}
      </div>
      <button onClick={handleClick} className="bg-blue-400 rounded p-4 ml-6" >Adicionar novo</button>
    </>
  )
}