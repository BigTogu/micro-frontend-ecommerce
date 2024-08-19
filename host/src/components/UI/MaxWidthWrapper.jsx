import { cn } from "../../lib/utils";

const MaxWidthWrapper = ({ className, children }) => {
  return (
    <div className={cn("h-full mx-auto w-full px-2.5 md:px-20", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
