import { useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

export default function CreateCampaign() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    platform: "YOUTUBE",
    goalType: "",
    channelName: "",
    channelLink: "",
    contentType: "VIDEO",
    videoLink: "",
    videoDuration: "<5min",
    subscriberGoal: 0,
    viewsGoal: 0,
    likesGoal: 0,
    commentsGoal: 0,
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    try {
      setLoading(true);
      await api.post("/creator/campaign/create", form);
      alert("Campaign Created Successfully!");
      // optionally redirect
      // navigate("/creator/dashboard");
    } catch (err) {
      console.error("Create Campaign Error:", err);
      alert("Failed to create campaign. Check console.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar />

      <div className="p-8 max-w-xl mx-auto bg-white rounded shadow">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Select Platform</h2>

            <select
              className="w-full border p-2 mb-4"
              value={form.platform}
              onChange={(e) =>
                setForm({ ...form, platform: e.target.value })
              }
            >
              <option value="YOUTUBE">YouTube</option>
            </select>

            <button
              className="bg-purple-600 text-white px-4 py-2 rounded"
              onClick={next}
            >
              Proceed
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Select Goal</h2>

            <select
              className="w-full border p-2 mb-4"
              value={form.goalType}
              onChange={(e) =>
                setForm({ ...form, goalType: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="S">Subscribers</option>
              <option value="V">Views</option>
              <option value="L">Likes</option>
              <option value="C">Comments</option>
              <option value="SVLC">All</option>
            </select>

            <div className="flex justify-between">
              <button onClick={back}>Back</button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded"
                onClick={next}
                disabled={!form.goalType}
              >
                Proceed
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Channel Name"
              onChange={(e) =>
                setForm({ ...form, channelName: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-3"
              placeholder="Channel Link"
              onChange={(e) =>
                setForm({ ...form, channelLink: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-3"
              placeholder="Video Link"
              onChange={(e) =>
                setForm({ ...form, videoLink: e.target.value })
              }
            />

            <div className="flex justify-between">
              <button onClick={back}>Back</button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded"
                onClick={next}
              >
                Proceed
              </button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Set Targets</h2>

            <input
              type="number"
              className="w-full border p-2 mb-2"
              placeholder="Subscribers"
              onChange={(e) =>
                setForm({ ...form, subscriberGoal: +e.target.value })
              }
            />

            <input
              type="number"
              className="w-full border p-2 mb-2"
              placeholder="Views"
              onChange={(e) =>
                setForm({ ...form, viewsGoal: +e.target.value })
              }
            />

            <input
              type="number"
              className="w-full border p-2 mb-2"
              placeholder="Likes"
              onChange={(e) =>
                setForm({ ...form, likesGoal: +e.target.value })
              }
            />

            <input
              type="number"
              className="w-full border p-2 mb-4"
              placeholder="Comments"
              onChange={(e) =>
                setForm({ ...form, commentsGoal: +e.target.value })
              }
            />

            <div className="flex justify-between">
              <button onClick={back}>Back</button>

              <button
                onClick={submit}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Creating..." : "Proceed to Pay"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
