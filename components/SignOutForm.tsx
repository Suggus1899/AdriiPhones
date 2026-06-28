import { signOut } from "@/auth";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 font-medium transition-all duration-200">
        <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
        Cerrar Sesión
      </button>
    </form>
  );
}
