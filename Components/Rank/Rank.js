import React from 'react';

const Rank=({ name,entries }) =>{
    return(
        <div>
            <div className='white f1'>
                {`${name}, Your current entries are ...`}
            </div>
            <div className='f1 '>
                {`${entries}`}
            </div>
        </div>
    )
}

export default Rank;