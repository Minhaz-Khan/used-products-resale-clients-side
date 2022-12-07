import { useEffect, useState } from "react"

const useToken = email => {
    const [token, setToken] = useState();
    useEffect(() => {
        email && fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                    setToken(data.accessToken)
                }
            })
    }, [email])
    return token;
}

export default useToken;