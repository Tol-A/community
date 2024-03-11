import React, { Fragment } from 'react'

function FilterСonfidentiality({handleFilterСonfidentiality, arrСonfidentiality}) {
  return (
    <select onChange = {(e) => handleFilterСonfidentiality(e)}>
        {arrСonfidentiality.map((item,index) => (
            <Fragment key = {index}>
                <option value = {item.closed}>{item}</option>
            </Fragment>
            ))
         }
    </select>
  )
}

export default FilterСonfidentiality