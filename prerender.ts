// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { join, resolve } from 'path';
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { enableProdMode } from '@angular/core';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';

import * as fs from 'fs-extra';

// Add routes manually that you need rendered
const ROUTES = [
  'en/calculator',
  'ru/calculator',
  'ua/calculator',
  'en/deposit-guarantee',
  'ru/deposit-guarantee',
  'ua/deposit-guarantee',
  'en/deposit-guarantee/application-to-fund',
  'ru/deposit-guarantee/application-to-fund',
  'ua/deposit-guarantee/application-to-fund',
  'en/deposit-guarantee/fund-law',
  'ru/deposit-guarantee/fund-law',
  'ua/deposit-guarantee/fund-law',
  'en/deposit-tax',
  'ru/deposit-tax',
  'ua/deposit-tax',
  'en/deposit-bank-rates',
  'ru/deposit-bank-rates',
  'ua/deposit-bank-rates',
  'en/home',
  'ru/home',
  'ua/home'
];

const APP_NAME = 'fakedeposit';

// leave this as require(), imported via webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

async function prerender() {
  // Get the app index
  const browserBuild = `dist/${APP_NAME}`;
  const index = await fs.readFile(join(browserBuild, 'index.html'), 'utf8');

  // Loop over each route
  for (const route of ROUTES) {
    const pageDir = join(browserBuild, route);
    await fs.ensureDir(pageDir);

    // Render with Universal
    const html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
    });

    await fs.writeFile(join(pageDir, 'index.html'), html);
  }

  console.log('done rendering :)');
  process.exit();
}

prerender();
