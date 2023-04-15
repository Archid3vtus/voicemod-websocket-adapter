import WebSocket, { Event } from "ws";

export class Voicemod extends WebSocket {
  APIKey: string;

  constructor(ip: string, APIKey: string) {
    super(`ws://${ip}:59129/v1/`);
    this.APIKey = APIKey;

    super.addEventListener("open", (event) => this.registerClient());
  }

  private registerClient() {
    super.send(
      JSON.stringify({
        id: "",
        action: "registerClient",
        payload: {
          clientKey: this.APIKey,
        },
      })
    );
  }

  private sendJSON(data: Record<string, any>) {
    super.send(JSON.stringify(data));
  }

  onMessageLog() {
    super.on("message", (event) => {
      console.log(event.toString());
    });
  }

  getVoices(callback: (getVoicesResponse: any) => any) {
    this.sendJSON({
      action: "getVoices",
      id: "",
      payload: {},
    });

    super.once("message", (event) => {
      const { actionType, actionObject } = JSON.parse(event.toString());

      if (actionType === "getVoices") {
        callback(actionObject);
      }
    });
  }

  getCurrentVoice(callback: (getCurrentVoiceResponse: any) => any) {
    this.sendJSON({
      action: "getCurrentVoice",
      id: "",
      payload: {},
    });

    super.once("message", (event) => {
      const { actionType, actionObject } = JSON.parse(event.toString());

      if (actionType === "getCurrentVoice") {
        callback(actionObject.voiceID);
      }
    });
  }

  setVoice(voiceID: string) {
    this.sendJSON({
      action: "loadVoice",
      id: "",
      payload: {
        voiceID,
      },
    });
  }

  toggleHearMyself() {
    this.sendJSON({
      action: "toggleHearMyVoice",
      id: "",
      payload: {},
    });
  }

  setBeepSound(state: number) {
    this.sendJSON({
      action: "setBeepSound",
      id: "",
      payload: {
        badLanguage: state,
      },
    });
  }
}
