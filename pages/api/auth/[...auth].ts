import { api } from "src/blitz-server"
import { passportAuth } from "@blitzjs/auth"
import db from "db"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"

export default api(
  passportAuth(({ ctx, req, res }) => ({
    successRedirectUrl: "/admin",
    errorRedirectUrl: "/",
    strategies: [
      {
        strategy: new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID as String,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as String,
            callbackURL: process.env.CALLBACK_URL as String,
            scope: ["profile", "email"],
            passReqToCallback: true,
          },
          async (req, accessToken, refreshToken, profile, done) => {
            const { email, name } = profile
            const user = await db.user.findUnique({ where: { email } })
            if (user) {
              const publicData = {
                userId: user.id,
                roles: [user.role],
                source: "google",
              }
              done(null, { publicData })
            } else {
              const newUser = await db.user.create({
                data: {
                  email,
                  name: name.givenName,
                  role: "USER",
                },
              })
              const publicData = {
                userId: newUser.id,
                roles: [newUser.role],
                source: "google",
              }
              done(null, { publicData })
            }
          }
        ),
      },
    ],
  }))
)
