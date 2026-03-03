import { useState, useRef } from 'react'
import './WheelOfFortune.css'

const WheelOfFortune = ({ names }) => {
  const [spinning, setSpinning] = useState(false)
  const [selectedName, setSelectedName] = useState(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
  ]

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)
    setSelectedName(null)

    // Random spins between 5 and 10 full rotations plus random offset
    const minSpins = 5
    const maxSpins = 10
    const spins = minSpins + Math.random() * (maxSpins - minSpins)
    const degrees = spins * 360

    // Random final position to select a name
    const segmentAngle = 360 / names.length
    const randomSegment = Math.floor(Math.random() * names.length)
    const offset = randomSegment * segmentAngle + (segmentAngle / 2)

    const finalRotation = rotation + degrees + offset

    setRotation(finalRotation)

    // After animation completes, show the selected name
    setTimeout(() => {
      setSpinning(false)
      // Calculate which segment we landed on (accounting for rotation direction)
      const normalizedRotation = finalRotation % 360
      const selectedIndex = Math.floor(((360 - normalizedRotation + (segmentAngle / 2)) % 360) / segmentAngle)
      setSelectedName(names[selectedIndex])
    }, 4000) // Match the CSS transition duration
  }

  const segmentAngle = 360 / names.length

  return (
    <div className="wheel-container">
      <div className="wheel-pointer"></div>

      <div
        ref={wheelRef}
        className="wheel"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {names.map((name, index) => {
          const angle = segmentAngle * index
          return (
            <div
              key={index}
              className="wheel-segment"
              style={{
                transform: `rotate(${angle}deg)`,
                background: colors[index % colors.length],
              }}
            >
              <div className="wheel-text-wrapper">
                <div className="wheel-text" style={{ transform: `translate(50px, -75px) rotate(${90 - segmentAngle / 2}deg)` }}>
                  {name}
                </div>
              </div>
            </div>
          )
        })}
        <div className="wheel-center">
          <span>SPIN</span>
        </div>
      </div>

      <button
        className="spin-button"
        onClick={spinWheel}
        disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>

      {selectedName && !spinning && (
        <div className="result">
          <h2>Winner:</h2>
          <p className="winner-name">{selectedName}</p>
        </div>
      )}
    </div>
  )
}

export default WheelOfFortune
