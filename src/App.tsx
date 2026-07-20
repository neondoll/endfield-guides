import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router";

import InfoAlert from "@/components/info-alert";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import PATHS from "@/paths";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="px-4 mx-auto container md:px-6">
          <div className="flex items-center h-14">
            <Button asChild size="lg" variant="ghost">
              <Link to={PATHS.Home}>Arknights: Endfield Guides</Link>
            </Button>
            <div className="flex gap-2 items-center ml-auto md:flex-1 md:justify-end">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted">
        <div className="p-4 mx-auto space-y-4 container md:px-6 md:py-10 md:space-y-6">
          <InfoAlert />
          <Suspense>
            <Routes>
              <Route index path={PATHS.Home} Component={lazy(() => import("@/pages/home/page"))} />
              <Route path={PATHS.Gears} Component={lazy(() => import("@/pages/gears/page"))} />
              <Route path={PATHS.Operators} Component={lazy(() => import("@/pages/operators/page"))} />
              <Route path={PATHS.Operator(":operatorId")} Component={lazy(() => import("@/pages/operator/page"))} />
              <Route path={PATHS.Weapons} Component={lazy(() => import("@/pages/weapons/page"))} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <footer className="flex flex-col gap-4 justify-center items-center py-4 text-sm text-muted-foreground bg-muted border-t">
        <p className="uppercase">Неофициальный фанатский проект</p>
        <div className="flex gap-2 justify-center items-center">
          <p>Смотрите также:</p>
          <ul className="flex gap-1 justify-center items-center">
            <li>
              <Button asChild size="xs" variant="link">
                <a href="https://neondoll.github.io/genshin-guides/" target="_blank">Genshin Impact Guides</a>
              </Button>
            </li>
            <li>
              <Button asChild size="xs" variant="link">
                <a href="https://neondoll.github.io/nte-guides/" target="_blank">Neverness to Everness Guides</a>
              </Button>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
