import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Gateway from './pages/Gateway';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import ProtectedRoute from './ProtectedRoute';
import PrivateRoute from './PrivateRoute';
import RootDashboard from './pages/RootDashboard';


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={
          <Landing />
        } />

        <Route exact path='/gateway' element={
          <Gateway />
        } />

        <Route exact path='/user/dashboard/*' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route exact path='/root/dashboard/*' element={
          <PrivateRoute>
            <RootDashboard />
          </PrivateRoute>
        } />

        <Route exact path='*' element={
          <Error404 />
        } />
      </Routes>
    </>
  );
}

export default App;
