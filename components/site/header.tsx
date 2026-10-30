// The husky mark, fixed in the corner; it takes you back to the top.
export function Header() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-center px-[3.5vw] py-6 max-md:px-5 max-md:py-4 [&>*]:pointer-events-auto">
      <a href="#top" aria-label="Fitted UWB, back to top" className="grid size-14 place-items-center rounded-full bg-chalk transition-transform duration-500 ease-expo hover:-rotate-12 hover:scale-105 max-md:size-12">
        <img src="/brand/husky-purple.png" alt="" width={285} height={288} className="w-9 max-md:w-7" />
      </a>
    </div>
  );
}
