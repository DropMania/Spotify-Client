const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const Spotify = require('./spotify')
app.use(cors())
app.use(bodyParser.json())

app.get('/getall', async (req, res) => {
    let playbackState = await Spotify.getMyCurrentPlaybackState()
    let playlists = await Spotify.getUserPlaylists()
    let recommends = await Spotify.getMyTopTracks()
    res.send({
        playbackState: playbackState.body,
        playlists: playlists.body,
        recommends: recommends.body
    })
})
app.post('/getall', async (req, res) => {
    let playbackState = await Spotify.getMyCurrentPlaybackState()
    res.send({ playbackState: playbackState.body })
})
app.post('/toggle', async (req, res) => {
    let playbackState = await Spotify.getMyCurrentPlaybackState()
    let devices = await Spotify.getMyDevices()
    let msg = 'done'

    if (playbackState.body.is_playing) {
        await Spotify.pause().catch((e) => {
            msg = 'no device'
        })
    } else {
        await Spotify.play().catch((e) => {
            msg = 'no device'
        })
    }
    res.send({ msg })
})
app.post('/next', async (req, res) => {
    await Spotify.skipToNext()
    let msg = 'done'
    res.send({ msg })
})
app.post('/prev', async (req, res) => {
    await Spotify.skipToPrevious()
    let msg = 'done'
    res.send({ msg })
})
app.post('/addToPlaylist', async (req, res) => {
    let { pId, tURI } = req.body
    await Spotify.addTracksToPlaylist(pId, [tURI])
    let msg = 'done'
    res.send({ msg })
})
app.post('/playSong', async (req, res) => {
    let { uri } = req.body
    await Spotify.play({
        uris: [uri]
    })
    let msg = 'done'
    res.send({ msg })
})
app.listen(5000)
console.log('server on')
