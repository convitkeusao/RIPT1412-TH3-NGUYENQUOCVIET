/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('../src/navigation/Root', () => () => null);
jest.mock('../src/database/migrations', () => ({
  runMigrations: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('../src/shared/lib/DataContext', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => children,
}));

import App from '../src/App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<App />);
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });
});
