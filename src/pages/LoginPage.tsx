import { useNavigate } from "react-router-dom"
export function LoginPage() {
    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate("/Signup")
    }
    return (
        <>
            <form action="login">
                <input placeholder="Email or Phone Number" type="text" />
                <input placeholder="password" type="password" name="password" id="passwordLogin" />
                <button type="submit">Login</button>
            </form>
            <button type="button" onClick={handleSignUp}>Signup</button>
        </>
    )
}
