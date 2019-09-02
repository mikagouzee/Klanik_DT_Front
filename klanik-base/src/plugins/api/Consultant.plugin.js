import client from "../../services/Klient";
import { authHeader } from "@/tools/auth-header";

export default {
  install(Vue, options) {
    Vue.prototype.$GetAllConsultant = async () => {
      client().defaults.headers.common["Authorization"] = authHeader();
      try {
        const res = await client().get("/konsultant/");
        return res.data;
      } catch (err) {
        return console.log("Error in Konsultants Service : ", err);
      }
    };
    Vue.prototype.$GetConsultantById = async guid => {
      return client()
        .get("/konsultant/" + guid, null, { headers: authHeader() })
        .then(res => res.data)
        .catch(err =>
          console.log("Error in Konsultants service get by id : ", err)
        );
    };
    Vue.prototype.$DeleteConsultant = async guid => {
      console.log(guid);
      return client()
        .delete(`/konsultant/${guid}`, {
          headers: {
            Authorization: authHeader()
          }
        })
        .then(res => res);
    };
  }
};
