export function addKeyupEventListener(keyCode, callBack) {
  if (!window) return;
  window.addEventListener('keyup', (event) => {
    if (event.keyCode === keyCode) callBack();
  });
}

export function removeKeyupEventListener(keyCode, callBack) {
  if (!window) return;
  window.removeEventListener('keyup', (event) => {
    if (event.keyCode === keyCode) callBack();
  });
}
