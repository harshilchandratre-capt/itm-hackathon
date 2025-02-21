import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const ListFarmWrapper = ({ children, title }: Props) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-green-700 mb-6 border-b pb-3">
        {title}
      </h1>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default ListFarmWrapper;
