import { createContext,useContext,useState,useEffect } from "react";

const SubscriberContext = createContext();

export function useSubscriberContext(){
    return useContext(SubscriberContext);
}

function SubscriberProvider({children}){
    const [subscribers, setSubscribers] = useState([]);

    return(
        <SubscriberContext.Provider value={{subscribers,setSubscribers}}>
            {children}
        </SubscriberContext.Provider>
    );
}

export default SubscriberProvider;