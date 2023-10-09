<!--
 * @Author: fcli
 * @Date: 2023-09-04 10:34:58
 * @LastEditors: fcli
 * @LastEditTime: 2023-10-09 13:34:35
 * @FilePath: /vue-split-screen/src/plugin/index.vue
 * @Description: 分屏
-->

<template>
    <div class="container">
        <div class="layout">
            <button class="layout-btn" @click="layoutType = item.value" v-for="item in layoutOptions" :key="item.value">{{
                item.label }}</button>
        </div>

        <div class="group top-container">
            <div class="cls-default" v-for="(item, cindex) in videoGroup.normalVideoGroup.children.slice(0, layoutType)"
                :key="cindex" :data-id="'normalVideoGroup-' + cindex" draggable="true" @dragstart="onDragstart($event)"
                @dragend="onDragend" @dragover="onDragover($event)" @drop="onDrop($event)"
                :style="{ 'background-color': item.color }" :class="['cls' + layoutType + '-' + cindex]">
                <div class="content">{{ item.color ? item.color : '空对象' }}</div>
            </div>
        </div>

        <div class="group bottom-container">
            <div class="cls-default" v-for="(item, cindex) in videoGroup.sourceVideoGroup.children" :key="cindex"
                :data-id="'sourceVideoGroup-' + cindex" draggable="true" @dragstart="onDragstart($event)"
                @dragend="onDragend" @dragover="onDragover($event)" @drop="onDrop($event)"
                :style="{ 'background-color': item.color }">
                <div class="content">{{ item.color ? item.color : '空对象' }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

//拖动目标对象el
const targetEl = ref('');
const startIndex = ref('');
const endIndex = ref('');
//分屏类型
const layoutType = ref(9);
const layoutOptions = ref([
    { label: '单分屏', value: 1 },
    { label: '二分屏', value: 2 },
    { label: '三分屏', value: 3 },
    { label: '四分屏', value: 4 },
    { label: '五分屏', value: 5 },
    { label: '六分屏', value: 6 },
    { label: '九分屏', value: 9 }
]);
const videoGroup = reactive<any>({
    normalVideoGroup: { group: 'normalVideoGroup', children: [{}, {}, {}, {}, {}, {}, {}, {}, {}] },
    sourceVideoGroup: {
        group: 'sourceVideoGroup',
        children: [
            { id: 2, color: 'yellow' },
            {
                id: 6,
                color: 'orange'
            },
            {
                id: 5,
                color: 'brown'
            },
            {
                id: 3,
                color: 'cyan'
            },
            {
                id: 11,
                color: 'white'
            },
            {
                id: 12,
                color: 'black'
            },
            {
                id: 13,
                color: 'red'
            },
            {
                id: 14,
                color: 'green'
            },
            {
                id: 15,
                color: 'blue'
            }
        ]
    }
})
const onDragstart = (event: any) => {
    startIndex.value = event.target.getAttribute('data-id');
}
const onDragend = () => {
    document.querySelectorAll('.top-container .cls-default').forEach((item) => {
        item.classList.remove('video-hover');
    });
    let startGroup = startIndex.value.split('-')[0];
    let startChild = startIndex.value.split('-')[1];
    let endGroup = endIndex.value.split('-')[0];
    let endChild = endIndex.value.split('-')[1];
    if (videoGroup[endGroup]) {
        let endObj = videoGroup[endGroup].children[endChild];
        let startObj = videoGroup[startGroup].children[startChild];

        //向展示区拖拽，如果已经存在则提示，并不做操作
        if (videoGroup[startGroup].group === 'sourceVideoGroup' && videoGroup[endGroup].group === 'normalVideoGroup') {
            const isExit=videoGroup[endGroup].children.some((item: any) => {
                return JSON.stringify(item) == JSON.stringify(startObj)
            })
            if (isExit) {
                alert('已存在！')
                return;
            }

        }
        if (videoGroup[endGroup].group === 'sourceVideoGroup') {
            //往视频区外拖拽时移除画面
            if (videoGroup[startGroup].group !== 'sourceVideoGroup') {
                videoGroup[startGroup].children.splice(startChild, 1, {});
            }
            return;
        }
        videoGroup[endGroup].children.splice(endChild, 1, startObj);
        if (videoGroup[startGroup].group !== 'sourceVideoGroup') {
            //拖拽起始区域不是 sourceVideoGroup  把起始区域替换成拖拽后区域的数据
            videoGroup[startGroup].children.splice(startChild, 1, endObj);
        }

    }
}

const onDrop = (event: any) => {
    if (event.target.className.indexOf('cls-default') > -1) {
        endIndex.value = event.target.getAttribute('data-id');
    } else {
        endIndex.value = event.target.parentElement.getAttribute('data-id');
    }
}

const onDragover = (event: any) => {
    event.preventDefault();
    let tempTargetEl = null;
    if (event.target.className.indexOf('cls-default') > -1) {
        tempTargetEl = event.target;
    } else {
        tempTargetEl = event.target.parentElement;
    }

    if (targetEl.value == tempTargetEl) {
        return;
    } else {
        document.querySelectorAll('.cls-default').forEach((item) => {
            item.classList.remove('video-hover');
        });
        targetEl.value = tempTargetEl;
    }

    tempTargetEl.classList.add('video-hover');
}

</script>

<style scoped>
.container {
    background-color: #eee;
    height: 800px;
}

.layout .layout-btn {
    background-color: #409eff;
    color: #fff;
    padding: 10px 15px;
    margin: 10px 15px;
}

.group {
    float: left;
    overflow: hidden;
    box-sizing: border-box;
}


.cls-default {
    float: left;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #999;
}

.cls-default .content {
    text-align: center;
    padding-top: 20px;
    font-size: 20px;
}

.top-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 8px;
    height: 400px;
    width: 90%;
    margin: 15px 5%;
}

