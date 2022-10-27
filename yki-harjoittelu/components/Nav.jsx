import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex justify-between items-center py-10">
      <h1>Nav</h1>
      <Link href={"/"}>Logo</Link>
      <ul>
        <Link href={"/auth/login"}>
          <p className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium ml-8">
            Join now
          </p>
        </Link>
      </ul>
    </div>
  );
}
