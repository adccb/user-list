import React, { useState, useEffect } from 'react';
import './App.css';

const UserPanel = ({ user }) => {
  // each UserPanel handles its own expand functionality
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  return (
    <div data-testid='user-container' onClick={() => { toggleExpanded() }}>
      <p>{user.name.first} {user.name.last}</p>
      <img src={user.picture.medium} />
      { 
        expanded && <React.Fragment>
          <p>{user.phone}</p>
          <p>{user.email}</p>
        </React.Fragment>
      }
    </div>
  )
}

function App() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [nationalityFilter, setNationalityFilter] = useState('')

  // hit the endpoint counting the page; re-pull when the page changes
  useEffect(() => {
    const getUsers = async () => fetch(`https://randomuser.me/api/?results=10&page=${page}&seed=thriveglobal`).then(r => r.json())
    getUsers().then((r) => setUsers(r.results))
  }, [page])

  // get every unique nationality from every user on the page
  const nationalities = Array.from(new Set(users.map(i => i.nat)))

  // take into account the nationality; display
  // all users if the nationality is not set
  const usersToDisplay =
    nationalityFilter === ''
      ? users
      : users.filter(({ nat }) => nat === nationalityFilter)

  // don't let them go back if they're on the first page
  const previousPage = () => page !== 1 && setPage(page - 1)

  // blindly incrementing has no issue for this data set
  const nextPage = () => setPage(page + 1)

  return (
    <div className="App">
      <div>
        <span onClick={previousPage}>previous page</span>
        { " | " } 
        <span>page {page}</span>
        { " | " } 
        <span onClick={nextPage}>next page</span>
      </div>
      <select onChange={e => setNationalityFilter(e.target.value)}>
        <option value=''>select a nationality</option>
        {nationalities.map((n, idx) => <option key={`${n}-${idx}`}>{n}</option>)}
      </select>
      
      <div>
        {usersToDisplay.map((user, idx) => <UserPanel key={`user-${idx}`} user={user} />)}
      </div>
    </div>
  );
}

export default App;
