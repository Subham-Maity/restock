export default function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto 2xl:mx-10 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
      <nav aria-label="Breadcrumb" className="animate-pulse">
          <div className="bg-gray-400/50 animate-pulse h-3 w-44 rounded-md"></div>
        </nav>
      <div className="pt-6">
        

        <div className="flex flex-col lg:flex-row">
          {/* Image gallery */}
          <div className="mx-auto w-fit flex lg:flex flex-col-reverse lg:flex-row py-4 sm:space-x-4 mb-10 justify-center lg:justify-start lg:border-r lg:border-gray-400 lg:pr-8">
            <div className="w-fit flex flex-row h-fit lg:flex-col product-previews mt-3 lg:mt-0 space-x-2 mx-auto sm:space-x-0 md:space-y-2 p-2 border border-gray-400 rounded-xl touch-pan-y">
              <div className="lg:mt-0 animate-pulse lg:space-y-2 flex flex-row lg:flex-col space-x-2 lg:space-x-0">
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
                <div className="rounded-lg bg-gray-400/50 h-[100px] w-[100px]"></div>
              </div>
            </div>
            <div className="bg-gray-400/50 rounded-lg h-[400px] xl:h-[500px] lg:w-[400px] xl:w-[500px] my-auto animate-pulse  "></div>
          </div>
          
          <div className="lg:px-6 space-y-6">
            <div className="justify-start w-72 animate-pulse bg-gray-400/50 h-10 flex rounded-lg">
              {/* {product.title} */}
            </div>
            {/* Ratings */}
            <div className="h-6 w-24 animate-pulse bg-gray-400/50 flex rounded-lg"></div>

            {/* Description */}

            <div>
              <div className="space-y-6">
                <div className="justify-start animate-pulse bg-gray-400/50 h-52 flex  rounded-lg"></div>

                <div className="h-10 w-28 animate-pulse bg-gray-400/50 flex  rounded-lg"></div>
                <div className="w-full lg:mx-0 lg:mr-auto lg:w-fit flex space-x-5 mt-0 lg:mt-10 justify-center lg:justify-start fixed bottom-0 left-0 right-0 z-50 h-16 lg:bg-transparent lg:dark:bg-transparent bg-gray-200 dark:bg-gray-800 p-2 rounded-xl backdrop-blur lg:relative">
                  <button
                    type="submit"
                    className="addToCart w-full lg:w-44 xl:w-52 flex items-center justify-center rounded-xl border-2 border-indigo-600/30 px-8 py-3 text-base font-medium text-indigo-600 dark:text-white   focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  ></button>

                  <button
                    type="submit"
                    className="buyNow w-full lg:w-44 xl:w-52 animate-pulse flex items-center justify-center rounded-xl  bg-indigo-600/30 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
