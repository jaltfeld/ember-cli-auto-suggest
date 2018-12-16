import Component from '@ember/component';
import layout from '../templates/components/suggest-results';

export default Component.extend(layout, {
  layout,
  suggestListSet: null,
  suggestResults: null,
});
