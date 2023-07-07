import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Allproducts from './Allproducts'

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: "Shirts", label: "Shirts", checked: true },
      { value: "Jeans",label:"Jeans", checked: false },
      { value: "T-Shirts", label: "T-shirt", checked: false },
      { value: "SweatShirt", label: "SweatShirt", checked: false },
      { value: "Accessories", label: "Accessories", checked: false },
      { value: "Jacket", label: "Jacket", checked: false },
      { value: "Shoes", label: "Shoes", checked: false },
      { value: 'accessories', value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
    ],
  },
  {
    id: 'label',
    name: 'Label',
    options: [
      { value: 'New Arrival', label: 'New Arrival', checked: false },
      { value: 'Trending', label: 'Trending', checked: false },
      { value: 'Best Seller', label: 'Best Seller', checked: true },
    ],
  },

  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

export default function ProductList() {

  return (
    <div className="bg-white">
      <div>

        <main className="mx-auto max-w-8xl px-0 sm:px-6 lg:px-16">

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

              {/* Filters */}
              <form className="hidden lg:block mt-10">
              <h2 className="text-2xl md:text-3xl tracking-wider font-bold text-gray-900 text-center md:text-left mb-5 font-agdasima">Filters</h2>
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-lg text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center text-gray-900">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-lg text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Your content */}
                <Allproducts/>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}