import { PersonalInfoForm } from "@/app/member/profile/personal-information/PersonalInfoForm";

const getPersonalInfo = async () => {
  const user = {
    firstname: "Lewis",
    lastname: "Ndungu",
    phoneNumber: "0740283007",
    nationalId: "38259057",
    dateOfBirth: new Date("04/10/1998"),
  };

  return new Promise<typeof user>(resolve => {
    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
};

export default async function PersonalInfoPage() {
  const user = await getPersonalInfo();

  return (
    <>
      <h1 className={"m-0"}>Personal Information</h1>

      <PersonalInfoForm user={user} />
    </>
  );
}
