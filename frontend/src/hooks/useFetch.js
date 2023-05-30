import { useState } from "react"
import { useAuthValue } from "../context/AuthContext"

export const useFetch = () =>{

    const [dados, setDados] = useState()
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true)
    const {tokenUser} = useAuthValue()

    const runFetch = ({url, metodo, body})=>{

        let fetchParametros = {}


        if(metodo === 'POST'){
            fetchParametros = {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenUser
                },
                body: JSON.stringify(body)
            }  
        } else{
            fetchParametros = {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenUser
                }
        }}

        
        fetch('http://localhost:5000/api' + url, fetchParametros)
        .then(async(data)=>{
            if(data.ok){
                const json = await data.json()
             setDados(json)
            } else{
               const erro = await data.json()
               setError(erro.errors)
            }
        }).catch(e =>{
            const erroSistema = []
            if(!e.message.includes("email" || "senha")){
                erroSistema.push("Falha no sistema, tente novamente mais tarde")
            } else{
            erroSistema.push(e.message)
            }
            return setError(erroSistema)

        }).finally(setLoading(false))
    }

    return{
        runFetch,
        dados,
        error,
        loading

    }
}