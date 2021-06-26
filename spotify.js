const SpotifyWebApi = require('spotify-web-api-node')
const Spotify = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN
})

refreshToken()
setInterval(async () => {
    await refreshToken()
}, 3500000)

async function refreshToken() {
    let refreshTokenResult = await Spotify.refreshAccessToken()
    Spotify.setAccessToken(refreshTokenResult.body.access_token)
}

module.exports = Spotify
