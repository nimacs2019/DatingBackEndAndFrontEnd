const router = require("express").Router();
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.accoutnSID, process.env.authToken);

router.post("/mobile", (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }
  console.log("number", phoneNumber);

  client.verify.v2.services(process.env.serviceSID)
    .verifications.create({
      to: `+91${phoneNumber}`,
      channel: "sms",
    })
    .then((resp) => {
      console.log("response", resp);
      res.status(200).json(resp);
    })
    .catch((error) => {
      console.error("Error sending verification code:", error);
      res.status(500).json({ error: "Failed to send verification code" });
    });
});

router.post("/otp", (req, res) => {
  const { otp, userNumber } = req.body;
  console.log('otp request body',req.body);
  if (!otp || !userNumber) {
    return res.status(400).json({ error: "OTP and user number are required" });
  }
  console.log("otp ", otp);

  client.verify.v2.services(process.env.serviceSID)
    .verificationChecks.create({
      to: userNumber,
      code: otp,
    })
    .then((resp) => {
      console.log("otp res", resp);
      if (resp.valid) {
        return res.status(200).json({ resp, message: "Welcome" });
      }
      res.status(400).json({ resp, message: "Expired OTP" });
    })
    .catch((error) => {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    });
});

module.exports = router;
