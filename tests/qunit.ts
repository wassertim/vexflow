declare let window;

export const QUnit = (function() {
  if (!window.QUnit) {
    return {};
  }
  return window.QUnit;
})();
