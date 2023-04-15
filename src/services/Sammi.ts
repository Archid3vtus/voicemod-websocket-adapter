import axios, { AxiosInstance } from "axios";

export class Sammi {
  axios: AxiosInstance;
  constructor(computerIP: string) {
    this.axios = axios.create({
      baseURL: `http://${computerIP}:9450`,
    });
  }

  async postToWebhook(data: Record<string, any>) {
    return await this.axios.post("/webhook", data);
  }
}
