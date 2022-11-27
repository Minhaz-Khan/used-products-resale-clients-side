import { useEffect, useState } from 'react';

const useUserType = (email) => {
    const [userType, setUserType] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        email && fetch(`http://localhost:5000/users/type/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.userType)
                setUserType(data.userType)
                setIsLoading(false)
            })
    }, [email])
    return { userType, isLoading }
};

export default useUserType;