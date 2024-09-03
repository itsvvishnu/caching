// After "time", the caching will be expired
const cachedAPICall = (time) => {
    const cache = {};
    return async (url,config) => {
        // check if already used
        const key = `${url}${JSON.stringify(config)}`;
        if(!cache[key] || Date.now() > cache[key].expiry){
            
        }
    }
}