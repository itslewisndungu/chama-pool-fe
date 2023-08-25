export type UserProfile = {
  username: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  roles: string[];
};

export type NextOfKin = {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  nationalId: string;
};

export type Address = {
  constituency: string;
  county: string;
  subCounty: string;
};

export type Occupation = {
  salary: number;
  organization: string;
  phoneNumber: string;
  position: string;
};

export type InvitedMember = {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export enum MemberRole {
  CHAIRMAN = "CHAIRMAN",
  TREASURER = "TREASURER",
  SECRETARY = "SECRETARY",
  MEMBER = "MEMBER",
  WELFARE_OFFICER = "WELFARE_OFFICER",
}

export type Member = {
  username: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  nationalId: string;
};
