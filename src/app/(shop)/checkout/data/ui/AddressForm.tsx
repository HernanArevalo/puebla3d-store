'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { deleteUserAddress, setUserAddress } from '@/actions';
import { Address, Country, Province, ShippingMethod } from '@/interfaces';
import { useAddressStore, useCartStore } from '@/store';
import { redirect, useRouter } from 'next/navigation';
import { SubTitle } from '@/components';

interface FormInputs {
  firstName: string,
  lastName: string,
  address: string,
  address2?: string,
  postalCode: string,
  city: string,
  province: string,
  country: string,
  phone: string,
  rememberAddress: boolean,
  shippingMethod: ShippingMethod,
}

interface Props {
  countries: Country[];
  provinces: Province[];
  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, provinces, userStoredAddress = {} }: Props) => {
  const router = useRouter();
  const { handleSubmit, register, formState: { isValid }, reset, setValue, watch, getValues } = useForm<FormInputs>({
    defaultValues: {
      ...(userStoredAddress as any),
      country: "AR",
      rememberAddress: false,
      shippingMethod: 'CADETE',
    },
  });

  const { data: sessionData } = useSession({ required: true });
  const { address, setAddress } = useAddressStore();
  const {cart} = useCartStore()

  if (cart.length == 0) {
    redirect('/cart');
  }

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address.firstName]);

  const onSubmit = async (data: FormInputs) => {

    const { rememberAddress, ...rest } = data;
    setAddress(rest);

    if (rememberAddress) {
      await setUserAddress(rest, sessionData!.user.id!);
    } else {
      await deleteUserAddress(sessionData!.user.id!);
    }

    router.push('/checkout');
  }

  // Watch the shippingMethod field to handle checkbox state
  const selectedShippingMethod = watch('shippingMethod');


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 sm:gap-5 sm:grid-cols-4">
        <div className="flex flex-col mb-2 col-span-2">
          <span>Nombres</span>
          <input type="text" className="p-2 border rounded-md" {...register('firstName', { required: true })} />
        </div>

        <div className="flex flex-col mb-2 col-span-2">
          <span>Apellidos</span>
          <input type="text" className="p-2 border rounded-md" {...register('lastName', { required: true })} />
        </div>

        <div className="flex flex-col mb-2 col-span-2 md:col-span-1">
          <span>Teléfono</span>
          <input type="text" className="p-2 border rounded-md" {...register('phone', { required: true })} />
        </div>

        <div className="flex flex-col mb-2 col-span-2 md:col-span-1">
          <span>Dirección</span>
          <input type="text" className="p-2 border rounded-md" {...register('address', { required: true })} />
        </div>

        <div className="flex flex-col mb-2 col-span-2 md:col-span-1">
          <span>Dirección 2 (opcional)</span>
          <input type="text" className="p-2 border rounded-md" {...register('address2')} />
        </div>

        <div className="flex flex-col mb-2 col-span-2 md:col-span-1">
          <span>Código postal</span>
          <input type="text" className="p-2 border rounded-md" {...register('postalCode', { required: true })} />
        </div>

        <div className="flex flex-col mb-2 col-span-2 md:col-span-1">
          <span>Ciudad</span>
          <input type="text" className="p-2 border rounded-md" {...register('city', { required: true })} />
        </div>

        <div className="flex flex-col mb-2 col-span-2 md:col-span-1">
          <span>Provincia</span>
          <select className="p-2 border rounded-md" {...register('province', { required: true })} name='province'>
            <option value="">-</option>
            {provinces.map(province => (
              <option key={province.id} value={province.id}>{province.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2 col-span-2 md:col-span-1">
          <span>País</span>
          <select className="p-2 border rounded-md" {...register('country', { required: true })} defaultValue="AR"  name='country' disabled>
            <option value="AR">Argentina</option>
          </select>
        </div>

        <div className="inline-flex items-center ml-4 mt-3 justify-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register('rememberAddress')}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>Recordar datos</span>
        </div>

        {/* Métodos de entrega con checkbox estilizado */}
        <div className="col-span-2 sm:col-span-4">
          <SubTitle title="Forma de entrega" />
          <div className="flex flex-row gap-4 mb-10">
            <label className={clsx(
                                  "rounded-xl p-5 w-full flex items-center gap-5 cursor-pointer transition-all",
                                  {'bg-white': !getValues(['shippingMethod']).includes('CADETE')},
                                  {'bg-blue-600 text-white': getValues(['shippingMethod']).includes('CADETE')},
                                  )}
                    onClick={()=> {setValue('shippingMethod','CADETE')}}>
              <div className="flex flex-col w-full">
                <span className="font-semibold text-lg">Córdoba Capital</span>
                <span>Envío con cadete.</span>
                <span>Dentro de Circunvalación.</span>
                <div className="border-b-2 border-puebla-blue w-full my-2">
                  
                </div>
                <span className="font-semibold">$ 3.000</span>
              </div>
            </label>

            <label className={clsx(
                                    "rounded-xl p-5 w-full flex items-center gap-5 cursor-pointer transition-all",
                                    {'bg-white': !getValues(['shippingMethod']).includes('RETIRO')},
                                    {'bg-blue-600 text-white': getValues(['shippingMethod']).includes('RETIRO')},
                                  )}
                    onClick={()=> {setValue('shippingMethod','RETIRO')}}>
              <div className="flex flex-col w-full">
                <span className="font-semibold text-lg">Córdoba Capital</span>
                <span>Retiro en persona.</span>
                <span>Colón 4000 - aproximadamente.</span>
                <div className="border-b-2 border-puebla-blue w-full my-2">
                  
                </div>
                <span className="font-semibold">$ 0</span>
              </div>
            </label>

            <label className={clsx(
                                  "rounded-xl p-5 w-full flex items-center gap-5 cursor-pointer transition-all",
                                    "rounded-xl p-5 w-full flex items-center gap-5 cursor-pointer",
                                    {'bg-white': !getValues(['shippingMethod']).includes('CORREO')},
                                    {'bg-blue-600 text-white': getValues(['shippingMethod']).includes('CORREO')},
                                  )}
                    onClick={()=> {setValue('shippingMethod','CORREO')}}>
              <div className="flex flex-col w-full">
                <span className="font-semibold text-lg">Resto del país</span>
                <span>Envío por Correo Argentino</span>
                <div className="border-b-2 border-puebla-blue w-full my-2">
                  
                </div>
                <span className="font-semibold">$ A confirmar</span>

              </div>
            </label>
          </div>
          
          <p></p>
        </div>

        <div className="flex flex-col mb-2 sm:mt-1 col-span-2 w-full">
          <button
            type='submit'
            className={clsx({
              "btn-primary": isValid,
              "btn-disabled": !isValid,
            })}
          >
            Siguiente
          </button>
        </div>
      </form>
    </>
  );
};
