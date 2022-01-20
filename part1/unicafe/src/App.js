import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // const handlegood = () => {
  //   setGood(good + 1);
  // }
  // const handleNeutral = () => {
  //   const handN = () => { setNeutral(neutral + 1)}
  //   return handN
  // }
  // const handleBad = (a, b) => {
  //   b(a + 1);
  // }

  const DisplayStat = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
    return(
      <p>No statistics given</p>
    )}
    else {
      return(
        <Statistics good={good} neutral={neutral} bad={bad}/>
      )}
  }

  return (
  <div>
      <h1>Give Feedback</h1>
      <Button handleClick={setGood} state={good} value={"good"}/>
      <Button handleClick={setNeutral} state={neutral} value={"neutral"}/>
      <Button handleClick={setBad} state={bad} value={"bad"}/>
      <DisplayStat good={good} neutral={neutral} bad={bad}></DisplayStat>
  </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return(
  <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good+neutral+bad}/>
          <StatisticLine text="average" value={(good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)}/>
          <StatisticLine text="positive" value={(good * 100 / (good+neutral+bad))}/>
        </tbody>
      </table>
  </>
  )
}

const Button = ({handleClick, state, value}) => (<button onClick={()=>handleClick(state+1)}>{value}</button>)


const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return (
      <>
      <tr>
        <td>{text} </td>
        <td>{value} %</td>
      </tr>  
    </>
    )   
  }
  return (
  <>
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>  
  </>
  )
}


export default App