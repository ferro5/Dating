import { Photo } from './Photo';

export interface User {
  id: string;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  intruduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}