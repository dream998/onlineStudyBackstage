import React from 'react'
import Menu from './menu'
import HomeWrapper from './style'
import routes from '../../router'
import { renderRoutes } from 'react-router-config'

function Home() {
    return (
        
            <HomeWrapper>
                <Menu />
                <div className='content'>
                   { renderRoutes(routes)}
                </div>
            </HomeWrapper>
        

    )
}
export default Home