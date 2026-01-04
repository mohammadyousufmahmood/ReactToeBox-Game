import React, { useState } from 'react'

const Player = ({name , symbol, isActive, onSetPlayers}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName ] = useState(name);

    const handleEditClick = ()=>{
        setIsEditing(isEditing => !isEditing);
        onSetPlayers(symbol, playerName)
    }
    const savePlayerName = event => {
      console.log(event.target.value)
      setPlayerName(event.target.value)
    }

    let playerInput = isEditing  ? <input type='text' required defaultValue={playerName} onChange={savePlayerName} /> 
                                :<span className='player-name'>{playerName}</span>
  
    return (

    <li className={isActive === true ? 'active' : ''}>
    <span className="player">
      {playerInput}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li>
)
}

export default Player