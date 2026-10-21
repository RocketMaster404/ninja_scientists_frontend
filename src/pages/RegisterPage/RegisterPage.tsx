import HeroText from "../../components/Login/HeroText/HeroText";
import AuthCard from "../../components/Login/AuthCard/AuthCard";
import RegisterForm from "../../components/Login/RegisterForm/RegisterForm";
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
