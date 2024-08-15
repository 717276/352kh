import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export const HTTP_STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SC_GONE: 410,
    INTERNAL_SERVER_ERROR: 500,
};
export const AuthContext = createContext();
export const DataContext = createContext();

export const AuthProvider = ({ children }) => {

    const baseURI = 'http://localhost:8080';
    const location = useLocation();
    const navigator = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {         
        const sync = async()=>{
            await sendAccess();
        };
        sync();
        window.scrollTo({top:0});
    }, [location.pathname]);

    async function setAccessToken (response){        
        const accessToken = response.headers.get('authorization');        
        localStorage.setItem('accessToken', accessToken);
    }

    async function sendAccess() {
        const accessToken = localStorage.getItem('accessToken');
        const path = location.pathname;
        if (path !== '/' && !path.startsWith('/register') && !path.startsWith('/shop')){                        
            const uriResult = await sendUri(accessToken);
            if (uriResult === HTTP_STATUS.SC_GONE){
                sendRefresh();
            }            
        }                
    }    
    async function sendUri(accessToken){        
        if (accessToken === null){            
            return HTTP_STATUS.SC_GONE;
        }
        const response = await fetch(baseURI + location.pathname,{
            method:"GET",
            headers:{'Authorization' : `${accessToken}`},
            credentials:'include'
        })
        //저장 
        if (response.status === HTTP_STATUS.OK){        
            setAccessToken(response);    
            setIsAuthorized(true);
            console.log("토큰저장");            
            return HTTP_STATUS.OK; 
        //토큰 만료
        } else if (response.status === HTTP_STATUS.SC_GONE){
            return HTTP_STATUS.SC_GONE;
        //인증        
        } else if (response.status === HTTP_STATUS.UNAUTHORIZED) {
            alert("로그인 실패");
            window.location.reload();
            return HTTP_STATUS.UNAUTHORIZED;
        //인가
        } else if (response.status === HTTP_STATUS.FORBIDDEN){
            alert("접근 권한 없음");
            navigator(-1);
            return HTTP_STATUS.FORBIDDEN;
        } else if (response.status === HTTP_STATUS.NOT_FOUND){
            alert("페이지를 찾을 수 없음");
            navigator(-1);
            return HTTP_STATUS.NOT_FOUND;
        }
    }
    
    async function sendRefresh() {
        try {
            const response = await fetch(baseURI + '/reissue', {
                method: 'POST',
                credentials: 'include',
            });
            console.log("refresh response status : " , response.status);
            if (response.ok) {
                setAccessToken(response);        
                sendAccess();                
            } else{                
                localStorage.removeItem('accessToken');
                document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";              
            }
        } catch (error) {
            console.error('Error while refreshing token:', error);
            return null;
        }        
    }            
    const logoutHandler = async () =>{
        const response = await fetch(baseURI + "/test",{
            method:"POST",
            credentials:'include'  
        }).catch((error)=>console.log(error));
        console.log(response.status);
        if (response.status === HTTP_STATUS.OK){
            localStorage.removeItem('accessToken');
            setIsAuthorized(false);
            alert("로그아웃");
        }else{
            console.log("로그아웃 실패");
        }        
        navigator('/');
    }        
    return (
        <AuthContext.Provider value={[ isAuthorized, setIsAuthorized, logoutHandler]}>
            {children}
        </AuthContext.Provider>
    );
};

export const DataProvider = ({ children }) => {
    const [uri, setUri] = useState('');
    const [data, setData] = useState();
    useEffect(()=>{
        const getData = async()=>{
            if (!uri) return;
            const response = await fetch(uri,{
                credentials:'include'
            })
            if (response.status === HTTP_STATUS.OK){
                const jsonData = await response.json();
                setData(jsonData);
            }else{
                console.log("Get data error");
            }   
        }
        getData();
    },[uri])
    return (
        <DataContext.Provider value={{ uri, setUri , data, setData}}>
            {children}
        </DataContext.Provider>
    );
};
