<template>
    <v-app full-height>
        <v-container style="height: 100%" v-if="store.loaded">
            <v-row style="height: 100%">
                <v-col cols="6" align="center">
                    <play-section />
                </v-col>
                <v-col cols="6" align="center">
                    <search-section />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import PlaySection from './components/PlaySection.vue'
import SearchSection from './components/SearchSection.vue'
import store from './store'
import callServer from './callServer'
import { onMounted } from 'vue'
export default {
    components: {
        PlaySection,
        SearchSection
    },
    setup() {
        onMounted(async () => {
            await callServer('getall')

            setInterval(async () => {
                await callServer('refresh')
            }, 5000)
            store.loaded = true
        })

        return {
            store
        }
    }
}
</script>
<style lang="scss">
html {
    overflow-y: hidden;
}
</style>
