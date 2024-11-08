import Link from "next/link";

export default function Home() {
  return (
    <div>
        Home
        <div>
          <Link href="/tables">Tables</Link>
          <Link href="/menu">Menu</Link>
        </div>
    </div>
  );
}
