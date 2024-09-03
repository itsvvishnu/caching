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
                if(response){
                    cache[key].expiry
                }
            }
            catch {

            }
        }
        return cache.response;
    }
}