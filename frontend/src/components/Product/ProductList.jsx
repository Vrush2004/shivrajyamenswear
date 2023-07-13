import Allproducts from './Allproducts'
import Filter from './Filter'

export default function ProductList({currentWidth}) {

  return (
    <div className="bg-white">
      <div>

        <main className="mx-auto max-w-8xl px-0 sm:px-6 lg:px-16">

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

              {/* Filters -- for big screens only */}
              {
                currentWidth > 640 && <Filter/>
              }


              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Your content */}
                <Allproducts />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}