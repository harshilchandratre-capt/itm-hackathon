import { Button } from "@/components/ui/button";
import { authServices } from "@/services/authServices";
import { toast } from "sonner";

const HomePage = () => {
  return (
    <div>
      Home
      <Button
        onClick={() => {
          authServices.logout();
        }}
      >
        Log out
      </Button>
      <Button
        onClick={(e) => {
          toast("lalaal", { duration: 1500 });
        }}
      >
        Click me
      </Button>
    </div>
  );
};

export default HomePage;
