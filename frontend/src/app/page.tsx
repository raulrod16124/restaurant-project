import "./home.css"
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Home() {
  return (
    <div className="home-container">
        <Image 
          src={logo} 
          alt='table-image'
          width={180}
          height={180}
        />
        <h1>Restaurant</h1>
        <div className="links-container">
          <Link className="link" href="/tables">Tables</Link>
          <Link className="link" href="/menu">Menu</Link>
        </div>
    </div>
  );
}
