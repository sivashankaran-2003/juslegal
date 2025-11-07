import nodemailer from "nodemailer"

const mailTrapTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER as string,
    pass: process.env.MAILTRAP_PASSWORD as string,
  },
})

export default mailTrapTransport