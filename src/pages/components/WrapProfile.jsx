import React from 'react'
import PrivateRoute from '../../PrivateRoute';
import ProtectedRoute from '../../ProtectedRoute';
import Profile from './Profile';

export default function WrapHome({ role }) {
    if (role === 'user') {
        return (
            <div>
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            </div>
        )
    }

    if (role === 'root') {
        return (
            <div>
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            </div>
        )
    }
}