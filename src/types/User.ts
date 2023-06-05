export type User = {
  username: string;
  phoneNumber: string;
  firstName: string;
  constituency: string;
  county: string;
  lastName: string;
  nationalId: string;
  nextOfKin?: NextOfKin;
  address?: Address;
  occupation?: Occupation;
  roles: string[]
};

export type NextOfKin = {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  nationalId: string;
};

export type Address = {
  salary: number;
  subCounty: string;
};

export type Occupation = {
  organization: string;
  phoneNumber: string;
  position: string;
};
