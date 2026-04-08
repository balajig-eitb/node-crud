// modules/google/googleAuth.js

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

export const configureGoogleSSO = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;

          // Only allow Gmail accounts
          if (!email.endsWith("@elephantintheboardroom.co.in") &&!email.endsWith("@elephantintheboardroom.in") &&!email.endsWith("@elephantintheboardroom.ph") &&!email.endsWith("@elephantintheboardroom.com.au")) {
                  return done(null, false, { message: "Only company emails allowed" });
                }

          // User object returned to route
          const user = {
            googleId: profile.id,
            name: profile.displayName,
            email,
          };

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
