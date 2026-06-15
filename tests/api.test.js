import { fetchProtectedData } from '../api';
import { auth } from '../src/firebase/firebase';

jest.mock('../../firebase', () => ({
  auth: {
    currentUser: {
      getIdToken: jest.fn(() => Promise.resolve('mock-secure-jwt-token-string')),
    },
  },
}));

describe('fetchProtectedData API Utility', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'success', message: 'Authorized access' }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should append the Firebase ID token in the authorization header correctly', async () => {
    const data = await fetchProtectedData();

    expect(auth.currentUser.getIdToken).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:8000/my-watchlist',
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-secure-jwt-token-string',
        },
      })
    );
    expect(data.status).toBe('success');
  });
});