.top-container .cls1-0 {
    grid-column: 1 / 13;
    grid-row: 1 / 7;
}

.top-container .cls2-0 {
    grid-column: 1 / 7;
    grid-row: 1 / 7;
}

.top-container .cls2-1 {
    grid-column: 7 / 13;
    grid-row: 1 / 7;
}

.top-container .cls3-0 {
    grid-column: 1 / 9;
    grid-row: 1 / 7;
}

.top-container .cls3-1 {
    grid-column: 9 / 13;
    grid-row: 1 / 4;
}

.top-container .cls3-2 {
    grid-column: 9 / 13;
    grid-row: 4 / 7;
}

.top-container .cls4-0 {
    grid-column: 1 / 7;
    grid-row: 1 / 4;
}

.top-container .cls4-1 {
    grid-column: 7 / 13;
    grid-row: 1 / 4;
}

.top-container .cls4-2 {
    grid-column: 1 / 7;
    grid-row: 4 / 7;
}

.top-container .cls4-3 {
    grid-column: 7 / 13;
    grid-row: 4 / 7;
}

.top-container .cls5-0 {
    grid-column: 1 / 4;
    grid-row: 1 / 4;
}

.top-container .cls5-1 {
    grid-column: 4 / 10;
    grid-row: 1 / 7;
}

.top-container .cls5-2 {
    grid-column: 10 / 13;
    grid-row: 1 / 4;
}

.top-container .cls5-3 {
    grid-column: 1 / 4;
    grid-row: 4 / 7;
}

.top-container .cls5-4 {
    grid-column: 10 / 13;
    grid-row: 4 / 7;
}

.top-container .cls6-0 {
    grid-column: 1 / 9;
    grid-row: 1 / 5;
}

.top-container .cls6-1 {
    grid-column: 9 / 13;
    grid-row: 1 / 3;
}

.top-container .cls6-2 {
    grid-column: 9 / 13;
    grid-row: 3 / 5;
}

.top-container .cls6-3 {
    grid-column: 1 / 5;
    grid-row: 5 / 7;
}

.top-container .cls6-4 {
    grid-column: 5 / 9;
    grid-row: 5 / 7;
}

.top-container .cls6-5 {
    grid-column: 9 / 13;
    grid-row: 5 / 7;
}

.cls9-0 {
    grid-column: 1 / 3;
    grid-row: 1 / 4;
}

.cls9-1 {
    grid-column: 3 / 5;
    grid-row: 1 / 4;
}

.cls9-2 {
    grid-column: 5 / 9;
    grid-row: 1 / 7;
}

.cls9-3 {
    grid-column: 9 / 11;
    grid-row: 1 / 4;
}

.cls9-4 {
    grid-column: 11 / 13;
    grid-row: 1 / 4;
}

.cls9-5 {
    grid-column: 1 / 3;
    grid-row: 4 / 7;
}

.cls9-6 {
    grid-column: 3 / 5;
    grid-row: 4 / 7;
}

.cls9-7 {
    grid-column: 9 / 11;
    grid-row: 4 / 7;
}

.cls9-8 {
    grid-column: 11 / 13;
    grid-row: 4 / 7;
}

.bottom-container {
    display: flex;
    width: 90%;
    height: 200px;
    margin: 15px 5%;
}

.bottom-container .cls-default {
    width: 15%;
    height: 150px;
}

.top-container .video-hover {
    border: 4px solid red;
}
</style>

