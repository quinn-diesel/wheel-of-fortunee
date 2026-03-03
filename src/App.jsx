import WheelOfFortune from './WheelOfFortune'
import './App.css'

function App() {
  const names = ['quinn', 'benno', 'dr josh', 'dan', 'grant', 'al', 'ming', 'steve']

  return (
    <div className="app">
      <h1>Wheel of Fortune</h1>
      <WheelOfFortune names={names} />
    </div>
  )
}

export default App
