import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Header() {
  return (
    <header className="flex items-center justify-between p-5 shadow-sm">
      <Image
        src="/logo.svg"
        width={100}
        height={100}
        alt="logo"
        className="w-[150px] md:w-[200px]"
      />
      <ul className="hidden md:flex gap-14 font-medium text-lg">
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          Product
        </li>
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          Pricing
        </li>
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          Contact us
        </li>
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          About Us
        </li>
      </ul>
      <div className="flex gap-5">
        <Link href="/sign-in">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Get Started</Button>
        </Link>
        {/*<LoginLink> </LoginLink>*/}
        {/*<RegisterLink><Button>Get Started</Button></RegisterLink>*/}
      </div>
    </header>
  );
}

export default Header;
