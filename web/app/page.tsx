"use client";

import UserInformation from "@/components/UserInformation";

export default function Home() {
  // const data = useQuery({
  //   queryKey: ["fethchUsers"],
  //   queryFn: apiRouter.users.fetchUsers,
  // });

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation />
      </section>
      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <div className="bg-red-500"> hello </div>
        {/* main */}
      </section>
      <section className="hidden xl:inline justify-center col-span-2">
        <div className="bg-blue-500"> right </div>
        {/* right */}
      </section>
    </div>
  );
}
