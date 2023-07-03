import { AddressForm } from "@/app/member/profile/address/AddressForm";

const getAddress = async () => {
  const address = {
    county: "Nairobi",
    subCounty: "Embakasi",
    constituency: "Embakasi East",
    locationDescription: "Across the road from the police station",
  };

  return new Promise<typeof address>(resolve => {
    setTimeout(() => resolve(address), 1000);
  });
};

export default async function AddressPage() {
  const address = await getAddress();

  return (
    <>
      <h1>Home address</h1>

      <AddressForm address={address} />
    </>
  );
}
