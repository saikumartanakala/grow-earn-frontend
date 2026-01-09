# Frontend prompt templates

## Creator Dashboard (React) — Prompt

Goal: Generate a `CreatorDashboard` React component (TypeScript + Vite + Tailwind) that displays the creator's campaigns with real-time progress updates and a tab-based UI separating "In Progress" and "Completed Goals". The generated code should integrate with the backend API and the existing frontend services (`services/api.ts`, `services/authService.ts`).

Requirements for the code generator (what to produce):

- Components to create:
  - `CreatorDashboard.tsx` — main page with tabs and orchestration
  - `CampaignCard.tsx` — card UI for each campaign with progress visualization and actions
  - `ProgressBar.tsx` — accessible progress bar showing percent and numeric values
  - hooks or utilities as needed (e.g. `useCampaigns`, `useCampaignProgressSocket`)

- UI/Behavior:
  - Tab-based UI with two tabs: "In Progress" and "Completed Goals". Tabs should be keyboard accessible and persist selected tab in local state.
  - List campaigns for the active tab. If no campaigns, show an empty state with guidance.
  - Each `CampaignCard` shows: title, short description, goal amount, current progress, progress percentage, visual progress bar, last-updated time, and an action to mark complete (only for in-progress campaigns).
  - When a campaign reaches or exceeds 100% progress the UI should allow marking it completed and move it to the "Completed Goals" tab.

- API integration (expected endpoints and shapes):
  - GET /api/creator/campaigns?status=in-progress
    - Response: `{ campaigns: Campaign[] }`
  - GET /api/creator/campaigns?status=completed
    - Response: `{ campaigns: Campaign[] }`
  - POST /api/creator/campaigns/:id/mark-completed
    - Body: `{}`
    - Response: `{ success: true, campaign: Campaign }`
  - Real-time updates (one of):
    - WebSocket at `wss://<host>/ws/campaign-progress` sending messages like `{ campaignId: string, currentAmount: number, timestamp: string }` OR
    - Server-Sent Events (SSE) at `/api/creator/campaigns/stream` emitting identical JSON events

- Data model (TypeScript interfaces to generate):
  - `interface Campaign { id: string; title: string; description?: string; goalAmount: number; currentAmount: number; status: 'in-progress' | 'completed'; updatedAt: string; }`

- Authentication handling:
  - Use `authService` to get the current token (`authService.getToken()` or similar) and attach it to requests using `Authorization: Bearer <token>`.
  - If unauthenticated or token invalid, redirect to the login page via `react-router-dom` navigation.
  - All API calls must include auth headers. For WebSocket/SSE include token as query param or header if supported.

- State management and networking:
  - Prefer hooks + local component state. Optionally suggest `react-query` (not required) for caching and background refetching.
  - Implement optimistic UI for marking complete: update local state immediately, call `POST /mark-completed`, rollback on failure with error toast.
  - Use a real-time subscription to update `currentAmount` for campaigns. If WebSocket/SSE is unavailable, fall back to polling every 10-20s.

- Error handling and UX:
  - Show loading states for lists and actions.
  - Show retry controls on network failures.
  - Confirm destructive actions (mark completed) with a small confirmation.

- Accessibility & styling:
  - Use semantic HTML, ARIA attributes where appropriate (progressbar role), and keyboard-focusable buttons/tabs.
  - Use Tailwind utility classes consistent with the repo. Provide minimal className suggestions rather than a full design.

- Tests & types:
  - Generate TypeScript types for all data shapes.
  - Add brief unit test examples (Jest/React Testing Library) demonstrating: rendering tabs, switching tabs, updating campaign progress from a simulated socket message.

- Files to reference and integrate with:
  - `src/services/api.ts` — use or extend existing axios instance for auth headers
  - `src/services/authService.ts` — obtain current user/token and sign-out helpers
  - `src/routes/RoleGuard.tsx` — ensure only creators can access the page (use or reference)

- Example usage code snippets the generator should produce:
  - `useCampaigns` hook pseudocode: fetch in-progress and completed lists, subscribe to updates, expose `markCompleted(id)`
  - `CreatorDashboard` layout: tabs, counts, list rendering, loading/error states
  - `CampaignCard` actions: show progress, call `markCompleted`, UI transition to completed

Prompt constraints for the code generator:
- Keep implementations short and focused: prioritize correctness and clarity over visual polish.
- Do not assume global state libraries (Redux) unless detected in the repo — prefer hooks and local state.
- Use existing project patterns (TypeScript, axios, Tailwind). Reference `services/api.ts` and `services/authService.ts` for request wiring.
- Where real-time transport is ambiguous, generate both a WebSocket-based subscription and a fallback polling implementation; leave the fallback behind a single boolean switch.

