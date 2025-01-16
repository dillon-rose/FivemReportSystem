import App from '@/App';
import Player from '@/pages/Players/PlayerId';
import Players from '@/pages/Players/Players';
import Report from '@/pages/Reports/ReportId';
import Reports from '@/pages/Reports/Reports';
import Staff from '@/pages/Statistics/StaffId';
import Statistics from '@/pages/Statistics/Statistics';
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom';
import { StateContext } from './ContextProvider';
import { useContext } from "react";
import { Permission } from '@/types/types';



const RouteProvider = () => {
  const context = useContext(StateContext);
  const router = createHashRouter([
    {
      path: "/",
      element: <App />,
      loader: ({ request }) => {
        let url = request.url;
        url = url.replace("http://", "").replace("https://", "");
        return url.indexOf("/") === url.length - 1 ? redirect("reports") : null;
      },
      children: [
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "reports/:reportNumber",
          element: <Report />,
        },
        {
          path: "players",
          element: <Players />
        },
        {
          path: "players/:playerId",
          element: <Player />,
  
        },
        {
          path: "stats",
          element: <Statistics />,
          loader: ({ request }) => {
            // if the user is not an admin, redirect to reports
            return context.permission !== Permission.ADMIN ? redirect("/reports") : null;
          },
        },
        {
          path: "stats/:staffId",
          element: <Staff />,
          loader: ({ request }) => {
            // if the user is not an admin, redirect to reports
            return context.permission !== Permission.ADMIN ? redirect("/reports") : null;
          },
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default RouteProvider