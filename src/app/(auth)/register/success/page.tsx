import AccountClient from "./_components/AccountClient";
import SchoolClient from "./_components/SchoolClient";

interface IPros {
  searchParams: Promise<{ type: string }>;
}

export default async function RegistrationSuccessPage({ searchParams }: IPros) {
  const { type } = await searchParams;
  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 md:py-24">
      {type === "account" ? <AccountClient /> : <SchoolClient />}

      <div></div>
    </div>
  );
}
