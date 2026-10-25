import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, ensureAuth } from './firebase';

export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: 'open' | 'assigned' | 'in_progress' | 'ready_for_proof' | 'completed';
  posterId: string;
  posterName: string;
  posterAvatar: string;
  workerId?: string;
  workerName?: string;
  location: string;
  arrivalWindow: string;
  escrowSecured: boolean;
  createdAt?: unknown;
}

const INITIAL_TASKS: TaskRecord[] = [
  {
    id: 'SMS-8942',
    title: 'Fix Leaking Kitchen Pipe & Install Bathroom Faucet',
    description:
      'Need a licensed or experienced tradesperson to replace a corroded P-trap under the kitchen sink that is actively leaking into a plastic tub. Additionally, install a brand new Moen Adler single-handle faucet.',
    category: 'Skilled Trades / Plumbing',
    budget: 150,
    status: 'ready_for_proof',
    posterId: 'user-sarah-m',
    posterName: 'Sarah M.',
    posterAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMdzCgXJcLzvouZT5yApemhAYH5Cn5lw7fytLijsLKyUqPlr57_zfARmg4crAUd9XVbuz0yL09dwTPgQOPJnZbUOC1jgJb6GcGXLEgzq_uRvZs92UIYSsqezqBVkJ-Ba69kGdWQEmetY5_illj5qEnOwrJqqDxmtVxUHibtjPWftAMFKZ9xognguEQjdX8ZQ5XivjAQ6ZsQdVKZp4KXS5wMkDH6WDut8L3SYrH7ec',
    workerId: 'user-alex-rivera',
    workerName: 'Alex Rivera',
    location: '701 Congress Ave, Unit 4B, Austin, TX 78701',
    arrivalWindow: 'Today, Oct 24 • 2:00 PM – 5:00 PM',
    escrowSecured: true,
  },
  {
    id: 'SMS-8943',
    title: 'Emergency Electrical Breaker Tripping',
    description:
      'Main panel switch tripped after microwave surge. Need a licensed electrician or certified technician to test voltage and reset safely.',
    category: 'Trades',
    budget: 180,
    status: 'open',
    posterId: 'user-marcus-v',
    posterName: 'Marcus V.',
    posterAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9pcbfzEYX2qQnB63l8DKaVmANhbhWVp017tj73RSEjeZ7VwOq3WnnV0Y_KkkXFDiL-mDe3_3P8sLQ2fi9npjckKh4l3gvwKxSuZTe23mN-cglxjo3hr8FfNZdREHQXAbggtalMynu9E8Q4Pj5umwhFYZRho1O4xy_HJGsiqxXi3LE9GSEHzscNwnEkckUqTYO31JILvWpe6LCzOqkDMSsWLY2tlU7ICfBoGL_K5KsjOhe-g1gV7F5',
    location: 'South Lamar, Austin, TX (0.8 mi away)',
    arrivalWindow: 'Immediate / Today',
    escrowSecured: true,
  },
  {
    id: 'SMS-8944',
    title: 'Assemble Custom Walnut Wardrobe & Desk',
    description:
      'Flat-pack 3-door modular wardrobe and floating hardwood desk setup. Hardware provided; bring your own power drill and level.',
    category: 'Carpentry & Assembly',
    budget: 240,
    status: 'open',
    posterId: 'user-elena-r',
    posterName: 'Elena R.',
    posterAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCL_q3h67zMAzFXmRdhOHXu2OHu4YvNEAeBe65OVbCaLbN8kaH6OWOh-kBFn3OrZGjL_w3aT7jAYEGhOORI-wpv27Lpni7NW9GZb8EphzuLg4PyChap3ux852lE9UI961zJmYD08dFXbsep9UowMMImZdn94gnrAKoFK9n7Lc7D_940QAuqn_gPlKivNPDNaNTC9-dnh_qRqUMIiNtZItera5c3KWpKQJg-poDVokjDghhlV4AmBAZJ',
    location: 'Zilker, Austin, TX (2.1 mi away)',
    arrivalWindow: 'Flexible Today / Evening',
    escrowSecured: true,
  },
];

export async function fetchTasks(): Promise<TaskRecord[]> {
  try {
    await ensureAuth();
    const tasksCol = collection(db, 'tasks');
    const snapshot = await getDocs(tasksCol);

    if (snapshot.empty) {
      // Seed initial tasks to Firestore so the user has immediate live persistent records
      for (const t of INITIAL_TASKS) {
        await setDoc(doc(db, 'tasks', t.id), {
          ...t,
          createdAt: serverTimestamp(),
        });
      }
      return INITIAL_TASKS;
    }

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TaskRecord));
  } catch (err) {
    console.warn('Could not fetch from Firestore, falling back to cached seed:', err);
    return INITIAL_TASKS;
  }
}

export async function submitTaskOffer(
  taskId: string,
  offer: {
    workerName: string;
    proposedPayout: number;
    netTakeHome: number;
    message: string;
    arrivalTime: string;
  }
) {
  try {
    const user = await ensureAuth();
    const offersCol = collection(db, 'tasks', taskId, 'offers');
    return await addDoc(offersCol, {
      ...offer,
      workerId: user?.uid || 'anon-worker',
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to submit offer to Firestore:', err);
  }
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskRecord['status']
) {
  try {
    await ensureAuth();
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to update task status in Firestore:', err);
  }
}
