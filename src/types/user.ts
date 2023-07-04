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
