import Input from "cart/Input";
import Button from "../UI/Button";
import { Heart } from "lucide-react";
const NewsLetter = () => {
  return (
    <div className="flex flex-col">
      <p className="tracking-widest	">Newsletter</p>
      <p className="py-4 text-sm lg:max-w-xs text-left">
        Sign up to our newsletter to receive exclusive offers and updates.
      </p>
      <Input placeholder="Email" />
      {/* <a
        href="#"
        className="tracking-widest mt-4 py-3 px-6 max-lg:mb-9 rounded-sm text-xs text-skin-base  transition-colors duration-200 bg-skin-button-acent hover:bg-skin-button-acent-hover hover:text-skin-base-hover"
      >
        Subscribe
      </a> */}
      <Button
        onClick={() => console.log("Clicked")}
        variant="primary"
        size="small"
        ariaLabel="Subscribe Button"
      >
        Subscribe
      </Button>
    </div>
  );
};

export default NewsLetter;
