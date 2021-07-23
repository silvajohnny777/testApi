import React, { useState, useEffect, useContext } from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useApiGet } from '../hooks/useApi';
import Tippy from '@tippyjs/react';
import ImagesContext from '../context/ImagesContext';

declare module 'axios' {
    export interface AxiosRequestConfig {
      handlerEnabled: boolean;
    }
  }

interface ImagesProps {

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

const Images: React.FC<ImagesProps & RouteComponentProps> = (props) => {

    const { GetData, images, filter } = useContext(ImagesContext)

    const [ loading, setLoading ] = useState<boolean>(false)

    const [ loadingNewResults, setLoadingNewResults ] = useState<boolean>(false)

    const [ page, setPage ] = useState<number>(1)

    useEffect(() => {

        const GetInfo = async () => {

            setLoading(true)
    
            const response = await GetData()
      
            setLoadingNewResults(false)
    
            setLoading(false)

        }

        GetInfo()

    }, [])
    
    useEffect(() => {

        const onScroll = async () => {

            const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    
            const height = document.documentElement.clientHeight - document.documentElement.scrollHeight
    
            const scrolled = winScroll / height

            if(scrolled < -0.9 && !loadingNewResults) {
                
                if(!loadingNewResults && !filter) {
                
                    setLoadingNewResults(true)
        
                    const response = await GetData()
                
                    setLoadingNewResults(false)

                }

            }

        }

        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);

    }, [loadingNewResults]);

    const loader = <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" width="200" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve"> <path fill="#542e91" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /> </path> </svg>
        
    return (

        <div className="section is-paddingless">

            <div className="container imagesContainer is-flex is-flex-wrap-wrap">

                {
                
                    loading ? 
                    
                        <div className="block is-full-width is-flex is-flex-direction-column is-align-items-center is-justify-content-center">

                            {loader}

                            <p className="title loaderTitle">Getting images...</p>

                        </div>

                    :
                
                        images.map((image: imageTypes) => {

                            return (

                                filter ?

                                    image.title.toLowerCase().indexOf(filter.toLowerCase()) > -1 &&

                                        <div key={image.id} className="box imageCard">

                                            <figure className="image is-16by10">

                                                <img alt="cardImage" src={`http://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} />

                                            </figure>

                                            <p className="title mb-2 is-4 is-flex mt-4 is-justify-content-flex-start">

                                                <Tippy animation={'scale'} className={`${image.title ? '' : 'is-hidden'}`} content={`${image.title}`}>
                                                
                                                    <a className="imageName mr-2" href={`https://www.flickr.com/photos/${image.owner}/${image.id}`} target="_blank" rel="noreferrer">
                                                        
                                                        {image.title ? image.title : 'undefined'}
                                                        
                                                    </a> 

                                                </Tippy>
                                                
                                                by 

                                                <Tippy animation={'scale'} content={`Visit author profile`}>

                                                    <a className="pl-2" href={`https://www.flickr.com/photos/${image.owner}`} target="_blank" rel="noreferrer">
                                                        
                                                        author
                                                        
                                                    </a>

                                                </Tippy>
                                                
                                            </p>

                                            <p className="mt-2 description has-text-justified">

                                                Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                            </p>
                                            
                                            <p className="mt-2 is-flex">
                                                tags:
                                                <div className="tags ml-2">
                                                    <span className="tag">Tag1</span>
                                                    <span className="tag">Tag2</span>
                                                    <span className="tag">Tag3</span>
                                                </div>
                                            </p>

                                        </div>

                                :

                                    <div key={image.id} className="box imageCard">

                                        <figure className="image is-16by10">

                                            <img alt="cardImage" src={`http://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} />

                                        </figure>

                                        <p className="title mb-2 is-4 is-flex mt-4 is-justify-content-flex-start">

                                            <Tippy animation={'scale'} className={`${image.title ? '' : 'is-hidden'}`} content={`${image.title}`}>
                                            
                                                <a className="imageName mr-2" href={`https://www.flickr.com/photos/${image.owner}/${image.id}`} target="_blank" rel="noreferrer">
                                                    
                                                    {image.title ? image.title : 'undefined'}
                                                    
                                                </a> 

                                            </Tippy>
                                            
                                            by 

                                            <Tippy animation={'scale'} content={`Visit author profile`}>

                                                <a className="pl-2" href={`https://www.flickr.com/photos/${image.owner}`} target="_blank" rel="noreferrer">
                                                    
                                                    author
                                                    
                                                </a>

                                            </Tippy>
                                            
                                        </p>

                                        <p className="mt-2 description has-text-justified">

                                            Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                        </p>
                                        
                                        <p className="mt-2 is-flex">
                                            tags:
                                            <div className="tags ml-2">
                                                <span className="tag">Tag1</span>
                                                <span className="tag">Tag2</span>
                                                <span className="tag">Tag3</span>
                                            </div>
                                        </p>

                                    </div>

                            )

                        })
                
                }

            </div>

            {

                loadingNewResults && 
                
                    <div className="block is-full-width is-flex is-justify-content-center">
                        
                        {loader}

                    </div>

            }

        </div>

    )
    
}

export default withRouter(Images);