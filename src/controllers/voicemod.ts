import { Router } from "express";
import { Voicemod } from "../services/Voicemod";
import { Sammi } from "../services/Sammi";

const { computerIP, APIKey } = process.env;

const router = Router();

const voicemod = new Voicemod(computerIP as string, APIKey as string);
const sammi = new Sammi(computerIP as string);
voicemod.onMessageLog();

router.get("/getCurrentVoice/:sammiTrigger", (req, res) => {
  const { sammiTrigger: trigger } = req.params;

  voicemod.getCurrentVoice((response) => {
    sammi.postToWebhook({
      trigger,
      voice: response,
    });
  });

  res.status(201).send("Getting voice");
});

router.post("/setVoice", (req, res) => {
  const { voiceID } = req.body;

  console.log(voiceID);

  voicemod.setVoice(voiceID);

  res.status(201).send("Changing voice");
});

router.post("/toggleHearMyself", (req, res) => {
  voicemod.toggleHearMyself();

  res.status(201).send("Toggling hear myself");
});

router.post("/censor", (req, res) => {
  const { state } = req.body;

  voicemod.setBeepSound(state);

  res.status(201).send("Setting beep");
});

export default router;
