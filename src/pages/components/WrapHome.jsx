import React from 'react'
import PrivateRoute from '../../PrivateRoute';
import ProtectedRoute from '../../ProtectedRoute';
import Home from './Home';

export default function WrapHome({ role }) {
    if (role === 'user') {
        return (
            <div>
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            </div>
        )
    }

    if (role === 'root') {
        return (
            <div>
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            </div>
        )
    }
}