Outcome: The generator should produce a ready-to-integrate set of TypeScript React components and hooks for the creator dashboard, wired to the stated API endpoints, handling authentication, and supporting real-time campaign progress updates with a tabbed UI separating "In Progress" and "Completed Goals".




************************************************
To fix this bug, update your frontend dashboard component to:

Fetch data from /api/viewer/dashboard (with Authorization header).
Display userId, totalSubscriptions, videoViews, videoLikes, videoComments, and moneyEarnings in the UI.
Add loading and error handling.
Here’s a React code snippet you can use in your ViewerDashboard component:

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StatsCard from "./StatsCard";

export default function ViewerDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/viewer/dashboard", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard");
        return res.json();
      })
      .then((data) => {
        setDashboardData(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load dashboard");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Viewer Dashboard</h1>
        {loading && <p>Loading dashboard...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard label="User ID" value={dashboardData.userId ?? "-"} />
            <StatsCard label="Total Subscriptions" value={dashboardData.totalSubscriptions ?? 0} />
            <StatsCard label="Video Views" value={dashboardData.videoViews ?? 0} />
            <StatsCard label="Video Likes" value={dashboardData.videoLikes ?? 0} />
            <StatsCard label="Video Comments" value={dashboardData.videoComments ?? 0} />
            <StatsCard label="Money Earnings" value={dashboardData.moneyEarnings ?? 0} />
          </div>
        )}
      </div>
    </div>
  );
}





**********************************************

Backend prompt:

