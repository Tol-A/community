
function Friends({item, index, show}) {
    if (show)  
    return ( 
        <div key = {index}>
            <span> {item.first_name }</span> 
            <span> {item.last_name}</span>
        </div>
    )
}

export default Friends