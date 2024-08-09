import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export const HTTP_STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
export const AuthContext = createContext();
export const DataContext = createContext();

export const AuthProvider = ({ children }) => {
    const baseURI = 'http://localhost:8080';
    const location = useLocation();
    const navigator = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    async function setAccessToken (response){
        const accessToken = response.headers.get('authorization');        
        console.log("set access token : " + accessToken);
        localStorage.setItem('accessToken', accessToken);
    }

    async function sendAccess() {
        const accessToken = localStorage.getItem('accessToken');
        console.log("send access token: " + accessToken);
        if (location.pathname !== '/'){
            if (accessToken === null || accessToken === 'null'){
                sendRefresh();
            }else {
                const response = await fetch(baseURI + location.pathname, {
                    method: 'GET',
                    headers: {
                        'authorization': accessToken,
                    },
                    credentials: 'include'
                })
                if (response.status === HTTP_STATUS.OK){                
                    console.log("access response status 200 : " + accessToken);
                    setIsAuthorized(true);
                } else if (response.status === HTTP_STATUS.UNAUTHORIZED){
                    console.log("access response status 401");
                    sendRefresh();
                } else if (response.status === HTTP_STATUS.FORBIDDEN){
                    navigator('/');
                    alert("접근 권한 없음");
                } else{
                    alert("access Error : " + response.status);
                }
            }
        }
    }

    async function sendRefresh() {
        try {
            const response = await fetch(baseURI + '/reissue', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {        
                console.log("refersh response status 200");
                setAccessToken(response);        
                sendAccess();                
            } else{
                console.log("refersh response status is not 200 => " + response.status);

                localStorage.removeItem('accessToken');
                document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";                
                navigator('/login');         
            }
        } catch (error) {
            console.error('Error while refreshing token:', error);
            return null;
        }        
    }

    useEffect(() => {
        sendAccess(); // URL 경로가 변경될 때마다 호출
    }, [location.pathname]);
    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
        </AuthContext.Provider>
    );
};
export const DataProvider = ({ children }) => {
    const [uri, setUri] = useState('');

    return (
        <DataContext.Provider value={{ uri, setUri }}>
            {children}
        </DataContext.Provider>
    );
};
