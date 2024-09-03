type CacheType = {
    key?:string
}
// After "time", the caching will be expired
const cachedAPICall = (time) => {
    const cache: CacheType = {};
    return async (url,config) => {
        // check if already used
        const key = `${url}${JSON.stringify(config)}`;
        if(!cache[key] || Date.now() > cache[key].expiry){
            console.log("Making a fresh API call...")
            try {
                const response = await fetch(url,config)
                if(response){
                    cache[key].response = response;
                    cache[key].expiry = Date.now() + time;
                }
            }
            catch(err) {
                console.log(err)
            }
        }
        return cache[key].response;
    }
}

const api = cachedAPICall(1000);
const res1 = api("https://dummy.restapiexample.com/api/v1/employees",{});
setTimeout( () => {
    const res1 = api("https://dummy.restapiexample.com/api/v1/employees",{});
},400);