const _events = new WeakMap()

class Touch {
    constructor(touch) {
        // CanvasTouch{identifier, x, y}
        // Touch{identifier, pageX, pageY, clientX, clientY, force}
        this.identifier = touch.identifier

        this.force = touch.force === undefined ? 1 : touch.force
        this.pageX = touch.pageX || touch.x
        this.pageY = touch.pageY || touch.y
        this.clientX = touch.clientX || touch.x
        this.clientY = touch.clientY || touch.y

        this.screenX = this.pageX
        this.screenY = this.pageY
    }
}

export default class EventTarget {
    constructor() {
        _events.set(this, {})
    }

    addEventListener(type, listener, options = {}) {
        let events = _events.get(this)

        if (!events) {
            events = {}
            _events.set(this, events)
        }
        if (!events[type]) {
            events[type] = []
        }
        events[type].push(listener)

        if (options.capture) {
            // console.warn('EventTarget.addEventListener: options.capture is not implemented.')
        }
        if (options.once) {
            // console.warn('EventTarget.addEventListener: options.once is not implemented.')
        }
        if (options.passive) {
            // console.warn('EventTarget.addEventListener: options.passive is not implemented.')
        }
    }

    removeEventListener(type, listener) {
        const events = _events.get(this)

        if (events) {
            const listeners = events[type]

            if (listeners && listeners.length > 0) {
                for (let i = listeners.length; i--; i > 0) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1)
                        break
                    }
                }
            }
        }
    }

    dispatchEvent(event = {}) {
        if (typeof event.preventDefault !== 'function') {
            event.preventDefault = () => {}
        }
        if (typeof event.stopPropagation !== 'function') {
            event.stopPropagation = () => {}
        }
        const listeners = _events.get(this)[event.type]

        if (listeners) {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](event)
            }
        }
    }

    dispatchTouchEvent(e = {}) {
        const target = {
            ...this
        }

        const event = {
            changedTouches: e.changedTouches.map(touch => new Touch(touch)),
            touches: e.touches.map(touch => new Touch(touch)),
            targetTouches: Array.prototype.slice.call(e.touches.map(touch => new Touch(touch))),
            timeStamp: e.timeStamp,
            target: target,
            currentTarget: target,
            type: e.type,
            cancelBubble: false,
            cancelable: false
        }

        this.dispatchEvent(event)
    }
}
