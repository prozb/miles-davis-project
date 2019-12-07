// calculating full distance between first and last album in miliseconds
export const getFullDistance = (first, last) => {
    if(first && last){
        var date1 = new Date(getReleaseDateFromAlbum(first));
        var date2 = new Date(getReleaseDateFromAlbum(last));
        
        return Math.abs(date1.getTime() - date2.getTime());
    }
    return 0;
}
// extracting release date from album
export const getReleaseDateFromAlbum = (album) => {
    if(album){
     return album[Object.keys(album)[0]].released;
    }
    return '';
    
}
export const convertTimestampToYears = (timestamp) => {
    if(timestamp)
        return timestamp / (1000 * 60 * 60 * 24 * 365); 
    return 0;
}
// extracting release date from album
export const getDistanceBetweenAlbums = (album1, album2) => {
    
    return '';
}



