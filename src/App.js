import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, Exchanges, Cryptocurrencies, Cryptodetails, News } from './components/index'
import './App.css'


const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
      <Layout>
          <div className='routes'>
        <Routes>
            <Route exact path='/'>
              <Homepage />
            </Route>
            <Route exact path='/exchanges'>
              <Exchanges />
            </Route>
            <Route exact path='/cryptocurrencies'>
              <Cryptocurrencies />
            </Route>
            <Route exact path='/crypto/:coinId'>
              <Cryptodetails />
            </Route>
            <Route exact path='/news'>
              <News />
            </Route>
        </Routes>      
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
            Crypton <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='exchanges'>Exchanges</Link>
            <Link to='news'>News</Link>
          </Space>
      </div>
      </div>

    </div>
  )
}

export default App
