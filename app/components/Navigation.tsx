import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";
import LanguageSwithcer from "./LanguageSwithcer";
import dataService from "@/services/dataService";
import { IResponse, IUser } from "@/types";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Navigation() {
  const t = await getTranslations("Navigation");
  const session = await auth();

  let name,
    surname: string = "";
  let userDataError: boolean = false;
  if (session?.user?.id) {
    const userDetailsResponse: IResponse<IUser> =
      await dataService.getUserDetails(session.user.id as string);
    if (!userDetailsResponse.success) {
      userDataError = true;
    } else {
      name = userDetailsResponse.data.name;
      surname = userDetailsResponse.data.surname;
    }
  }
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 rounded-md shadow-md border border-slate-500 mb-8">
      <ul className="flex space-x-6">
        {!session && (
          <li>
            <Link
              href="/login"
              className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
            >
              {t("Log-in")}
            </Link>
          </li>
        )}
        {session && (
          <>
            <li>
              <Link
                href="/"
                className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
              >
                {t("To do list")}
              </Link>
            </li>
            {session.user.role === "Admin" && (
              <>
                <li>
                  <Link
                    href="/add-card"
                    className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    {t("Add to do item")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/view-users"
                    className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    {t("View all users")}
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>
      <div className="flex items-center gap-x-10">
        <LanguageSwithcer />
        {session && (
          <>
            {!userDataError && (
              <div className="font-bold text-lg text-gray-700">
                {t("Hi")} {name} {surname}
              </div>
            )}
            <SignOutButton />
          </>
        )}
      </div>
    </nav>
  );
}
