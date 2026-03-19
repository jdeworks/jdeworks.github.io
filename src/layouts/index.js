// Layout registry — import and re-export all layouts
// To add a new layout: create a new file, then add it here

import * as centeredHero from './centered-hero.js';
import * as sidebar from './sidebar.js';
import * as terminal from './terminal.js';
import * as magazine from './magazine.js';
import * as bento from './bento.js';
import * as split from './split.js';
import * as minimalist from './minimalist.js';
import * as playful from './playful.js';
import * as devtool from './devtool.js';
import * as editorial from './editorial.js';
import * as agency from './agency.js';
import * as stacked from './stacked.js';
import * as scrollReveal from './scroll-reveal.js';
import * as showcase from './showcase.js';
import * as portfolio from './portfolio.js';
import * as resume from './resume.js';
import * as narrative from './narrative.js';
import * as landing from './landing.js';
import * as matrix from './matrix.js';
import * as retroOs from './retro-os.js';
import * as newspaper from './newspaper.js';

export const LAYOUTS = [
  centeredHero,
  sidebar,
  terminal,
  magazine,
  bento,
  split,
  minimalist,
  playful,
  devtool,
  editorial,
  agency,
  stacked,
  scrollReveal,
  showcase,
  portfolio,
  resume,
  narrative,
  landing,
  matrix,
  retroOs,
  newspaper,
];
