import { OccupationForm } from "@/app/member/profile/occupation/OccupationForm";

const getOccupation = async () => {
  const occupation = {
    organization: "Safaricon",
    position: "Software Engineer",
    salary: 10000,
  };

  return new Promise<typeof occupation>(resolve => {
    setTimeout(() => {
      resolve(occupation);
    }, 1000);
  });
};
export default async function OccupationPage() {
  const occupation = await getOccupation();

  return (
    <>
      <h1 className={"m-0"}>Occupation</h1>
      <OccupationForm occupation={occupation} />
    </>
  );
}
