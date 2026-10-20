import HeroText from "../../components/Login/HeroText/HeroText";
import AuthCard from "../../components/Login/AuthCard/AuthCard";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
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
