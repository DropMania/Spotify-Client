<template>
    <v-app style="height: 100vh;overflow:hidden">
        <v-container style="height: 100vh" v-if="store.loaded">
            <v-row style="height: 98vh">
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

            let checkInterval = setInterval(()=>{
                if(window.spotifyLoaded){
                    const player = new window.Spotify.Player({
                        name: 'DropMania Web Client', 
                        getOAuthToken: async (cb) => { 
                            let tokenRes = await fetch('http://pi/spotify/access_token')
                            let token = await tokenRes.json()
                            cb(token.at)
                        }
                    })
                    player.addListener('ready', ({ device_id }) => {
                        window.device_id = device_id
                    })
                    player.connect()
                    clearInterval(checkInterval)
                }
            },100)
            
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
body {
    height: 100vh;
}
*::-webkit-scrollbar {
    display: none;
}
</style>
