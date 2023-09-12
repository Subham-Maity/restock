export default function ProductDetailsSkeleton() {
  return (
    <div className="lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
      <div className="pt-6">
        <nav aria-label="Breadcrumb" className="animate-pulse">
          <div className="bg-gray-400/50 animate-pulse h-3 w-44 rounded-md"></div>
        </nav>

        <div className="flex flex-col lg:flex-row">
          {/* Image gallery */}
          <div className="w-fit flex lg:flex flex-col-reverse sm:flex-row  py-4 sm:space-x-4 mb-10 justify-center lg:justify-start lg:border-r lg:border-gray-400 lg:pr-8">
            <div className="w-fit flex flex-row h-fit sm:flex-col product-previews mt-3 sm:mt-0 space-x-2 sm:space-x-0 md:space-y-2 p-2 border border-gray-400 rounded-xl touch-pan-y">
              <div className="animate-pulse sm:space-y-2 flex flex-row sm:flex-col space-x-2 sm:space-x-0">
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
              </div>
            </div>
            <div className="bg-gray-400/50 rounded-lg h-[500px] w-[500px] my-auto animate-pulse  "></div>
          </div>
          
          <div className="lg:px-6 space-y-6">
            <div className="justify-start w-80 animate-pulse bg-gray-400/50 h-10 flex rounded-lg">
              {/* {product.title} */}
            </div>
            {/* Ratings */}
            <div className="h-6 w-28 animate-pulse bg-gray-400/50 flex -700/20 rounded-lg"></div>

            {/* Description */}

            <div>
              <div className="space-y-6">
                <div className="justify-start animate-pulse bg-gray-400/50 h-52 flex  rounded-lg"></div>

                <div className="h-10 w-28 animate-pulse bg-gray-400/50 flex  rounded-lg"></div>
                <div className="flex space-x-5 mt-10 justify-start">
                  <button
                    type="submit"
                    className="addToCart h-12 w-60 flex items-center justify-center rounded-xl border-2 border-indigo-600/30 px-8 py-3 text-base font-medium text-indigo-600 dark:text-white   focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  ></button>

                  <button
                    type="submit"
                    className="buyNow h-12 animate-pulse w-60 flex items-center justify-center rounded-xl  bg-indigo-600/30 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product info */}
      </div>
    </div>
  );
}
