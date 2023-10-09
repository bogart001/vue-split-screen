/*
 * @Author: fcli
 * @Date: 2023-09-04 16:50:16
 * @LastEditors: fcli
 * @LastEditTime: 2023-10-09 10:53:21
 * @FilePath: /vue-split-screen/src/plugin/type.d.ts
 * @Description: 
 */

declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}