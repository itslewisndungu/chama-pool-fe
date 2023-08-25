import { getEndpointPath } from "@/lib/utils";

export async function listAllGroupMembers() {
  const req = new Request(getEndpointPath(`/members`), {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });

  return fetch(req);
}
