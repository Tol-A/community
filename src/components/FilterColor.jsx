import React, { Fragment } from 'react'

function FilterColor({handleFilterColor, arrSelect}) {
  return (
    <select onChange = {(e) => handleFilterColor(e)}>
        {arrSelect.map(item => (
          <Fragment key = {item}>
            <option  value = {item.avatar_color}>{item}</option>
          </Fragment>
        ))
        }
      </select>
  )
}

export default FilterColor