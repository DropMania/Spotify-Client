<template>
    <v-sheet
        color="grey-darken-4"
        class="pa-2"
        height="100%"
        elevation="4"
        rounded
    >
        <v-row height="50%">
            <v-col height="100%">
                <v-card height="100%" width="100%">
                    <v-img
                        width="100%"
                        cover
                        height="100%"
                        :aspect-ratio="16 / 9"
                        v-if="store.spotify.playbackState.item"
                        :src="
                            store.spotify.playbackState.item.album.images[0].url
                        "
                        style="border-radius: 5px"
                    >
                        <v-sheet
                            style="backdrop-filter: blur(4px) brightness(0.5)"
                            height="100%"
                            width="100%"
                            color="transparent"
                            rounded
                        >
                            <v-card-title>
                                {{ store.spotify.playbackState.item.name }}
                            </v-card-title>
                            <v-card-subtitle>
                                <span
                                    v-for="(artist, idx) in store.spotify
                                        .playbackState.item.artists"
                                    :key="artist.id"
                                >
                                    {{ artist.name
                                    }}{{
                                        store.spotify.playbackState.item.artists
                                            .length -
                                            1 >
                                        idx
                                            ? ','
                                            : ''
                                    }}
                                    &nbsp;
                                </span>
                            </v-card-subtitle>
                            <v-img
                                width="300"
                                height="300"
                                v-if="store.spotify.playbackState.item"
                                :src="
                                    store.spotify.playbackState.item.album
                                        .images[0].url
                                "
                                lazy-src="https://logospng.org/download/spotify/logo-spotify-icon-4096.png"
                            />
                            <v-card-text style="gap:10px">
                                <v-btn
                                    @click="prev"
                                    icon="mdi-skip-previous-circle"
                                    color="grey-darken-3"
                                />
                                <v-btn
                                    @click="toggle"
                                    :icon="
                                        store.spotify.playbackState.is_playing
                                            ? 'mdi-pause-circle'
                                            : 'mdi-play-circle'
                                    "
                                    color="green-darken-3"
                                />
                                <v-btn
                                    @click="next"
                                    icon="mdi-skip-next-circle"
                                    color="grey-darken-3"
                                />
                            </v-card-text>
                        </v-sheet>
                    </v-img>
                    <v-sheet
                        rounded
                        v-if="
                            !store.spotify.playbackState.hasOwnProperty(
                                'is_playing'
                            )
                        "
                        width="100%"
                        height="100%"
                    >
                        <v-img
                            width="100%"
                            height="100%"
                            :aspect-ratio="16 / 9"
                            v-if="
                                !store.spotify.playbackState.hasOwnProperty(
                                    'is_playing'
                                )
                            "
                            src="https://logospng.org/download/spotify/logo-spotify-icon-4096.png"
                        >
                            <v-sheet
                                color="red-darken-3"
                                rounded
                                bottom
                                absolute
                                width="100%"
                            >
                                No Active Device Found
                            </v-sheet>
                        </v-img>
                    </v-sheet>
                </v-card>
            </v-col>
        </v-row>
        <v-row height="50%">
            <v-col height="100%">
                <v-card height="100%" width="100%" color="black">
                    <v-card-title>
                        Add Track To Playlist!
                    </v-card-title>
                    <v-card-subtitle>
                        Playlists:
                    </v-card-subtitle>
                    <v-card-text>
                        <v-row
                            v-for="playlist in store.spotify.playlists.items"
                            :key="playlist.id"
                        >
                            <v-col
                                cols="12"
                                align="center"
                                v-if="playlist.owner.id == 'dropmaniamusic'"
                            >
                                <v-divider style="margin-bottom: 10px" />
                                <v-btn
                                    color="green-darken-3"
                                    @click="addToPlaylist(playlist.id)"
                                >
                                    {{ playlist.name }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col height="100%">
                <v-card height="100%" width="100%" color="black">
                    <v-card-title>
                        My favourite Tracks!
                    </v-card-title>
                    <v-card-subtitle>
                        Tracks:
                    </v-card-subtitle>
                    <v-card-text>
                        <v-row
                            v-for="track in store.spotify.recommends.items"
                            :key="track.id"
                        >
                            <v-col cols="12" align="center">
                                <v-card
                                    color="grey-darken-3"
                                    :style="{
                                        background: `url(${track.album.images[1].url})`,
                                        backgroundSize: 'cover',
                                        padding: '5px',
                                        backgroundPositionY: 'center'
                                    }"
                                >
                                    <v-btn
                                        @click="playSong(track.uri)"
                                        icon="mdi-play-circle"
                                        color="green-darken-3"
                                    />
                                    {{ track.name }}
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
import callServer from '../callServer'
import store from '../store'
export default {
    setup() {
        function toggle() {
            callServer('toggle')
        }
        function next() {
            callServer('next')
        }
        function prev() {
            callServer('prev')
        }
        function addToPlaylist(pId) {
            callServer('addToPlaylist', {
                pId,
                tURI: store.spotify.playbackState.item.uri
            })
        }
        function playSong(uri) {
            callServer('playSong', { uri })
        }
        return { toggle, store, next, prev, addToPlaylist, playSong }
    }
}
</script>

<style></style>
