// After "time", the caching will be expired
type CacheType = {
    response: any;
    expirt: Date
}
const cachedAPICall = (time) => {
    const cache: CacheType = {};
    return async (url,config) => {
        // check if already used
        const key = `${url}${JSON.stringify(config)}`;
        if(!cache[key] || Date.now() > cache[key].expiry){

        }
        return cache.response;
    }
}