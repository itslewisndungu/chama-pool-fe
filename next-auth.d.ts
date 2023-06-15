import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { User, Session, Profile } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      nationalId: string;
      phoneNumber: string;
      joinedOn: string;
      status: string;
      roles: string[];
      token: string;
    };
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
  }
}

declare module 'next-auth' {
  interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    nationalId: string;
    phoneNumber: string;
    joinedOn: string;
    status: string;
    roles: string[];
  }
}
declare module 'next-auth' {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    nationalId: string;
    phoneNumber: string;
    joinedOn: string;
    status: string;
    roles: string[];
    token: string;
  }
}
