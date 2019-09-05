# threejs-miniprogram
Three.js 小程序 WebGL 的适配版本。

## 使用

可参考 example 目录下的示例项目或参照以下流程：

1. 通过 npm 安装

   ```
   npm install --save threejs-miniprogram
   ```
安装完成之后在微信开发者工具中点击构建 npm。

2. 导入小程序适配版本的 Three.js

```javascript
import {createScopedThreejs} from 'threejs-miniprogram'

Page({
  onReady() {
    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        // 创建一个与 canvas 绑定的 three.js
        const THREE = createScopedThreejs(canvas)
        // 传递并使用 THREE 变量
      })
  }
})
```

## 说明

- 本项目当前使用的 Three.js 版本号为 0.108.0，如要更新 threejs 版本可发 PR 修改或 fork 后自行修改。
- 该适配版本的 THREE 不在全局环境中，如使用 Three.js 的其他配套类库，需要自行传入 THREE 到类库中。
- 如在使用过程中发现有适配问题，可通过 issue 反馈或发 PR 修复。
