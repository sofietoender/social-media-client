import { apiPath } from '../constants.js';
import { save } from '../../storage/index.js';
import { login } from './login.js';

const mockEmail = 'user@example.com';
const mockPassword = 'password123';
const mockToken = 'mockAccessToken';
const mockUserProfile = {
  name: 'Test User',
  email: mockEmail,
  banner: 'bannerImageURL',
  avatar: 'avatarImageURL',
  accessToken: mockToken,
};

global.fetch = jest.fn((url, options) => {
  if (
    url === `${apiPath}/social/auth/login` &&
    options.method.toLowerCase() === 'post'
  ) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockUserProfile),
    });
  }

  return Promise.resolve({
    ok: false,
    statusText: 'Unauthorized',
  });
});

jest.mock('../../storage/index.js', () => ({
  save: jest.fn(),
  remove: jest.fn(),
  load: jest.fn(() => mockToken),
}));

describe('Login function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully authenticate and store token and user profile', async () => {
    const userProfile = await login(mockEmail, mockPassword);

    expect(userProfile).toEqual({
      name: mockUserProfile.name,
      email: mockUserProfile.email,
      banner: mockUserProfile.banner,
      avatar: mockUserProfile.avatar,
    });

    expect(save).toHaveBeenCalledWith('token', mockToken);
    expect(save).toHaveBeenCalledWith('profile', {
      name: mockUserProfile.name,
      email: mockUserProfile.email,
      banner: mockUserProfile.banner,
      avatar: mockUserProfile.avatar,
    });
  });

  it('should throw an error for unauthorized login', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Unauthorized',
      }),
    );

    await expect(login('wrongEmail', 'wrongPassword')).rejects.toThrow(
      'Unauthorized',
    );
  });
});
