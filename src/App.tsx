/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CheckInForm } from './components/CheckInForm';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, getDocs } from 'firebase/firestore';
import { CheckIn } from './types';
import { ActivitySquare, LineChart, LogOut, CheckCircle2, Edit } from 'lucide-react';
import { cn } from './utils';
import { format } from 'date-fns';

// Helper for comprehensive error handling
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // In production, might report this to bug tracking
}

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return <AuthenticatedApp user={user} />;
}

function AuthenticatedApp({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'checkin' | 'dashboard'>('checkin');
  const [data, setData] = useState<CheckIn[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState<string>(today);

  useEffect(() => {
    setIsSyncing(true);
    const q = query(collection(db, 'checkIns'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const checkIns: CheckIn[] = [];
      snapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() } as CheckIn;
        checkIns.push(item);
      });
      setData(checkIns);
      setIsSyncing(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'checkIns');
      setIsSyncing(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const selectedEntry = useMemo(() => data.find(d => d.date === selectedDate), [data, selectedDate]);

  const handleNewCheckIn = async (newEntry: Omit<CheckIn, 'id'>) => {
    try {
      // Check if entry for today exists
      const existingEntry = data.find(d => d.date === newEntry.date);
      if (existingEntry) {
        // update existing
        const docRef = doc(db, 'checkIns', existingEntry.id);
        await updateDoc(docRef, {
          ...newEntry,
          updatedAt: serverTimestamp()
        });
      } else {
        // create new
        await addDoc(collection(db, 'checkIns'), {
          ...newEntry,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsEditing(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'checkIns');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">
              <ActivitySquare className="w-5 h-5" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
              Performance<span className="text-indigo-600">Dash</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex gap-4 text-sm font-medium text-slate-500">
              <button
                onClick={() => setActiveTab('checkin')}
                className={cn(
                  "pb-5 pt-5 transition-colors border-b-2 flex items-center gap-1.5",
                  activeTab === 'checkin' ? "text-indigo-600 border-indigo-600" : "border-transparent hover:text-slate-800"
                )}
              >
                Log Check-in
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  "pb-5 pt-5 transition-colors border-b-2 flex items-center gap-1.5",
                  activeTab === 'dashboard' ? "text-indigo-600 border-indigo-600" : "border-transparent hover:text-slate-800"
                )}
              >
                <LineChart className="w-4 h-4 hidden sm:block" />
                Dashboard
              </button>
            </nav>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-900">{user.email}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Athlete</p>
              </div>
              <button 
                onClick={() => auth.signOut()}
                className="text-slate-400 hover:text-rose-600 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 min-h-0 overflow-y-auto">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {isSyncing && data.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {activeTab === 'checkin' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto w-full">
                    <label className="font-semibold text-slate-800 text-sm">Log Date:</label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      max={today}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setIsEditing(false);
                      }}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  {selectedEntry && !isEditing ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-slate-200 text-center max-w-2xl mx-auto">
                      <CheckCircle2 className="w-16 h-16 text-indigo-500 mb-4" />
                      <h2 className="text-xl font-bold text-slate-800 mb-2">Check-in Completed</h2>
                      <p className="text-slate-500 text-sm mb-8">You have logged metrics for {selectedDate === today ? 'today' : selectedDate}.</p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Log
                      </button>
                    </div>
                  ) : (
                    <CheckInForm key={selectedDate} onSubmit={handleNewCheckIn} initialData={selectedEntry} selectedDate={selectedDate} />
                  )}
                </div>
              )}
              {activeTab === 'dashboard' && <Dashboard data={data} />}
            </>
          )}
        </div>
      </main>
      
      {isSyncing && (
         <footer className="h-8 bg-slate-800 border-t border-slate-700 px-6 flex items-center justify-between text-[10px] text-slate-400 font-medium z-10 bottom-0 fixed w-full left-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div> Syncing data...</span>
          </div>
        </footer>
      )}
    </div>
  );
}
