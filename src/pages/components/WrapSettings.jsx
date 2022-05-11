import React from 'react'
import PrivateRoute from '../../PrivateRoute';
import ProtectedRoute from '../../ProtectedRoute';
import Settings from './Settings';

export default function WrapSettings({ role }) {
    if (role === 'user') {
        return (
            <div>
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>
            </div>
        )
    }

    if (role === 'root') {
        return (
            <div>
                <PrivateRoute>
                    <Settings />
                </PrivateRoute>
            </div>
        )
    }
}

