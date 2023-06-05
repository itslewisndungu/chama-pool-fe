import { LoginCredentials } from '@/types/LoginCredentials';

export async function userLogin(credentials: LoginCredentials) {
  const loginRequest = new Request('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return fetch(loginRequest);
}

export async function getCurrentUser(token: string) {
  const req = new Request('http://localhost:8080/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return fetch(req);
}

// export async function userLogout() {
//   return axios.post('/auth/logout')
// }

// export async function refreshUserToken() {
//   const refreshToken = localStorage.getItem('rt-token')

//   if (!refreshToken) {
//     return Promise.reject('Refresh token not found. Please log in again')
//   }

//   return axios.post<Res<User>>(
//     '/auth/refresh',
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     }
//   )
// }

// export async function userSignup(credentials: LoginCredentials) {
//   return axios.post<Res<User>>('/auth/signup', credentials)
// }
