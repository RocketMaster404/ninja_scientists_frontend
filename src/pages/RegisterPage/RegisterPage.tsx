import HeroText from "../../feature/Login/HeroText/HeroText";
import AuthCard from "../../feature/Login/AuthCard/AuthCard";
import RegisterForm from "../../feature/Login/RegisterForm/RegisterForm";
import "../LoginPage/LoginPage.css";

export default function RegisterPage() {
  return (
    <main className="login-page">
      <HeroText />
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
