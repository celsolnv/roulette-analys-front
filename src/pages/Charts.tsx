import {SingleChart} from '../components/SingleChartLine'
export default function Charts() {


  return(
    <>
    <div className='flex'>
      <SingleChart/>
      <SingleChart/>

    </div>
    <div className='flex pt-16'>
      <SingleChart/>
      <SingleChart/>

    </div>
    </>
  )
}

