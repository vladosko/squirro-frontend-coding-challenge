import axios from "axios";
import { Store } from "../models/store.model";
import { WebApi } from "../models/web-api.model";
import { normalize } from "../utils/normalize.util";

const getAll = (): Promise<Store[]> => {
  return axios
    .get<WebApi.PackedJson<WebApi.Data<any>, WebApi.Included>>("/api/stores", {
      headers: { "Content-Type": "application/vnd.api+json" },
    })
    .then((res) => normalize(res.data))
    .then((data) => data.stores || [])
    .catch((err) => err);
};

const update = (store: WebApi.Store): Promise<Response> => {
  return axios
    .patch(
      `/api/stores/${store.id}`,
      { data: store },
      { headers: { "Content-Type": "application/vnd.api+json" } }
    )
    .catch((err) => err);
};

export const StoresApiService = {
  getAll,
  update,
};
