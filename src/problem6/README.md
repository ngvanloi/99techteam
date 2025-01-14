# Scoreboard API Service

## Overview
This module is responsible for handling the scoreboard functionality on the website. It allows users to submit their scores after completing actions and provides a live update feature for the top 10 users based on scores. The module also implements validation to prevent malicious users from submitting unauthorized scores.

## Features
1. **Score Update API**
   - Allows users to update their scores after completing an action.
   - The score update request must be validated to prevent unauthorized actions.

2. **Live Update of the Top 10 Scores**
   - The scoreboard dynamically updates the top 10 users with the highest scores in real-time.

3. **Security**
   - Protects against malicious users by ensuring scores are only updated for legitimate users.  
   - Implements rate-limiting, token validation, and other necessary security measures to secure the API endpoints.

## API Endpoints

### POST `/api/update-score`

This endpoint receives a request to update a user's score after an action is completed.

**Request Headers**
```json
{
  "Authorization": "Bearer your-auth-token-here"  // The user's authentication token
}
```

**Request Body**
```json
{
  "userId": "12345",     // The ID of the user submitting the score update
  "score": 150,          // The score increment after completing the action
}
```

**Response**
- **200 OK**: If the score update is successful.
- **400 Bad Request**: If the data is invalid or missing.
- **403 Forbidden**: If the request is unauthorized or contains invalid authentication.

**Flow:**
1. The user sends a POST request with their user ID, the score increment, and a valid Authorization header.
2. The server validates the request by:
      - Verifying the Authorization token in the headers.
      - Ensuring the userId is valid and exists in the database.
      - Validating the score to be a positive number.
3. If valid, the score is updated in the database, and a success message is returned.
4. If invalid, an appropriate error message is returned.

---

## Security Measures

1. **Authentication**  
   The Authorization token in the request header must be validated to ensure the request is coming from a legitimate source

2. **Rate Limiting**  
   To prevent abuse, rate limiting is applied to the `/update-score` endpoint. A user can only make a limited number of score updates within a defined time window (e.g., 5 requests per minute).

3. **Input Validation**  
   - The `userId` must correspond to a valid user in the system.
   - The `score` must be a positive integer.
   - The Authorization token should be verified by checking against the user’s session or JWT token.

4. **Authorization**  
   Scores can only be updated for users who are authorized to do so (e.g., via session cookies, JWT, or OAuth tokens).

---

## Implementation Notes

- **Database Schema**  
  Ensure the database stores user information along with their scores. The schema may look like this:
  
  ```sql
  CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    score INT DEFAULT 0
  );
  ```

- **Data Validation**  
  - Ensure that the score being submitted is a valid, positive number.
  - Only update scores for users with valid authentication tokens.

- **Error Handling**  
  Provide clear error messages for common issues (e.g., invalid input, unauthorized access).

---

## Additional Comments for Improvement

1. **Caching**  
   Implement caching for the leaderboard data (e.g., using Redis) to improve performance, especially for large-scale applications where the leaderboard is frequently queried.

2. **Real-time Updates**  
   Use WebSockets or Server-Sent Events (SSE) to notify users when the scoreboard is updated in real-time.

3. **Rate Limiting**  
   Consider using a distributed rate-limiting mechanism (e.g., Redis or a dedicated service) to prevent abuse across multiple instances of the application.
   
---

## Diagram to Illustrate the Flow of Execution

```plaintext
+------------------+         +--------------------------+       +---------------------+
| User submits    |         | API Server receives       |       | Database checks if   |
| score update   +-------->+ request, validates token,  +----->+ user exists and     |
| via POST       |         | and updates score if valid |       | updates score        |
+------------------+         +--------------------------+       +---------------------+
                             |
                             v
                        +-----------------------+
                        | Return success or     |
                        | error to the user     |
                        +-----------------------+
                             |
                             v
                     +-----------------------+
                     | Broadcast updated score|
                     | to front-end via WebSockets/SSE|
                     +-----------------------+
```

---

## Conclusion
This API service is designed to handle score updates securely, ensure a live update of the top 10 users, and prevent unauthorized or malicious users from submitting invalid scores. The implementation should be focused on authentication, rate-limiting, and efficient database access. Additionally, real-time updates to the leaderboard can be integrated to enhance user experience.
```
