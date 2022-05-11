import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WrapSettings from './components/WrapSettings';
import Sidebar from './components/Sidebar';
import WrapProfile from './components/WrapProfile';
import Error404 from './Error404';
import './styles/Dashboard.scss';
import WrapHome from './components/WrapHome';
import Placeholder from './components/Placeholder';
import ProtectedRoute from '../ProtectedRoute';



export default function Dashboard() {

    return (
        <ProtectedRoute>
            <div className='dashboard'>
                <div className='sidebar'>
                    <Sidebar role={"user"} />
                </div>
                <div className='main__content'>

                    <Routes>
                        <Route exact path='' element={
                            <Placeholder />
                        } />

                        <Route exact path='home' element={<>
                            <WrapHome role={"user"} />
                        </>} />

                        <Route exact path='settings' element={
                            <WrapSettings role={"user"} />
                        } />

                        <Route exact path='profile' element={
                            <WrapProfile role={"user"} />
                        } />
                        <Route exact path='*' element={
                            <Error404 />
                        } />
                    </Routes>
                </div>
            </div>
        </ProtectedRoute>
    )
}
