// const { createScopedThreejs } = require('threejs-miniprogram')
import { createScopedThreejs } from 'threejs-miniprogram'

const { renderCube } = require('../test-cases/cube')
const { renderCubes } = require('../test-cases/cubes')
const { renderSphere } = require('../test-cases/sphere')
const { renderModel } = require('../test-cases/model')

const app = getApp()

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        this.canvas = canvas
        const THREE = createScopedThreejs(canvas)
        canvas.addEventListener('touchmove', (e) => console.warn('move ~', e))
        canvas.addEventListener('touchstart', (e) => console.warn('start ~', e))
        canvas.addEventListener('touchend', (e) => console.warn('end ~', e))
        
        // renderSphere(canvas, THREE)
        // renderCube(canvas, THREE)
        // renderCubes(canvas, THREE)
        renderModel(canvas, THREE)
      })
  },
  touchStart(e) {
    this.canvas.dispatchEvent({...e, type:'touchstart'})
  },
  touchMove(e) {
    this.canvas.dispatchEvent({...e, type:'touchmove'})
  },
  touchEnd(e) {
    this.canvas.dispatchEvent({...e, type:'touchend'})
  }
})
