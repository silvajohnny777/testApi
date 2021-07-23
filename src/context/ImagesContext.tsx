import React, { useState } from 'react'
import { useApiGet } from '../hooks/useApi';

export interface ImagesContextData {
    GetData: Function
    images: imageTypes[]
    setFilter: Function
    filter: string
}

interface imageTypes {
    farm: number
    id: string
    isfamily: number
    isfriend: number
    ispublic: number
    owner: string
    secret: string
    server: string
    title: string
}

const ImagesContext = React.createContext<ImagesContextData>({} as ImagesContextData);

export const ImagesContextProvider: React.FC = ({children}) => {

    const [ page, setPage ] = useState<number>(1)

    const [ images, setImages ] = useState<imageTypes[]>([])

    const [ filter, setFilter ] = useState<string>('')

    const GetData = async () => {

        const method = 'GET'

        const postData = {
            
        }        

        const path = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=3a0bb44858f7dcb161977b803f7651e0&format=json&nojsoncallback=1&per_page=12&page=${page}`

        //const path = `https://api.flickr.com/services/feeds/photos_public.gne?format=json`

        const response = await useApiGet(method, postData, path)

        response && response.photos && response.photos.photo && images.length > 0 ? setImages([...images, ...response.photos.photo]) : setImages(response.photos.photo)

        setPage(page+1)

        return response

    }
    
    return (

        <ImagesContext.Provider value={{
            GetData,
            images,
            setFilter,
            filter
        }}>

            {children}

        </ImagesContext.Provider>

    )

}

export default ImagesContext;