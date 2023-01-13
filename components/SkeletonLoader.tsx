export default function SkeletonLoader() {
  return (
    <div className="border-2 border-gray-200 p-2 sm:py-4 gap-2 flex flex-col animate-pulse">
      <div className="bg-gray-100 w-full p-2" />
      <div className="bg-gray-100 w-10/12 p-2" />
      <div className="bg-gray-100 w-6/12 p-2" />
    </div>
  );
}
