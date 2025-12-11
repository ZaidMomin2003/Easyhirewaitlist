'use client';

import { useEffect, useState } from 'react';
import { useCollection, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { AdminLoginForm } from '@/components/admin-login-form';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface WaitlistEntry {
  id: string;
  name: string;
  business: string;
  email: string;
  submissionTimestamp: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

function WaitlistTable({ waitlistData }: { waitlistData: WaitlistEntry[] }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Waitlist Submissions</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Business</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Submission Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {waitlistData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.business}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>
                {entry.submissionTimestamp
                  ? new Date(entry.submissionTimestamp.seconds * 1000).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AdminDashboard() {
  const auth = useAuth();
  const firestore = useFirestore();
  const waitlistCollection = useMemoFirebase(() => 
    firestore ? collection(firestore, 'waitlist_entries') : null
  , [firestore]);
  const { data: waitlistData, isLoading: isWaitlistLoading } = useCollection<WaitlistEntry>(waitlistCollection);

  const handleSignOut = () => {
    auth.signOut();
  };

  if (isWaitlistLoading) {
    return (
      <div className="w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Waitlist Submissions</h1>
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div className="flex items-center space-x-4" key={i}>
              <Skeleton className="h-12 w-1/4" />
              <Skeleton className="h-12 w-1/4" />
              <Skeleton className="h-12 w-1/4" />
              <Skeleton className="h-12 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-6">
         <div></div>
        <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
      </div>
      {waitlistData && <WaitlistTable waitlistData={waitlistData} />}
    </div>
  );
}


export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user && firestore) {
        try {
          const adminDocRef = doc(firestore, 'roles_admin', user.uid);
          const adminDoc = await getDoc(adminDocRef);
          setIsAdmin(adminDoc.exists());
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else if (!isUserLoading) {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, isUserLoading, firestore]);

  if (isUserLoading || isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-96 h-96" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLoginForm />;
  }

  return <AdminDashboard />;
}
