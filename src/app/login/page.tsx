'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth-provider';

function ZampLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" width={45} height={40} />
      <span className="text-3xl font-bold tracking-tight">zamp</span>
    </div>
  );
}


export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: result.message,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center login-grid-bg relative">
      <div className="absolute inset-0 login-diagonal-bg opacity-50" style={{backgroundSize: '160px 160px', backgroundPosition: '0 0'}}></div>
       <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center mb-8">
            <ZampLogo />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 border-gray-300 focus:ring-gray-800"
            />
          </div>
          <div>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 border-gray-300 focus:ring-gray-800"
            />
          </div>
          <Button type="submit" className="w-full bg-gray-800 text-white hover:bg-gray-900 h-11 text-base">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
