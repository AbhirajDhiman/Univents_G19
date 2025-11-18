import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SetupAdmin() {
  const [secretKey, setSecretKey] = useState('');
  const { user } = useUser();

  const handleMakeAdmin = async () => {
    // Set a secret key in your .env file
    if (secretKey !== import.meta.env.VITE_ADMIN_SECRET) {
      alert('Invalid secret key');
      return;
    }

    await user?.update({
      unsafeMetadata: {
        role: 'admin',
      },
    });

    alert('You are now an admin! Refresh the page.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Setup Admin</h1>
        <Input
          type="password"
          placeholder="Enter admin secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleMakeAdmin}>Make Me Admin</Button>
      </div>
    </div>
  );
}
