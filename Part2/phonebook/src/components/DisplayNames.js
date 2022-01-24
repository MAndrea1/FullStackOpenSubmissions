import React from 'react';

const DisplayNames = ({persons, filter, handleDelete}) => {

    return(<>
    {persons.map((item) => {
      if (filter !== "" && !item.name.toLowerCase().includes(filter.toLowerCase())) {
        return null
      } else {
        return (
          <div key={item.id}>
            {item.name} {item.number} <button onClick={() => handleDelete(item.id)}>delete</button>
          </div>
          )
      }
    })}
    </>
    )
  }

export default DisplayNames;
