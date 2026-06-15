import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../src/routes/ProtectedRoutes';
import { useAuth } from '../src/context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('ProtectedRoutes Security Guard', () => {
  it('should redirect an unauthenticated user to the login screen', () => {
    useAuth.mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={['/movies']}>
        <Routes>
          <Route path="/login" element={<div>Mock Login Page</div>} />
          <Route path="/movies" element={
            <ProtectedRoutes>
              <div>Secret Dashboard view</div>
            </ProtectedRoutes>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Secret Dashboard view')).not.toBeInTheDocument();
  });
});