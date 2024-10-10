import React from 'react';

interface LoginButtonProps {
  onLogin: () => void;
}

export default function LoginButton({ onLogin }: LoginButtonProps) {
  return (
    <button onClick={onLogin}>
      Login
    </button>
  );
}
