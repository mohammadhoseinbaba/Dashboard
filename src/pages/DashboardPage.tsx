import { useAuthStore } from "../store/authStore";


export default function DashboardPage() {
  const user = useAuthStore((s)=>s.user)
  console.log(user)
  return (
    <>
      Hello {user ? `${user.name}`: ""} 
    </>
  );
}
