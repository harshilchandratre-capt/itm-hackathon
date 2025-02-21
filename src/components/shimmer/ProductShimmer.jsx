import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductCardShimmer = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <div className="h-full w-full bg-gray-200 animate-pulse" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-2 min-h-[3.5rem] mb-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>

        <div className="space-y-2">
          {" "}
          <div className="flex items-baseline gap-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardShimmer;
