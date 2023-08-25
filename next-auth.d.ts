import { MemberRole } from '@/types/MemberRole';

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
      roles: MemberRole[];
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
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    nationalId: string;
    phoneNumber: string;
    joinedOn: string;
    status: string;
    roles: MemberRole[];
    token: string;
  }
}
