import { useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

export default function CreateCampaign() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<any>({
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

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const submit = async () => {
    await api.post("/creator/campaign/create", form);
    alert("Campaign Created!");
  };

  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar />

      <div className="p-8 max-w-xl mx-auto bg-white rounded shadow">
        {step === 1 && (
          <>
            <h2>Select Platform</h2>
            <select
              onChange={(e) =>
                setForm({ ...form, platform: e.target.value })
              }
            >
              <option value="YOUTUBE">YouTube</option>
            </select>
            <button onClick={next}>Proceed</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Select Goal</h2>
            <select
              onChange={(e) =>
                setForm({ ...form, goalType: e.target.value })
              }
            >
              <option value="S">Subscribers</option>
              <option value="V">Views</option>
              <option value="L">Likes</option>
              <option value="C">Comments</option>
              <option value="SVLC">S + V + L + C</option>
            </select>
            <button onClick={back}>Back</button>
            <button onClick={next}>Proceed</button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Campaign Details</h2>
            <input placeholder="Channel Name"
              onChange={(e) =>
                setForm({ ...form, channelName: e.target.value })
              }
            />
            <input placeholder="Channel Link"
              onChange={(e) =>
                setForm({ ...form, channelLink: e.target.value })
              }
            />
            <input placeholder="Video Link"
              onChange={(e) =>
                setForm({ ...form, videoLink: e.target.value })
              }
            />
            <button onClick={back}>Back</button>
            <button onClick={next}>Proceed</button>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Set Targets</h2>
            <input type="number" placeholder="Subscribers"
              onChange={(e) =>
                setForm({ ...form, subscriberGoal: +e.target.value })
              }
            />
            <input type="number" placeholder="Views"
              onChange={(e) =>
                setForm({ ...form, viewsGoal: +e.target.value })
              }
            />
            <input type="number" placeholder="Likes"
              onChange={(e) =>
                setForm({ ...form, likesGoal: +e.target.value })
              }
            />
            <input type="number" placeholder="Comments"
              onChange={(e) =>
                setForm({ ...form, commentsGoal: +e.target.value })
              }
            />
            <button onClick={back}>Back</button>
            <button onClick={submit}>Proceed to Pay</button>
          </>
        )}
      </div>
    </div>
  );
}
