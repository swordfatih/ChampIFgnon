import { useEffect } from "react";
import { useSearchCompany } from "@/services/api/company";
import { useParams } from "react-router-dom";

import type { Company } from "@/types/company";

export default function Company() {
  const { id } = useParams();

  const { data } = useSearchCompany(id!);
  const company = data?.results.bindings[0];

  useEffect(() => {});

  return (
    <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-12 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text pb-4 text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
              {company?.name.value}
            </h1>
          </div>
          <div className="px-96">
            {company?.logo
              ? "<img className='object-contain' src={company?.logo.value}></img>"
              : ""}
          </div>
          <h3>
            {company?.inception
              ? "Creation Year: " +
                new Date(Date.parse(company?.inception.value))
                  .getFullYear()
                  .toString()
              : ""}
          </h3>
          <div className="flex gap-x-2">
            <h3>Company's website:</h3>
            <a
              className="text-blue-600 underline"
              href={company?.website.value}
              target="_blank"
            >
              {company?.website.value}
            </a>
          </div>
          <h3>
            Company Location: {company?.hq_city.value},{" "}
            {company?.hq_country.value}
          </h3>
        </div>
      </section>
    </main>
  );
}