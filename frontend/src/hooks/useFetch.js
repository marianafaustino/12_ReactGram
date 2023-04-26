import { useState } from "react"

export const useFetch = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const [error, setError] = useState()
  

    const runFetch = ({ url, method, body })=> {
        const fethParams = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        if (method === 'POST') {
            fethParams.body = JSON.stringify(body)
        }
        fetch('http://localhost:5000/api' + url, fethParams)
        .then(async (data) => {
            const response = await data.json()
            if (response?.errors?.length) {
                setError(response.errors)
            } else {
                setData(response)
            }
           
            return response
        })
        .catch(e => setError(e))
        .finally(()=> setIsLoading(false))
    }

    

        return {
            isLoading,
            data,
            error,
            runFetch
        }
}