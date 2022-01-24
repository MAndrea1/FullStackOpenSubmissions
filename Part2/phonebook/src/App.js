import React, { useState, useEffect } from 'react'
import DisplayNames from './components/DisplayNames';
import DisplayFilter from './components/DisplayFilter';
import DisplayForm from './components/DisplayForm';
import services from './services/services';
import Notification from './components/Notification';

const App = () => {
  const success ={
    color: 'white',
    background:'green',
    padding:5,
    fontSize: 16,
    left: 0,
    right: 0,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '500px',
    textAlign:'center'
    }

const errormj ={
    color: 'white',
    background:'red',
    padding:5,
    fontSize: 16,
    left: 0,
    right: 0,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '500px',
    textAlign:'center'
    }

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState(success)

  useEffect(() => {
    services
    .getAll()
    .then(data => setPersons(data))
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    let newPerson = {
      name: newName,
      number: newNumber,
    }
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        const confirm = window.confirm(`${newName} is already added to the phonebook. Replace number?`);
        if (!confirm) {return}
        services
          .putIt(persons[i].id, newPerson)
          .then(data => {
            setPersons(persons.map(person => person.id === data.id ? data : person))
            setMessage("Number replaced")
            setTimeout(() => {
              setMessage("")
            }, 5000);
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error);
            setMessage(`${persons[i].name} was removed from server`)
            setMessageStyle(errormj)
            setTimeout(() => {
              setMessage("")
            }, 5000);
          })

        return
      }
    }
    services
      .postIt(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setMessage("Person added")
        setTimeout(() => {
          setMessage("")
        }, 5000);
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error);
        setMessage(`Person couldn't be added`)
        setMessageStyle(errormj)
        setTimeout(() => {
          setMessage("")
        }, 5000);
      })
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) {return}
    services
      .deleteIt(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage("Person deleted")
        setTimeout(() => {
          setMessage("")
        }, 5000);
      })
      .catch(error => {
        console.log(error);
        setMessage(`Person couldn't be deleted`)
        setMessageStyle(errormj)
        setTimeout(() => {
          setMessage("")
        }, 5000);
      })
    }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Notification noteStyle={messageStyle} message={message}/>
      <h2>Phonebook</h2>
      <DisplayFilter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <DisplayForm handleSubmit={handleSubmit} handleName={handleName} newName={newName} handleNumber={handleNumber} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <DisplayNames persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App