import { Undo } from "lucide-react";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <section className="container">
        <Undo
          color="gray"
          className="cursor-pointer hover:brightness-50"
          onClick={() => history.back()}
        />
      </section>
      <Outlet />
    </>
  );
};

export default PageLayout;
