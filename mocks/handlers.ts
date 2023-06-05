// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/members', (req, res, ctx) => {
    return res(ctx.json({ name: 'lewis' }));
  }),
];
