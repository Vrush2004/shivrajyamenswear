import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductsByIdAsync,
  selectAllCategories,
  selectAllLabels,
  selectedProduct,
  updateProductAsync,
} from '../../Features/product/productSlice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast,ToastContainer } from 'react-toastify';
const sizes = {
  "t-shirts": ["S", "M", "L", "XL", "XXL"],
  "shirts": ["S", "M", "L", "XL", "XXL"],
  "jeans": ["28", "30", "32", "34", "36", "38"],
  "shorts": ["S", "M", "L", "XL"],
  "polo-shirts": ["S", "M", "L", "XL", "XXL"],
  "hoodies-sweatshirts": ["S", "M", "L", "XL"],
  "jackets": ["S", "M", "L", "XL"],
  "trousers-pants": ["28", "30", "32", "34", "36", "38"],
  "suits-blazers": ["38R", "40R", "42R", "44R", "46R"],
  "formal-wear": ["S", "M", "L", "XL", "XXL"],
  "casual-wear": ["S", "M", "L", "XL", "XXL"],
  "sports-clothing": ["S", "M", "L", "XL", "XXL"],
  "underwear": ["S", "M", "L", "XL", "XXL"],
  "socks": ["One Size"],
  "sleepwear": ["S", "M", "L", "XL", "XXL"],
  "ethnic-wear": ["S", "M", "L", "XL", "XXL"],
  "accessories": ["One Size"],
  "shoes": ["6", "7", "8", "9", "10", "11", "12"],
  "bags-backpacks": ["One Size"],
};

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const categories = useSelector(selectAllCategories);
  const labels = useSelector(selectAllLabels);
  const dispatch = useDispatch();
  const params = useParams();
  const currentSelectedProduct = useSelector(selectedProduct);

  // #### categories and their sizes ####
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSizes([]);
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((s) => s !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  };


  const sizeOptions = selectedCategory && sizes[selectedCategory].map((size) => (
    <label key={size}>
      <input
        type="checkbox"
        value={size}
        checked={selectedSizes.includes(size)}
        onChange={handleSizeChange}
        className='ml-4'
      />
      <span className='ml-1'>{size}</span>
    </label>
  ));
  // #### End💥 categories and their sizes ####

  // const [sellPrice, setSellPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);

  const handleSellingPrice = (e) => {
    const discount = parseFloat(e.target.value);
    const calculatedSellPrice = Math.round(oldPrice - (oldPrice * (discount / 100)));
    setPrice(calculatedSellPrice); // Set the calculated selling price to the 'sellPrice' field
  };
  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductsByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (currentSelectedProduct && params.id) {
      setValue('title', currentSelectedProduct.title);
      setValue('description', currentSelectedProduct.description);
      setValue('price', currentSelectedProduct.price);
      setValue('discountPercentage', currentSelectedProduct.discountPercentage);
      setValue('thumbnail', currentSelectedProduct.thumbnail);
      setValue('stock', currentSelectedProduct.stock);
      setValue('image1', currentSelectedProduct.images[0]);
      setValue('image2', currentSelectedProduct.images[1]);
      setValue('image3', currentSelectedProduct.images[2]);
      setValue('brand', currentSelectedProduct.brand);
      setValue('category', currentSelectedProduct.category);
      const calculatedSellPrice = Math.round(parseInt(oldPrice) - (parseInt(oldPrice) * (parseInt(currentSelectedProduct.discountPercentage) / 100)));
      setPrice(calculatedSellPrice); // Set the calculated selling price to the 'sellPrice' field
    }
  }, [currentSelectedProduct, params.id, setValue]);


  const handleDelete = () => {
    const product = { ...currentSelectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        const product = { ...data, selectedSizes };
        console.log(product);
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.thumbnail,
        ];
        product.rating = 0;
        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;


        if (params.id) {
          product.id = params.id;
          product.rating = currentSelectedProduct.rating || 0;
          dispatch(updateProductAsync(product));
          reset();
          toast.success('Product Created Successfully..!', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          dispatch(createProductAsync(product));
          reset();
          toast.success('Product updated!', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          //TODO:  on product successfully added clear fields and show a message
        }
      })}
    >
      <ToastContainer/>
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {currentSelectedProduct ? "Update the product" : "Add a Product"}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Product Name*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('title', {
                      required: 'name is required',
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Brand*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('brand', {
                      required: 'brand is required',
                    })}
                    id="brand"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description', {
                    required: 'description is required',
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about product.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register('category', {
                    required: 'category is required',
                  })}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">--choose category--</option>
                  {categories.map((category, index) => (
                    <option value={category.value} key={index}>{category.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              {selectedCategory && (
                <div className='mt-2'>
                  <label className='font-bold mb-2 block'>Select Sizes:</label>
                  {sizeOptions}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Label
              </label>
              <div className="mt-2">
                <select
                  {...register('label')}
                >
                  <option value="">--choose label--</option>
                  {labels.map((label, index) => (
                    <option value={label.value} key={index}>{label.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="number"
                    {...register('price', {
                      required: 'price is required',
                      min: 1,
                      max: 10000,
                    })}
                    onChange={(e) => setOldPrice(e.target.value)}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="number"
                    {...register('discountPercentage', {
                      required: 'discountPercentage is required',
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    onChange={handleSellingPrice}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 mt-4">
              <b>Selling Price is: </b><span>{price}</span>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="number"
                    {...register('stock', {
                      required: 'stock is required',
                      min: 0,
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('thumbnail', {
                      required: 'thumbnail is required',
                    })}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('image1', {
                      required: 'image1 is required',
                    })}
                    id="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('image2', {
                      required: 'image is required',
                    })}
                    id="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('image3', {
                      required: 'image is required',
                    })}
                    id="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Extra{' '}
          </h2>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mb-24 flex items-center justify-center md:justify-end gap-x-6 mr-10">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>

        {currentSelectedProduct && <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Delete
        </button>}

        <button
          type="submit"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          {currentSelectedProduct ? "Update Product" : "Add product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;