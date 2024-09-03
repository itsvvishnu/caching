import fetch from 'node-fetch';
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
            try {
                const response = await fetch(url,config)
                const json = await response.json();
                if(json){
                    cache[key] = {};
                    cache[key]["response"] = json;
                    cache[key]["expiry"] = Date.now() + time;
                    return json;
                }
                console.log("Making a fresh API call...", json);
            }
            catch(err) {
                console.log(err)
            }
        }
        console.log("Returning from cache...", cache[key].response);
        return cache[key].response;
    }
}

const api = cachedAPICall(1000);
const res1 = api("https://jsonplaceholder.typicode.com/todos/1",{});
setTimeout( () => {
    const res1 = api("https://jsonplaceholder.typicode.com/todos/1",{});
},400);