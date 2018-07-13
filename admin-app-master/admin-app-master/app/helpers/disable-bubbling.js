import { helper } from '@ember/component/helper';

export function disableBubbling([action]) {
  return function(event) {
    event.stopPropagation();
    return action(event);
  };
}
export default helper(disableBubbling);
