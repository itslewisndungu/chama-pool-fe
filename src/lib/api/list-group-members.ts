export async function listAllGroupMembers() {
  const req = new Request('http://localhost:8080/members', {
    method: 'GET',
    next: {
      revalidate: 10,
    },
  });

  return fetch(req);
}
