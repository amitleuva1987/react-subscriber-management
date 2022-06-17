import { createContext,useContext,useState } from "react";
import http from '../http-common'

const SubscriberContext = createContext();

export function useSubscriberContext(){
    return useContext(SubscriberContext);
}

function SubscriberProvider({children}){
    const [subscribers, setSubscribers] = useState([]);

    const getAllSubscribers = () => {
        http.get('subscribers').then(response => {
            setSubscribers(response.data.data);
        }).catch(error => {
           console.log(error);
        });
    }

    const deleteSubscriber = (id) => {
        return http.delete('subscribers/'+id).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    const refreshSubscribers = () => {
        http.get('subscribers').then(response => {
               setSubscribers(response.data.data);
            }).catch(error => {
               console.log(error);
        });
    }

    const addSubscriber = (data) => {
        return http.post('subscribers',data).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    const getaSubscriber = (id) => {
        return http.get('subscribers/'+id).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    const updateSubscriber = (id,data) => {
        return http.put('subscribers/'+id,data).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    return(
        <SubscriberContext.Provider value={{subscribers,setSubscribers,getAllSubscribers,deleteSubscriber,refreshSubscribers,addSubscriber,getaSubscriber,updateSubscriber}}>
            {children}
        </SubscriberContext.Provider>
    );
}

export default SubscriberProvider;