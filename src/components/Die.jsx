import React from 'react'

export default function Die({value, isHeld, holdDice}) {
  return (
    <div className={isHeld ? "die held" : "die"} onClick={holdDice}>
      {value}
    </div>
  )
}
