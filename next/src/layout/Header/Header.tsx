import Link from "next/link";

export default function Header() {
    return (
        <nav>
            <ul>
                <li>
                    <Link
                        href={process.env.NEXT_PUBLIC_DOMAIN + "/"}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href={process.env.NEXT_PUBLIC_DOMAIN + "/login"}
                    >
                        Login
                    </Link>
                </li>
                <li>
                    <Link
                        href={process.env.NEXT_PUBLIC_DOMAIN + "/profile"}
                    >
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    )
}