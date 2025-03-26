import React from "react";
import ForgotPassForm from "./_components/forgotPassForm";

interface IProps {
  params: {
    slug: string;
  };

  searchParams: {
    email: string;
  };
}

export default async function page({ params, searchParams }: IProps) {
  const { email } = await searchParams;
  const { slug } = await params;
  return (
    <div>
      <ForgotPassForm slug={slug} email={email} />
    </div>
  );
}
