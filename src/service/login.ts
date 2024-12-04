import axios from "axios";

export const loginService = {

  
    login: async function (payload: object) {
        
            let url = "http://localhost:3000/auth"


            const response = await axios.post(
                url,
                payload ,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
            
            return response
    }
}