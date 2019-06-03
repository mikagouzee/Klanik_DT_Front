//http://jasonwatmore.com/post/2018/07/06/vue-vuex-jwt-authentication-tutorial-example

export function authHeader(){
    let token =  localStorage.getItem('token');
    if(token!=null)
    {
        token = JSON.parse(token);
        var header = 'Bearer '+ token.access_token;
        // console.log("Parsed token : ",token);
        // console.log("token : ", JSON.parse(token));
        // console.log("token type ", JSON.parse(token).token_type);

        return header;
    }   
}