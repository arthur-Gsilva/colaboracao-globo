import { ContactCard } from "./components/ContactCard";
import { FormBox } from "./components/FormBox";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-4 items-center justify-center p-6 bg-gray-100">
      <FormBox />

      <ContactCard />
    </main>
  );
}