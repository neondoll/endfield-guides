import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="px-4 mx-auto container md:px-6">
          <div className="flex items-center h-14">
            <Button variant="ghost">Arknights: Endfield Guides</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted">
        <div className="p-4 mx-auto container md:px-6 md:py-10">
          <Suspense>
            <Routes>
              <Route index path="/" Component={lazy(() => import("@/pages/characters-page"))} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
