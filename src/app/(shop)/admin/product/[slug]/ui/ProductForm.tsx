'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/react-quill/ReactQuill';
import Swal from 'sweetalert2';

import { createUpdateProduct, deleteProductImage } from '@/actions';
import { ProductImage } from '@/components';
import {
  Category,
  Product,
  ProductImage as ProductImageInt,
  ProductInStock,
} from '@/interfaces';
import { SizesTable } from './SizesTable';
import { validateInstockForm } from '@/utils';
import { useEffect, useState } from 'react';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageInt[] };
  categories: Category[];
}

interface FormInputs {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string;
  enabled: boolean;
  useStock: boolean;
  category: string;
  inStock: ProductInStock[];
  price?: number;
  images?: FileList;
}

export const ProductForm = ({ product, categories = [] }: Props) => {
  const router = useRouter();
  const [description, setdescription] = useState<string>(product.description? product.description : '')
  

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid },
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      category: product.category,
      tags: product.tags?.join(', '),
      inStock: product.inStock || [],
      images: undefined,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    
    const { images, ...productToSave } = data;
    
    // Verifica si hay tallas en el stock
    if (productToSave.inStock.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'You must add at least one size to the stock',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
      return;
    }

    if (!validateInstockForm(productToSave.inStock)) {
      Swal.fire({
        title: 'Error!',
        text: 'Error en el form del stock',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
      return;
    }

    if (product.id) {
      formData.append('id', product.id ?? '');
    }

    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', description);
    formData.append('enabled', productToSave.enabled.toString());
    formData.append('category', productToSave.category);
    formData.append('useStock', productToSave.useStock.toString());
    formData.append('tags', productToSave.tags);
    formData.append('inStock', JSON.stringify(productToSave.inStock));

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      Swal.fire({
        title: 'Error!',
        text: 'Error updating product',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }


    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  const onUpdateStock = (newStock: ProductInStock[]) => {
    setValue('inStock', newStock)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <div className="">
            <RichTextEditor
              description={description}
              onChange={setdescription}
            />
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags', { required: true })}
          />
        </div>


        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('category', { required: true })}
          >
            {categories.map((category) => (
              <option value={category.name} key={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full mt-5">Save</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col gap-2">
          <div>
            <span>Sizes</span>
            <div>
              { product.inStock &&
                  <SizesTable inStock={product.inStock} productId={product.id!} onChange={onUpdateStock} />
              }
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <span>Pictures</span>
            <input
              {...register('images')}
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.images?.map((image) => (
              <div key={image.url} className="">
                <ProductImage
                  alt={product.title ?? ''}
                  src={image.url}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button
                  className="btn-danger w-full rounded-b-xl"
                  type="button"
                  onClick={() => {
                    deleteProductImage(image.id, image.url);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
