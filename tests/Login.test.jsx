import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/pages/Login';
import { AuthProvider } from '../../context/AuthContext';

const renderLoginComponent = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Page Component', () => {
  it('should render email and password inputs and accept text entry', () => {
    renderLoginComponent();

    const emailInput = screen.getByPlaceholderText(/type your email/i);
    const passwordInput = screen.getByPlaceholderText(/type your password/i);

    fireEvent.change(emailInput, { target: { value: 'watcher@moviehub.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepassword123' } });

    expect(emailInput.value).toBe('watcher@moviehub.com');
    expect(passwordInput.value).toBe('securepassword123');
  });

  it('should display html validation messages when inputs are left empty on submit', () => {
    renderLoginComponent();
    
    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginButton);

    const emailInput = screen.getByPlaceholderText(/type your email/i);
    expect(emailInput.checkValidity()).toBe(false);
  });
});