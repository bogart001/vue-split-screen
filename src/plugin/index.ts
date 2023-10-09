/*
 * @Author: fcli
 * @Date: 2023-09-04 10:34:52
 * @LastEditors: fcli
 * @LastEditTime: 2023-10-09 10:53:10
 * @FilePath: /vue-split-screen/src/plugin/index.ts
 * @Description: 
 */
import VueSplitScreen from './index.vue';

const vueSplitScreen = {
    install(app:any){
        app.component('VueSplitScreen',VueSplitScreen);
    }
}
export default vueSplitScreen;
