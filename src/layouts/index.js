// Layout registry — import and re-export all layouts
// To add a new layout: create a new file, then add it here

export { name as centeredHeroName, render as centeredHeroRender } from './centered-hero.js';
export { name as sidebarName, render as sidebarRender } from './sidebar.js';
export { name as terminalName, render as terminalRender } from './terminal.js';
export { name as magazineName, render as magazineRender } from './magazine.js';
export { name as bentoName, render as bentoRender } from './bento.js';
export { name as splitName, render as splitRender } from './split.js';

import * as centeredHero from './centered-hero.js';
import * as sidebar from './sidebar.js';
import * as terminal from './terminal.js';
import * as magazine from './magazine.js';
import * as bento from './bento.js';
import * as split from './split.js';

export const LAYOUTS = [
  centeredHero,
  sidebar,
  terminal,
  magazine,
  bento,
  split,
];
