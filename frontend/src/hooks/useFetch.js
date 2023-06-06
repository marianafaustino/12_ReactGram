import { useState } from "react"
import { useAuthValue } from "../context/AuthContext"

export const useFetch = () =>{
    const [loading, setLoading] = useState(true)
    const {tokenUser} = useAuthValue()
    

    const runFetch = ({url, metodo, body,formData, onSucess, onError})=>{

        let fetchParametros = {}


        if(metodo === 'POST'){
            fetchParametros = {
                method: metodo,
                headers: {
                    'Content-Type':  body ? 'application/json' : '',
                    'Authorization': 'Bearer ' + tokenUser
                },
                body: body ? JSON.stringify(body) : formData 
            }  
        }else{
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
                onSucess(json)
            } else{
               const erro = await data.json()
               onError(erro.errors)
            }
        }).catch(e =>{
            const erroSistema = []
            if(!e.message.includes("email" || "senha")){
                erroSistema.push("Falha no sistema, tente novamente mais tarde")
            } else{
            erroSistema.push(e.message)
            }
             onError(erroSistema)

        }).finally(setLoading(false))
    }

    return{
        runFetch,
        loading

    }
}