import { useState } from "react";
import { ChartSimulator } from "../components/ChartSimulator";

interface IDataForm {
  betValue: number
  martingale: number
  initialHour: string;
  endHour: string
  dateInitial: string
  dateEnd: string
  stopValue: number
}

export default function Simulator() {
  const [dataForm, setDataForm] = useState<IDataForm>({
    betValue: 5,
    martingale: 2,
    initialHour: '08',
    endHour: '20',
    dateInitial: '2023-03-11',
    dateEnd: new Date().toJSON().slice(0, 10),
    stopValue: 50
  })

  return (
    <div className="mb-20">
      <ChartSimulator />
    </div>
  )
}