import React, { useContext } from 'react'
import { Shop } from '../App'

const Header = () => {
    let { state, dispatch } = useContext(Shop)
    console.log(state);

    let cnt = state.items.reduce((acc, el) => el.qty + acc, 0)


    console.log(cnt);

    return (
        <div>
            <h1>Всего : {cnt}</h1>
            <div style={{display:'flex', gap:'20px'}}>
                {state.items && state.items.map(el => {
                    return <div style={{ border: '1px solid gainsboro', padding:'12px 20px', borderRadius:'12px' }}>
                        <h4>Name: {el.name}</h4>
                        <h5>Qty: {el.qty}</h5>
                        <p>Summa: {el.qty * el.sum}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Header