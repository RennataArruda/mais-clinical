export const CommonUrl: string = 'http://localhost:3333';

export const getHeaders = () => {
  let token: string;
  // @ts-ignore
  token = sessionStorage.getItem('token') ?? '';
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  }
}
// export const CommonUrl: string = 'http://44.215.40.186:3333'
