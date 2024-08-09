import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getProvinces, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export default async function AddressPage() {

  const countries = await getCountries();
  const provinces = await getProvinces();

  const session = await auth();

  if ( !session?.user ) {
    return(
      <h3 className="text-5xl">No hay sesión de usuario</h3>
    )
  }

  const userAddress = await getUserAddress(session.user.id || '') ?? undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Datos de la entrega"/>

        <AddressForm countries={countries} provinces={provinces}  userStoredAddress= { userAddress } />

        

      </div>
    </div>
  );
}