const floaterSearchTerms = [
  'The View Show Today',
  'CNN News Today',
  'Fox News Today',
  'MSNBC News Today',
];

const backgroundVideoSearchTerms = [
  'Marvel Clip Action Scene',
  'Police Training Video',
  'Military Training Documentary',
  'Marine Trainint Documentary',
];

const audioSearchTerms = [
  'Creepy background noise',
  'Creepy music',
  'Drone music',
  'Drone music atonal',
];

const BACKGROUND_KEY = 'background';
const AUDIO_KEY = 'audio';
const FLOATERS_KEY = 'floaters';

const BACKGROUND_MAX_RESULTS = 25;
const AUDIO_MAX_RESULTS = 15;
const FLOATERS_MAX_RESULTS = 40;

module.exports = {
  floaterSearchTerms,
  audioSearchTerms,
  backgroundVideoSearchTerms,
  BACKGROUND_KEY,
  AUDIO_KEY,
  FLOATERS_KEY,
  BACKGROUND_MAX_RESULTS,
  AUDIO_MAX_RESULTS,
  FLOATERS_MAX_RESULTS,
};
