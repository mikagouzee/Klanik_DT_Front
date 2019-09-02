import client from "../../services/Klient";

import { authHeader } from "@/tools/auth-header";

export default {
  install(Vue, options) {
    Vue.prototype.$getOwnedKonsultant = id => {
      return client().get(`/recruiter/Portfolio/${id}`);
    };
    Vue.prototype.$UpdateRecruiterPortfolio = recruiter => {
      client().defaults.headers.common["Authorization"] = authHeader();
      return client()
        .post("/recruiter/UpdatePortfolio", recruiter)
        .then(res => res.data)
        .catch(err => console.log(err));
    };
  }
};
