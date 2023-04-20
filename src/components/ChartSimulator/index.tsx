import React, { ChangeEvent, FormEvent, ReactFragment, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { version } from 'react-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface IDataForm {
  betValue: number
  martingale: number
  initialHour: string;
  endHour: string
  dateInitial: string
  dateEnd: string
  stopValue: number

}
interface IChartsData {
  gains: Array<number>
  date: Array<string>
  daysGreen: number
  gainTotal: number

}
export function ChartSimulator() {

  const [dataForm, setDataForm] = useState<IDataForm>({
    betValue: 5,
    martingale: 2,
    initialHour: '08',
    endHour: '20',
    dateInitial: '2023-03-11',
    dateEnd: new Date().toJSON().slice(0, 10),
    stopValue: 50

  })
  const [chart, setChart] = useState<IChartsData>({})

  useEffect(() => {
    axios.post('http://localhost:3333/simulator').then((response) => {
      setChart(response.data)
    })
  }, [])


  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    // scales: {
    // },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Grafico simulator',
      },
    },
  };


  const data = {
    labels: chart?.date,
    datasets: [
      {
        label: 'Ganho',
        data: chart?.gains,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setDataForm({ ...dataForm, [e.currentTarget.name]: e.currentTarget.value })
  }

  function updateChart() {
    console.log(dataForm);
    const data = {
      ...dataForm,
      martingale: Number(dataForm.martingale),
      betValue: Number(dataForm.betValue),
      roulettesEnable: [
        'Speed Auto Roulette',
        'Speed Roulette',
        'Roulette',
        'Lightning Roulette'
      ]
    }
    axios.post('http://localhost:3333/simulator', data).then((response) => {
      setChart(response.data)
    })
  }

  return (
    <div className='px-10'>
      <div className='flex flex-row'>
        <div className='flex flex-col mx-2'>
          <label htmlFor="betValue">Ficha</label>
          <input onChange={handleInput} className='w-10' name="betValue" id="betValue" type="number" value={dataForm.betValue} />
        </div>
        <div className='flex flex-col mx-2'>
          <label htmlFor="martingale">Marti.</label>
          <input onChange={handleInput} className='w-10' name="martingale" id="martingale" type="number" value={dataForm.martingale} />
        </div>
        <div className='flex flex-col mx-2'>
          <label htmlFor="initialHour"> Hora i.</label>
          <input onChange={handleInput} className='w-20' name="initialHour" id="initialHour" type="text" value={dataForm.initialHour} />
        </div>
        <div className='flex flex-col mx-2'>
          <label htmlFor="endHour">Hora f.</label>
          <input onChange={handleInput} className='w-20' name="endHour" id="endHour" type="text" value={dataForm.endHour} />
        </div>
        <div className="flex flex-col mx-2">
          <label htmlFor="stopValue"> Para depois de x lucro</label>
          <input onChange={handleInput} type="number" name="stopValue" id="stopValue" value={dataForm.stopValue} />
        </div>
        <div className='flex'>
          <button onClick={updateChart} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Atualizar</button>
        </div>
      </div>
      <div className='flex '>

        <div className='flex flex-col mx-2'>
          <label htmlFor="dateInitial">Data In.</label>
          <input onChange={handleInput} className='w-32' name="dateInitial" id="dateInitial" type="text" value={dataForm.dateInitial} />
        </div>
        <div className='flex flex-col mx-2'>
          <label htmlFor="dateEnd">Data Fi.</label>
          <input onChange={handleInput} className='w-32' name="dateEnd" id="dateEnd" type="text" value={dataForm.dateEnd} />
        </div>

      </div>
      <div className='flex flex-col mt-10 '>
        <p>Dias no positivo: {chart.daysGreen}</p>

        <p>Total ganho: R${chart.gainTotal}</p>
      </div>
      <div className='w-[700px] h-[700px]'>
        <Line options={options} data={data} />

      </div>
    </div>
  )
}

