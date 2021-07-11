import store from './store'

export default async (endpoint, data = {}) => {
    let API_URL = 'http://pi/spotify'
    if (endpoint == 'refresh') {
        let allRes = await fetch(`${API_URL}/getall`)
        let all = await allRes.json()
        store.spotify = all
        return all
    } else if (endpoint == 'currentlyCool') {
        let ccRes = await fetch(`${API_URL}/currentlyCool`)
        let cc = await ccRes.json()
        return cc
    } else {
        let response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        let allRes = await fetch(`${API_URL}/getall`)
        let all = await allRes.json()
        store.spotify = all
        return response.json()
    }
}
