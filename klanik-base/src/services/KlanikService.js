import client from './Klient';
import store from '../store/store';
import {authHeader} from '@/tools/auth-header';

export default{
    getAllKonsultants(){
        console.log("Service : Get All Konsultants");

        var myHeader = authHeader();

        client().defaults.headers.common['Authorization'] = authHeader();

        return client().get("/konsultant/")
            .then(res => res.data)
            .catch(err => console.log("Error in Konsultants Service : ", err));

    },
    getKonsultantById(id){
        console.log("Service : Get A Konsultant by Id");
        //console.log("Current user has role ", store.getters.currentUser.role);
        return client().get("/konsultant/"+id, {data:''}, {headers:authHeader()})
            .then(res => res.data)
            .catch(err => console.log("Error in Konsultants service get by id : ", err));
    },
    getCvAsPdf(id){
        console.log("Service : Get A Konsultant CV");
        return client().get("/pdfcreator/"+id)
            .then(res => res.data)
            .catch(err => console.log("Error in Konsultants service get a Konsultant CV : ", err));
    },
    async createKonsultant(konsultant){
        console.log("Trying to create a consultant");

        client().defaults.headers.common['Authorization'] = authHeader();

        //returns the id of the newly created Konsultant
        return await client().post('/konsultant/', konsultant)
            .then(res => res.data)
            .catch(err => console.log("Error in Konsultants service Create : ", err))
    },
    async updateKonsultant(konsultant){
        console.log("Trying to create a consultant");

        client().defaults.headers.common['Authorization'] = authHeader();

        //returns the id of the newly created Konsultant
        return await client().put('/konsultant/', konsultant)
            .then(res => res.data)
            .catch(err => console.log("Error in Konsultants service Create : ", err))
    }



}