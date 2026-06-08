import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router";

import { Button } from "@/components/ui/button";
import PATHS from "@/paths";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="px-4 mx-auto container md:px-6">
          <div className="flex items-center h-14">
            <Button asChild variant="ghost">
              <Link to={PATHS.Home}>Arknights: Endfield Guides</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted">
        <div className="p-4 mx-auto container md:px-6 md:py-10">
          <Suspense>
            <Routes>
              <Route index path={PATHS.Home} Component={lazy(() => import("@/pages/home/page"))} />
              <Route path={PATHS.Gears} Component={lazy(() => import("@/pages/gears/page"))} />
              <Route path={PATHS.Operators} Component={lazy(() => import("@/pages/operators/page"))} />
              <Route path={PATHS.Weapons} Component={lazy(() => import("@/pages/weapons/page"))} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
