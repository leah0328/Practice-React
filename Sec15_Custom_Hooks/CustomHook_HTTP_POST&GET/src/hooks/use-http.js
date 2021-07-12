import {useState, useCallback} from 'react';

const useHttp = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestConfig.url, {
            method: requestConfig.method? requestConfig.method: 'GET',
            headers: requestConfig.headers? requestConfig.headers: {},
            body: requestConfig.body? JSON.stringify(requestConfig.body) : null,
          }
        );
        // line 12: requestConfig.url : to make sure we passed in an object that has an URL property
        // since the sendRequest should be reusable for POST logic,
        // 'fetch' should take a s2nd arguments, 
        // which is to peform JSON transform with the data we passed from the URL
        
        // line 16-18: '? :' 
        // is to ensure the the function is flexible enough to NOT forced any component to take uneccessary dummy data 
        // hence, unless requestConfig.method is setted, return empty value to the respective field

        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json(); // transform the response (refer to line 11-15)
        applyData(data);
        // 'data' refers to all the data we fetch(get/post) from the url
        // with applyData, the component (uses the useHttps hook) can tailor the data
        
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },[]);

    return {
        isLoading,
        error,
        sendRequest    
        // these 3 return values should be further tailored in the component that uses 'useHttp' hook, 
        // hence the return (so the file can have access)

        // modern JavaScript shortcut for: 
        
        // 'isLoading: isLoading(isLoading 'state') from line 4', 
        // 'error: error (the error 'state')'from line 5, 
        
        // 'sendRequest: sendRequest(the const)from line 7'
        //  (property's name ): (variable's name)
    };
};

export default useHttp;

// useHttp USED TO consists of 2 parameter
    // requestConfig :  the respective URLs to fetch(get/post) the data
    // applyData : the transformed data (line16-18), so the data can be accessed and tailored by the component
// but to avoid the infinite loop & denpendencies issues, 
// we use useCallback() & passed the two parameter to sendRequest() intstead, so there'll be no eternal dependencies