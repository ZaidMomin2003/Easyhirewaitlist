'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
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
  const waitlistQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'waitlist_entries') : null),
    [firestore]
  );
  const { data: waitlistEntries, isLoading, error } = useCollection<WaitlistEntry>(waitlistQuery);

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
                Could not load waitlist entries. Please ensure you have the correct permissions.
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