Please update the /viewer/tasks endpoint so that each task object includes a valid targetLink (or target_link) field with a full URL (e.g., https://youtube.com/...). The frontend uses this field to open the correct link when the user clicks "Complete Task." If the field is missing or not a valid URL, the button will not work.

Frontend code (if backend uses target_link):
Change:
window.open(task.targetLink, "_blank");window.open(task.targetLink, "_blank");
to
window.open(task.target_link, "_blank");
and update the validation accordingly.

**************************************

Your database (campaigns table) contains valid YouTube links in the video_link column, but your viewer_tasks table has NULL for the target_link field. This is why your frontend cannot open the correct link for "Complete Task"—the backend is not providing the link in the task object.

What to do:

Backend Fix Required:

When returning tasks from /viewer/tasks, the backend should join the campaigns table (using campaign_id) and set target_link (or targetLink) in each task to the corresponding video_link from the campaigns table.
Example SQL (for backend dev):
SELECT vt.*, c.video_link AS target_link
FROM viewer_tasks vt
JOIN campaigns c ON vt.campaign_id = c.id
WHERE vt.viewer_id = ?
The API should return each task with a valid target_link field (e.g., "https://youtube.com/watch?v=abc123").
Frontend:

No code change needed if you use task.target_link in your button logic (as previously discussed).
Backend prompt:
Please update the /viewer/tasks endpoint so that each task object includes a valid target_link field, populated from the video_link column in the campaigns table (joined via campaign_id). This will allow the frontend to open the correct YouTube link when the user clicks "Complete Task."

*****************************************

You do not need to update your frontend code for the "Complete Task" button logic. The error is entirely on the backend side:

Your viewer_tasks table has NULL for target_link, but your campaigns table has valid YouTube links in video_link.
The backend must join viewer_tasks with campaigns (using campaign_id) and return target_link (or targetLink) in each task object, populated from campaigns.video_link.

Backend prompt to fix this:

Please update the /viewer/tasks endpoint so that each task object includes a valid target_link field, populated from the video_link column in the campaigns table (joined via campaign_id). This will allow the frontend to open the correct YouTube link when the user clicks "Complete Task." Example SQL:

SELECT vt.*, c.video_link AS target_link
FROM viewer_tasks vt
JOIN campaigns c ON vt.campaign_id = c.id
WHERE vt.viewer_id = ?

The API should return each task with a valid target_link field (e.g., "https://youtube.com/watch?v=abc123").

Frontend:
No code change is needed if you use task.target_link in your button logic.

Once the backend is fixed, your "Complete Task" button will work as expected.> SELECT vt.*, c.video_link AS target_link

FROM viewer_tasks vt
JOIN campaigns c ON vt.campaign_id = c.id
WHERE vt.viewer_id = ?
The API should return each task with a valid target_link field (e.g., "https://youtube.com/watch?v=abc123").


*****************************************
The backend join approach is scalable, maintainable, and avoids data duplication.
The frontend only needs to display and use the provided link, with no extra logic or risk of broken links.

In production, always prefer dynamic backend joins and normalized data over duplicating fields. This ensures your app is reliable, secure, and easy to update.
********************************************************

Prompt for Backend Team:

We are receiving 403 Forbidden errors when calling the following endpoints from the frontend:

GET /api/creator/campaign/in-progress
GET /api/creator/campaign/completed
The requests include a valid Authorization: Bearer <token> header. Please check:

Is the token validation logic correct and accepting valid tokens?
Are these endpoint paths correct? (Our prompt and API spec suggest /api/creator/campaigns?status=in-progress and /api/creator/campaigns?status=completed.)
Are the endpoints protected by role-based access? If so, is the user role correct?
Please ensure the endpoints match the documented API and that valid tokens are accepted.

***********************************

Prompt for backend team:

We are receiving 403 Forbidden errors from /api/creator/campaign/in-progress and /api/creator/campaign/completed with a valid Authorization header. Please verify:

Token validation logic is correct and accepting valid tokens.
Endpoints match the documented API (/api/creator/campaigns?status=in-progress and /api/creator/campaigns?status=completed).
Role-based access is configured correctly for the user.
********************************************
Backend Team Prompt
Prompt for Backend Team:

All requests to /api/creator/campaigns?status=in-progress, /api/creator/campaigns?status=completed, and /api/creator/campaign/create are returning 403 Forbidden, even though the frontend is sending a valid Authorization: Bearer token.

Please check the following on the backend:

Is the token validation logic working and accepting valid tokens?
Are the endpoints correctly configured to allow access for authenticated users with the "creator" role?
Is the user role/permission check correct and not overly restrictive?
Are CORS or other middleware settings blocking these requests?
The frontend is using the correct endpoints and sending the token. Please investigate backend authentication, authorization, and endpoint protection logic.
*******************************************

We are unable to log in or sign up with a new user. The frontend sends a request to /api/auth/signup, but the backend responds with a 403 Forbidden error.

Please check:

Is the /api/auth/signup endpoint enabled and accessible for unauthenticated users?
Are there any restrictions or missing permissions for new user registration?
Is the endpoint expecting additional headers or data?
Are there CORS, security, or filter issues blocking this endpoint?
The frontend is sending the correct request, but the backend is not allowing new user signups/logins. Please review the backend logic and configuration for /api/auth/signup and ensure new users can register and log in.


*************************************************

Backend Team Prompt
We are unable to create a new campaign with a new creator. The frontend sends a POST request to /api/creator/campaign/create, but the backend responds with a 403 Forbidden error.

Please check:

Is the /api/creator/campaign/create endpoint enabled and accessible for authenticated users with the CREATOR role?
Is the new creator’s account/role correctly set up in the database and JWT?
Are there any restrictions or missing permissions for new creators?
Is the endpoint expecting additional headers or data?
Are there CORS, security, or filter issues blocking this endpoint?
The frontend is sending the correct request, but the backend is not allowing new creators to create campaigns. Please review the backend logic and configuration for /api/creator/campaign/create and ensure new creators can create campaigns.

*************************************************


We are receiving 403 Forbidden errors from /api/auth/signup and /api/auth/login. Please check that these endpoints are publicly accessible in your SecurityConfig and not blocked by authentication or role checks. They should be open to all users for registration and login.
*************************************


Backend Team Prompt
Bug: Campaign creation is not updating the database.

The frontend calls /api/creator/campaign/create and expects a new campaign to be inserted into the campaigns table.
Backend logs show only insert into users (for signup), but no insert into campaigns for campaign creation.
Please check the controller and service logic for campaign creation:
Is the POST /api/creator/campaign/create endpoint correctly mapped and implemented?
Is the service method for campaign creation calling the repository to save the campaign?
Is the transaction committed and not rolled back due to validation or errors?
Are all required fields being set before saving?
Is the correct entity/table (campaigns) being used?
Please update the backend so that new campaigns are inserted into the campaigns table when created.

***********************************************

Backend Prompt
The frontend is requesting /api/viewer/tasks?page=0&size=10 with a valid JWT token, but the response is HTML, not JSON, and no tasks are shown.

Please check:

Is the /api/viewer/tasks endpoint implemented and returning JSON with a tasks array?
Is the SQL query joining viewer_tasks and campaigns correctly, and filtering by viewer_id?
Are there any tasks in the database for this viewer?
Is the backend returning an error or HTML page instead of JSON? (Check backend logs for errors.)
The frontend is working as expected. Please ensure the backend returns the correct JSON response with tasks for the viewer.

***************************************************

Prompt for Backend Team:

When a new viewer signs up, automatically assign them tasks for all campaigns with status "IN_PROGRESS".

After saving the new viewer, fetch all campaigns where status = "IN_PROGRESS".
For each campaign, create the appropriate tasks for the new viewer (SUBSCRIBE, VIEW, LIKE, COMMENT).
This ensures every new viewer always has tasks, even for campaigns created before they joined.
*********************************************