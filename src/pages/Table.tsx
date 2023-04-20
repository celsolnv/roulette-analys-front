import axios from "axios"
import React, { useEffect, useState } from "react"

interface ITableData {
  roleta: string;
  cor: string;
  datetime: string
}

interface IDataForm {
  date: string
}
export default function Table() {

  const [dataForm, setDataForm] = useState<IDataForm>({
    date: new Date().toJSON().slice(0, 10)
  })
  const [tableData, setTableData] = useState<Array<ITableData>>([])

  useEffect(() => {
    axios.post('http://localhost:3333/table', { date: dataForm.date }).then(response => {
      setTableData(response.data)
    })
  }, [])

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setDataForm({ ...dataForm, [event.currentTarget.name]: event.currentTarget.value })
  }

  function handleSearch() {
    axios.post('http://localhost:3333/table', { date: dataForm.date }).then(response => {
      console.log(response);

      setTableData(response.data)
    })
  }
  return (
    <div>
      <div>
        <div>
          <label htmlFor="date"></label>
          <input onChange={handleInput} type="text" name="date" id="date" value={dataForm.date} />
        </div>
        <div>
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" > Atualizar</button>
        </div>


      </div>
      <div>
        <div className="grid grid-cols-3 gap-y-2  text-white">
          <div className="font-bold mb-3">
            Roleta
          </div>
          <div className="font-bold mb-3">
            Hora
          </div>
          <div className="font-bold mb-3">
            Cor
          </div>
          {tableData.length && tableData.map(row => (
            <>
              <div className={`${row.cor === 'RED' ? 'bg-red-600' : 'bg-green-600'}`}>
                {row.roleta}
              </div>
              <div className={`${row.cor === 'RED' ? 'bg-red-600' : 'bg-green-600'}`}>
                {row.datetime.slice(11)}
              </div>
              <div className={`${row.cor === 'RED' ? 'bg-red-600' : 'bg-green-600'}`}>
                {row.cor}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}