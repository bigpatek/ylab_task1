import {jest} from '@jest/globals'

jest.mock('./api.js', () => ({
    login: jest.fn().mockResolvedValue({
      data: 'mock data',
    }),
  }));