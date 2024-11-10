import { remove } from '../../storage/index.js';
import { logout } from './logout.js';

jest.mock('../../storage/index.js', () => ({
  save: jest.fn(),
  remove: jest.fn(), // Mock the remove function
  load: jest.fn(() => 'mockToken'),
}));

it('removes token and profile from localStorage when logging out', () => {
  logout();

  expect(remove).toHaveBeenCalledWith('token');

  expect(remove).toHaveBeenCalledWith('profile');
});
