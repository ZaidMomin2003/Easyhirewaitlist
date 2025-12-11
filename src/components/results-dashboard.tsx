'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useEffect, useState } from 'react';

interface WaitlistEntry {
  id: string;
  name: string;
  business: string;
  email: string;
  submissionTimestamp?: {
    seconds: number;
    nanoseconds: number;
  };
}

export function ResultsDashboard() {
  const firestore = useFirestore();
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) return;

    const fetchWaitlistEntries = async () => {
      setIsLoading(true);
      try {
        const waitlistCollection = collection(firestore, 'waitlist_entries');
        const q = query(waitlistCollection, orderBy('submissionTimestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const entries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as WaitlistEntry));
        setWaitlistEntries(entries);
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaitlistEntries();
  }, [firestore]);


  const formatDate = (timestamp: WaitlistEntry['submissionTimestamp']) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="animate-in fade-in-0 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Could not load waitlist entries. Please ensure you have the correct permissions and the collection 'waitlist_entries' exists.
              </AlertDescription>
            </Alert>
          )}
          {!isLoading && !error && (
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
                {waitlistEntries && waitlistEntries.length > 0 ? (
                  waitlistEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.business}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{formatDate(entry.submissionTimestamp)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No submissions yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
