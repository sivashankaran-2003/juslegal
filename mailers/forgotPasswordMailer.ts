/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */

import mailTrapTransport from "integrations/mailtrap"
// import sgMail from "integrations/sendgrid"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

  var msgProd = {
    // from: "dev.siddharthsuresh@proton.me",
    // fromname: "no-reply@lawyer-admin.vercel.app",
    from: {
      name: "no-reply@lawyer-admin.vercel.app",
      email: "dev.siddharthsuresh@proton.me",
    },
    to,
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>
      <a href="${resetUrl}">
        Click here to set a new password
      </a>
      <p> This link will expire in 4 hours. </p>
      <p> This is only for testing purposes. Do not reply to this email. </p>
    `,
  }

  var msgDev = {
    // from: "dev.siddharthsuresh@proton.me",
    // fromname: "no-reply@lawyer-admin.vercel.app",
    from: "no-reply@lawyer-admin.vercel.app",
    to,
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>
      <a href="${resetUrl}">
        Click here to set a new password
      </a>
      <p> This link will expire in 4 hours. </p>
      <p> This is only for testing purposes. Do not reply to this email. </p>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        // Uncomment and use for sending a real email
        /*
        sgMail
          .send(msgProd)
          .then(() => {
            console.log("Email sent")
          })
          .catch((error) => {
            console.error(error)
          })
          */
        mailTrapTransport.sendMail(msgDev)
        throw new Error("No production email implementation. Email Sent to Mailtrap")
      } else {
        mailTrapTransport.sendMail(msgDev)
      }
    },
  }
}
