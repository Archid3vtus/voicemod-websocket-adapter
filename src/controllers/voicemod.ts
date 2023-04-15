import { Router } from "express";
import { Voicemod } from "../services/Voicemod";
import { Sammi } from "../services/Sammi";
import { readAndSetEnvironmentFile } from "../utils/environment";

readAndSetEnvironmentFile(process.env.STAGE);

const { computerIP, APIKey } = process.env;
console.log(`coming from voicemod: ${computerIP}`);

const router = Router();

const voicemod = new Voicemod(computerIP as string, APIKey as string);
const sammi = new Sammi(computerIP as string);
voicemod.onMessageLog();

router.get("/retrieveVoices", (req, res) => {
  voicemod.getVoices((response) => {
    sammi.postToWebhook({
      trigger: "voiceTestTrigger",
      data: {
        currentVoice: response.currentVoice,
        voices: (response.voices as any[]).slice(0, 10),
      },
    });
  });

  res.status(201).send("Getting voices");
});

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

export default router;
