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
    //console.log("Current user has role ", store.getters.currentUser.role);
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
    return client()
      .get("/Konsultant/Word/" + id, { responseType: "blob" })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${id}.docx`); //or any other extension
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
  async getOwnedKonsultant(id){
    return await client().get(`/recruiter/Portfolio/${id}`);
  },
  async UpdateRecruiterPortfolio(recruiter) {
    //console.log(`Adding ${konsultant} to ${recruiter}`);

    client().defaults.headers.common["Authorization"] = authHeader();

    return await client()
      .post("/recruiter/UpdatePortfolio", recruiter)
      .then(res => res.data)
      .catch(err => console.log(err));
  },
};
