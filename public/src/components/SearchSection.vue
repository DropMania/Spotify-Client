<template>
    <v-sheet
        color="grey-darken-4"
        class="pa-2"
        height="100vh"
        elevation="4"
        style="overflow: auto"
        rounded
    >
        <div class="text-h4 mb-4">Currently Cool:</div>
        <v-card v-for="[id, song] in cc" :key="id" color="grey-darken-3 mb-2">
            <v-card-title>
                <v-sheet
                    :style="{
                        background: `url(${song.track.album.images[1].url})`,
                        backgroundSize: 'cover'
                    }"
                    class="pa-7 ma-3"
                    rounded
                >
                    <v-btn
                        @click="playSong(song.track.uri)"
                        icon="mdi-play-circle"
                        color="green-darken-3"
                    />
                </v-sheet>
                {{ song.track.name }}
            </v-card-title>
            <v-card-text align="left">
                listen time: {{ song.listenTime_formatted }} <br />
                last heared: {{ song.lastListening_formatted }}
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script>
import callServer from '../callServer'
import { onMounted, ref } from 'vue'
export default {
    setup() {
        let cc = ref([])
        onMounted(() => {
            loadCC()
            setInterval(() => {
                loadCC()
            }, 30000)
        })
        async function loadCC() {
            let ccData = await callServer('currentlyCool')
            ccData.sort(([, { listenTime: a }], [, { listenTime: b }]) => b - a)
            cc.value = ccData
        }
        function playSong(uri) {
            callServer('playSong', { uri, device: window.device_id })
        }
        return {
            cc,
            playSong
        }
    }
}
</script>

<style></style>
