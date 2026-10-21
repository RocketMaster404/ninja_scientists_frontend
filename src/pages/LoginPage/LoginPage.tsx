import HeroText from "../../feature/Login/HeroText/HeroText";
import AuthCard from "../../feature/Login/AuthCard/AuthCard";
import LoginForm from "../../feature/Login/LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <main className="login-page">
      <HeroText />
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </main>
  );
}
