import { NextOfKinForm } from "@/app/member/profile/kin/NextOfKinForm";

const getKin = async () => {
  const kin = {
    firstName: "Simon",
    lastName: "Ndung'u",
    mobileNumber: "0712345678",
    nationalId: "11122585",
  };

  return new Promise<typeof kin>(resolve => {
    setTimeout(() => resolve(kin), 1000);
  });
};

export default async function NextOfKinPage() {
  const kin = await getKin();

  return (
    <>
      <h1 className={"m-0"}>Next of kin</h1>

      <NextOfKinForm kin={kin} />
    </>
  );
}
