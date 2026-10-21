import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import { getMyProfile } from "../../feature/Profile/api/profileApi";
import type { MyProfileOverview } from "../../feature/Profile/types/profile";
import MyRegisterCard from "../../feature/Profile/MyRegisterCard/MyRegisterCard";
import PreviousMeetupsCard from "../../feature/Profile/PreviousMeetupsCard/PreviousMeetupsCard";
import "./ProfilePage.css";

type Status = "loading" | "error" | "success";

function ProfilePage() {
  const { user } = useAuth();
  const [overview, setOverview] = useState<MyProfileOverview | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0); // ökas av "Försök igen"

  useEffect(() => {
    let cancelled = false;

    getMyProfile()
      .then((data) => {
        if (cancelled) return;
        setOverview(data);
        setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    // Försvinner sidan (eller körs effekten om) ignoreras det gamla svaret
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }

  const initial = (user?.firstName?.[0] ?? user?.email?.[0] ?? "?").toUpperCase();

  return (
    <main className="profile-page">
      <header className="profile-header">
        <div className="profile-avatar" aria-hidden="true">
          {initial}
        </div>
        <div>
          <h1 className="profile-title">Min profil</h1>
          <p className="profile-subtitle">{user?.email}</p>
        </div>
      </header>

      {status === "loading" && (
        <p role="status" className="profile-status">
          Laddar dina meetups...
        </p>
      )}

      {status === "error" && (
        <div role="alert" className="alert alert-error profile-error">
          <p>Vi kunde inte hämta dina meetups just nu.</p>
          <button type="button" className="btn btn-primary profile-retry" onClick={retry}>
            Försök igen
          </button>
        </div>
      )}

      {status === "success" && overview && (
        <div className="profile-columns">
          <MyRegisterCard meetups={overview.upcoming} />
          <PreviousMeetupsCard meetups={overview.past} />
        </div>
      )}
    </main>
  );
}

export default ProfilePage;