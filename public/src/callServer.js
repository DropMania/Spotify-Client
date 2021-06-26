import store from './store'

export default async (endpoint, data = {}) => {
    let API_URL = 'http://192.168.2.104:5000'
    if (endpoint != 'refresh') {
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
    } else {
        let allRes = await fetch(`${API_URL}/getall`)
        let all = await allRes.json()
        store.spotify = all
        return all
    }
}
