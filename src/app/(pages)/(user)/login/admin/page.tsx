import SubTitle from "@/app/components/shared/sub-title";
import AdminLoginForm from "./admin-login-form";
import Link from "next/link";

export default function LoginAdminPage() {
  return (
    <div>
      <SubTitle contents="관리자 로그인" />
      <AdminLoginForm />
      <div className="flex justify-center text-text dark:text-text-dark items-center my-5 text-sm">
        <Link
          className="text-primary dark:text-primary-dark underline italic mx-2"
          href="/login"
        >
          유저 로그인
        </Link>
        으로 돌아가기
      </div>
    </div>
  );
}
