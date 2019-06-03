import authenticationService from '@/services/AuthenticationService';

export function handleResponse(response) {
        // console.log("Handling :", response);

        if(!response.statusText == "OK"){
            console.log("Status text not OK");
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                location.reload(true);
            }

            const error = (response && response.message) || response.statusText;
            return Promise.reject(error);
        }

        console.log("Status text :", response.statusText);
        // console.log("Passing response data : ", response.data);
        return response.data;        
    }
