import React from 'react';

const Counter = (props) => {
  return (
    <div className='card-wrapper'>
      <div className="delete-button">
        <i
          className="fa fa-times fa-2x"
          onClick={() => {
            props.deleteUserCard(props.card.id, 'counters');
          }}
        />
      </div>
      <div className='card counter'>
        <p className='name'>{props.card.name}</p>
        <div className='usable-by'>{
          props.card.usable_by.map((usableClass, index) => {
            return <div className={`class-icon ${usableClass}`} key={index} title={`Usable By: ${usableClass}`}></div>
          })
        }</div>
        <div className='description'>{props.card.description}</div>
      </div>
    </div>
  )
}

export default Counter;