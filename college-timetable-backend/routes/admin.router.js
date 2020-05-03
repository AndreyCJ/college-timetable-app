const AdminBro = require('admin-bro');
const { buildAuthenticatedRouter } = require('admin-bro-expressjs');
const express = require('express');

const EMAIL = 'admin@test.com';
const PASS = 'password123';

const ADMIN = {
  email: process.env.ADMIN_EMAIL || EMAIL,
  password: process.env.ADMIN_PASSWORD || PASS,
};

/**
 *
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const BuildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(
    admin,
    {
      cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
      cookiePassword: process.env.ADMIN_COOKIE_PASS || PASS,
      authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
          return ADMIN;
        }
        return null;
      },
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
    },
  );
  return router;
};

module.exports = BuildAdminRouter;
