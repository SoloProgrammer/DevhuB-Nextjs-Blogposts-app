import axios from 'axios'
import { api } from './api'

export const getCategories = async () => {
    return new Promise(async (res, rej) => {
        try {
            const { data } = await axios.get(api.getCategories())
            res(data.categories)

        } catch (error) {
            console.log("Error while fetching categories", error)
            rej({ error: error.response.data.message })
        }
    })
}