import express from 'express';
import {Request, Response, NextFunction} from 'express';
import nodemailer from 'nodemailer';
import validator from 'validator';

const router: express.Application = express();

// Email message sender
router.post('/send-email', (req: Request, res: Response) => {
  //create the transport
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.CB_API_NODEMAILER_USER,
        clientId: process.env.CB_API_NODEMAILER_CLIENT_ID,
        clientSecret: process.env.CB_API_NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.CB_API_NODEMAILER_REFRESH_TOKEN,
        accessToken: process.env.CB_API_NODEMAILER_ACCESS_TOKEN,
        expires: 1484314697598
    }
  })
  //mailtrap for testing
  // const transport = nodemailer.createTransport({
  //   host: 'smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: '220c107d93bb32',
  //     pass: 'e8e21ea5123ea2'
  //   }
  // })

  //validate email and sanitize content
  let fromName = req.body.fromName;
  let fromEmail = req.body.fromEmail;
  let subject = req.body.subject;
  let message = req.body.message;
  const whiteRegEx = 'a-zA-Z0-9\\.\\?,;:\\!@#\\$%\\^&\\-\\*_=\\+\\(\\)\\\'\\"\\n  ';
  if (validator.isEmail(fromEmail)) {
    //what's the message
    let from = `${validator.whitelist(fromName, whiteRegEx)} <${fromEmail}>`;
    message = `${from}\n ${validator.whitelist(message, whiteRegEx)}`;
    const messageObj = {
      from: from,
      to: process.env.CB_API_NODEMAILER_TO_EMAIL,
      subject: validator.whitelist(subject, whiteRegEx),
      text: message
    }
    //send message via transport
    transport.sendMail(messageObj, (err, info) => {
      if (err) {
        return console.log(`error: ${err}`);
      }
      res.status(200).json(info);
    })
  } else {
    res.status(422).json({status: 422, error: 'invalid email'});
  }
})

export default router;
