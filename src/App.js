import axios from 'axios';
import {useCallback, useEffect, useMemo, useState } from 'react';
import Group from './components/Group';
import FilterColor from './components/FilterColor';
import FilterСonfidentiality from './components/FilterСonfidentiality'
import FilterFriends from './components/FilterFriends';


function App() {
  const [users, setUsers]= useState([])
  const [usersFilter, setUsersFilter]= useState([])
 
  async function dataFetch() {
    try{
      const res = await axios.get('http://localhost:3001/users')
      
      if(res.statusText === "OK" && res.data.length > 0) {
        setTimeout(() => {
          setUsers(res.data)
          setUsersFilter(res.data)
         }, 1000)
      }
      if(res.statusText !== "OK" && res.data.length  === 0) {
        console.log('нет данных')
      }
    
       
    } catch(error) {
      console.error('error ' + error.name );
      console.error('error ' + error.message);
      console.error('error ' + error.stack);
    }
  }

  
  useEffect(() => {
    dataFetch()
  },[])


  const arrSelect = useMemo(() => users.map(n => n.avatar_color)
    .map(n => n !== undefined ? n : 'all')
    .reduce((acc,n) => {
        return acc.includes(n) ? acc : [...acc.sort(),n]
    },[])
    ,[users]
  ) 

  const arrСonfidentiality = useMemo(() => users.map(n => n.closed === true ? 'открытая' : 'закрытая')
    .concat(['все'])
    .sort()
    .reduce((acc,n) => {
      return acc.includes(n) ? acc : [...acc,n]
    },[])
    ,[users]
  )

  const arrFriends = useMemo(() => users.map( n => typeof n.friends === 'object' ? 'есть друзья' : 'нет друзей')
    .reduce((acc,n) => {
      return acc.includes(n) ? acc : [...acc,n]
    },[])
    ,[users]
  )

  
  const handleFilterColor = useCallback((e) => {
      const color = e.target.value;
      setTimeout(() => {
        if(color === 'all') {
          setUsersFilter(users) 
        } else {
          setUsersFilter(
            users.filter(f => f.avatar_color === color)  
          )
        }    
      }, 1000)
  }, [users])

  const handleFilterСonfidentiality = useCallback((e) => {
    const confidentiality = e.target.value
    let arr =  users.map(f => f.closed === true ? 'открытая' : 'закрытая').concat(['все'])

    setTimeout(() => {
      for(let i = 0; i < arr.length; i++) {  
        if(confidentiality === 'открытая') {
          setUsersFilter( users.filter(f => f.closed === true) )
        } 
        if(confidentiality === 'закрытая') {
          setUsersFilter(
            users.filter(f => f.closed === false) 
          )
        } 
        if(confidentiality === 'все') {
          setUsersFilter(users)
        }
      } 
    }, 1000) 
  }, [users])

  const handleFilterFriends = useCallback((e) => {
    const friends = e.target.value;

    setTimeout(() => {
      for(let i = 0; i < arrFriends.length; i++) {
        if(friends.includes(arrFriends[0])) {
          setUsersFilter(
            users.filter( n =>  n.friends  !== undefined) 
          )
        } 
        if(friends.includes(arrFriends[1])) {
          setUsersFilter(
            users.filter( n =>  n.friends  === undefined) 
          )
        }
      }
    }, 1000)
  },[arrFriends,users])

  if(users.length === 0) {
    return <div className='loading'>Loading...</div>
  } 
  return (
    <div className='container'>
      <form className='form'>
        <FilterColor  handleFilterColor = {handleFilterColor}arrSelect = {arrSelect} />
        <FilterСonfidentiality handleFilterСonfidentiality = {handleFilterСonfidentiality} arrСonfidentiality = { arrСonfidentiality}/>
        <FilterFriends handleFilterFriends = {handleFilterFriends} arrFriends = {arrFriends}/>
      </form>
      <div className='containerGroup'>
        {usersFilter.map(user =>
              <Group
                  key = {user.id}
                  user = {user}
              />
          )}
      </div>
    </div>
  
  );
}

export default App;





