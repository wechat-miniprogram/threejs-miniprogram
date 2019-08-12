import _XMLHttpRequest from './XMLHttpRequest'

export function getAdaptedThreejs(canvas) {
  // adapt canvas
  canvas.style = {width: canvas.width + 'px', height: canvas.height + 'px'}
  canvas.addEventListener = function () {}
  canvas.removeEventListener = function () {}
  
  const document = {
    createElementNS(_, type) {
      if (type === 'canvas') return canvas
      if (type === 'img') return canvas.createImage()
    }
  }

  const window = {
    AudioContext: function() {},
    addEventListener: function() {},
    removeEventListener: function() {}
  }
  const XMLHttpRequest = _XMLHttpRequest

  const innerExport = {};

  // three.js source code will be injected here
  __INJECT_THREE__

  return innerExport
}

