import axios from 'axios'

interface getCredentials {

}

export async function useApiGet(method: string, getData: getCredentials, path: string) {
        
    try {

        const response = await axios.get(`${path}`)

        console.log('response inside useApi > ', response)

        return response.data

    } catch (error) {

        console.log('error inside useApi > ', error)

        return error

    }

}