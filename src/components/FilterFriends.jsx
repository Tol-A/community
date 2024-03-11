import React, { Fragment } from 'react'

function FilterFriends({handleFilterFriends, arrFriends}) {
  return (
    <select onChange = {(e) => handleFilterFriends(e)}>
        {arrFriends.map((item,index) => (
          <Fragment key = {index}>
            <option    value = {item.closed}>{item}</option>
          </Fragment>
        ))
        }
      </select>
  )
}

export default FilterFriends