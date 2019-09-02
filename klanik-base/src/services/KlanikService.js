import client from "./Klient";
import store from "../store/store";
import { authHeader } from "@/tools/auth-header";

export default {
  getAllKonsultants() {
    console.log("Service : Get All Konsultants");

    var myHeader = authHeader();
    
    client().defaults.headers.common["Authorization"] = authHeader();
   
    return client()
      .get("/konsultant/")
      .then(res => res.data)
      .catch(err => console.log("Error in Konsultants Service : ", err));
  },
  getKonsultantById(id) {
    console.log("Service : Get A Konsultant by Id");
    return client()
      .get("/konsultant/" + id, { data: "" }, { headers: authHeader() })
      .then(res => res.data)
      .catch(err =>
        console.log("Error in Konsultants service get by id : ", err)
      );
  },
  getCvAsPdf(id) {
    console.log("Service : Get A Konsultant CV");
    return client()
      .get("/pdfcreator/" + id)
      .then(res => res.data)
      .catch(err =>
        console.log("Error in Konsultants service get a Konsultant CV : ", err)
      );
  },
  getCvAsWord(id) {
    console.log(id);
    let wordKonsultant  = store.getters.selectedKonsultant;
    return client()
      .get("/Konsultant/Word/" + id, { responseType: "blob" })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${wordKonsultant.name}_${wordKonsultant.surname}.docx`); 
        document.body.appendChild(link);
        link.click();
      });
  },
  async createKonsultant(konsultant) {
    console.log("Trying to create a consultant");

    client().defaults.headers.common["Authorization"] = authHeader();

    //returns the id of the newly created Konsultant
    return await client()
      .post("/konsultant/", konsultant)
      .then(res => res.data)
      .catch(err => console.log("Error in Konsultants service Create : ", err));
  },
  async updateKonsultant(konsultant) {
    console.log("Trying to create a consultant");

    client().defaults.headers.common["Authorization"] = authHeader();

    //returns the id of the newly created Konsultant
    return await client()
      .put("/konsultant/", konsultant)
      .then(res => res.data)
      .catch(err => console.log("Error in Konsultants service Create : ", err));
  },
  
  async GetAllComp(){
    return await client().get('Comptences');
  },
  async GetAllCompStartingBy(query){
    console.log(query.length);
    query.length == 0 ? query = 'a' : query = query;
    return await client().get(`Comptences/${query}`)
  },
  async AddCompetences(comp){
    return await client().post('Comptences/',{comp});
  },
  async RemoveCompetence(comp){
    return await client().delete(`Comptences/${comp.Id}`)
  },
  async GetAllBu(){
    return await client().get("Bu/");
  },
  async AddBu(bu){
    return await client().post(`Bu/`,bu);
  },
  async RemoveBu(bu){
    return await client().delete(`Bu/${bu.id}`)
  },
  async GetAllCountries(){
    return await client().get(`country/`)
  }
};
