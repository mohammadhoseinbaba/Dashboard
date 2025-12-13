export function SignUpPage() {
    return (
        <form action="signUp">
            <input placeholder="Email or Phone Number" type="text" />
            <input placeholder="password" type="password" />
            <button type="submit">Sign Up</button>
        </form>
    )
}