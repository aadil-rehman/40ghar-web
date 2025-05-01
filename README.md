## MVP Feature Roadmap – 40Ghar

✅ Phase 1: Core Setup (Week 1)

- Goal: Build the foundation for users and map functionality.
- Set up MERN stack (MongoDB, Express, React, Node.js)
- Basic user types: Donor, Needy
- Auth (email/OTP or passwordless optional login)
- Setup Leaflet map with OpenStreetMap tiles in React
  -Capture and store user's location (with fuzzy logic)
- MongoDB schema:
- users (role, needType, description, location, distance radius, urgencyScore, status)
- requests (linked to user, timestamp, status)

✅ Phase 2: Needy User Flow (Week 2)

- Goal: Allow people to register as someone who needs help.
- Needy user form: reason, urgency level, family size, optional photo (blurred)
- Approximate (fuzzy) geolocation before saving to DB
- Confirmation page: "Your request has been registered"
- Status: pending, fulfilled, flagged
- Privacy mode: No name or exact location shown to donors

✅ Phase 3: Donor Flow + Map UI (Week 3)

- Goal: Let donors find and commit to help nearby needs.
- Donor dashboard with Leaflet map view
- Display anonymized nearby requests (within 200m)
- Request cards on hover: need type, urgency score, family size, distance
- Button: "I want to help"
- Once clicked, mark request as "in progress" for that donor
- After confirmation, mark request as "fulfilled"

✅ Phase 4: Admin & Safety (Week 4)

- Goal: Keep the platform secure, clean, and manageable.
- Basic admin panel to:
- View all requests
- Approve/delete suspicious ones
- See fulfillment stats
- Spam/threat protection (simple reCAPTCHA or OTP validation)
- "Report abuse/fraud" button on each request card

✅ Bonus (Optional for MVP+)

- NGO profile section
- Public impact stats page ("58 people helped near you")
- QR code for needy users to easily register via posters or handouts
