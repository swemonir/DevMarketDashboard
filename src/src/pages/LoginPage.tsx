import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Lock, Mail } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    navigate('/');
  };
  return <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-900 shadow-2xl">
        <CardHeader className="text-center border-gray-800 pb-2">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            DevNexus Admin
          </CardTitle>
          <p className="text-gray-400 mt-2 text-sm">
            Secure access for authorized personnel only
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email Address" type="email" placeholder="admin@devnexus.com" value={email} onChange={e => setEmail(e.target.value)} required leftIcon={<Mail className="w-4 h-4" />} />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required leftIcon={<Lock className="w-4 h-4" />} />

            <div className="pt-2">
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Sign In to Dashboard
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              <p>Demo Credentials:</p>
              <p>Super Admin: alex@devnexus.com</p>
              <p>Admin: sarah@devnexus.com</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>;
}