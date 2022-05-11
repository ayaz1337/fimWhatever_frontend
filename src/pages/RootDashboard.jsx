import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WrapHome from './components/WrapHome';
import WrapSettings from './components/WrapSettings.jsx';
import WrapProfile from './components/WrapProfile';
import Console from './components/Console';
import './styles/Dashboard.scss';
import Error404 from './Error404';
import Placeholder from './components/Placeholder';
import PrivateRoute from '../PrivateRoute';




export default function RootDashboard() {

    return (
        <PrivateRoute>
            <div className='dashboard'>
                <div className='sidebar'>
                    <Sidebar role={"root"} />
                </div>
                <div className='main__content'>

                    <Routes>
                        <Route exact path='' element={
                            <Placeholder />
                        } />

                        <Route exact path='home' element={
                            <WrapHome role={"root"} />
                        } />

                        <Route exact path='settings' element={
                            <WrapSettings role={"root"} />
                        } />

                        <Route exact path='profile' element={
                            <WrapProfile role={"root"} />
                        } />
                        <Route exact path='console' element={
                            <Console />
                        } />
                        <Route exact path='*' element={
                            <Error404 />
                        } />
                    </Routes>
                </div>
            </div>
        </PrivateRoute>
    )
}
