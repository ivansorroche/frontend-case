import axios from "axios";

export const listService = {

  
    getList: async function () {
        
            let url = "http://localhost:3000/list"
            const token = sessionStorage.getItem('authToken');

            console.log(token, 'token')
            const response = await axios.get(url, {
              headers: {
                token: `Bearer ${token}`,
              },
            });
            
            return response
    }
}