import React, { useState } from 'react'
import Friends from './Friends'


function Group({user}) {
  const [show, setShow] = useState(false)
  const isClosed = false 

  return (
    <div  key = {user.id} className='groups'>
      <h2>{user.name}</h2>
        <div style = {{
                background:`${user.avatar_color}`,
                color: 'black',
                maxWidth: '100px',
                width:'100%',
                height: '100px',
                borderRadius: '50%',
                display: 'flex',
                alignItems:'center',
                justifyContent:'center',
                marginBottom: '10px'
              }}
              >
                {user.avatar_color}
          </div>
          <button 
            onClick = {() => setShow(!show)}
            className='btnFriend'
          >
              Друзей: {typeof user.friends === 'object' ?  user.friends.length : 0}
          </button>
                 <div>
                 {typeof user.friends === 'object' && user.friends.map( (item,index) =>
                    <Friends
                      key = {index}
                      item = {item}
                      show={show}
                    />
                   ) }
               </div> 
            <div> Подписчиков: {user.members_count}</div>
            <div>{isClosed === user.closed ? 'закрытая группа' : 'открытая группа'}</div>
        </div>
  )
}

export default Group