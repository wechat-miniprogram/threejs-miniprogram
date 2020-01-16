import {atob as _atob} from 'abab';
import _XMLHttpRequest from './XMLHttpRequest'

export function createScopedThreejs(canvas) {
  // adapt canvas
  canvas.style = {width: canvas.width + 'px', height: canvas.height + 'px'}
  canvas.addEventListener = function () {}
  canvas.removeEventListener = function () {}
  
  // eslint-disable-next-line
  const document = {
    createElementNS(_, type) {
      if (type === 'canvas') return canvas
      if (type === 'img') return canvas.createImage()
    }
  }

  // eslint-disable-next-line
  const window = {
    AudioContext: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    URL: {},
  }

  // eslint-disable-next-line
  const atob = (a) => {
    return _atob(a)
  }

  // eslint-disable-next-line
  const XMLHttpRequest = _XMLHttpRequest

  const exports = {};

  // three.js source code will be injected here
  // eslint-disable-next-line
  __INJECT_THREE__

  return exports
}

