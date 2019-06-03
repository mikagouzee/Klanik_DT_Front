export const dateFilter = function(stringDate){
    if(stringDate && stringDate.length > 0)
        return new Date(stringDate.substring(0,10)).toLocaleDateString();
}
