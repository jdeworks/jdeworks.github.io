// Layout registry — import and re-export all layouts
// To add a new layout: create a new file, then add it here
// Set mobile: false to exclude from random rotation on mobile (still selectable via picker)

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
import * as blueprint from './blueprint.js';
import * as arcade from './arcade.js';
import * as comic from './comic.js';
import * as stories from './stories.js';
import * as chat from './chat.js';
import * as neon from './neon.js';
import * as glass from './glass.js';
import * as recipe from './recipe.js';
import * as boardingPass from './boarding-pass.js';
import * as starfield from './starfield.js';
import * as fileExplorer from './file-explorer.js';
import * as boot from './boot.js';
import * as cardDeck from './card-deck.js';
import * as rundown from './rundown.js';
import * as poster from './poster.js';
import * as decayed from './decayed.js';

// All layouts — always available in the picker
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
  blueprint,
  arcade,
  comic,
  stories,
  chat,
  neon,
  glass,
  recipe,
  boardingPass,
  starfield,
  fileExplorer,
  boot,
  cardDeck,
  rundown,
  poster,
  decayed,
];

// Layouts that look great on mobile — used for random rotation on small screens
// (multi-column and panel-heavy layouts are excluded since they collapse to
//  the same single-column on mobile, but they're still selectable in the picker)
export const MOBILE_LAYOUTS = [
  centeredHero,
  terminal,
  minimalist,
  playful,
  devtool,
  editorial,
  stacked,
  scrollReveal,
  narrative,
  matrix,
  retroOs,
  newspaper,
  arcade,
  comic,
  stories,
  chat,
  agency,
  landing,
  neon,
  glass,
  recipe,
  boardingPass,
  starfield,
  boot,
  cardDeck,
  rundown,
  poster,
  decayed,
];
